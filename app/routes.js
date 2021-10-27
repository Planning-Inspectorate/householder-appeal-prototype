

const express = require('express')
const router = express.Router()


const fs = require('fs');
const request = require('request');

const moment = require("moment");

const axios = require("axios");
const idoxScraperUrl = process.env.IDOX_SCRAPER_URL;

let appealsList = require("./data/appeals.js");

//cookie stuff

router.all("*", function(req, res, next){
  res.locals.alwaysHideCookieBanner = process.env.HIDE_COOKIE_BANNER;
  console.log(res.locals.alwaysHideCookieBanner);
  next();
})


router.get("/cookies", function(req, res, next){
  res.locals.referer = req.headers.referer
  res.render("cookies/index")
})


//notify stuff
const NotifyClient = require('notifications-node-client').NotifyClient

try{
  const notifyApiKey = process.env.NOTIFYAPIKEY;
  var notifyClient = new NotifyClient(notifyApiKey);
} catch (error){
  console.error(error);
}

// Add your routes here - above the module.exports line

router.post("/", function(req, res, next){
  res.render('index')
})

// SUBMISSION - APPEAL STATEMENT
router.post('/check-statement', function (req, res) {
  let sense = req.session.data['sense-check']
  res.redirect('/appellant-submission/v7/supporting-documents-needed')
/*
  if (Array.isArray(sense) && sense[0] === 'on') {
    res.redirect('/appellant-submission/v7/supporting-documents-needed')
  } else {
    res.redirect('/appellant-submission/v7/sensitive-information-error')
  }
*/
})

// SUBMISSION - SITE OWNERSHIP
router.post('/check-site-ownership', function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/appellant-submission/v7/site-ownership-certb')
  } else {
    res.redirect('/appellant-submission/v7/site-access')
  }
})


// SUBMISSION - SUBMISSION
router.post('/check-submission', function (req, res) {
  let agreed = req.session.data['appellant-confirmation']

  if (Array.isArray(agreed) && agreed[0] === 'on') {
    res.redirect('/appellant-submission/v7/confirmation')
  } else {
    res.redirect('/appellant-submission/v7/submission-error')
  }
})



router.post('/who-are-you-post', function (req, res) {
  let user = req.session.data['who-are-you']

  if (user == "agent" || user == "applicant") {
    res.redirect('/appellant-submission/v7/your-details')
  } else {
    res.redirect('/appellant-submission/v7/who-are-you')
  }
})

router.post("/supporting-documents-post", function(req, res, next){
  if(req.body['supporting-docs-needed'] === "yes"){
    res.redirect("/appellant-submission/v7/supporting-documents")
  } else if (req.body['supporting-docs-needed'] === "no"){
    req.session.data["upload-appeal-docs-completed"] = "govuk-tag app-task-list__tag";
    req.session.data["upload-appeal-docs-completed-text"] = "Completed";
    res.redirect("/appellant-submission/v7/task-list")
  } else {
    res.redirect("/appellant-submission/v7/supporting-documents-needed")

  }
})



///////////////////////////////////////////////////////////////

router.post('/lpa-submission/:appealId/check-appeal-site', function (req, res) {

    req.session.data["about-site-completed"] = "govuk-tag app-task-list__task-completed";
    req.session.data["about-site-completed-text"] = "Completed";
    res.redirect(`/lpa-submission/lpa-task-list/${req.params.appealId}`)
})

router.post('/lpa-submission/:appealId/conservation-area-post', function (req, res) {

    req.session.data["section2-completed"] = "govuk-tag app-task-list__task-completed";
    req.session.data["section2-completed-text"] = "Completed";
    res.redirect(`/lpa-submission/lpa-task-list/${req.params.appealId}`)
})

router.post('/lpa-submission/:appealId/conservation-area-policy-post', function (req, res) {

  if (req.body['conservation-area'] === "yes") {
    res.redirect(`/lpa-submission/${req.params.appealId}/conservation-map-upload`)
  } else {
    req.session.data["section2-completed"] = "govuk-tag app-task-list__task-completed";
    req.session.data["section2-completed-text"] = "Completed";
    res.redirect(`/lpa-submission/lpa-task-list/${req.params.appealId}`)
  }
})


