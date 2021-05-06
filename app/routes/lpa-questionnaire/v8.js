module.exports = function (router) {

  var base = "/lpa-questionnaire/v8/";

  // Security - not required for v8
  /*
    router.post(base+'security/email', function (req, res) {
      res.redirect(base+'security/passcode');
    })

    router.post(base+'security/passcode', function (req, res) {
      res.redirect(base+'task-list');
    })
  */


  // About the appeal

    router.post(base+'about-appeal/review-accuracy', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'about-appeal/conditions', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'about-appeal/other-appeals', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'about-appeal/interested-parties', function (req, res) {
      res.redirect(base+'task-list');
    })


  // About the appeal site
  
    router.post(base+'about-appeal-site/public-land', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-appeal-site/enter-site', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-appeal-site/neighbours-land', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-appeal-site/listed-building', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-appeal-site/green-belt', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-appeal-site/conservation-area', function (req, res) {
      res.redirect(base+'task-list');
    })


  // About the planning application
  
    router.post(base+'about-planning-application/upload-plans', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-planning-application/officers-report', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-planning-application/site-notices', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-planning-application/interested-parties', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-planning-application/representations', function (req, res) {
      res.redirect(base+'task-list');
    })
  
    router.post(base+'about-planning-application/planning-history', function (req, res) {
      res.redirect(base+'task-list');
    })

}