module.exports = function (router) {

  var v = "v5";
  var base = "/case-officer/"+v+"/";

  // Cross-check answers against the PO report

    router.post(base+'review-questionnaire/review', function (req, res) {
      if ((req.session.data["lpaqreview-"+v+"-about-entersite"]) ||
          (req.session.data["lpaqreview-"+v+"-about-neighboursland"]) ||
          (req.session.data["lpaqreview-"+v+"-about-listedbuilding"]) ||
          (req.session.data["lpaqreview-"+v+"-about-greenbelt"]) ||
          (req.session.data["lpaqreview-"+v+"-about-conservationarea"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-plansused"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-poreport"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-telling"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-representations"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-notifying"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-publicised"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-conservationarea"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-sitenotices"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-statutory"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-otherrelevant"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-supplementary"]) ||
          (req.session.data["lpaqreview-"+v+"-docs-developmentplan"]))
      {
        req.session.data["lpaqreview-"+v+"-outcome"] = "incomplete"
      } else {
        req.session.data["lpaqreview-"+v+"-outcome"] = "complete"
      }  
      res.redirect(base+'review-questionnaire/check');
    })

}