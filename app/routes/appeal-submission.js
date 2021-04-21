module.exports = function (router) {

  var base = "appeal-submission"

  router.post('/'+base+'/before-you-start/householder', function (req, res) {

    if (req.session.data['appsub-bys-householder'] == "Yes"){
      res.redirect('/'+base+'/before-you-start/decisiondate');
    } else {
      res.redirect('/'+base+'/before-you-start/householder-shutter');
    }
    
  })

  router.post('/'+base+'/before-you-start/decisiondate', function (req, res) {
    res.redirect('/'+base+'/before-you-start/planningdepartment');
/*
    if (req.session.data['appsub-bys-householder'] == "Yes"){
      res.redirect('/'+base+'/before-you-start/decisiondate');
    } else {
      res.redirect('/'+base+'/before-you-start/householder-shutter');
    }
    */
  })

}