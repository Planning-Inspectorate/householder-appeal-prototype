module.exports = function (router) {

  var v = "v5a";
  var base = "/cst/"+v+"/";
  
  router.post(base+'edit/appellant', function (req, res) {
    res.redirect(base);
  })

  router.post(base+'edit/agent', function (req, res) {
    res.redirect(base);
  })
  
  router.post(base+'edit/site-address', function (req, res) {
    res.redirect(base);
  })
  router.post(base+'edit/lpa', function (req, res) {
    res.redirect(base);
  })
  router.post(base+'edit/decision-date', function (req, res) {
    res.redirect(base);
  })
  router.post(base+'edit/description-of-development', function (req, res) {
    res.redirect(base);
  })

}