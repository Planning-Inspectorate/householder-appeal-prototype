

const express = require('express')
const router = express.Router()


const fs = require('fs');
const request = require('request');

const moment = require("moment");

const axios = require("axios");
const idoxScraperUrl = process.env.IDOX_SCRAPER_URL;

// Add your routes here - above the module.exports line

// SUBMISSION - APPEAL STATEMENT
router.post('/check-statement', function (req, res) {
  let sense = req.session.data['sense-check']

  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/appellant-submission/supporting-documents')
  } else {
    res.redirect('/appellant-submission/appeal-statement-error')
  }
})

// SUBMISSION - SITE OWNERSHIP
router.post('/check-site-ownership', function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/appellant-submission/site-ownership-certb')
  } else {
    res.redirect('/appellant-submission/site-access')
  }
})


// SUBMISSION - SUBMISSION
router.post('/check-submission', function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/appellant-submission/confirmation')
  } else {
    res.redirect('/appellant-submission/submission-error')
  }
})



router.post('/who-are-you-post', function (req, res) {
  let user = req.session.data['who-are-you']

  if (user == "agent" || user == "applicant") {
    res.redirect('/appellant-submission/your-details')
  } else {
    res.redirect('/appellant-submission/who-are-you')
  }
})



///////////////////////////////////////////////////////////////

router.post('/check-lpa-section2', function (req, res) {
  let conservation = req.session.data['citizenship-conditional-3']

  if (Array.isArray(conservation) && conservation[0] === 'on') {
    res.redirect('/lpa-submission/conservation-publicity')
  } else {
    res.redirect('/lpa-submission/lpa-task-list')
  }
})

router.post('/appellant-submission-check', function (req, res) {
  let accuracy = req.session.data['is-accurate']

  if (accuracy === 'yes') {
    res.redirect('/lpa-submission/conditions')
  }  else {
    res.redirect('/lpa-submission/appellant-submission-error')
  }
})


router.post('/site-notice-post', function (req, res) {
  let publicised = req.session.data['was-publicised']

  if (publicised == "true") {
    res.redirect('/lpa-submission/site-notice-documents')
  } else {
    res.redirect('/lpa-submission/lpa-task-list-complete')
  }
})


router.post('/check-conservation', function (req, res) {
  let conservationupload = req.session.data['is-accurate']

  if (conservationupload == "yes") {
    res.redirect('/lpa-submission/conservation-publicity-upload')
  } else {
    res.redirect('/lpa-submission/lpa-task-list')
  }
})


//autocomplete

const localCouncils = require("./data/local-authority-eng.json");
const planningApplications = require("./data/planning-applications.json");


function sortByProperty(property){
   return function(a,b){
      if(a[property] > b[property])
         return 1;
      else if(a[property] < b[property])
         return -1;

      return 0;
   }
}


router.all("/components/select-council", function(req,res,next){
  const url = "https://local-authority-eng.register.gov.uk/records.json";

  fs.readFile(__basedir + "/app/data/local-authority-eng.json", function(err, data){
    res.locals.councils = localCouncils.sort(sortByProperty("name"));
    next()
      
  });

  
});  




router.post("/components/search-council/results", function(req, res, next){
  let postcode = req.body.postcode.replace(/ /g,'');

  request.get("https://api.postcodes.io/postcodes/" + postcode, (error, response, body) => {
     let json = JSON.parse(body);

  
    if(json.status === 200){
      res.locals.councilName = json.result.admin_district;
      res.render("components/search-council/results");
    } else {
      console.log(json.status);
      console.log(json.error);
      res.locals.councilName = json.error;
      res.render("components/search-council/results");
    }
    
  });
});

router.post('/eligibility/decision-date-post', function (req, res) {
  let day = req.session.data['decision-date-day'],
      month = req.session.data['decision-date-month'],
      year = req.session.data['decision-date-year'];
   if(!day || !month  || !year) {
     res.redirect('/eligibility/decision-date-error')
   }

  let date = moment(`${year}-${month}-${day}`, "Y-M-D", true);

  console.log(date.isValid());

  if(date.isValid() === false){
    res.redirect('/eligibility/decision-date-error')
  } else{
    let checkDate = date.add(12, "weeks");
    let today = moment();
    if(checkDate.isBefore(today, "days")){

      req.session.data.deadlineDate = checkDate.format("D MMMM YYYY");
      res.redirect('/eligibility/decision-date-out')
    } else {
      res.redirect('/eligibility/planning-department')
    }
  } 

  
})

router.post('/appellant-submission/decision-date-post', function (req, res) {
  let day = req.session.data['decision-date-day'],
      month = req.session.data['decision-date-month'],
      year = req.session.data['decision-date-year'];
   if(!day || !month  || !year) {
     res.redirect('/appellant-submission/decision-date-error')
   }

  let date = moment(`${year}-${month}-${day}`, "Y-M-D", true);

  console.log(date.isValid());

  if(date.isValid() === false){
    res.redirect('/appellant-submission/decision-date-error')
  } else{
    let checkDate = date.add(12, "weeks");
    let today = moment();
    if(checkDate.isBefore(today, "days")){

      req.session.data.deadlineDate = checkDate.format("D MMMM YYYY");
      res.redirect('/appellant-submission/decision-date-out')
    } else {
      res.redirect('/appellant-submission/planning-department')
    }
  } 

  
})

router.all('/eligibility/planning-department', function(req,res,next){
  
  res.locals.councils = localCouncils.sort(sortByProperty("name"));
  
  next()
  
});

