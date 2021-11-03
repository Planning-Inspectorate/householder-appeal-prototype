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

    if (req.session.data["validation-"+v+"-outcome"] == "Something is missing or wrong"){

      reasonsWhy = req.session.data["validation-"+v+"-wrong-reasons"];
      if (Array.isArray(reasonsWhy)){
        reasonsWhy.forEach( item => {
          req.session.data["validationAppeals"][objIndex].reasonsIncomplete.push(item);
        });
      } else {
        req.session.data["validationAppeals"][objIndex].reasonsIncomplete.push(reasonsWhy);
      }

      reasonsWhyMissing = req.session.data["validation-"+v+"-wrong-reasons-missing"];
      if (Array.isArray(reasonsWhyMissing)){
        reasonsWhyMissing.forEach( item => {
          req.session.data["validationAppeals"][objIndex].reasonsIncompleteMissing.push(item);
        });
      } else {
        req.session.data["validationAppeals"][objIndex].reasonsIncompleteMissing.push(reasonsWhyMissing);
      }
      req.session.data["validationAppeals"][objIndex].reasonsIncompleteOther = req.session.data["validation-"+v+"-wrong-other"];

    }

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

  router.post(base+'change/planning-application', function (req, res) {
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));
    req.session.data["validationAppeals"][objIndex].planningApplicationForm = req.session.data["validation-"+v+"-change-planningapplication"];
    res.redirect(base+'appeal-review');
  })

  router.post(base+'change/decision-letter', function (req, res) {
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));
    req.session.data["validationAppeals"][objIndex].decisionLetter = req.session.data["validation-"+v+"-change-decisionletter"];
    res.redirect(base+'appeal-review');
  })

  router.post(base+'change/appeal-statement', function (req, res) {
    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));
    req.session.data["validationAppeals"][objIndex].appealStatement = req.session.data["validation-"+v+"-change-appealstatement"];
    res.redirect(base+'appeal-review');
  })

  router.post(base+'change/supporting-documents', function (req, res) {

    objIndex = req.session.data["validationAppeals"].findIndex((obj => obj.ref == req.session.data["validation-"+v+"-currentappeal"]));

    newSupportingDocs = req.session.data["validation-"+v+"-change-supportingdocuments"];

    if (Array.isArray(newSupportingDocs)){
      newSupportingDocs.forEach( item => {
        req.session.data["validationAppeals"][objIndex].supportingDocuments.push(item);
      });
    } else {
      req.session.data["validationAppeals"][objIndex].supportingDocuments.push(newSupportingDocs);
    }

    res.redirect(base+'appeal-review');
  })

/*
  router.post(base+'change/reasons-incomplete', function (req, res) {

    res.redirect(base+'appeal-review');
  })
*/
  router.post(base+'appeal-change-outcome', function (req, res) {

    if (req.session.data['validation-'+v+'-outcome'] == "Valid"){
      res.redirect(base+"outcome-valid");
    }
    if (req.session.data['validation-'+v+'-outcome'] == "Invalid"){
      res.redirect(base+'outcome-invalid');
    }

  })
  
}