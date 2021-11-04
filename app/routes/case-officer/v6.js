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
    
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));

    req.session.data["caseOfficerQuestionnaires"][objIndex].outcome = req.session.data["caseofficer-"+v+"-outcome"];

    if (req.session.data["caseofficer-"+v+"-missingincorrect"]) {
      /* 
        store form data in session
        loop through caseofficer-v6-missingincorrect
          store info against item in caseOfficerQuestionnaires.reasons
        loop through caseofficer-v6-missingincorrect-applicationnotification
          store info against item in caseOfficerQuestionnaires.reasonsApplicationNotification
        loop through caseofficer-v6-missingincorrect-appealnotification
          store info against item in caseOfficerQuestionnaires.reasonsAppealNotification
        save caseofficer-v6-missingincorrect-plansused
          in caseOfficerQuestionnaires.reasonsPlansUsed
        save caseofficer-v6-missingincorrect-statutorypolicies
          in caseOfficerQuestionnaires.reasonsStatutoryPolicies
        save caseofficer-v6-missingincorrect-otherpolicies
          in caseOfficerQuestionnaires.reasonsOtherPolicies
        save caseofficer-v6-missingincorrect-supplementaryplanningdocs
          in caseOfficerQuestionnaires.reasonsSupplementaryPlanningDocs
        save caseofficer-v6-missingincorrect-conservationarea
          in caseOfficerQuestionnaires.reasonsConservationArea
        save caseofficer-v6-missingincorrect-representations
          in caseOfficerQuestionnaires.reasonsRepresentations
      */
    }  

    res.redirect(base+'confirmation');
  })


  router.get(base+'goto-incomplete-questionnaire/:ref', function (req, res, next) {
    req.session.data["caseofficer-"+v+"-currentappeal"] = req.params.ref;
    res.redirect(base+'review-incomplete');
  })


}