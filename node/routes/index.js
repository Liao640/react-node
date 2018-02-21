var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require("../config/db");
var allData = ''

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 获取
router.get('/getData',function(req, res, next){
    var totalSql = 'select * from photolist'
    db.query(totalSql, function(err, result){
      if (err) {
        throw err
      } else {
        // console.log('rows', result)
        allData = result
        res.send({ data: result});
      }
    });
});
//增加
router.post('/add',function(req, res, next){
    var name = req.body.name
    var url = req.body.url
    // console.log('rows111', allData)
    var nameArr = []
    var id = ''
    allData.forEach((item) => {
      nameArr.push(item.name)
      if (item.name === name) {
        id = item.id
      }
    })
    if (nameArr.indexOf(name) !== -1) {
      console.log('存在')
      var updateSql = 'update photolist set name="'+ name +'",url="'+ url +'" where id='+ id
      console.log('updateSql', updateSql)
      db.query(updateSql, function(err, result){
        if (err) {
          throw err
        } else {
          res.send({ data: result});
          res.end()
        }
      })
    } else {
      console.log('不存在')
      var addSql = 'insert into photolist(id, name, url) values(0, "'+ name + '","'+ url +'")'
      db.query(addSql, function(err, result){
        if (err) {
          throw err
        } else {
          // console.log('rows', result)
          res.send({ data: result});
          res.end()
        }
      });
    }
  // var updataSql = `photolist` set `id`=[value-1],`name`=[value-2],`url`=[value-3] WHERE 1
});
// 删除
router.get('/cancel',function(req, res, next){
  var id = req.query.id
  console.log('id', id)
  var cancelSql =  'delete from photolist where id='+ id
  db.query(cancelSql, function(err, result){
    if (err) {
      throw err
    } else {
      res.send({ data: result});
      res.end()
    }
  })
})
module.exports = router;
