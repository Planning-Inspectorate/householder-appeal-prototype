module.exports = function (router) {

  var base = "/lpa-questionnaire/v8/";

  router.post(base+'security/email', function (req, res) {
    res.redirect(base+'security/passcode');
  })

  router.post(base+'security/passcode', function (req, res) {
    res.redirect(base+'task-list');
  })

  // About the appeal

    router.post(base+'about-the-appeal/review-accuracy', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'about-the-appeal/conditions', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'about-the-appeal/other-appeals', function (req, res) {
      res.redirect(base+'task-list');
    })

    router.post(base+'about-the-appeal/interested-parties', function (req, res) {
      res.redirect(base+'task-list');
    })

}