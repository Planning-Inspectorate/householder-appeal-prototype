module.exports = function (router) {

  var v = "v1";
  var base = "/validation-officer/"+v+"/";

  router.post(base+'validate-appeal', function (req, res) {
    res.redirect(base+'review-complete');
    /*
    if (req.session.data['vo-'+v+'-status'] == "Valid"){
      res.redirect(base+'review-complete');
    } else {
      res.redirect(base+'what-next');
    }
    */
  })

  router.post(base+'what-next', function (req, res) {
    res.redirect(base+'review-complete');
  })

}