router.post('/lpa-submission/:appealId/interested-parties-appeal-post', function (req, res) {

  if (req.body['interested-parties-appeal'] === "yes") {
    res.redirect(`/lpa-submission/${req.params.appealId}/interested-parties-appeal-upload`)
  } else {
    req.session.data["interested-parties-appeal-completed"] = "govuk-tag app-task-list__task-completed";
    req.session.data["interested-parties-appeal-completed-text"] = "Completed";
    res.redirect(`/lpa-submission/lpa-task-list/${req.params.appealId}`)
  }
})
router.post('/lpa-submission/:appealId/other-policies-post', function (req, res) {

  if (req.body['other-policies'] === "yes") {
    res.redirect(`/lpa-submission/${req.params.appealId}/other-policies-upload`)
  } else {
    req.session.data["other-policies-completed"] = "govuk-tag app-task-list__task-completed";
    req.session.data["other-policies-completed-text"] = "Completed";
    res.redirect(`/lpa-submission/lpa-task-list/${req.params.appealId}`)
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


router.post('/lpa-submission/:appealId/site-notice-post', function (req, res) {
  let publicised = req.session.data['was-publicised']

  if (publicised == "true") {
    res.redirect(`/lpa-submission/${req.params.appealId}/site-notice-documents`)
  } else {
    res.redirect(`/lpa-submission/lpa-task-list/${req.params.appealId}`)
  }
})


router.post('/lpa-submission/:appealId/conservation-publicity-post', function (req, res) {
  let conservationupload = req.session.data['publicise-conservation-area']

  if (conservationupload == "yes") {
    res.redirect(`/lpa-submission/${req.params.appealId}/conservation-publicity-upload`)
  } else {
    req.session.data["section2-completed"] = "govuk-tag app-task-list__task-completed";
    req.session.data["section2-completed-text"] = "Completed";
    res.redirect(`/lpa-submission/lpa-task-list/${req.params.appealId}`)
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

router.post('/appellant-submission/v7/decision-date-post', function (req, res) {
  let day = req.session.data['decision-date-day'],
      month = req.session.data['decision-date-month'],
      year = req.session.data['decision-date-year'];
   if(!day || !month  || !year) {
     res.redirect('/appellant-submission/v7/decision-date-error')
   }

  let date = moment(`${year}-${month}-${day}`, "Y-M-D", true);

  console.log(date.isValid());

  if(date.isValid() === false){
    res.redirect('/appellant-submission/v7/decision-date-error')
  } else{
    let checkDate = date.add(12, "weeks");
    let today = moment();
    if(checkDate.isBefore(today, "days")){

      req.session.data.deadlineDate = checkDate.format("D MMMM YYYY");
      res.redirect('/appellant-submission/v7/decision-date-out')
    } else {
      res.redirect('/appellant-submission/v7/planning-department')
    }
  }


})

router.all('/eligibility/planning-department', function(req,res,next){

  res.locals.councils = localCouncils.sort(sortByProperty("name"));

  next()

});

router.all('/appellant-submission/v7/planning-department', function(req,res,next){

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


router.post('/householder-post', function (req, res) {
  let hasconsent = req.session.data['householder']

  if (hasconsent === 'yes') {
    res.redirect('/appellant-submission/v7/decision-date')
  } else if (hasconsent === 'no') {
    res.redirect('/appellant-submission/v7/consent-out')
  } else {
    res.redirect('/appellant-submission/v7/householder')
  }
})

router.post('/enforcement-post', function (req, res) {
  let enforcement = req.session.data['enforcement']

  if (enforcement === 'no') {
    res.redirect('/appellant-submission/v7/listed-building')
  } else if (enforcement === 'yes') {
    res.redirect('/appellant-submission/v7/enforcement-out')
  } else {
    res.redirect('/appellant-submission/v7/enforcement')
  }
})

router.post('/appellant-submission/v7/listed-building-post', function (req, res) {
  let haslisted = req.session.data['listed-building']

  if (haslisted === 'no') {
    res.redirect('/appellant-submission/v7/costs')
  } else if (haslisted === 'yes') {
    res.redirect('/appellant-submission/v7/listed-out')
  } else {
    res.redirect('/appellant-submission/v7/listed-building')
  }
})


router.post('/costs-post', function (req, res) {
  let haslisted = req.session.data['costs']

  if (haslisted === 'no') {
    // res.redirect('/appellant-submission/v7/appeal-statement-info')
    // removed above line for AS-1892
    res.redirect('/appellant-submission/v7/who-are-you')
  } else if (haslisted === 'yes') {
    res.redirect('/appellant-submission/v7/costs-out')
  } else {
    res.redirect('/appellant-submission/v7/costs')
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

router.post('/appellant-submission/v7/planning-department-post', function(req, res, next){
  let redirectUrl = req.session.data["idox-prototype-url"];
  let dept = req.body['planning-department'];
  console.log(dept)
  if (dept === ""){
    req.session.data.planningError = true;
    res.redirect('/appellant-submission/v7/planning-department')
  } else {
    req.session.data.planningError = false;
    res.redirect('/appellant-submission/v7/enforcement')
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

router.post('/submit-appeal/site-ownership-post', function (req, res) {
  let owner = req.session.data['site-owner-names']

  if (owner === 'no') {
    res.redirect('/submit-appeal/site-ownership-certb')
  } else {

    req.session.data["alt-site-ownership-completed"] = "";
    req.session.data["alt-site-ownership-completed-text"] = "Completed";
    res.redirect('/submit-appeal/site-access')
  }
})


router.post("/submit-appeal/contact-details-post", function(req, res, next){

    if (req.body.contact.includes("post")){
      req.session.data["alt-contact-details-completed"] = "govuk-tag--blue";
      req.session.data["alt-contact-details-completed-text"] = "In progress";
      res.redirect('/submit-appeal/address')
    }

    req.session.data["alt-contact-details-completed"] = "";
    req.session.data["alt-contact-details-completed-text"] = "Completed";
    res.redirect('/submit-appeal/task-list')
})


router.all("/submit-appeal/reference-number-not-found", function(req, res, next){
  let council = localCouncils.filter(council => council.key === req.session.data['planning-department']);

  //res.locals.councilName = council[0]['official-name'];
  next()
})


router.post('/submit-appeal/householder-appeal-post', function (req, res) {
  let hasconsent = req.session.data['householder']

  if (hasconsent === 'yes') {
    res.redirect('/submit-appeal/task-list')
  } else if (hasconsent === 'no') {
    res.redirect('/submit-appeal/householder-out')
  } else {
    res.redirect('/submit-appeal/householder-appeal')
  }
})

router.post('/submit-appeal/who-are-you-post', function (req, res) {
  let user = req.session.data['who-are-you']

  if (user == "agent" || user == "applicant") {
    res.redirect('/submit-appeal/your-details')
  } else {
    res.redirect('/submit-appeal/who-are-you')
  }
})

router.all("/submit-appeal/task-list", function(req, res, next){
  let sections = [
    {
      sections: ["Completed"],
      complete: true
    },{
      sections: [req.session.data["alt-sections-completed-text"]],
      complete: false,
    },{
      sections: [
        req.session.data["alt-your-details-completed-text"]
        ],
      complete: false,
    },{
      sections: [
        req.session.data["alt-appeal-statement-completed-text"],
        req.session.data["alt-upload-appeal-docs-completed-text"],
        req.session.data["alt-other-appeal-completed-text"]
        ],
      complete: false
    },{
      sections: [
        req.session.data["alt-site-ownership-completed-text"],
        req.session.data["alt-site-access-completed-text"],
        req.session.data["alt-safety-access-completed-text"]
      ],
      complete: false
    }
  ];

  sections.map(function(item){
    console.log(item.sections.filter(obj => obj.toUpperCase() === "COMPLETED") );
    console.log(item.sections.filter(obj => obj.toUpperCase() === "COMPLETED").length );
    console.log(item.length)

    if(item.sections.filter(obj => obj.toUpperCase() === "COMPLETED").length === item.sections.length){
      item.complete = true
    } else {
      item.complete = false
    }
  })

  res.locals.sectionsComplete = sections.filter(item => item.complete).length;

  if(res.locals.sectionsComplete == 4){
    req.session.data["alt-application-completed-link"] = `<a href="check-answers">Check your answers</a>`;
    req.session.data['alt-application-completed-text'] = "Not started";
  } else {
    req.session.data["alt-application-completed-link"] = `Check your answers`;
    req.session.data['alt-application-completed-text'] = "Cannot start yet";
  }

  next()
})

router.get("/get-session-data.json", function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(req.session.data, null, 3));
})


router.get("/complete-appeal-task-list", function(req, res, next){
  req.session.data = require("./data/complete-appeal.js");

  res.redirect("/submit-appeal/task-list")
})



//email verification

router.post("/verify-email-post", function(req, res, next){
  let templateId = "1824bf6e-bc22-4db8-9d5e-d75462cf19af";
  let emailAddress = req.body['appellant-email'];
  let personalisation = {
    name: req.body['appellant-name']
  };
  res.redirect("/appellant-submission/v7/save-return/verification-confirmation");
  // commenting out to allow user through journey
  /*
  notifyClient
    .sendEmail(templateId, emailAddress, {
      personalisation: personalisation
    })
    .then(function(response){
      console.log(response)
      res.redirect("/appellant-submission/v7/save-return/verification-confirmation");
    })
    .catch(function(err){
      console.error(err.statusCode)
      console.error(err.errors)
      res.redirect("/appellant-submission/v7/save-return/verification-confirmation");
    })
  */
})


router.post("/verify-email-post", function(req, res, next){


  res.redeirect
})


router.post("/appellant-submission/v7/save-return/verification-confirmation", function(req, res, next){
  let code = req.body["verification-code"];
  res.redirect("/appellant-submission/v7/save-return/email-confirmed");
  // commenting out to allow user through journey
  /*

  if(code == "8356"){

    let emailAddress = req.session.data['appellant-email'];
    let templateId = "2c4327d6-6219-4add-98d2-c53ade362bab";
    let personalisation = {
      name: req.session.data['appellant-name'],
      url: `${req.headers.origin}/saved-appeal/e26qbhysx4s5vfgj0z8w`
    };
    notifyClient.sendEmail(templateId, emailAddress, {
      personalisation: personalisation
    })
      .then(function(response){
        console.log(response)
        res.redirect("/appellant-submission/v7/save-return/email-confirmed")
      })
      .catch(function(err){
        console.error(err.statusCode)
        console.error(err.errors)
        console.error(err)
        res.redirect("/appellant-submission/v7/save-return/email-confirmed")
    })

  } else if(!code || code == ""){
    res.locals.verificationError = true;
    res.locals.verificationMessage = "Enter your verification code";

    res.render("appellant-submission/v7/save-return/verification-confirmation");
  } else {
    res.locals.verificationError = true;
    res.locals.verificationMessage = "Verfication code is incorrect";

    res.render("appellant-submission/v7/save-return/verification-confirmation");
  }
  */
})

router.get("/saved-appeal/:apealId", function(req, res, next){
    res.redirect("/appellant-submission/v7/task-list")
})


router.post("/appellant-submission/v7/save-return/verify-email", function(req, res, next){
  console.log(req.headers)

  let templateId = "ae735dfa-a603-494b-bf15-3c2fda150d1a";
  let emailAddress = req.session.data['appellant-email'];
  console.log(emailAddress)
  let personalisation = {
    name: req.session.data['appellant-name'],
    url: `${req.headers.origin}/confirm-email/jqmc0vqyaxngfbc585u1`
  };
  notifyClient
    .sendEmail(templateId, emailAddress, {
      personalisation: personalisation
    })
    .then(function(response){
      //console.log(response)
      next()
    })
    .catch(function(err){
      console.error(err.statusCode)
      console.error(err)
      next()
    })
})


router.get("/confirm-email/:id", function(req, res, next){
  res.redirect("/appellant-submission/v7/save-return/confirm-your-email")
})

router.post("/appellant-submission/v7/save-return/email-confirmed-2", function(req, res, next){
  let emailAddress = req.session.data['appellant-email'];
    let templateId = "2c4327d6-6219-4add-98d2-c53ade362bab";
    let personalisation = {
      name: req.session.data['appellant-name']
    };
    notifyClient.sendEmail(templateId, emailAddress, {
      personalisation: personalisation
    })
      .then(function(response){
        console.log(response)
        next()
      })
      .catch(function(err){
        console.error(err.statusCode)
        console.error(err.errors)
        console.error(err)
        next()
    })
})

router.post("/appellant-submission/v7/save-return/reset-confirmation", function(req, res, next){
  let emailAddress = req.body['recovery-email'];
    let templateId = "07f89c70-9f5d-4f43-840c-8453b49ded06";
    let personalisation = {
      url: `${req.headers.origin}/reset-password/jqmc0vqyaxngfbc585u1`
    };
    notifyClient.sendEmail(templateId, emailAddress, {
      personalisation: personalisation
    })
      .then(function(response){
        console.log(response)
        next()
      })
      .catch(function(err){
        console.error(err.statusCode)
        console.error(err.errors)
        console.error(err)
        next()
    })

})

router.get("/reset-password/:id", function(req, res, next){
  res.redirect("/appellant-submission/v7/save-return/reset-new-password")
})


router.get("/lpa-account/appeal-list", function(req, res, next){
  res.locals.appeals = appealsList;
  res.render("lpa-account/appeal-list")
});

router.get("/lpa-submission/lpa-task-list/:appealId", function(req, res, next){
  res.locals.appeal = appealsList.find(appeal => appeal.id == req.params.appealId);

  res.render("lpa-submission/lpa-task-list");
})

router.get("/lpa-submission/new-appeal/:appealId", function(req, res, next){
  res.locals.appeal = appealsList.find(appeal => appeal.id == req.params.appealId);

  res.render("lpa-submission/new-appeal");
})

router.post("/lpa-submission/:appealId/supplementary-post", function(req, res, next){

  if(req.session.data.supplementaryDocsList){
    res.redirect(`/lpa-submission/${req.params.appealId}/supplementary-file-list`)
  }

  if(req.body["supplementary-docs"] == "yes"){
    res.redirect(`/lpa-submission/${req.params.appealId}/supplementary-existing-list`)
  } else {
    req.session.data["supplementary-completed"] = "govuk-tag app-task-list__task-completed";
    req.session.data["supplementary-completed-text"] = "Completed";
    res.redirect(`/lpa-submission/${req.params.appealId}/lpa-task-list`)
  }

})



router.get("/lpa-submission/:appealId/:pageName", function(req, res, next){
  res.locals.appeal = appealsList.find(appeal => appeal.id == req.params.appealId);

  res.render(`lpa-submission/${req.params.pageName}`);
})

router.get("/lpa-submission/:appealId/:pageName/:pageName2", function(req, res, next){
  res.locals.appeal = appealsList.find(appeal => appeal.id == req.params.appealId);

  res.render(`lpa-submission/${req.params.pageName}/${req.params.pageName2}`);
})


let saveSupplementaryDetails = function(req){
  if (!req.session.data.supplementaryDocsList){
    req.session.data.supplementaryDocsList = [];
  }


  let details = {
    "name": req.session.data["supplementary-name"],
    "stage": req.session.data["supplementary-stage"],
    "adopted":  req.session.data["supplementary-adopted"],
    "adopted-date-day": req.session.data["supplementary-adopted-date-day"],
    "adopted-date-month": req.session.data["supplementary-adopted-date-month"],
    "adopted-date-year": req.session.data["supplementary-adopted-date-year"]
  }

  if(!req.session.data.uploadedFiles){
    details.files = [];
  } else {
    details.files = req.session.data.uploadedFiles.filter(file => file.fieldname === "supplementary-planning");
    req.session.data.uploadedFiles = req.session.data.uploadedFiles.filter(file => file.fieldname != "supplementary-planning")
  }

  let newObject = JSON.parse(JSON.stringify(details));

  console.log(newObject)
  req.session.data.supplementaryDocsList.push( newObject );

}


router.post("/lpa-submission/:appealId/supplementary-adopted-post", function(req, res, next){

  saveSupplementaryDetails(req);
  res.redirect(`/lpa-submission/${req.params.appealId}/supplementary-file-list`);

})







// Inspector appeals 2- checks for ARSV to set time slot else ignores time
router.post('/inspector-appeals2/visit-type-arsv-check', function (req, res) {
  let owner = req.session.data['site-visit-type']
//console.log("here");
  if (owner === 'ARSV') {
    req.session.data['ARSV'] = 'ARSV'
  } else {
    req.session.data['ARSV'] = 'ASV'
    req.session.data['site-visit-time'] = 'N/A'
  }
res.redirect('visit-date')
})

router.post('/inspector-appeals2/visit-type-date-check', function (req, res) {
  let owner = req.session.data['site-visit-type']
//console.log ('here');
let svDate = moment(req.session.data['passport-issued-month'] + "-" + req.session.data['passport-issued-day'] + "-" + req.session.data['passport-issued-year'], "MM-DD-YYYY")

if (svDate.isValid())

{
  if (moment().isSameOrAfter(svDate))
  {
  res.redirect('visit-date-error')
  }
//res.redirect('validdate')
}

else {
  res.redirect('visit-date-error')
}


console.log(svDate);
  if (owner === 'ARSV') {
    res.redirect('visit-time')
  } else {
    res.redirect('visit-summary')
  }

})

// Inspector appeals2 end

// Inspector appeals 3- checks for ARSV to set time slot else ignores time
router.post('/inspector-appeals3/visit-type-arsv-check', function (req, res) {
  let owner = req.session.data['site-visit-type']
//console.log("here");
  if (owner === 'ARSV') {
    req.session.data['ARSV'] = 'ARSV'
  } else {
    req.session.data['ARSV'] = 'ARSV'
    req.session.data['site-visit-time'] = 'N/A'
  }
res.redirect('visit-date')
})

router.post('/inspector-appeals3/visit-type-date-check', function (req, res) {
  let owner = req.session.data['site-visit-type']
//console.log ('here');
let svDate = moment(req.session.data['passport-issued-month'] + "-" + req.session.data['passport-issued-day'] + "-" + req.session.data['passport-issued-year'], "MM-DD-YYYY")

if (svDate.isValid())

{
  if (moment().isSameOrAfter(svDate))
  {
  res.redirect('visit-date-error')
  }
//res.redirect('validdate')
}

else {
  res.redirect('visit-date-error')
}


console.log(svDate);
  if (owner === '(ARSV)') {
    res.redirect('visit-time')
  } else {
    res.redirect('visit-summary')
  }

})

// Inspector appeals3 end

//lpa login

router.get("/lpa-account/login/email", function(req, res, next){
  req.session.data.lpaRedirectUrl = req.query.url;
  next()
})

router.post("/lpa-account/login/email-post", function(req, res, next){
  let email = req.session.data["lpa-account-email"];


  if(!email || email.search("@") === -1){
    //invalid email
    res.redirect("/lpa-account/login/email")
  }


  let templateId = "345f0fcf-496b-47a7-acb7-4449f3c2859e";
  let emailAddress = req.body['lpa-account-email'];
  notifyClient
    .sendEmail(templateId, emailAddress)
    .then(function(response){
      console.log(response)
      res.redirect("/lpa-account/login/email-sent")
    })
    .catch(function(err){
      console.error(err.statusCode)
      console.error(err.errors)
      res.redirect("/lpa-account/login/email-sent")
    })
});


router.post("/lpa-account/login/email-sent-post", function(req, res, next){
  let url = decodeURIComponent(req.session.data.lpaRedirectUrl);

  res.redirect(url);
})

require('./routes/eligibility/v8.js')(router);
require('./routes/eligibility/v9.js')(router);
require('./routes/appellant-submission/v10.js')(router);

require('./routes/appeal-submission.js')(router);

require('./routes/lpa-questionnaire/v8.js')(router);
require('./routes/lpa-questionnaire/v9.js')(router);

require('./routes/validation-officer/v1.js')(router);
require('./routes/validation-officer/v2.js')(router);

require('./routes/case-officer/v1.js')(router);
require('./routes/case-officer/v2.js')(router);
require('./routes/case-officer/v3.js')(router);
require('./routes/case-officer/v4.js')(router);
require('./routes/case-officer/v5.js')(router);

require('./routes/inspector/v4.js')(router);

require('./routes/cst/v1.js')(router);
require('./routes/cst/v2.js')(router);
require('./routes/cst/v3.js')(router);
require('./routes/cst/v4.js')(router);
require('./routes/cst/v5.js')(router);
require('./routes/cst/v5a.js')(router);

require('./routes/standalone/as-2078.js')(router);
require('./routes/standalone/lpa-questionnaire-security.js')(router);
require('./routes/standalone/appeal-submission-security.js')(router);
require('./routes/standalone/appeal-submission-security-magiclink.js')(router);

module.exports = router
