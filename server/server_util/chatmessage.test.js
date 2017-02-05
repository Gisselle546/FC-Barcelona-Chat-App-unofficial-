var expect = require("expect");
var chatmessageGen = require("./chatmessage");

describe('chatmessageGen',function(){
    it('generate message object',function(){
        var from ='Gise';
        var text = 'fcbarcelona';
        var chat = chatmessageGen(from,text);
        
        expect(chat.createdtime).toBeA('number');
        expect(chat).toInclude({from,text});
        
        
        
        
    });
});