module.exports = function (router) {

  var v = "v4";
  var base = "/inspector/"+v+"/";

  // 

    router.post(base+'get-appeals', function (req, res) {

      if ( req.session.data["inspector-"+v+"-pullappealref"].includes("APP/2020/56789/5551277") ){
        req.session.data["inspector-"+v+"-appealunavailable"] = "true";
        res.redirect(base+'get-appeals/appeals-unavailable');
      } else {
        res.redirect(base+'get-appeals/add-to-schedule');
      }
    })

    router.post(base+'get-appeals/add-to-schedule', function (req, res) {

      // Take the selected appeals and store them to display in my appeals,
      // and remove them from available appeals
        //data["inspector-"+v+"-myappeals"].push(data["inspector-"+v+"-pullappealref"])
      //

      res.redirect(base+'get-appeals/appeals-assigned');

    })

    router.get(base+'goto-appeal-unscheduled/:ref', function (req, res, next) {
      // Store the selected ref in a session variable 
      req.session.data["inspector-"+v+"-schedule-ref"] = req.params.ref;
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