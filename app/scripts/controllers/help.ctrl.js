'use strict';

angular.module('yourStlCourts').controller('HelpCtrl', function () {
  var ctrl = this;

  ctrl.Ticket_QA_Array = [
    {q:'I need to go to court to contest a ticket. I remember exactly where I was pulled over, but I can not figure out where I need to go for court.',
     a:'On YourSTLCourts, under Ticket Finder, you can look up your ticket information based on your name, birth date, and location where you received the ticket.'},
    {q:'I put my information into YourSTLCourts and got a message saying that my case can not be found. What do I do?',
     a:'There are 81 courts in St. Louis County and not all of them currently participate in YourSTLCourts. If you remember where you got your ticket, you can google the court’s phone number and call the court directly, or go to their website. Mention that you would like to see them participating in YourSTLCourts!'},
    {q:'I know I have court coming up, but I lost my ticket, I can not remember when my court date is, and I am not sure who to call.',
     a:'Once you locate your information in YourSTLCourts, you will find your court date and the contact information of the court.'},
    {q:'Can I pay the ticket right now without going to court?',
     a:'Most likely. YourSTLCourts will tell you if your ticket can be paid now online. However, some cases require a court appearance.'},
    {q:'I’d like to know whether there’s a warrant out for my arrest, and how to resolve it.',
     a:'Once you locate your information in YourSTLCourts, it will tell you whether you have an outstanding or unresolved warrant. If you do, you need to appear in court to resolve the case with the judge. The judge and clerk are there to work out a plan with you.'},
    {q:'I owe fines and fees for several violations and I can not afford to pay. What are my options?',
     a:'You currently have a couple of options. You can work out a payment plan with the judge or you can apply for a fee waiver due to an inability to pay. A lawyer can assist you with that application, which can be found here: http://www.courts.mo.gov/hosted/probono/AppFormaPauperis.htm.'},
    {q:'I can’t afford to pay the fines, fees, and personal property taxes, which I must pay all at once, to renew my expired license plate tags. What do I do?',
     a:'To get information about renewing your plates with the state of Missouri, go here: http://dor.mo.gov/motorv/renewing.php. If you need information about renewing your plates with the state of Illinois, go here: http://www.cyberdriveillinois.com/departments/vehicles/onlinerenewals/home.html. Additionally, the judge may be able to assist you with a plan when you meet him/her in court.'}
  ];

  ctrl.Courts_QA_Array = [
    {q:'What are my rights in court?',
      a:'To view your rights, click on the “Your Rights” tab above.'},
    {q:'What can I expect when I go to court?',
      a:'Each court has its own hours of operation. You must follow their dress code and procedures, which you can find on this website.'},
    {q:'I do not own clothes that comply with their dress code. What do I do?',
      a:'The Urban League of Metropolitan St. Louis operates a Clothing Closet in St. Louis County. For more info, you can look here: https://www.ulstl.com/meeting-families-basic-needs/clothing-assistance. You can also call United Way’s 211 Help Line for additional resources.'}
  ];

  ctrl.Legal_QA_Array = [
    {q:'How do I get help with my case?',
      a:'You have the right to legal representation in court. There are lawyers who are willing to provide assistance to you on your case at no charge. Though, this does not obligate them in any way to represent you in court unless you enter into a formal agreement. Contact 282-7272 for more information.'},
    {q:'I do not believe the charge against me is fair/valid. Is it worth fighting a small violation?',
      a:'If you believe you are not guilty, you should plead not guilty. A guilty plea is an admission of guilt and results in you giving up your rights of legal representation and to present witnesses. It also has additional repercussions beyond fines, including points on your license and the possibility of additional liability if you were involved in an accident. If you want to plead Not Guilty and argue your case, you have the right to legal representation, and a lawyer will be provided to you if you cannot afford one. For additional information on this, see “Your Rights” on this website.'}
  ];

  ctrl.Payment_QA_Array = [
    {q:'After paying my court fines and fees, I will need help with my other bills. Where can I go for help?',
      a:'United Way can connect you with a number of resources, including rent, utility, and food assistance. Just dial 211 on any phone to connect to their help line.'}
  ];

});
