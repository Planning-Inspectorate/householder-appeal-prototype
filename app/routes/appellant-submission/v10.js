module.exports = function (router) {

  var v = "v10";
  var base = "/appellant-submission/"+v+"/";


/******************
 *** SKIP LINKS ***
 ******************/

  router.get(base+'skip/full-task-list', function (req, res) {
    req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] = "BRD";
    req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] = "Full planning";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealabout"] = [
      "None of these"
    ],
    req.session.data["appealsub-"+v+"-beforeyoustart-enforcementnotice"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] = "Refused";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-day"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-month"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-year"] = "2021";
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-day"] = 10,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-month"] = 4,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-year"] = 2022,
    req.session.data["appealsub-"+v+"-beforeyoustart-claimingcosts"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealprocedure"] = "Written representations";
    req.session.data["appealsub-"+v+"-route"] = "full";
    res.redirect(base+'full/task-list');
  })


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
          res.redirect(base+'householder/task-list');
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
      res.redirect(base+'full/task-list');
    } else {
      res.redirect(base+'before-you-start/shutter/appeal-procedure');
    }
  })

  
/*****************
 *** ABOUT YOU ***
 *****************/

  router.post(base+'full/contact-details/who-are-you', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "In progress";
    res.redirect(base+'full/contact-details/your-details');
  })

  router.post(base+'full/contact-details/your-details', function (req, res) {
    if (req.session.data["appealsub-"+v+"-aboutyou-applicationinyourname"] == "No"){
      res.redirect(base+'full/contact-details/applicant-name');
    } else {
      req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "Complete";
      res.redirect(base+'full/task-list');
    }
  })

  router.post(base+'full/contact-details/applicant-name', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "Complete";
    res.redirect(base+'full/task-list');
  })

  
/**************************************
 *** PLANNING APPLICATION DOCUMENTS ***
 **************************************/

  router.post(base+'full/planning-application-documents/application-upload', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "In progress";
    res.redirect(base+'full/planning-application-documents/application-number');
  })

  router.post(base+'full/planning-application-documents/application-number', function (req, res) {
    res.redirect(base+'full/planning-application-documents/design-access-statement');
  })

  router.post(base+'full/planning-application-documents/design-access-statement', function (req, res) {
    if (req.session.data["appealsub-"+v+"-aboutapplication-designaccess"] == "Yes"){
      res.redirect(base+'full/planning-application-documents/design-access-statement-upload');
    } else {
      res.redirect(base+'full/planning-application-documents/decision-letter');
    }
  })

  router.post(base+'full/planning-application-documents/design-access-statement-upload', function (req, res) {
    res.redirect(base+'full/planning-application-documents/decision-letter');
  })

  router.post(base+'full/planning-application-documents/decision-letter', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "Complete";
    res.redirect(base+'full/task-list');
  })

  
/************************
 *** APPEAL DOCUMENTS ***
 ************************/
  
    router.post(base+'full/appeal-documents/appeal-statement', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "In progress";
      res.redirect(base+'full/appeal-documents/sensitive-information');
    })
  
    router.post(base+'full/appeal-documents/sensitive-information', function (req, res) {
      res.redirect(base+'full/appeal-documents/supporting-documents');
    })
  
    router.post(base+'full/appeal-documents/supporting-documents', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "Complete";
      res.redirect(base+'full/task-list');
    })


/*******************
 *** APPEAL SITE ***
 *******************/
  
  router.post(base+'full/appeal-site/site-address', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-appealsite"] = "In progress";
    res.redirect(base+'full/appeal-site/owns-site');
  })

  router.post(base+'full/appeal-site/owns-site', function (req, res) {
    if (req.session.data["appealsub-"+v+"-appealsite-siterelationship"] == "Appellant owns the whole site"){
      res.redirect(base+'full/appeal-site/site-visible');
    } else {
      if (req.session.data["appealsub-"+v+"-appealsite-otherowners"] == "No, the appellant does not know any of the other owners"){
        res.redirect(base+'full/appeal-site/site-visible');
      } else {
        res.redirect(base+'full/appeal-site/other-owners');
      }
    }
  })

  router.post(base+'full/appeal-site/other-owners', function (req, res) {
    res.redirect(base+'full/appeal-site/site-visible');
  })

  router.post(base+'full/appeal-site/site-visible', function (req, res) {
    res.redirect(base+'full/appeal-site/health-safety');
  })

  router.post(base+'full/appeal-site/health-safety', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-appealsite"] = "Complete";
    res.redirect(base+'full/task-list');
  })



}