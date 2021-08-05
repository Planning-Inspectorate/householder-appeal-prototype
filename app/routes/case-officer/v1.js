module.exports = function (router) {

  var v = "v1";
  var base = "/case-officer/"+v+"/";

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


  // Site visit details

    router.post(base+'site-visit/appeal-site', function (req, res) {
      res.redirect(base+'task-list');
    })


  // Notices to interested parties

    router.post(base+'notices/original-application', function (req, res) {
      res.redirect(base+'task-list');
    })
    
    router.post(base+'notices/about-appeal', function (req, res) {
      res.redirect(base+'task-list');
    })

}