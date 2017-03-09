describe('Session', function() {
  var Session;

  var citations = [{id:11},{id:12}];

  beforeEach(function() {
    module('yourStlCourts');
    inject(function (_Session_) {
      Session = _Session_;
    });
  });

  it('returns Null if no latest Citations', function() {
    var returnedCitations = Session.getLatestCitations(null);
    expect(returnedCitations).toBe(null);
  });

  it('correctly returns latest Citations', function(){
    var returnedCitations = Session.getLatestCitations(citations);
    expect(returnedCitations).toEqual(citations);
    returnedCitations = Session.getLatestCitations(null);
    expect(returnedCitations).toEqual(citations);
  });

  if('returns correctly stores latest citation and returns latestCitation', function(){
    var storedCitation = Session.storeSelectedCitation(citations[1]);
    expect(storedCitation.id).toEqual(12);
    var returnedCitation = Session.getLastSelectedCitation();
    expect(returnedCitation.id).toEqual(12);
  });

});
