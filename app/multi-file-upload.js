const express = require('express');
const router = express.Router();
const multer = require('multer');
const cache = require( '../lib/cache' );

const path = require('path');
const crypto = require('crypto');

let svgIcon = `<svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"></path></svg> `

function getErrorMessage(item) {
  var message = '';
  if(item.error.code == 'FILE_TYPE') {
    message += item.file.originalname + ' must be a png or gif';
  } else if(item.error.code == 'LIMIT_FILE_SIZE') {
    message += item.file.originalname + ' must be smaller than 2mb';
  }
  return message;
}

function getUploadedFiles( req, res, next ){

  if( !req.session.uploadId ){
    req.session.uploadId = req.sessionID;
  }

  let files = cache.get( req.session.uploadId );

  if( !files ){
    files = [];
    cache.set( req.session.uploadId, files );
  }

  req.uploadedFiles = files;
  next();
}

////////////////////////////////////////////////////////////////////////////////////////
// NO JAVASCRIPT
////////////////////////////////////////////////////////////////////////////////////////

const upload = multer( {
  dest: './public/uploads',
  limits: { fileSize: 2000000 },
  fileFilter: function( req, file, cb ){
    let ok = false;

    if(!req.rejectedFiles) {
      req.rejectedFiles = [];
    }

    if( file.mimetype !== 'image/png' && file.mimetype !== 'image/gif' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
      cb(null, false);
      req.rejectedFiles.push({
        file: file,
        error: {
          code: 'FILE_TYPE'
        }
      });
    } else {
      cb(null, true);
    }
  }
} ).array('documents', 10);



router.get('/components/multi-file-upload/examples/default', getUploadedFiles, function( req, res ){

  const { uploadedFiles } = req;

  var pageObject = {
    uploadedFiles: [],
    errorMessage: null,
    errorSummary: {
      items: []
    }
  };

  // 1. UPLOADED FILES

  if(uploadedFiles.length) {
    uploadedFiles.forEach(function(file) {
      var o = file;
      o.message = {
        html: `<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> <a href="/${file.path}">${file.originalname}</a> has been uploaded</span>`
      };

      o.filePath = file.path;
      o.originalFileName = file.originalname;
      o.fileName = file.filename;
      o.deleteButton = {
        text: 'Delete'
      };
      pageObject.uploadedFiles.push(o);
    });
  }

  // 2. REJECTED FILES

  if(req.session.rejectedFiles && req.session.rejectedFiles.length) {
    var errorMessage = '';
    req.session.rejectedFiles.forEach(function(item) {
      errorMessage += getErrorMessage(item);
      errorMessage += '<br>';
    });

    req.session.rejectedFiles.forEach(function(item) {
      pageObject.errorSummary.items.push({
        text: getErrorMessage(item),
        href: '#documents'
      });
    });

    pageObject.errorMessage = {
      html: errorMessage
    };
  }

  req.session.rejectedFiles = null;

  res.render( 'components/multi-file-upload/examples/default/index.html', pageObject );
});

function removeFileFromFileList(fileList, filename) {

  const index = fileList.findIndex( (item ) => item.filename === filename );
  
  console.log(filename)
  if( index >= 0 ){
    fileList.splice( index, 1 );
  }
}

router.post('/components/multi-file-upload/examples/default', getUploadedFiles, function( req, res ){
  upload(req, res, function(err) {
    if(err) {
      // console.log(err);
    }

    req.uploadedFiles.push(...req.files);

    if(req.body.delete) {
      removeFileFromFileList(req.uploadedFiles, req.body.delete);
    }

    // no concat because errors are discarded after use anyway
    req.session.rejectedFiles = req.rejectedFiles;

    res.redirect('/components/multi-file-upload/examples/default');
  });
} );

////////////////////////////////////////////////////////////////////////////////////////
// AJAX
////////////////////////////////////////////////////////////////////////////////////////


const acceptedFormats = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/tiff",
  "image/png",
  "image/jpg",
  "image/jpeg"
]

