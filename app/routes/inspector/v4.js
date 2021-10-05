module.exports = function (router) {

  var v = "v4";
  var base = "/inspector/"+v+"/";

  // 

    router.post(base+'get-appeals', function (req, res) {

      if ( req.session.data["inspector-"+v+"-myapps-notyetbooked"].includes("5551277") ){
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


}
/*
router.post("/lpa-submission/:appealId/supplementary-adopted-post", function(req, res, next){

  saveSupplementaryDetails(req);
  res.redirect(`/lpa-submission/${req.params.appealId}/supplementary-file-list`);

})
*/