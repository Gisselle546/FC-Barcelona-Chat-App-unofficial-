var expect = require("expect");
var ChatUsers = require("./users");

describe('ChatUsers',function(){
    
    var chatuser;
    beforeEach(function(){
        chatuser = new ChatUsers();
        chatuser.chatusers=[{
            id: '1',
            name:'Messi',
            room: 'player'
        },
        {
            id: '2',
            name: 'Suarez',
            room: 'player'
        },
        {
            id: '3',
            name: 'Luis Enrique',
            room:'Manager'
        }];
            
    });
    
    
    
    it('should add new user',function(){
        var chatuser = new ChatUsers();
        
        var user={
            id:'100',
            name:"Gisselle",
            room:"fc barcelona"
        };
        var resUser = chatuser.addChatUser(user.id,user.name,user.room);
    
        expect(chatuser.chatusers).toEqual([user]);
    });
    
    it('should remover a user',function(){
     var userId = '1';
     var user = chatuser.removeUser(userId);
     
     expect(user.id).toBe(userId);
     expect(chatuser.chatusers.length).toBe(2);
     
        
    });
    
     
    it('should not remover a user',function(){
   
        var userId = '90';
        var user = chatuser.removeUser(userId);
        
        expect(user).toNotExist();
        expect(chatuser.chatusers.length).toBe(3);
        
    });
   
   
   
    
    it('should find a user',function(){
        var userIdnum = '1';
        var user = chatuser.getChatUser(userIdnum);
        
        expect(user.id).toEqual(userIdnum);
        
    });
    
    it('should not find a user',function(){
        var userIdnum = '020';
        var user = chatuser.getChatUser(userIdnum);
        
        expect(user).toNotExist();
    });

    it('should return names for player',function(){
        var userList = chatuser.getChatUserList('player');
        
        expect(userList).toEqual(['Messi','Suarez']);
    });
    
    it('should return names for Manager',function(){
        var userList = chatuser.getChatUserList('Manager');
        
        expect(userList).toEqual(['Luis Enrique']);
    });
    

    
    
    
    
    
    
    
    
});