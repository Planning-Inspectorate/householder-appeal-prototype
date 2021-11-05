module.exports = function (router) {

  var v = "v6";
  var base = "/case-officer/"+v+"/";

  router.get(base+'goto-questionnaire/:ref', function (req, res, next) {
    req.session.data["caseofficer-"+v+"-currentappeal"] = req.params.ref;
    res.redirect(base+'review');
  })

  router.post(base+'review', function (req, res) {
    if (req.session.data["caseofficer-"+v+"-missingincorrect"]) {
      req.session.data["caseofficer-"+v+"-outcome"] = "Incomplete"
    } else {
      req.session.data["caseofficer-"+v+"-outcome"] = "Complete"
    }  
    res.redirect(base+'check-confirm');
  })

  router.post(base+'check-confirm', function (req, res) {
    
    // get the relevant questionnaire data from the session
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));

    // store outcome against questionnaire data
    req.session.data["caseOfficerQuestionnaires"][objIndex].outcome = req.session.data["caseofficer-"+v+"-outcome"];
    
    if (req.session.data["caseofficer-"+v+"-outcome"] == "Incomplete") {
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasons = req.session.data["caseofficer-"+v+"-missingincorrect"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsPlansUsed = req.session.data["caseofficer-"+v+"-missingincorrect-plansused"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsStatutoryPolcies = req.session.data["caseofficer-"+v+"-missingincorrect-statutorypolicies"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsOtherPolicies = req.session.data["caseofficer-"+v+"-missingincorrect-otherpolicies"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsSupplementaryPlanningDocs = req.session.data["caseofficer-"+v+"-missingincorrect-supplementaryplanningdocs"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsConservationArea = req.session.data["caseofficer-"+v+"-missingincorrect-conservationarea"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsListedBuilding = req.session.data["caseofficer-"+v+"-missingincorrect-listedbuilding"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsApplicationNotification = req.session.data["caseofficer-"+v+"-missingincorrect-applicationnotification"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsRepresentations = req.session.data["caseofficer-"+v+"-missingincorrect-representations"];
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsAppealNotification = req.session.data["caseofficer-"+v+"-missingincorrect-appealnotification"];
    }

    res.redirect(base+'confirmation');
  })


  router.get(base+'goto-incomplete-questionnaire/:ref', function (req, res, next) {
    req.session.data["caseofficer-"+v+"-currentappeal"] = req.params.ref;
    res.redirect(base+'review-incomplete');
  })

}