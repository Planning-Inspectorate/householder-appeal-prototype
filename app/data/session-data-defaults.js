/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

let data = {

  cookieBanner: "on",

  saveReturnUrl: "/verify-email-post",

  cases: [],

  // Insert values here

  user: {
      "cell": "0750-552-056",
      "dob": {
        "age": 31,
        "date": "1989-11-17T21:56:57.779Z"
      },
      "email": "manish.sharma@example.com",
      "gender": "female",
      "id": {
        "name": "NINO",
        "value": "AX 82 52 01 E"
      },
      "location": {
        "city": "Maidstone",
        "coordinates": {
          "latitude": "17.2334",
          "longitude": "88.9196"
        },
        "country": "United Kingdom",
        "postcode": "XM26 7YS",
        "state": "Warwickshire",
        "street": {
          "name": "The Avenue",
          "number": 9617
        },
        "timezone": {
          "description": "Kabul",
          "offset": "+4:30"
        }
      },
      "login": {
        "md5": "5724c4fbd97e5155d19f71a44f12cc48",
        "password": "ccccccc",
        "salt": "uJHyJ9ZL",
        "sha1": "85dff52890cee9977409fc6ae332a7e2326d6aa4",
        "sha256": "ab62d511f943bfca48935cb4620b3b2007f8d1b9c1e04a04ea76ea95cd099d5f",
        "username": "blueelephant921",
        "uuid": "2d5afd5e-a598-469f-9933-4edba18bcefb"
      },
      "name": {
        "first": "Manish",
        "last": "Sharma",
        "title": "Miss"
      },
      "nat": "GB",
      "phone": "016977 50180",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/62.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/62.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/62.jpg"
      },
      "registered": {
        "age": 6,
        "date": "2014-05-20T20:54:39.692Z"
      },
      completeAppeal: {
        "address-county": "United Kingdom",
        "address-line-1": "9617 The Avenue",
        "address-line-2": "",
        "address-postcode": "XM26 7YS",
        "address-town": "Maidstone",
        "appeal-statement": "appeal statement.pdf",
        "appellant-email": "manish.sharma@somewhere.com",
        "appellant-name": "Manish Sharma",
        "applicant-name": "",
        "application-number": "P20/12345/F",
        "application-upload": "planning application.pdf",
        "cases": [],
        "check-answers": "govuk-tag govuk-tag--grey app-task-list__tag",
        "check-answers-link": "Check your answers",
        "check-answers-text": "Cannot start yet",
        "decision-date-day": "1",
        "decision-date-month": "11",
        "decision-date-year": "2020",
        "decision-notice": "decision letter.pdf",
        "health-option": "",
        "how-contacted": "yes",
        "listed-building": "no",
        "other-appeals": "no",
        "other-appeals-detail": "",
        "planning-department": "SGC",
        "planningDetails": {
          "Address": "Old Orchard 22 Townsend Lane Almondsbury South Gloucestershire BS32 4EQ",
          "Alternative Reference": "PP-08794252",
          "Appeal Decision": "Not Available",
          "Appeal Status": "Unknown",
          "Application Received": "18 Jun 2020",
          "Application Validated": "18 Jun 2020",
          "Decision": "Refusal",
          "Decision Issued Date": "12 Oct 2020",
          "Name": "Manish Sharma",
          "Proposal": "Demolition of existing dwelling and outbuildings. Erection of 1 no. dwelling with associated works.",
          "Reference": "P20/12345/F",
          "Status": "Decided",
          "documents": [
            "downloads/P20-10658-F.zip"
          ]
        },
        "planningError": false,
        "safety": "yes",
        "safety-detail": "I am currently building an extension.",
        "sense-check": [
          "on",
          ""
        ],
        "site-access": "no",
        "site-access-more-detail": "There is a large hedge blocking the view from the road. ",
        "site-owner-names": "yes",
        "site-ownership": "",
        "supporting-docs": "",
        "uploadedFiles": [
          {
            "deleteButton": {
              "text": "Delete"
            },
            "destination": "./public/uploads",
            "encoding": "7bit",
            "fieldname": "supporting-docs",
            "filename": "ecff862153b5db42052d190d0d2276684079.pdf",
            "message": {
              "html": "<span class=\"moj-multi-file-upload__success\"> <svg class=\"moj-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\"><path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path></svg> <a href=\"/public/uploads/ecff862153b5db42052d190d0d2276684079.pdf\" download class=\"govuk-link\"> other documents 1.pdf</a> has been uploaded</span>"
            },
            "mimetype": "application/pdf",
            "originalname": "other documents 1.pdf",
            "path": "public/images/other documents 1.pdf",
            "size": 13264
          },
          {
            "deleteButton": {
              "text": "Delete"
            },
            "destination": "./public/uploads",
            "encoding": "7bit",
            "fieldname": "supporting-docs",
            "filename": "45282c8a86f407449a615fd34311c19cd09b.pdf",
            "message": {
              "html": "<span class=\"moj-multi-file-upload__success\"> <svg class=\"moj-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\"><path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path></svg> <a href=\"/public/uploads/45282c8a86f407449a615fd34311c19cd09b.pdf\" download class=\"govuk-link\"> other documents 2.pdf</a> has been uploaded</span>"
            },
            "mimetype": "application/pdf",
            "originalname": "other documents 2.pdf",
            "path": "public/images/other documents 2.pdf",
            "size": 13264
          },
          {
            "deleteButton": {
              "text": "Delete"
            },
            "destination": "./public/uploads",
            "encoding": "7bit",
            "fieldname": "supporting-docs",
            "filename": "a679fffe1894215bb97d1958bb6fc8b8fad4.pdf",
            "message": {
              "html": "<span class=\"moj-multi-file-upload__success\"> <svg class=\"moj-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\"><path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path></svg> <a href=\"/public/uploads/a679fffe1894215bb97d1958bb6fc8b8fad4.pdf\" download class=\"govuk-link\"> other documents 3.pdf</a> has been uploaded</span>"
            },
            "mimetype": "application/pdf",
            "originalname": "other documents 3.pdf",
            "path": "public/images/other documents 3.pdf",
            "size": 13264
          },
          {
            "deleteButton": {
              "text": "Delete"
            },
            "destination": "./public/uploads",
            "encoding": "7bit",
            "fieldname": "planning-application",
            "filename": "a679fffe1894215bb97d1958bb6fc8b8fad4.pdf",
            "message": {
              "html": "<span class=\"moj-multi-file-upload__success\"> <svg class=\"moj-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\"><path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path></svg> <a href=\"/public/uploads/a679fffe1894215bb97d1958bb6fc8b8fad4.pdf\" download class=\"govuk-link\"> other documents 3.pdf</a> has been uploaded</span>"
            },
            "mimetype": "application/pdf",
            "originalname": "planning application.pdf",
            "path": "public/images/planning application.pdf",
            "size": 13264
          },
          {
            "deleteButton": {
              "text": "Delete"
            },
            "destination": "./public/uploads",
            "encoding": "7bit",
            "fieldname": "decision-letter",
            "filename": "a679fffe1894215bb97d1958bb6fc8b8fad4.pdf",
            "message": {
              "html": "<span class=\"moj-multi-file-upload__success\"> <svg class=\"moj-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\"><path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path></svg> <a href=\"/public/uploads/a679fffe1894215bb97d1958bb6fc8b8fad4.pdf\" download class=\"govuk-link\"> other documents 3.pdf</a> has been uploaded</span>"
            },
            "mimetype": "application/pdf",
            "originalname": "decision letter.pdf",
            "path": "public/images/decision letter.pdf",
            "size": 13264
          },
          {
            "deleteButton": {
              "text": "Delete"
            },
            "destination": "./public/uploads",
            "encoding": "7bit",
            "fieldname": "appeal-statement",
            "filename": "a679fffe1894215bb97d1958bb6fc8b8fad4.pdf",
            "message": {
              "html": "<span class=\"moj-multi-file-upload__success\"> <svg class=\"moj-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\"><path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path></svg> <a href=\"/public/uploads/a679fffe1894215bb97d1958bb6fc8b8fad4.pdf\" download class=\"govuk-link\"> other documents 3.pdf</a> has been uploaded</span>"
            },
            "mimetype": "application/pdf",
            "originalname": "appeal statement.pdf",
            "path": "public/images/appeal statement.pdf",
            "size": 13264
          }
        ],
        "who-are-you": "applicant",
      }
    },
    "alt-sections-completed-text": "Application incomplete",
    "alt-your-details-completed": "govuk-tag--grey",
    "alt-your-details-completed-text": "Not started",
    "alt-contact-details-completed": "govuk-tag--grey",
    "alt-contact-details-completed-text": "Not started",
    "alt-applicant-name-completed": "govuk-tag--grey",
    "alt-applicant-name-completed-text": "Not started",
    "alt-appeal-statement-completed": "govuk-tag--grey",
    "alt-appeal-statement-completed-text": "Not started",
    "alt-upload-appeal-docs-completed": "govuk-tag--grey",
    "alt-upload-appeal-docs-completed-text": "Not started",
    "alt-other-appeal-completed": "govuk-tag--grey",
    "alt-other-appeal-completed-text": "Not started",
    "alt-application-upload-completed": "govuk-tag--grey",
    "alt-application-upload-completed-text": "Not started",
    "alt-decision-notice-completed": "govuk-tag--grey",
    "alt-decision-notice-completed-text": "Not started",
    "alt-site-location-completed": "govuk-tag--grey",
    "alt-site-location-completed-text": "Not started",
    "alt-site-access-completed": "govuk-tag--grey",
    "alt-site-access-completed-text": "Not started",
    "alt-site-access-info-completed": "govuk-tag--grey",
    "alt-site-access-info-completed-text": "Not started",
    "alt-safety-access-completed": "govuk-tag--grey",
    "alt-safety-access-completed-text": "Not started",
    "alt-site-ownership-completed": "govuk-tag--grey",
    "alt-site-ownership-completed-text": "Not started",
    "alt-application-number-completed": "govuk-tag--grey",
    "alt-application-number-completed-text": "Not started",
    "alt-application-completed": "govuk-tag--grey",
    "alt-application-completed-link": "Check your answers",
    "alt-application-completed-text": "Cannot start yet",
    planningDetails: {
      "Name": "Manish Sharma",
      "Address": "Old Orchard 22 Townsend Lane Almondsbury South Gloucestershire BS32 4EQ",
      "Alternative Reference": "PP-08794252",
      "Appeal Decision": "Not Available",
      "Appeal Status": "Unknown",
      "Application Received": "18 Jun 2020",
      "Application Validated": "18 Jun 2020",
      "Decision": "Refusal",
      "Decision Issued Date": "12 Oct 2020",
      "Proposal": "Demolition of existing dwelling and outbuildings. Erection of 1 no. dwelling with associated works.",
      "Reference": "P20/12345/F",
      "Status": "Decided",
      "documents": [
        "downloads/P20-10658-F.zip"
      ]
    },
    "sections-completed" :"0",
    "sections-completed-text": "Application incomplete",
    "your-details-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "your-details-completed-text": "Not started",
    "applicant-name-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "applicant-name-completed-text": "Not started",
    "appeal-statement-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "appeal-statement-completed-text": "Not started",
    "upload-appeal-docs-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "upload-appeal-docs-completed-text": "Not started",
    "other-appeal-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "other-appeal-completed-text": "Not started",
    "application-upload-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "application-upload-completed-text": "Not started",
    "decision-notice-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "decision-notice-completed-text": "Not started",
    "site-location-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "site-location-completed-text":"Not started",
    "site-access-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "site-access-completed-text": "Not started",
    "site-access-info-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "site-access-info-completed-text": "Not started",
    "safety-access-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "safety-access-completed-text": "Not started",
    "site-ownership-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "site-ownership-completed-text": "Not started",
    "email-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "email-completed-text": "Not started",
    "application-number-completed": "govuk-tag govuk-tag--grey  app-task-list__tag",
    "application-number-completed-text": "Not started",
    "application-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "application-completed-link": "Check your answers",
    "application-completed-text": "Cannot start yet",
    
    "appellant-submission-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "appellant-submission-completed-text": "Not started",
    "conditions-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "conditions-completed-text": "Not started",
    "other-appeals-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "other-appeals-completed-text": "Not started",
    "section2-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "section2-completed-text": "Not started",
    "case-file-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "case-file-completed-text": "Not started",
    "officers-report-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "officers-report-completed-text": "Not started",
    "interested-parties-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "interested-parties-completed-text": "Optional",
    "interested-parties2-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "interested-parties2-completed-text": "Optional",
    "interested-parties3-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "interested-parties3-completed-text": "Optional",
    "site-notice-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "site-notice-completed-text": "Optional",
    "planning-history-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "planning-history-completed-text": "Optional",
    "statutory-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "statutory-completed-text": "Optional",
    "policies-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "policies-completed-text": "Optional",
    "supplementary-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "supplementary-completed-text": "Optional",
    "dpd-completed": "govuk-tag govuk-tag--grey app-task-list__tag",
    "dpd-completed-text": "Optional",
    "check-answers": "govuk-tag govuk-tag--grey app-task-list__tag",
    "check-answers-link": "Check your answers",
    "check-answers-text": "Cannot start yet"

    }


module.exports = data;