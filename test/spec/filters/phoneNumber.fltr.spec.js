describe('phoneNumber', function(){
  beforeEach(module('yourStlCourts'));

  it('formats a phone number correctly',inject(function(phoneNumberFilter){
    expect(phoneNumberFilter('2345678977')).toEqual("(234) 567-8977");
  }));

  it('formats a removes non digits and leading 1 correctly',inject(function(phoneNumberFilter){
    expect(phoneNumberFilter('+12345678977')).toEqual("(234) 567-8977");
  }));
});
