module.exports = function (router) {

  var base = "/lpa-questionnaire/v8/";
  var v = "v8";

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
  
    router.post(base+'optional-supporting-documents/supplementaryplanning', function (req, res) {
      res.redirect(base+'optional-supporting-documents/supplementaryplanning-details');
    })
  
    router.post(base+'optional-supporting-documents/supplementaryplanning-details', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })
  
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

      //Abbout the appeal site answers
      req.session.data['lpaq-'+v+'-aboutappealsite-publicland'] = "No"
      req.session.data['lpaq-'+v+'-aboutappealsite-entersite'] = "Yes"
      req.session.data['lpaq-'+v+'-aboutappealsite-entersite-telluswhy'] = "There's a 60ft wall that you can't peek over"
      req.session.data['lpaq-'+v+'-aboutappealsite-neighboursland'] = "Yes"
      req.session.data['lpaq-'+v+'-aboutappealsite-neighboursland-telluswhy'] = "22 Argyll Street. Maidstone. This is a reason why you think a visit is required."
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

      // Show Check your answers
      res.redirect(base+'goto-check-your-answers');
    })

}