const uploadAjax = function(fieldName){
  return multer( {
    limits: { fileSize: 2000000 },
    storage: multer.diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
          // randomBytes function will generate a random name
          let customFileName = crypto.randomBytes(18).toString('hex')
          // get file extension from original file name
          let fileExtension = path.extname(file.originalname).split('.')[1];
          cb(null, customFileName + '.' + fileExtension)
      }
    }),
    fileFilter: function( req, file, cb ){
      let ok = false;

      if( acceptedFormats.indexOf(file.mimetype) < 0 ){
        return cb({
          code: 'FILE_TYPE',
          field: fieldName,
          file: file
        }, false);
      } else {
        return cb(null, true);
      }
    }
  } ).single(fieldName);
}

let uploads = [{
  fieldName: "documents",
  uploadUrl: "/ajax-upload",
  deleteUrl: "/ajax-delete"
},{
  uploadUrl: '/ajax-case-file',
  deleteUrl: '/ajax-case-file-delete',
  fieldName: 'casefile'
},{
  uploadUrl: '/ajax-officers-report',
  deleteUrl: '/ajax-officers-report-delete',
  fieldName: 'officers-report'
},{
  uploadUrl: '/ajax-interested-parties',
  deleteUrl: '/ajax-interested-parties-delete',
  fieldName: 'interested-parties'
},{
  uploadUrl: '/ajax-planning-history',
  deleteUrl: '/ajax-planning-history-delete',
  fieldName: 'planning-history'
},{
  uploadUrl: '/ajax-statutory',
  deleteUrl: '/ajax-statutory-delete',
  fieldName: 'statutory'
},{
  uploadUrl: '/ajax-policy',
  deleteUrl: '/ajax-policy-delete',
  fieldName: 'policy'
},{
  uploadUrl: '/ajax-site-notice',
  deleteUrl: '/ajax-site-notice-delete',
  fieldName: 'site-notice'
},{
  uploadUrl: '/ajax-site-notice-ip',
  deleteUrl: '/ajax-site-notice-ip-delete',
  fieldName: 'site-notice-ip'
},{
  uploadUrl: '/ajax-supplementary-planning',
  deleteUrl: '/ajax-supplementary-planning-delete',
  fieldName: 'supplementary-planning'
},{
  uploadUrl: '/ajax-correspondence',
  deleteUrl: '/ajax-correspondence-delete',
  fieldName: 'correspondence'
},{
  uploadUrl: '/ajax-supporting-docs',
  deleteUrl: '/ajax-supporting-docs-delete',
  fieldName: 'supporting-docs'
},{
  uploadUrl: '/ajax-conservation-area-map',
  deleteUrl: '/ajax-conservation-area-map-delete',
  fieldName: 'conservation-area-map'
  }]


uploads.forEach(function(item, index, array){

  router.post(item.uploadUrl, getUploadedFiles, function( req, res ){

    uploadAjax(item.fieldName)(req, res, function(error, val1, val2) {
      if(error) {
        if(error.code == 'FILE_TYPE') {
          error.message = error.file.originalname + ' must be a png or gif';
        } else if(error.code == 'LIMIT_FILE_SIZE') {
          // error.message = error.file.originalname + ' must be smaller than 2mb';
          error.message = 'The file must be smaller than 2mb';
        }

        var response = {
          error: error,
          file: error.file || { filename: 'filename', originalname: 'originalname' }
        };

        res.json(response);
      } else {

        req.uploadedFiles.push(req.file);
        
        if(!req.session.data.uploadedFiles){
          req.session.data.uploadedFiles = [];
        }
        req.session.data.uploadedFiles = req.uploadedFiles;
        req.file.message = {
          html:`<span class="moj-multi-file-upload__success"> ${svgIcon}<a href="/${req.file.path}" download class="govuk-link"> ${req.file.originalname}</a> has been uploaded</span>`

        }
        req.file.deleteButton = {
          text: "Delete"
        }

        res.json({
          file: req.file,
          success: {
            messageHtml: `<a href="/${req.file.path}" download class="govuk-link"> ${req.file.originalname}</a> has been uploaded`,
            messageText: `${req.file.originalname} has been uploaded`
          }
        });
      }
    } );
  } );

  router.post(item.deleteUrl, getUploadedFiles, function( req, res ){
    console.log(req.body.delete)
    removeFileFromFileList(req.uploadedFiles, req.body.delete);
    req.session.data.uploadedFiles = req.uploadedFiles;

    res.json({});
  });

});

module.exports = router;