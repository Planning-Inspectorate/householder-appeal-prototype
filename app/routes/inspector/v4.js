module.exports = function (router) {

  var v = "v4";
  var base = "/inspector/"+v+"/";

  // 

    router.post(base+'get-appeals', function (req, res) {

      if ( req.session.data["inspector-"+v+"-pullappealref"].includes("APP/2020/56789/5551277") ){
        req.session.data["inspector-"+v+"-appealunavailable"] = "true";
        res.redirect(base+'get-appeals/appeals-unavailable');
      } else {
        res.redirect(base+'get-appeals/add-to-schedule');
      }
    })

    router.post(base+'get-appeals/add-to-schedule', function (req, res) {

      // Take the selected appeals and store them to display in my appeals,
      // and remove them from available appeals
        //data["inspector-"+v+"-myappeals"].push(data["inspector-"+v+"-pullappealref"])
      //

      res.redirect(base+'get-appeals/appeals-assigned');

    })

}