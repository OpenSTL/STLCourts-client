describe('Citations', function() {
  var Citations;
  var httpRoot = '//localhost:8080/api';
  var querySpy = jasmine.createSpy('querySpy');


  var citation = {
    id: 5,
    citation_date: "2001-04-23",
    date_of_birth: "2004-02-28",
    court_dateTime: "2006-04-10T12:30",
    violations: [{
      id:1,
      status_date: "2005-03-15"
    }]
  };

  var citation2 = {
    id: 6,
    citation_date: null,
    date_of_birth: "2004-02-28",
    court_dateTime: "2006-04-10T12:30",
    violations: [{
      id:1,
      status_date: "2005-03-15"
    }]
  };

  var citations = [citation,citation2];

  beforeEach(module('yourStlCourts'));

   beforeEach(function(){
     module(function($provide) {
      $provide.value('SMSInfo',
        {
          getPhoneNumber: function () {
            return {
              then:function(){}
            };
          }
        });
     });
   });


  beforeEach(function(){
    module(function($provide){
      $provide.factory('$resource',function(){
        return function $resource() {
          return {query: querySpy};
        }
      });
    });

  });

  beforeEach(inject(function(_Citations_){
    Citations = _Citations_;
  }));

  it ('test a basic promise in $resource',inject(function($q,$rootScope){
    var defer = $q.defer();
    defer.resolve(citations);

    querySpy.and.returnValue({$promise: defer.promise});
    var findPromise = Citations.find();
    $rootScope.$apply();
    var result;
    findPromise.then(function(data){
      result = data;
    });
    $rootScope.$apply();

    expect(result[0].citation_date instanceof Date).toBe(true);
    expect(result[0].date_of_birth instanceof Date).toBe(true);
    expect(result[0].court_dateTime instanceof Date).toBe(true);
    expect(result[0].violations[0].status_date instanceof Date).toBe(true);
    expect(result[1].citation_date).toBeNull();
  }));



});
