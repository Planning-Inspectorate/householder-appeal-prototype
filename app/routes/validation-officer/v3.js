module.exports = function (router) {

  var v = "v3";
  var base = "/validation-officer/"+v+"/";

  
  router.get(base+'goto-appeal/:ref', function (req, res, next) {

    // find matching ref in validationAppeals
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.params.ref));

    // mark appeal as viewed
    //req.session.data["availableAppeals"][objIndex].viewed = "yes"

    // Store the selected ref in a session variable 
    req.session.data["validation-"+v+"-currentappeal"] = req.params.ref;
    
    res.redirect(base+'appeal-review');

  })


  router.post(base+'appeal-review', function (req, res) {

    if (req.session.data['validation-'+v+'-outcome'] == "Valid"){
      res.redirect(base+"outcome-valid");
    }
    if (req.session.data['validation-'+v+'-outcome'] == "Invalid"){
      res.redirect(base+'outcome-invalid');
    }
    if (req.session.data['validation-'+v+'-outcome'] == "Something is missing or wrong"){
      res.redirect(base+'outcome-incomplete');
    }

  })


  router.post(base+'outcome-valid', function (req, res) {
    res.redirect(base+'check-confirm');
  })
  router.post(base+'outcome-invalid', function (req, res) {
    res.redirect(base+'check-confirm');
  })
  router.post(base+'outcome-incomplete', function (req, res) {
    res.redirect(base+'check-confirm');
  })


  router.post(base+'check-confirm', function (req, res) {
    
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));

    req.session.data["validationAppeals"][objIndex].status = req.session.data["validation-"+v+"-outcome"];

    delete req.session.data["validation-"+v+"-outcome"];
    delete req.session.data["validation-"+v+"-descriptionofdevelopment"];

    res.redirect(base+'confirmation');

  })

  
  router.post(base+'change/appellant-name', function (req, res) {
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));
    req.session.data["validationAppeals"][objIndex].appellantName = req.session.data["validation-"+v+"-change-appellantname"];
    res.redirect(base+'appeal-review');
  })

  router.post(base+'change/appeal-site', function (req, res) {
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));
    req.session.data["validationAppeals"][objIndex].addressLine1 = req.session.data["validation-"+v+"-change-address-line1"];
    req.session.data["validationAppeals"][objIndex].addressLine2 = req.session.data["validation-"+v+"-change-address-line2"];
    req.session.data["validationAppeals"][objIndex].addressTown = req.session.data["validation-"+v+"-change-address-town"];
    req.session.data["validationAppeals"][objIndex].addressCounty = req.session.data["validation-"+v+"-change-address-county"];
    req.session.data["validationAppeals"][objIndex].postcode = req.session.data["validation-"+v+"-change-address-postcode"];
    res.redirect(base+'appeal-review');
  })

  router.post(base+'change/lpa', function (req, res) {
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));
    req.session.data["validationAppeals"][objIndex].lpa = req.session.data["validation-"+v+"-change-lpa"];
    res.redirect(base+'appeal-review');
  })

  router.post(base+'change/planning-application-ref', function (req, res) {
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));
    req.session.data["validationAppeals"][objIndex].planningApplicationRef = req.session.data["validation-"+v+"-change-planningapplicationref"];
    res.redirect(base+'appeal-review');
  })


/*
  router.post(base+'review-appeal', function (req, res) {
    if (req.session.data['vo-'+v+'-status'] == "Valid"){
      res.redirect(base+'valid-details');
    }
    if (req.session.data['vo-'+v+'-status'] == "Invalid"){
      res.redirect(base+'invalid-details');
    }
    if (req.session.data['vo-'+v+'-status'] == "Something is missing or wrong"){
      res.redirect(base+'wrong-details');
    }
  })

  router.post(base+'valid-details', function (req, res) {
    res.redirect(base+'valid-review');
  })

  router.post(base+'invalid-details', function (req, res) {
    res.redirect(base+'invalid-review');
  })

  router.post(base+'wrong-details', function (req, res) {
    res.redirect(base+'wrong-review');
  })

  router.post(base+'wrong-review', function (req, res) {
    if (req.session.data['vo-'+v+'-wrong-completed'] == "completed"){
      res.redirect(base+'wrong-complete');
    } else {
      res.redirect(base+'wrong-review-error');
    }
  })

  router.post(base+'wrong-review-error', function (req, res) {
    if (req.session.data['vo-'+v+'-wrong-completed'] == "completed"){
      res.redirect(base+'wrong-complete');
    } else {
      res.redirect(base+'wrong-review-error');
    }
  })
*/
  
}