module.exports = function (router) {

  var v = "v9";
  var base = "/lpa-questionnaire/"+v+"/";
    
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

  // Security
  
    router.post(base+'security/email', function (req, res) {
      res.redirect(base+'security/sent');
    })

  // About the appeal

    router.post(base+'about-appeal/review-accuracy', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'about-appeal/conditions', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'about-appeal/other-appeals', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'about-appeal/interested-parties', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })


  // About the appeal site
  
    router.post(base+'about-appeal-site/public-land', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'about-appeal-site/enter-site', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'about-appeal-site/neighbours-land', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'about-appeal-site/health-safety', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'about-appeal-site/listed-building', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'about-appeal-site/green-belt', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'about-appeal-site/conservation-area', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })


  // Required documents
  
      router.post(base+'required-documents/upload-plans', function (req, res) {
        res.redirect(base+'task-list');
      })

      router.post(base+'required-documents/officers-report', function (req, res) {
        res.redirect(base+'task-list');
      })


  // Optional supporting documents
  
    router.post(base+'optional-supporting-documents/interested-parties', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'optional-supporting-documents/publicised', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'optional-supporting-documents/conservation-map', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'optional-supporting-documents/site-notices', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'optional-supporting-documents/representations', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'optional-supporting-documents/planning-history', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'optional-supporting-documents/statutory', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
    router.post(base+'optional-supporting-documents/relevant', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
// ************** // 
// ************** // 
// ************** //   
  
    router.post(base+'optional-supporting-documents/supplementarydocuments', function (req, res) {
      res.redirect(base+'optional-supporting-documents/supplementarydocuments-details');
    })

    router.post(base+'optional-supporting-documents/supplementarydocuments-details', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })

// ************** // 
/* Below will replace the above */
// ************** // 

    router.get(base+'optional-supporting-documents/supplementary-redirect', function (req, res) {
      // take the user to the right screen based on previous actions (if any)
      if (!req.session.data['lpaq-'+v+'supplementary-files'] || req.session.data['lpaq-'+v+'supplementary-files'].length === 0 ) {
        // if no files uploaded yet, go to upload first file
        res.redirect(base+'optional-supporting-documents/supplementary');
      } else {
        // show files that have been uploaded
        res.redirect(base+'optional-supporting-documents/supplementary-list');
      }
    })

    router.get(base+'optional-supporting-documents/supplementary-cancel', function (req, res) {
      // take the user to the right screen when cancelling an upload
      if ((!req.session.data['lpaq-'+v+'supplementary-files'])) {
        // if no files uploaded yet, go back to the task list
        res.redirect(base+'task-list');
      } else {
        // show files that have been uploaded
        res.redirect(base+'optional-supporting-documents/supplementary-list');
      }
    })

  router.post(base+'optional-supporting-documents/supplementary', function (req, res) {

    // collate all variables from form
    var newSupplementary = {
      'name': req.session.data['lpaq-'+v+'-supplementary-name'],
      'file': req.session.data['lpaq-'+v+'-supplementary-file'],
      'adopted': req.session.data['lpaq-'+v+'-supplementary-adopted'],
      'adopted_day': req.session.data['lpaq-'+v+'-supplementary-adopted-date-day'],
      'adopted_month': monthNumToFullName(req.session.data['lpaq-'+v+'-supplementary-adopted-date-month']),
      'adopted_year': req.session.data['lpaq-'+v+'-supplementary-adopted-date-year'],
      'adopted_stage': req.session.data['lpaq-'+v+'-supplementary-adopted-stage']
    }
  
    // delete form data so revisiting the upload page doesn't show stored info from last upload
    req.session.data['lpaq-'+v+'-supplementary-name'] = null
    req.session.data['lpaq-'+v+'-supplementary-file'] = null
    req.session.data['lpaq-'+v+'-supplementary-adopted'] = null
    req.session.data['lpaq-'+v+'-supplementary-adopted-date-day'] = null
    req.session.data['lpaq-'+v+'-supplementary-adopted-date-month'] = null
    req.session.data['lpaq-'+v+'-supplementary-adopted-date-year'] = null
    req.session.data['lpaq-'+v+'-supplementary-adopted-stage'] = null


    // if array doesn't exist, create it
    if (!req.session.data['lpaq-'+v+'supplementary-files']) {
      req.session.data['lpaq-'+v+'supplementary-files'] = []
    }

    // Add uploaded file info to array
    req.session.data['lpaq-'+v+'supplementary-files'].push(newSupplementary)

    // redirect to list of uploaded files
    res.redirect(base+'optional-supporting-documents/supplementary-list');
    
  })

  router.post(base+'optional-supporting-documents/supplementary-delete', function (req, res) {

    // remove item from array
    req.session.data['lpaq-'+v+'supplementary-files'].splice(req.session.data['deleterow'],1);

    // if all files removed, mark task list as not started
    if (req.session.data['lpaq-'+v+'supplementary-files'].length === 0) {
      req.session.data['lpaq-'+v+'supplementary-completed'] = "false"
    } else {
      req.session.data['lpaq-'+v+'supplementary-completed'] = "true"
    }
    
    // redirect the user to the relevant page
    res.redirect(base+'optional-supporting-documents/supplementary-redirect');
    
  })

  router.post(base+'optional-supporting-documents/supplementary-list', function (req, res) {
    if (!req.session.data['lpaq-'+v+'supplementary-files'] || req.session.data['lpaq-'+v+'supplementary-files'].length === 0) {
      req.session.data['lpaq-'+v+'supplementary-completed'] = "false"
    } else {
      req.session.data['lpaq-'+v+'supplementary-completed'] = "true"
    }
    if (req.session.data['lpaq-'+v+'-checkyouranswers']){
      res.redirect(base+'check-your-answers');
    } else {
      res.redirect(base+'task-list');
    }
  })

// ************** // 
// ************** // 
// ************** // 
  
    router.post(base+'optional-supporting-documents/development-plan', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })


  // Check your answers
  
    router.get(base+'goto-check-your-answers', function (req, res) {
      req.session.data['lpaq-'+v+'-checkyouranswers'] = "true";
      res.redirect(base+'check-your-answers');
    })

    
  // Jump to completed task list

    router.get(base+'jump/tasks-complete', function (req, res) {

      // About the appeal answers
      req.session.data['lpaq-'+v+'-aboutappeal-accurate'] = "No"
      req.session.data['lpaq-'+v+'-aboutappeal-accurate-whynot'] = "A reason as to why the information doesn't accurately reflect the original planning application."
      req.session.data['lpaq-'+v+'-aboutappeal-conditions'] = "Yes"
      req.session.data['lpaq-'+v+'-aboutappeal-conditions-listconditions'] = "There are a few extra conditions that will be listed here"
      req.session.data['lpaq-'+v+'-aboutappeal-otherappeals'] = "Yes"
      req.session.data['lpaq-'+v+'-aboutappeal-otherappeals-listappeals'] = "654654, 987987, 321321"
      req.session.data['lpaq-'+v+'-aboutappeal-interestedparties'] = "No"

      //About the appeal site answers
      req.session.data['lpaq-'+v+'-aboutappealsite-publicland'] = "No"
      req.session.data['lpaq-'+v+'-aboutappealsite-entersite'] = "Yes"
      req.session.data['lpaq-'+v+'-aboutappealsite-entersite-telluswhy'] = "There's a 60ft wall that you can't peek over"
      req.session.data['lpaq-'+v+'-aboutappealsite-neighboursland'] = "Yes"
      req.session.data['lpaq-'+v+'-aboutappealsite-neighboursland-telluswhy'] = "22 Argyll Street. Maidstone. This is a reason why you think a visit is required."
      req.session.data['lpaq-'+v+'-aboutappealsite-healthsafety'] = "Yes"
      req.session.data['lpaq-'+v+'-aboutappealsite-healthsafety-telluswhy'] = "PPE needed and there is livestock."
      req.session.data['lpaq-'+v+'-aboutappealsite-listedbuilding'] = "Yes"
      req.session.data['lpaq-'+v+'-aboutappealsite-listedbuilding-telluswhy'] = "This is the relevant listing description from the List of Buildings of Special Architectural or Historic Interest"
      req.session.data['lpaq-'+v+'-aboutappealsite-greenbelt'] = "No"
      req.session.data['lpaq-'+v+'-aboutappealsite-conservationarea'] = "No"
      
      // About the planning application answers
      req.session.data['lpaq-'+v+'-aboutplanningapplication-uploadplans'] = "uploaded"
      req.session.data['lpaq-'+v+'-aboutplanningapplication-officersreport'] = "uploaded"
      req.session.data['lpaq-'+v+'-aboutplanningapplication-sitenotices'] = "No"
      req.session.data['lpaq-'+v+'-aboutplanningapplication-interestedparties'] = "uploaded"
      req.session.data['lpaq-'+v+'-aboutplanningapplication-representations'] = "uploaded"
      req.session.data['lpaq-'+v+'-aboutplanningapplication-planninghistory'] = "uploaded"
      
      // Policies related to the planning application answers (blank as optional)
      req.session.data['lpaq-'+v+'-relatedpolicies-statutory'] = ""
      req.session.data['lpaq-'+v+'-relatedpolicies-relevant'] = ""
      req.session.data['lpaq-'+v+'-relatedpolicies-developmentplan'] = ""

      req.session.data['lpaq-'+v+'supplementary-files'] = []
      var setupSupplementary1 = {
        'name': "County Council Rights of Way",
        'file': null,
        'adopted': "yes",
        'adopted_day': "21",
        'adopted_month': monthNumToFullName("10"),
        'adopted_year': "2007",
        'adopted_stage': null
      }
      var setupSupplementary2 = {
        'name': "County Council Highways",
        'file': null,
        'adopted': "no",
        'adopted_day': null,
        'adopted_month': null,
        'adopted_year': null,
        'adopted_stage': "Final draft"
      }
      req.session.data['lpaq-'+v+'supplementary-files'].push(setupSupplementary1)
      req.session.data['lpaq-'+v+'supplementary-files'].push(setupSupplementary2)

      // Show Check your answers
      res.redirect(base+'goto-check-your-answers');
    })

}