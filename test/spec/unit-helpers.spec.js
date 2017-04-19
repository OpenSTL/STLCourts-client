beforeEach(function(){
  module(function($provide){
    $provide.value('$window',{
      print: function() {},
      ga: function() {}
    });
  });
});
