module.exports = function (router) {

  var v = "v5";
  var base = "/cst/"+v+"/";

  // Cross-check answers against the PO report

    router.post(base, function (req, res) {
      res.redirect(base+'search-results');
    })

 // added v1.5
    router.get('/cst/v5/editcase', function (req, res) {

    //  let fieldname = req.query.field
      //console.log(req.query.field)
      req.session.data['fieldName'] = req.query.field
      req.session.data['fieldValue'] = req.query.value
      req.session.data['fieldValueOld'] = req.query.value
      req.session.data['fieldType'] = req.query.type
      if (req.query.type == "date")
      {
        //req.session.data['fieldType']
        let newDate = new Date(req.query.value)
        req.session.data['fieldDate'] = newDate.getDate()
        req.session.data['fieldMonth'] = newDate.getMonth() + 1
        req.session.data['fieldYear'] = newDate.getFullYear()
        res.redirect('appeal-detail-edit-date')
        }
        else if (req.query.type == "doc") {
          req.session.data['fieldName'] = req.query.field + " - filename"
          res.redirect('appeal-detail-edit')
        }
        else {
        res.redirect('appeal-detail-edit')
      }
      // Make a variable and give it the value from 'juggling-balls'
      // var complaintType = req.session.data['is-your-complaint']
      //
      // // Check whether the variable matches a condition
      // if (complaintType == "appeal"){
      //   // Send user to next page
      //   req.session.data['complaint-description-back'] = "decision"
      //   res.redirect('/appeal-reference')
      // } else {
      //   // Send user to straight to description page
      //   req.session.data['complaint-description-back'] = "complaint-type"
      //  res.redirect('appeal-detail-edit')

    })

  router.get('/cst/v5/deldoc', function (req, res) {
      req.session.data['fieldName'] = req.query.field
      req.session.data['fieldValue'] = req.query.value
      res.redirect('del-document')

  })

  router.get('/cst/v5/editcaseinpage', function (req, res) {
      req.session.data['fieldName'] = req.query.field
      req.session.data['fieldValue'] = req.query.value
      res.redirect('appeal-details-in-page-edit')

  })



}
