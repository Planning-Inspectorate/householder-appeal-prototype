module.exports = function (router) {

  var v = "v2";
  var base = "/case-officer-lpaq-review/"+v+"/";

  // Cross-check answers against the PO report

    router.post(base+'review-questionnaire', function (req, res) {
      res.redirect(base+'review-questionnaire-check');
    })

}