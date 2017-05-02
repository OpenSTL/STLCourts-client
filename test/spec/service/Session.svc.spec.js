describe('Session', function() {
  var Session;

  var citations = [{id:11},{id:12}];

  beforeEach(function() {
    module('yourStlCourts');
    inject(function (_Session_) {
      Session = _Session_;
    });
  });

  it('initializes to null correctly', function(){
    var returnedCitations = Session.getLatestCitations();
    var returnedCitation = Session.getLastSelectedCitation();

    expect(returnedCitations).toBe(null);
    expect(returnedCitation).toBe(null);

  });

  it('correctly returns latest citations', function(){
    Session.setLatestCitations(citations);
    var returnedCitations = Session.getLatestCitations();
    expect(returnedCitations).toEqual(citations);
  });

  it('correctly returns last selected citation', function(){
    Session.setSelectedCitation(citations[1]);
    var returnedCitation = Session.getLastSelectedCitation();
    expect(returnedCitation).toEqual(citations[1]);
  });

  it('correctly clears last selected citation', function(){
    Session.setSelectedCitation(citations[1]);
    Session.setLatestCitations(citations);
    var returnedCitation = Session.getLastSelectedCitation();
    expect(returnedCitation).toBe(null);
  });

});
