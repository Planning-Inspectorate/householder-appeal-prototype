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
      // Store the selected ref in a session variable 
      req.session.data["inspector-"+v+"-schedule-ref"] = req.params.ref;
      

      if (!req.session.data["inspector-"+v+"-viewed"].includes(req.params.ref)) {
        req.session.data["inspector-"+v+"-viewed"].push(req.params.ref);
      }

      // ideally update this to store multiple, so the interaction of scheduling site visits can handle more than one
      
      res.redirect(base+'appeal-unscheduled');
    })

    router.post(base+'book-visit', function (req, res) {
      res.redirect(base+'book-visit/check-confirm');
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