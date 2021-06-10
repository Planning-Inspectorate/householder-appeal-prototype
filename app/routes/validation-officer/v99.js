module.exports = function (router) {

  var v = "v99";
  var base = "/validation-officer/"+v+"/";

  router.post(base+'validate-appeal', function (req, res) {
    if (req.session.data['vo-'+v+'-status'] == "Valid"){
      res.redirect(base+'outcome-valid');
    } else if (req.session.data['vo-'+v+'-status'] == "Invalid") {
      res.redirect(base+'notify-lpa-invalid');
    } else if (req.session.data['vo-'+v+'-status'] == "Incomplete") {
      res.redirect(base+'notify-lpa-incomplete');
    }
  })

}