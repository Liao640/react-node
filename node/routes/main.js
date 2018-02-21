var express = require('express');
var router = express.Router();
var db = require("../config/db");

router.get('/', function(req, res, next) {
    res.render("main");
});
router.post("/getData",function(req, res, next){
  res.send({code: '1djkfjdjfkdjkfj'})
  conosle.log('1djkfjdjfkdjkfj')
    var totalSql = 'select * from photolist'
    db.query(totalSql, function(err, res){
      if (err) throw err
      if (res) {
        console.log('rows', res)
        // var data = {
        //   list
        // }
        // res.sent({data})
      }
    });
});

// router.get("/add",function(req,res,next){
//   var name = req.body.name
//   var img = req.body.img
//   var mainSql = "insert into 'photolist'.'photolist'('name', 'img') values"
//     db.query(mainSql,function(err,rows){
//       if (rows) {
//         console.log('rows', rows)
//       }
//     });
// });

module.exports = router;
