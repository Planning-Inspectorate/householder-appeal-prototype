module.exports = function (router) {

  var base = "/standalone/as-2078/"
    
  var months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
    ];
  var fullmonths = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

    function monthNumToName(monthnum) {
      return months[monthnum - 1] || '';
    }
    function monthNumToFullName(monthnum) {
      return fullmonths[monthnum - 1] || '';
    }

    router.get(base+'supplementary-redirect', function (req, res) {
      // take the user to the right screen based on previous actions (if any)
      if (!req.session.data['as2078-files'] || req.session.data['as2078-files'].length === 0 ) {
        // if no files uploaded yet, go to upload first file
        res.redirect(base+'supplementary');
      } else {
        // show files that have been uploaded
        res.redirect(base+'supplementary-list');
      }
    })

    router.get(base+'supplementary-cancel', function (req, res) {
      // take the user to the right screen when cancelling an upload
      if ((!req.session.data['as2078-files'])) {
        // if no files uploaded yet, go back to the task list
        res.redirect(base+'lpa-task-list');
      } else {
        // show files that have been uploaded
        res.redirect(base+'supplementary-list');
      }
    })

  router.post(base+'supplementary', function (req, res) {

    // collate all variables from form
    var newSupplementary = {
      'name': req.session.data['as2078-supplementary-name'],
      'file': req.session.data['as2078-supplementary-file'],
      'adopted': req.session.data['as2078-supplementary-adopted'],
      'adopted_day': req.session.data['as2078-supplementary-adopted-date-day'],
      'adopted_month': monthNumToFullName(req.session.data['as2078-supplementary-adopted-date-month']),
      'adopted_year': req.session.data['as2078-supplementary-adopted-date-year'],
      'adopted_stage': req.session.data['as2078-supplementary-adopted-stage']
    }
  
    // delete form data so revisiting the upload page doesn't show stored info from last upload
    req.session.data['as2078-supplementary-name'] = null
    req.session.data['as2078-supplementary-file'] = null
    req.session.data['as2078-supplementary-adopted'] = null
    req.session.data['as2078-supplementary-adopted-date-day'] = null
    req.session.data['as2078-supplementary-adopted-date-month'] = null
    req.session.data['as2078-supplementary-adopted-date-year'] = null
    req.session.data['as2078-supplementary-adopted-stage'] = null


    // if array doesn't exist, create it
    if (!req.session.data['as2078-files']) {
      req.session.data['as2078-files'] = []
    }

    // Add uploaded file info to array
    req.session.data['as2078-files'].push(newSupplementary)

    // redirect to list of uploaded files
    res.redirect(base+'supplementary-list');
    
  })

  router.post(base+'delete', function (req, res) {

    // remove item from array
    req.session.data['as2078-files'].splice(req.session.data['deleterow'],1);

    // if all files removed, mark task list as not started
    if (req.session.data['as2078-files'].length === 0) {
      req.session.data['supplementary-completed'] = "govuk-tag govuk-tag--grey app-task-list__tag"
      req.session.data['supplementary-completed-text'] = "Not started"
    }
    
    // redirect the user to the relevant page
    res.redirect(base+'supplementary-redirect');
    
  })


}