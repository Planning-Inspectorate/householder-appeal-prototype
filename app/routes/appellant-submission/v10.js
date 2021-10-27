module.exports = function (router) {

  var v = "v10";
  var base = "/appellant-submission/"+v+"/";


/************************
 *** BEFORE YOU START ***
 ************************/

  /*
   * All routing in theis file is based on the logic in thes Miro board frame:
   * https://miro.com/app/board/o9J_lv1IHjc=/?moveToWidget=3074457365971757787&cot=14
   * 
   * The relevant frame is titled "v9a Before you start (eligibility checker)"
   */

  // Question 1
    router.post(base+'before-you-start/planning-department', function (req, res) {
      if (
        // Check if selected LPA key aligns to allowed LPA in local-authority-eng.json
        // Current LPAs:
        //  - BRD (City of Bradford Metropolitan District Council)
        //  - HIL (London Borough of Hillingdon)
        //  - HAG (Harrogate Borough Council)
        req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] == "BRD" ||
        req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] == "HIL" ||
        req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] == "HAG"
      ){
        res.redirect(base+'before-you-start/what-are-you-appealing');
      } else {
        res.redirect(base+'before-you-start/shutter/lpa-ineligible');
      }
    })

  router.post(base+'before-you-start/what-are-you-appealing', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] == "I have not made a planning application") {
      res.redirect(base+'before-you-start/shutter/planning-application-not-made');
    } else if (req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] == "Something else") {
      res.redirect(base+'before-you-start/shutter/planning-application-something-else');
    } else if (req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] == "Householder planning") {
      res.redirect(base+'before-you-start/listed-building');
    } else {
      res.redirect(base+'before-you-start/appeal-about');        
    }
  })

  router.post(base+'before-you-start/listed-building', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-listedbuilding"] == "No"){
      res.redirect(base+'before-you-start/enforcement-notice');
    } else {
      res.redirect(base+'before-you-start/shutter/listed-building');
    }
  })

  router.post(base+'before-you-start/enforcement-notice', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-enforcementnotice"] == "No"){
      res.redirect(base+'before-you-start/permission-granted-refused');
    } else {
      res.redirect(base+'before-you-start/shutter/enforcement-notice');
    }
  })

  router.post(base+'before-you-start/permission-granted-refused', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] == "I have not received a decision"){
      res.redirect(base+'before-you-start/decision-date-due');
    } else {
      res.redirect(base+'before-you-start/notice-decision-date');
    }
  })

  router.post(base+'before-you-start/notice-decision-date', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondate-day'];
    var enteredMonth = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondate-month'];
    var enteredYear = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondate-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 

    // calculate deadline for appeal based on decision due date
    var deadlineDate = new Date(enteredDate);
    if (
      (req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Full planning") ||
      (
        (req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Householder planning") &&
        (req.session.data['appealsub-'+v+'-beforeyoustart-permissiongrantedrefused'] == "Granted")
      )
    ){
      // 6 months = 26 weeks for full appeals
      deadlineDate.setDate(deadlineDate.getDate() + (26*7));
    } else {
      // 12 weeks for the HAS appeals
      deadlineDate.setDate(deadlineDate.getDate() + (12*7));
    }

    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-day"] = deadlineDate.getDate();
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-month"] = deadlineDate.getMonth() + 1;
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-year"] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      if (req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Full planning"){
        res.redirect(base+'before-you-start/shutter/out-of-time-full')
      } else if (
        req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Householder planning" &&
        req.session.data['appealsub-'+v+'-beforeyoustart-permissiongrantedrefused'] == "Granted"
      ) {
        res.redirect(base+'before-you-start/shutter/out-of-time-full')
      } else {
        res.redirect(base+'before-you-start/shutter/out-of-time-householder')
      }
    } else {
      res.redirect(base+'before-you-start/claiming-costs');
    }
  })

  router.post(base+'before-you-start/claiming-costs', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-claimingcosts"] == "No"){
      if (req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Full planning"){
        res.redirect(base+'before-you-start/appeal-procedure');
      } else if (req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Householder planning") {
        if (req.session.data['appealsub-'+v+'-beforeyoustart-permissiongrantedrefused'] != "Refused"){
          res.redirect(base+'before-you-start/appeal-procedure');
        } else {
          req.session.data['appealsub-'+v+'-route'] = "householder"
          res.redirect(base+'task-list');
        }
      }
    } else {
      res.redirect(base+'before-you-start/shutter/claiming-costs');
    }
  })

  router.post(base+'before-you-start/appeal-about', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-appealabout"].includes("None of these") ){
      res.redirect(base+'before-you-start/enforcement-notice');
    } else {
      res.redirect(base+'before-you-start/shutter/appeal-about');
    }
  })

  router.post(base+'before-you-start/decision-date-due', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondatedue-day'];
    var enteredMonth = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondatedue-month'];
    var enteredYear = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondatedue-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 

    // calculate deadline for appeal based on decision due date
    // 6 months = 26 weeks for the prototype
    var deadlineDate = new Date(enteredDate);
    deadlineDate.setDate(deadlineDate.getDate() + (26*7));

    req.session.data['appealsub-'+v+'-beforeyoustart-deadline-day'] = deadlineDate.getDate();
    req.session.data['appealsub-'+v+'-beforeyoustart-deadline-month'] = deadlineDate.getMonth() + 1;
    req.session.data['appealsub-'+v+'-beforeyoustart-deadline-year'] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      res.redirect(base+'before-you-start/shutter/out-of-time-no-decision')
    } else {
      res.redirect(base+'before-you-start/claiming-costs')
    }
  })

  router.post(base+'before-you-start/appeal-procedure', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-appealprocedure"] == "Written representations"){
      req.session.data['appealsub-'+v+'-route'] = "full"
      res.redirect(base+'task-list');
    } else {
      res.redirect(base+'before-you-start/shutter/appeal-procedure');
    }
  })

  
/*****************
 *** ABOUT YOU ***
 *****************/



}