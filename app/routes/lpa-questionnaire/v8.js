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
      res.redirect(base+'task-list#aboutappeal-accurate');
    })

    router.post(base+'about-appeal/conditions', function (req, res) {
      res.redirect(base+'task-list#aboutappeal-conditions');
    })

    router.post(base+'about-appeal/other-appeals', function (req, res) {
      res.redirect(base+'task-list#aboutappeal-otherappeals');
    })

    router.post(base+'about-appeal/interested-parties', function (req, res) {
      res.redirect(base+'task-list#aboutappeal-interestedparties');
    })


  // About the appeal site
  
    router.post(base+'about-appeal-site/public-land', function (req, res) {
      res.redirect(base+'task-list#aboutappealsite-publicland');
    })
  
    router.post(base+'about-appeal-site/enter-site', function (req, res) {
      res.redirect(base+'task-list#aboutappealsite-entersite');
    })
  
    router.post(base+'about-appeal-site/neighbours-land', function (req, res) {
      res.redirect(base+'task-list#aboutappealsite-neighboursland');
    })
  
    router.post(base+'about-appeal-site/listed-building', function (req, res) {
      res.redirect(base+'task-list#aboutappealsite-listedbuilding');
    })
  
    router.post(base+'about-appeal-site/green-belt', function (req, res) {
      res.redirect(base+'task-list#aboutappealsite-greenbelt');
    })
  
    router.post(base+'about-appeal-site/conservation-area', function (req, res) {
      res.redirect(base+'task-list#aboutappealsite-conservationarea');
    })


  // About the planning application
  
    router.post(base+'about-planning-application/upload-plans', function (req, res) {
      res.redirect(base+'task-list#aboutplanningapplication-uploadplans');
    })
  
    router.post(base+'about-planning-application/officers-report', function (req, res) {
      res.redirect(base+'task-list#aboutplanningapplication-officersreport');
    })
  
    router.post(base+'about-planning-application/site-notices', function (req, res) {
      res.redirect(base+'task-list#aboutplanningapplication-sitenotices');
    })
  
    router.post(base+'about-planning-application/interested-parties', function (req, res) {
      res.redirect(base+'task-list#aboutplanningapplication-interestedparties');
    })
  
    router.post(base+'about-planning-application/representations', function (req, res) {
      res.redirect(base+'task-list#aboutplanningapplication-representations');
    })
  
    router.post(base+'about-planning-application/planning-history', function (req, res) {
      res.redirect(base+'task-list#aboutplanningapplication-planninghistory');
    })


    // Policies related to the planning application
    
      router.post(base+'related-policies/statutory', function (req, res) {
        res.redirect(base+'task-list#relatedpolicies-statutory');
      })
    
      router.post(base+'related-policies/relevant', function (req, res) {
        res.redirect(base+'task-list#relatedpolicies-relevant');
      })
    
      router.post(base+'related-policies/development-plan', function (req, res) {
        res.redirect(base+'task-list#relatedpolicies-developmentplan');
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
          res.redirect(base+'check-your-answers');
        })

}