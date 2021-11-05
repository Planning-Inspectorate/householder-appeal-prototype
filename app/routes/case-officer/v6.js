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
      req.session.data["caseOfficerQuestionnaires"][objIndex].reasonsStatutoryPolicies = req.session.data["caseofficer-"+v+"-missingincorrect-statutorypolicies"];
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

/*
  Saving additional documents for incomplete questionnaires
*/

  router.post(base+'update/planning-officer-report', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newPlanningOfficerReport = req.session.data["caseofficer-"+v+"-update-planningofficerreport"];
    if (Array.isArray(newPlanningOfficerReport)){
      newPlanningOfficerReport.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].planningOfficerReport.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].planningOfficerReport.push(newPlanningOfficerReport);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/plans-used', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newPlansUsed = req.session.data["caseofficer-"+v+"-update-plansused"];
    if (Array.isArray(newPlansUsed)){
      newPlansUsed.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].plansUsed.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].plansUsed.push(newPlansUsed);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/statutory-policies', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newStatutoryPolicies = req.session.data["caseofficer-"+v+"-update-statutorypolicies"];
    if (Array.isArray(newStatutoryPolicies)){
      newStatutoryPolicies.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].statutoryPolicies.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].statutoryPolicies.push(newStatutoryPolicies);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/other-policies', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newOtherPolicies = req.session.data["caseofficer-"+v+"-update-otherpolicies"];
    if (Array.isArray(newOtherPolicies)){
      newOtherPolicies.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].otherPolicies.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].otherPolicies.push(newOtherPolicies);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/supplementary-planning-documents', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newSupplementaryPlanningDocs = req.session.data["caseofficer-"+v+"-update-supplementaryplanningdocs"];
    if (Array.isArray(newSupplementaryPlanningDocs)){
      newSupplementaryPlanningDocs.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].supplementaryPlanningDocs.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].supplementaryPlanningDocs.push(newSupplementaryPlanningDocs);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/conservation-area', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newConservationArea = req.session.data["caseofficer-"+v+"-update-conservationarea"];
    if (Array.isArray(newConservationArea)){
      newConservationArea.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].conservationAreaFiles.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].conservationAreaFiles.push(newConservationArea);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/listed-building', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    req.session.data["caseOfficerQuestionnaires"][objIndex].listedBuildingNotes.push(req.session.data["caseofficer-"+v+"-update-listedbuilding"]);
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/application-notification', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newApplicationNotification = req.session.data["caseofficer-"+v+"-update-applicationnotification"];
    if (Array.isArray(newApplicationNotification)){
      newApplicationNotification.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].applicationNotification.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].applicationNotification.push(newApplicationNotification);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/application-publicity', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newApplicationPublicity = req.session.data["caseofficer-"+v+"-update-applicationpublicity"];
    if (Array.isArray(newApplicationPublicity)){
      newApplicationPublicity.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].applicationPublicity.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].applicationPublicity.push(newApplicationPublicity);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/representations', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newRepresentations = req.session.data["caseofficer-"+v+"-update-representations"];
    if (Array.isArray(newRepresentations)){
      newRepresentations.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].representations.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].representations.push(newRepresentations);
    }
    res.redirect(base+'review-incomplete');
  })

  router.post(base+'update/appeal-notification', function (req, res) {
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));
    newAppealNotification = req.session.data["caseofficer-"+v+"-update-appealnotification"];
    if (Array.isArray(newAppealNotification)){
      newAppealNotification.forEach( item => {
        req.session.data["caseOfficerQuestionnaires"][objIndex].appealNotification.push(item);
      });
    } else {
      req.session.data["caseOfficerQuestionnaires"][objIndex].appealNotification.push(newAppealNotification);
    }
    res.redirect(base+'review-incomplete');
  })


/*
  Update the outcome of the questionnaire
*/
  router.post(base+'review-incomplete', function (req, res) {
    res.redirect(base+'check-confirm-incomplete');
  })
  

  router.post(base+'check-confirm-incomplete', function (req, res) {
    
    // get the relevant questionnaire data from the session
    objIndex = req.session.data["caseOfficerQuestionnaires"].findIndex((obj => obj.ref == req.session.data["caseofficer-"+v+"-currentappeal"]));

    // store outcome against questionnaire data
    req.session.data["caseOfficerQuestionnaires"][objIndex].outcome = req.session.data["caseofficer-"+v+"-outcome"];

    res.redirect(base+'confirmation');

  })

}