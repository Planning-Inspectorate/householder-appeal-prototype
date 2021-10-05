module.exports = function (router) {

  var v = "v4";
  var base = "/inspector/"+v+"/";

  // 

    router.post(base+'get-appeals', function (req, res) {
      
      /********************************************************/
      /* TODO: This needs to work based on the 'taken' status */
      /********************************************************/

      if ( req.session.data["inspector-"+v+"-myapps-notyetbooked-temp"].includes("5551277") ){
        req.session.data["inspector-"+v+"-appealunavailable"] = "true";
        res.redirect(base+'get-appeals/appeals-unavailable');
      } else {
        res.redirect(base+'get-appeals/add-to-schedule');
      }
    })

    router.post(base+'get-appeals/add-to-schedule', function (req, res) {


      for (let val of req.session.data["inspector-"+v+"-myapps-notyetbooked-temp"]) {
        
        // find matching ref in availableAppeals
        objIndex = req.session.data["availableAppeals"].findIndex((obj => obj.ref == val));

        // set provisionalSiteVisit for that appeal to selected date
        req.session.data["availableAppeals"][objIndex].provisionalSiteVisit = req.session.data["inspector-"+v+"-provisionalweek"]
        req.session.data["availableAppeals"][objIndex].status = "notyetbooked"

      }
      
      req.session.data["inspector-"+v+"-myapps-notyetbooked-temp"] = "";

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