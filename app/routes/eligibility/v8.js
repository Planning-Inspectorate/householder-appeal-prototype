module.exports = function (router) {

  var v = "v8";
  var base = "/eligibility/"+v+"/";

  // Cross-check answers against the PO report

    router.post(base+'decision-date', function (req, res) {
      //res.redirect(base+'task-list');
    })

}