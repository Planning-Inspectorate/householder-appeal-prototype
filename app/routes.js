const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router

router.post('/lpa-decision-check', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let lpa = req.session.data['lpa-decision']

  if (lpa === 'no') {
    res.redirect('/lpa-details-decision-error')
  } else {
    res.redirect('/upload-decision')
  }
})

router.post('/site-ownership-check', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/site-ownership-certb')
  } else {
    res.redirect('/index')
  }
})

router.post('/agricultural-check', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let holding = req.session.data['agri-holding']

  if (holding === 'yes') {
    res.redirect('/agricultural-ownership')
  } else {
    res.redirect('/index')
  }
})

router.post('/agricultural-ownership-check', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let holding2 = req.session.data['agri-holding-2']

  if (holding2 === 'no') {
    res.redirect('/notification-agriculture')
  } else {
    res.redirect('/index')
  }
})

router.post('/submission-check', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let agreed = req.session.data['appellant-confirmation']

  if (agreed === 'no') {
    res.redirect('/submission-error')
  } else {
    res.redirect('/confirmation')
  }
})