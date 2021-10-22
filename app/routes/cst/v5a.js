module.exports = function (router) {

  var v = "v5a";
  var base = "/cst/"+v+"/";
    
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


  router.post(base+'edit/supplementary-planning-documents-add', function (req, res) {

    // collate all variables from form
    var newSupplementary = {
      'name': req.session.data['cst-'+v+'-supplementary-name'],
      'file': req.session.data['cst-'+v+'-supplementary-file'],
      'adopted': req.session.data['cst-'+v+'-supplementary-adopted'],
      'adopted_day': req.session.data['cst-'+v+'-supplementary-adopted-date-day'],
      'adopted_month':req.session.data['cst-'+v+'-supplementary-adopted-date-month'],
      'adopted_year': req.session.data['cst-'+v+'-supplementary-adopted-date-year'],
      'adopted_stage': req.session.data['cst-'+v+'-supplementary-adopted-stage']
    }
  
    // delete form data so revisiting the upload page doesn't show stored info from last upload
    req.session.data['cst-'+v+'-supplementary-name'] = null
    req.session.data['cst-'+v+'-supplementary-file'] = null
    req.session.data['cst-'+v+'-supplementary-adopted'] = null
    req.session.data['cst-'+v+'-supplementary-adopted-date-day'] = null
    req.session.data['cst-'+v+'-supplementary-adopted-date-month'] = null
    req.session.data['cst-'+v+'-supplementary-adopted-date-year'] = null
    req.session.data['cst-'+v+'-supplementary-adopted-stage'] = null

    // if array doesn't exist, create it
    if (!req.session.data['cst-'+v+'-files-supplementary']) {
      req.session.data['cst-'+v+'-files-supplementary'] = []
    }

    // Add uploaded file info to array
    req.session.data['cst-'+v+'-files-supplementary'].push(newSupplementary)

    // redirect to list of uploaded files
    res.redirect(base+'edit/supplementary-planning-documents');
    
  })


  router.post(base+'edit/supplementary-planning-documents-change', function (req, res) {

    req.session.data['cst-'+v+'-files-supplementary'][req.session.data['row']-1]['name'] = req.session.data['cst-'+v+'-supplementary-name']

    req.session.data['cst-'+v+'-files-supplementary'][req.session.data['row']-1]['adopted'] = req.session.data['cst-'+v+'-supplementary-adopted']

    req.session.data['cst-'+v+'-files-supplementary'][req.session.data['row']-1]['adopted_day'] = req.session.data['cst-'+v+'-supplementary-adopted-date-day']

    req.session.data['cst-'+v+'-files-supplementary'][req.session.data['row']-1]['adopted_month'] = req.session.data['cst-'+v+'-supplementary-adopted-date-month']

    req.session.data['cst-'+v+'-files-supplementary'][req.session.data['row']-1]['adopted_year'] = req.session.data['cst-'+v+'-supplementary-adopted-date-year']

    req.session.data['cst-'+v+'-files-supplementary'][req.session.data['row']-1]['adopted_stage'] = req.session.data['cst-'+v+'-supplementary-adopted-stage']
  
    // delete form data so revisiting the upload page doesn't show stored info from last upload
    req.session.data['cst-'+v+'-supplementary-name'] = null
    req.session.data['cst-'+v+'-supplementary-adopted'] = null
    req.session.data['cst-'+v+'-supplementary-adopted-date-day'] = null
    req.session.data['cst-'+v+'-supplementary-adopted-date-month'] = null
    req.session.data['cst-'+v+'-supplementary-adopted-date-year'] = null
    req.session.data['cst-'+v+'-supplementary-adopted-stage'] = null

    // redirect to list of uploaded files
    res.redirect(base+'edit/supplementary-planning-documents');

  })

}