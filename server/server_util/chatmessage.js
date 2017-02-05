var moment =require("moment");

var chatmessageGen = function chatmessageGen(from,text){
    return{
        from:from,
        text:text,
        createdtime: moment().valueOf()
    };
};

module.exports =chatmessageGen;