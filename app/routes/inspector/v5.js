module.exports = function (router) {

  var v = "v5";
  var base = "/inspector/"+v+"/";

  router.post(base+'get-appeals', function (req, res) {
    
    // Check selected appeals for any that have a status of taken
    // loop through selected appeals
    for (let val of req.session.data["inspector-"+v+"-myappeals-selected"]) {
      // find index of matching ref in availableAppeals
      objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == val));
      // if this item has a status of taken
      if (req.session.data["availableAppeals"][objIndex].status == "taken"){
        // change status to removed
        req.session.data["availableAppeals"][objIndex].status = "removed";
        // set variable to redirect to appeal unavailable page
        // We can't do this in the loop, as the redirect would happen before all items are checked
        req.session.data["inspector-"+v+"-myappeals-redirect"] = "unavailable";
      }
    }

    // if any appeals are taken
    if (req.session.data["inspector-"+v+"-myappeals-redirect"] == "unavailable"){

      // remove the variable set for the redirect
      delete req.session.data["inspector-"+v+"-myappeals-redirect"];
      res.redirect(base+'get-appeals/appeals-unavailable');

    } else {

      // loop through the selected appeals
      for (let val of req.session.data["inspector-"+v+"-myappeals-selected"]) {
        
        // find matching ref in availableAppeals
        objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == val));

        // set update status to add to inspector workload
        req.session.data["availableAppeals"][objIndex].status = "notyetbooked"

      }
      
      // Empty the selected appeals variable
      // req.session.data["inspector-"+v+"-myappeals-selected"] = "";

      res.redirect(base+'get-appeals/appeals-assigned');
    }

  })

  router.post(base+'get-appeals/appeal-details', function (req, res) {
    if (!req.session.data["inspector-"+v+"-myappeals-selected"]) {
      req.session.data["inspector-"+v+"-myappeals-selected"] = []
    }
    req.session.data["inspector-"+v+"-myappeals-selected"].push(req.session.data["inspector-"+v+"-myappeals-selected-individual"]);
    res.redirect(base+'get-appeals');
  })


  router.get(base+'goto-appeal-details/:ref', function (req, res, next) {

    // find matching ref in availableAppeals
    objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == req.params.ref));

    // Store the selected ref in a session variable 
    req.session.data["inspector-"+v+"-currentappeal"] = req.params.ref;
    
    res.redirect(base+'get-appeals/appeal-details');

  })




  router.get(base+'goto-appeal-unscheduled/:ref', function (req, res, next) {

    // find matching ref in availableAppeals
    objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == req.params.ref));

    // mark appeal as viewed
    req.session.data["availableAppeals"][objIndex].viewed = "yes"

    // Store the selected ref in a session variable 
    req.session.data["inspector-"+v+"-currentappeal"] = req.params.ref;
    
    res.redirect(base+'appeal-unscheduled');

  })


  router.get(base+'goto-appeal-scheduled/:ref', function (req, res, next) {

    // find matching ref in availableAppeals
    objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == req.params.ref));

    // Store the selected ref in a session variable 
    req.session.data["inspector-"+v+"-currentappeal"] = req.params.ref;
    
    res.redirect(base+'appeal-scheduled');

  })


  router.get(base+'goto-book-visit/:ref', function (req, res, next) {

    // find matching ref in availableAppeals
    objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == req.params.ref));

    // Store the selected ref in a session variable 
    req.session.data["inspector-"+v+"-currentappeal"] = req.params.ref;
    
    res.redirect(base+'book-visit');

  })


  router.post(base+'book-visit', function (req, res) {
    res.redirect(base+'book-visit/check-confirm');
  })


  router.get(base+'goto-appeal-decision/:ref', function (req, res, next) {

    // find matching ref in availableAppeals
    objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == req.params.ref));

    // Store the selected ref in a session variable 
    req.session.data["inspector-"+v+"-currentappeal"] = req.params.ref;
    
    res.redirect(base+'appeal-decision');

  })

  router.post(base+'issue-decision', function (req, res) {
    res.redirect(base+'issue-decision/check-confirm');
  })

  router.post(base+'book-visit/check-confirm', function (req, res) {

    // find matching ref in availableAppeals
    objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == req.session.data["inspector-"+v+"-currentappeal"]));

    // update session with site visit data
    req.session.data["availableAppeals"][objIndex].status = "booked";
    req.session.data["availableAppeals"][objIndex].siteVisitDateDay = req.session.data["inspector-"+v+"-schedule-date-day"];
    req.session.data["availableAppeals"][objIndex].siteVisitDateMonth = req.session.data["inspector-"+v+"-schedule-date-month"];
    req.session.data["availableAppeals"][objIndex].siteVisitDateYear = req.session.data["inspector-"+v+"-schedule-date-year"];
    req.session.data["availableAppeals"][objIndex].siteVisitType = req.session.data["inspector-"+v+"-schedule-type"];
    req.session.data["availableAppeals"][objIndex].siteVisitTime = req.session.data["inspector-"+v+"-schedule-time"];

    res.redirect(base+'book-visit/confirmation');
  })

  router.post(base+'issue-decision/check-confirm', function (req, res) {

    // find matching ref in availableAppeals
    objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == req.session.data["inspector-"+v+"-currentappeal"]));

    // update session with site visit data
    req.session.data["availableAppeals"][objIndex].status = "decisionissued";

    res.redirect(base+'issue-decision/confirmation');
  })


  router.post(base+'unassign-appeal', function (req, res) {

    objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == req.session.data["inspector-"+v+"-currentappeal"]));

    if (req.session.data["inspector-"+v+"-unassignappeal"] == "Yes"){
      req.session.data["availableAppeals"][objIndex].status = "available";
      res.redirect(base+'unassign-appeal/confirmation');
    } else {
      res.redirect(base+'appeal-unscheduled');
    }

  })

}