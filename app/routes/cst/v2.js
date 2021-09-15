module.exports = function (router) {

  var v = "v2";
  var base = "/cst/"+v+"/";

  // Cross-check answers against the PO report

    router.post(base, function (req, res) {
      res.redirect(base+'search-results');
    })


}