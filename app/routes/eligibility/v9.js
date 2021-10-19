module.exports = function (router) {

  var v = "v9";
  var base = "/eligibility/"+v+"/";

  // Question 1
    router.post(base+'planning-department', function (req, res) {
      if (
        // Check if selected LPA key aligns to allowed LPA in local-authority-eng.json
        // Current LPAs:
        //  - BRD (City of Bradford Metropolitan District Council)
        //  - HIL (London Borough of Hillingdon)
        //  - HAG (Harrogate Borough Council)
        req.session.data["eligibility-"+v+"-planningdepartment"] == "BRD" ||
        req.session.data["eligibility-"+v+"-planningdepartment"] == "HIL" ||
        req.session.data["eligibility-"+v+"-planningdepartment"] == "HAG"
      ){
        res.redirect(base+'what-are-you-appealing');
      } else {
        res.redirect(base+'shutter/lpa-ineligible');
      }
    })

  router.post(base+'what-are-you-appealing', function (req, res) {
    if (req.session.data["eligibility-"+v+"-whatareyouappealing"] == "I have not made a planning application") {
      res.redirect(base+'shutter/planning-application-not-made');
    } else if (req.session.data["eligibility-"+v+"-whatareyouappealing"] == "A different type") {
      res.redirect(base+'shutter/planning-application-different-type');
    } else if (req.session.data["eligibility-"+v+"-whatareyouappealing"] == "Householder planning") {
      res.redirect(base+'listed-building');
    } else {
      res.redirect(base+'appeal-relates-to');        
    }
  })

  router.post(base+'listed-building', function (req, res) {
    if (req.session.data["eligibility-"+v+"-listedbuilding"] == "No"){
      res.redirect(base+'enforcement-notice');
    } else {
      res.redirect(base+'shutter/listed-building');
    }
  })

  router.post(base+'enforcement-notice', function (req, res) {
    if (req.session.data["eligibility-"+v+"-enforcementnotice"] == "No"){
      res.redirect(base+'permission-granted-refused');
    } else {
      res.redirect(base+'shutter/enforcement-notice');
    }
  })

  router.post(base+'permission-granted-refused', function (req, res) {
    if (req.session.data["eligibility-"+v+"-permissiongrantedrefused"] == "I have not received a decision"){
      res.redirect(base+'decision-date-due');
    } else {
      if (req.session.data["eligibility-"+v+"-whatareyouappealing"] == "Full planning"){
        res.redirect(base+'notice-decision-date-full');
      } else {
        if (req.session.data["eligibility-"+v+"-permissiongrantedrefused"] == "Granted"){
          res.redirect(base+'notice-decision-date-full');
        } else {
          res.redirect(base+'notice-decision-date-householder');
        }
      }      
    }
  })

  router.post(base+'notice-decision-date-householder', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['eligibility-'+v+'-decisiondatehouseholder-day'];
    var enteredMonth = req.session.data['eligibility-'+v+'-decisiondatehouseholder-month'];
    var enteredYear = req.session.data['eligibility-'+v+'-decisiondatehouseholder-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 

    // calculate deadline for appeal based on decision due date
    // 12 weeks for the HAS appeal 
    var deadlineDate = new Date(enteredDate);
    deadlineDate.setDate(deadlineDate.getDate() + (12*7));

    req.session.data["eligibility-"+v+"-deadline-day"] = deadlineDate.getDate();
    req.session.data["eligibility-"+v+"-deadline-month"] = deadlineDate.getMonth() + 1;
    req.session.data["eligibility-"+v+"-deadline-year"] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      res.redirect(base+'shutter/out-of-time-householder')
    } else {
      // if householder then... Is your appeal about a listed building?
      if (req.session.data["eligibility-"+v+"-whatareyouappealing"] == "Householder planning"){
        res.redirect(base+'claiming-costs');
      }
      // if full then... Does your appeal relate to any of the following? Major dwellings *salute*
    }
  })

  router.post(base+'claiming-costs', function (req, res) {
    if (req.session.data["eligibility-"+v+"-claimingcosts"] == "No"){
      res.redirect(base+'task-list');
    } else {
      res.redirect(base+'shutter/claiming-costs');
    }
  })
  


















  router.post(base+'decision-date-due', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['eligibility-'+v+'-decisiondatedue-day'];
    var enteredMonth = req.session.data['eligibility-'+v+'-decisiondatedue-month'];
    var enteredYear = req.session.data['eligibility-'+v+'-decisiondatedue-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 

    // calculate deadline for appeal based on decision due date
    // 6 months = 26 weeks for the prototype
    var deadlineDate = new Date(enteredDate);
    deadlineDate.setDate(deadlineDate.getDate() + (26*7));

    req.session.data['eligibility-'+v+'-deadline-day'] = deadlineDate.getDate();
    req.session.data['eligibility-'+v+'-deadline-month'] = deadlineDate.getMonth() + 1;
    req.session.data['eligibility-'+v+'-deadline-year'] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      res.redirect(base+'shutter/out-of-time-no-decision')
    } else {
      // if householder then... Is your appeal about a listed building?
      // if full then... Does your appeal relate to any of the following? Major dwellings *salute*
    }
  })

}