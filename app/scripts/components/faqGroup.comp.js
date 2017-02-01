'use strict';
/*
    Usage: <faq-group></faq-group>
    attributes:
     set no-title="true" if you don't want the title to appear above the qa
     set keywords if you only want to show the q/a which has the keyword defined,
                  keywords can be a single value or multiple i.e. keywords="me,too"
     source-data is passed from the parent controller
     array-name is the name of the question and answer section to display from the entire Q&A Dataset
     group-title is the name to be displayed above the Q&A section
 */

angular.module('yourStlCourts').component('faqGroup', {
  templateUrl: 'views/faqGroup.html',
  controller: 'FaqGroupCtrl as ctrl',
  bindings: {
      groupTitle:"@",
      arrayName:"@",
      sourceData:"<",
      keywords:"@",
      noTitle:"@"
    }
});
