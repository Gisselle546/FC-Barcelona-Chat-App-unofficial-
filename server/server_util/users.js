
"use strict";

class ChatUsers{
    constructor(){
        this.chatusers = [];
    }
    
    addChatUser(id,name,room){
        var chatuser = {
            id:id,
            name:name,
            room:room
            
        };
   
    this.chatusers.push(chatuser);
        return chatuser;
        
    }
    
    removeUser(id){
       
       var user = this.getChatUser(id);
       
       if(user){
           
           this.chatusers = this.chatusers.filter(function(user){
               return user.id !== id;
           });
         }
    
       return user;
    }    
    getChatUser(id){
        
        return this.chatusers.filter(function (chatuser) {
                return chatuser.id === id;
            })[0];
        
    }  

    getChatUserList(room){
         var chatusers = this.chatusers.filter(function (user) {
                return user.room === room;
            });

            var usernamelist = chatusers.map(function (user) {
                return user.name;
            });
            return usernamelist;
    }
    
    
}   

module.exports = ChatUsers;