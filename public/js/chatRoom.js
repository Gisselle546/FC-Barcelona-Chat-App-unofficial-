var socket = io();

function scrollToBottom(){
    var messages = jQuery('#messagelist');
    var newMessage = messages.children("li:last-child");
    
    //heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop    = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
    
    
    
}




socket.on('connect',function(){
   var params = jQuery.deparam(window.location.search);
   
   socket.emit('join',params,function(){
       
           alert(console.log(" Please enter your name"));
           window.location.href='/';
       
   });
});



socket.on('disconnect',function(){
    console.log("disconnected");
});

socket.on('updateUserlist',function(users){
  var ol = jQuery('<ol></ol>');
   
  users.forEach(function(user){
      ol.append(jQuery('<li></li>').text(user));
  });
   
  jQuery('#allUsers').html(ol);

    
    
    
    
});

socket.on('newMessage', function(message){
    console.log("newMessage",message);
    
    var time = moment(message.createdtime).format("h:mm a");
    var temp = jQuery('#message-temp').html();
    var htmloutput = Mustache.render(temp,{
        text:message.text,
        from:message.from,
        createdtime:time
    });
    jQuery('#messagelist').append(htmloutput);
     scrollToBottom();
});

jQuery('#messageForm').on('submit',function(e){
    e.preventDefault();
    
    var textbox = jQuery('[name=message]');
    
    socket.emit('createMessage', {
        from:'User',
        text: textbox.val() 
    });
     textbox.val("");
});
