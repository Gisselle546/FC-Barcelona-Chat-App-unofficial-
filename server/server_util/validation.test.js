var expect = require("expect");
var isRealString = require("./validation");


describe('isRealString',function(){
    it('should reject non-string values',function(){
        var rs = isRealString(95);
        expect(rs).toBe(false);
    });

    it('should reject string with only spaces',function(){
        var rs = isRealString('    ');
        expect(rs).toBe(false);
    });
    
    it('should allows string with nonspace characters',function(){
        var rs = isRealString(' Gisselle ');
        expect(rs).toBe(true);
    });
    
    
    
});