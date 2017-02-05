   var path = require("path");
    var http = require("http");
   var express = require("express");
   var socketIO = require("socket.io");
   var stylepath= path.join(__dirname,"../public");
    
var chatmessageGen = require("./server_util/chatmessage");
var isRealString   = require("./server_util/validation");
var ChatUsers         = require("./server_util/users");
    var  app = express();
    var server = http.createServer(app);
    var io = socketIO(server);
    var users = new ChatUsers();

 
 io.on('connection',function(socket){
      console.log("user connected");
 
    
     
     socket.on('join',function(params){
         if(!isRealString(params.name) || !isRealString(params.room)){
          
         }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addChatUser(socket.id,params.name,params.room);
        
        io.to(params.room).emit('updateUserlist',users.getChatUserList(params.room));
       
        socket.emit('newMessage',chatmessageGen('Admin','Welcome to the app'));
        
        socket.broadcast.to(params.room).emit('newMessage',chatmessageGen('Admin', params.name+' joined'));
     
          
     });
     
     
     
    socket.on('createMessage',function(newMessage){
        
        var user = users.getChatUser(socket.id);
        
        if(user && isRealString(newMessage.text)){
         
           io.to(user.room).emit('newMessage',chatmessageGen(user.name,newMessage.text));
        }
       
       
    });
 
 
 
    socket.on('disconnect',function(){
        var user = users.removeUser(socket.id);
        
        if(user)
        {
            io.to(user.room).emit('updateUserlist',users.getChatUserList(user.room));
            io.to(user.room).emit('newMessage',chatmessageGen('Admin', user.name+' has left'));
        }
    
        
        console.log("User Disconnect");
    });
 
  });
  
  
  
  app.use(express.static(stylepath));
  
  


  server.listen(process.env.PORT,process.env.IV,function(){
    console.log("The server is running");
   });