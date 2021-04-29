module.exports = function (router) {

  var base = "/standalone/appeal-submission-security/";

  router.post(base+'who-are-you', function (req, res) {
    res.redirect(base+'your-name');
  })

  router.post(base+'your-name', function (req, res) {
    res.redirect(base+'your-email');
  })

  router.post(base+'your-email', function (req, res) {
    res.redirect(base+'passcode');
  })

  router.post(base+'passcode', function (req, res) {
    res.redirect(base+'email-confirmed');
  })
/*
  router.post(base+'security/passcode', function (req, res) {
    res.redirect(base+'task-list');
  })
*/
}