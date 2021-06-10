module.exports = function (router) {

  var v = "v2";
  var base = "/validation-officer/"+v+"/";

  router.post(base+'validate-appeal', function (req, res) {
    res.redirect(base+'review-complete');
  })

  router.post(base+'what-next', function (req, res) {
    res.redirect(base+'review-complete');
  })

}