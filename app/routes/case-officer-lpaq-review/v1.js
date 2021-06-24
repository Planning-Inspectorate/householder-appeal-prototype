module.exports = function (router) {

  var v = "v1";
  var base = "/case-officer-lpaq-review/"+v+"/";

  // Cross-check answers against the PO report

    router.post(base+'po-report/conservation-area', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'po-report/listed-building', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'po-report/green-belt', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'po-report/interested-parties', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'po-report/plans-used', function (req, res) {
      res.redirect(base+'task-list');
    })

}