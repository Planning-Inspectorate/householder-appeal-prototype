module.exports = function (router) {

  var v = "v9";
  var base = "/eligibility/"+v+"/";

  // Question 1
    router.post(base+'planning-department', function (req, res) {
      if (
        // Check if selected LPA key aligns to allowed LPA in local-authority-eng.json
        // Current LPAs:
        //  - BRD (City of Bradford Metropolitan District Council)
        //  - HIL (London Borough of Hillingdon)
        //  - HAG (Harrogate Borough Council)
        req.session.data["eligibility-"+v+"-planningdepartment"] == "BRD" ||
        req.session.data["eligibility-"+v+"-planningdepartment"] == "HIL" ||
        req.session.data["eligibility-"+v+"-planningdepartment"] == "HAG"
      ){
        res.redirect(base+'what-are-you-appealing');
      } else {
        res.redirect(base+'shutter/appeal-type-not-supported');
      }
    })

  router.post(base+'what-are-you-appealing', function (req, res) {
    if (req.session.data["eligibility-"+v+"-whatareyouappealing"] == "Full planning" || req.session.data["eligibility-"+v+"-whatareyouappealing"] == "Householder planning"){
      res.redirect(base+'major-planning-related');
    } else {
      res.redirect(base+'shutter/appeal-type-not-supported');
    }
  })

  router.post(base+'major-planning-related', function (req, res) {
    if (req.session.data["eligibility-"+v+"-majorplanningrelated"].includes("None of the above")){
      res.redirect(base+'planning-department');
    } else {
      res.redirect(base+'shutter/appeal-type-not-supported');
    }
  })

  router.post(base+'written-representations', function (req, res) {
    if (req.session.data["eligibility-"+v+"-writtenrepresentations"] == "Yes"){
      //res.redirect(base+'major-planning-related');
    } else {
      res.redirect(base+'shutter/appeal-type-not-supported');
    }
  })


}