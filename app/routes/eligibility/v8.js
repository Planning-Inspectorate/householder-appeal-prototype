module.exports = function (router) {

  var v = "v8";
  var base = "/eligibility/"+v+"/";

  router.post(base+'did-you-apply', function (req, res) {
    if (req.session.data["eligibility-"+v+"-didyouapply"] == "Yes"){
      res.redirect(base+'granted-refused-permission');
    } else {
      res.redirect(base+'shutter-did-you-apply');
    }
  })

  router.post(base+'granted-refused-permission', function (req, res) {
    if (req.session.data["eligibility-"+v+"-grantedrefused"] == "Granted"){
      res.redirect(base+'shutter-granted');
    } else if (req.session.data["eligibility-"+v+"-grantedrefused"] == "I have not received a decision"){
      res.redirect(base+'shutter-not-received-decision');
    } else {
      res.redirect(base+'decision-date');
    }
  })

  router.post(base+'decision-date', function (req, res) {

    var todaysDate = new Date();

    var enteredDay = req.session.data['eligibility-'+v+'-decisiondate-day'];
    var enteredMonth = req.session.data['eligibility-'+v+'-decisiondate-month'];
    var enteredYear = req.session.data['eligibility-'+v+'-decisiondate-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 
    //enteredDate.toString();

    var deadlineDate = new Date(enteredDate);
    deadlineDate.setDate(deadlineDate.getDate() + 58);
    //deadlineDate.toString();

    console.log('enteredDate: '+enteredDate);
    console.log('deadlineDate: '+deadlineDate);
    console.log('todaysDate: '+todaysDate);

    req.session.data['eligibility-'+v+'-deadline-day'] = deadlineDate.getDate();
    req.session.data['eligibility-'+v+'-deadline-month'] = deadlineDate.getMonth() + 1;
    req.session.data['eligibility-'+v+'-deadline-year'] = deadlineDate.getFullYear();

    if (todaysDate > deadlineDate) {
      res.redirect(base+'shutter-decision-date')
    } else {
      res.redirect(base+'planning-department')
    }

  })

  router.post(base+'planning-department', function (req, res) {
    res.redirect(base+'enforcement-notice');
  })

  router.post(base+'enforcement-notice', function (req, res) {
    if (req.session.data["eligibility-"+v+"-enforcement"] == "Yes"){
      res.redirect(base+'shutter-enforcement-notice');
    } else {
      res.redirect(base+'listed-building');
    }
  })

  router.post(base+'listed-building', function (req, res) {
    if (req.session.data["eligibility-"+v+"-listedbuilding"] == "Yes"){
      res.redirect(base+'shutter-listed-building');
    } else {
      res.redirect(base+'claiming-costs');
    }
  })

  router.post(base+'claiming-costs', function (req, res) {
    if (req.session.data["eligibility-"+v+"-claimingcosts"] == "Yes"){
      res.redirect(base+'shutter-claiming-costs');
    } else {
      res.redirect('/appellant-submission/v7/who-are-you');
    }
  })

}