module.exports = function (router) {

  var v = "v2";
  var base = "/validation-officer/"+v+"/";

  router.post(base+'review-appeal', function (req, res) {
    if (req.session.data['vo-'+v+'-status'] == "Valid"){
      res.redirect(base+'valid-details');
    }
    if (req.session.data['vo-'+v+'-status'] == "Invalid"){
      res.redirect(base+'invalid-details');
    }
    if (req.session.data['vo-'+v+'-status'] == "Something is missing or wrong"){
      res.redirect(base+'wrong-details');
    }
  })

  router.post(base+'valid-details', function (req, res) {
    res.redirect(base+'valid-review');
  })

  router.post(base+'invalid-details', function (req, res) {
    res.redirect(base+'invalid-review');
  })

  router.post(base+'wrong-details', function (req, res) {
    res.redirect(base+'wrong-review');
  })

  router.post(base+'wrong-review', function (req, res) {
    if (req.session.data['vo-'+v+'-wrong-completed'] == "completed"){
      res.redirect(base+'wrong-complete');
    } else {
      res.redirect(base+'wrong-review-error');
    }
  })

  router.post(base+'wrong-review-error', function (req, res) {
    if (req.session.data['vo-'+v+'-wrong-completed'] == "completed"){
      res.redirect(base+'wrong-complete');
    } else {
      res.redirect(base+'wrong-review-error');
    }
  })
  
}