router.all('/appellant-submission/planning-department', function(req,res,next){
  
  res.locals.councils = localCouncils.sort(sortByProperty("name"));
  
  next()
  
});  


router.post('/eligibility/listed-building-post', function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/eligibility/appeal-statement')
  } else if (haslisted === 'yes') {
    res.redirect('/eligibility/listed-out')
  } else {
    res.redirect('/submit-appeal/planning-number')
  }
})

router.post('/appellant-submission/listed-building-post', function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/appellant-submission/appeal-statement-info')
  } else if (haslisted === 'yes') {
    res.redirect('/appellant-submission/listed-out')
  } else {
    res.redirect('/appellant-submission/listed-building')
  }
})


router.post('/eligibility/planning-department-post', function(req, res, next){
  let redirectUrl = req.session.data["idox-prototype-url"];
  let dept = req.body['planning-department'];
  console.log(dept)
  if(dept === 'SGC') {
    req.session.data.planningError = false;
    res.redirect('/submit-appeal/planning-number')
  } else if (dept === ""){
    req.session.data.planningError = true;
    res.redirect('/eligibility/planning-department')
  } else {
    req.session.data.planningError = false;
    res.redirect('/eligibility/planning-department-out')
  }
})

router.post('/appellant-submission/planning-department-post', function(req, res, next){
  let redirectUrl = req.session.data["idox-prototype-url"];
  let dept = req.body['planning-department'];
  console.log(dept)
  if(dept === 'SGC') {
    req.session.data.planningError = false;
    res.redirect('/appellant-submission/listed-building')
  } else if (dept === ""){
    req.session.data.planningError = true;
    res.redirect('/appellant-submission/planning-department')
  } else {
    req.session.data.planningError = false;
    res.redirect('/appellant-submission/planning-department-out')
  }
})

router.post("/submit-appeal/planning-number-post", function(req, res, next){

  let caseref = req.body.caseref.replace(/\s/g, '').toUpperCase();


  if(planningApplications.some(item => item.Reference.toUpperCase() === caseref)){
    req.session.data.planningDetails = planningApplications.find(item => item.Reference.toUpperCase() === caseref);
    console.log(req.session.data.planningDetails)
    res.redirect("/submit-appeal/appeal-details")
  } else {
    res.redirect("/submit-appeal/reference-number-not-found")
  }
  

  
})


let planningDetails;

router.post("/submit-appeal/planning-number-post-2", function(req, res, next){

  planningDetails = undefined;

  axios.get(idoxScraperUrl + '/api/v1/lpalookup', {
    params: {
      caseref: req.body.caseref
    }
  })
  .then(function (response) {
    // handle success
    planningDetails = response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    planningDetails = {
      error: error
    }
  })

  res.redirect('/submit-appeal/postcode')

  
})


router.post("/submit-appeal/postcode-post-ajax", function(req, res, next){
  //BS34 8PP
  var timesRun = 0;
  let checkResponse = function(){
    console.log(planningDetails);

    try{
      if(planningDetails.error){
        clearInterval(interval);
        res.send({
          redirect: "/submit-appeal/reference-number-not-found"
        });
      } 

      if(planningDetails) {
        clearInterval(interval);
        req.session.data.planningDetails = planningDetails;
        let postcode = req.body.postcode.replace(/\s/g,'').toUpperCase();
        let address = planningDetails.Address.replace(/\s/g,'').toUpperCase();

        if(address.search(postcode) > -1){
          res.send({
            redirect: "/submit-appeal/appeal-details"
          });
        } else {
          res.send({
            redirect: "/submit-appeal/postcode-incorrect"
          });
        }
      }
    } catch(error){
      console.log(error)
      timesRun += 1;
      console.log(timesRun)
      if(timesRun === 60){
          clearInterval(interval);
          res.send({
            redirect: "/submit-appeal/no-response"
          });
      }
    }
  }
  
  checkResponse();
  
  var interval = setInterval(checkResponse, 1000);
  

})


router.post("/submit-appeal/postcode-post", function(req, res, next){
  //BS34 8PP
  var timesRun = 0;
  let checkResponse = function(){
    console.log(planningDetails);

    try{
      if(planningDetails.error){
        clearInterval(interval);
        res.redirect("/submit-appeal/reference-number-not-found");
      } 

      if(planningDetails) {
        clearInterval(interval);
        req.session.data.planningDetails = planningDetails;
        let postcode = req.body.postcode.replace(/\s/g,'').toUpperCase();
        let address = planningDetails.Address.replace(/\s/g,'').toUpperCase();

        if(address.search(postcode) > -1){
          res.redirect("/submit-appeal/appeal-details");
        } else {
          res.redirect("/submit-appeal/postcode-incorrect");
        }
      }
    } catch(error){
      console.log(error)
      timesRun += 1;
      console.log(timesRun)
      if(timesRun === 60){
          clearInterval(interval);
          res.redirect("/submit-appeal/no-response");
      }
    }
  }
  
  checkResponse();
  
  var interval = setInterval(checkResponse, 1000);
  

})


router.post("/submit-appeal/contact-details-post", function(req, res, next){

    if (req.body.contact.includes("post")){
      res.redirect('/submit-appeal/address')
    }
    
    res.redirect('/submit-appeal/check-answers')
})


router.all("/submit-appeal/reference-number-not-found", function(req, res, next){
  let council = localCouncils.filter(council => council.key === req.session.data['planning-department']);

  //res.locals.councilName = council[0]['official-name'];
  next()
})

module.exports = router
