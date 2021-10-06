module.exports = function (router) {

  var v = "v4";
  var base = "/inspector/"+v+"/";

  // 

    router.post(base+'get-appeals', function (req, res) {
      
      /********************************************************/
      /* TODO: This needs to work based on the 'taken' status */
      /********************************************************/

      /*
        if inspector-v4-myappeals-selected contains a row with status of "taken"
          update all rows with status "taken" to status "removed"
          redirect to appeals-unavailable
        else
          redirect to add-to-schedule
      */
      
      // loop through selected appeals
      for (let val of req.session.data["inspector-"+v+"-myappeals-selected"]) {
        // find index of matching ref in availableAppeals
        objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == val));
        // if this item has a status of taken
        if (req.session.data["availableAppeals"][objIndex].status == "taken"){
          // change status to removed
          req.session.data["availableAppeals"][objIndex].status = "removed";
          // set variable to redirect to appeal unavailable page
          req.session.data["inspector-"+v+"-myappeals-redirect"] = "unavailable";
        }
      }

      // redirect user to relevant page
      if (req.session.data["inspector-"+v+"-myappeals-redirect"] == "unavailable"){
        delete req.session.data["inspector-"+v+"-myappeals-redirect"];
        res.redirect(base+'get-appeals/appeals-unavailable');
      } else  {
        res.redirect(base+'get-appeals/add-to-schedule');
      }

      /*
      if ( req.session.data["inspector-"+v+"-myappeals-selected"].includes("5551277") ){
        req.session.data["inspector-"+v+"-appealunavailable"] = "true";
        res.redirect(base+'get-appeals/appeals-unavailable');
      } else {
        res.redirect(base+'get-appeals/add-to-schedule');
      }*/
    })

    router.post(base+'get-appeals/add-to-schedule', function (req, res) {


      for (let val of req.session.data["inspector-"+v+"-myappeals-selected"]) {
        
        // find matching ref in availableAppeals
        objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == val));

        // set provisionalSiteVisit for that appeal to selected date
        req.session.data["availableAppeals"][objIndex].provisionalSiteVisit = req.session.data["inspector-"+v+"-provisionalweek"]
        req.session.data["availableAppeals"][objIndex].status = "notyetbooked"

      }
      
      req.session.data["inspector-"+v+"-myappeals-selected"] = "";

      res.redirect(base+'get-appeals/appeals-assigned');

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


}
/*
router.post("/lpa-submission/:appealId/supplementary-adopted-post", function(req, res, next){

  saveSupplementaryDetails(req);
  res.redirect(`/lpa-submission/${req.params.appealId}/supplementary-file-list`);

})
*/