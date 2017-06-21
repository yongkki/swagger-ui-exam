var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : '',
  password : '',
  database : ''
});

var router = express.Router();


// 전체 회원정보 조회
router.get('/', function(req, res, next) {
  var sql = 'select * from member';
  connection.query(sql, function(err, rows){
    if (err)
      return res.sendStatus(500);
    res.send(rows);
  });
});

// 특정 회원정보 조회
router.get('/:memberId', function(req, res, next) {
  var sql = 'select * from member where id = ?';
  var values = [req.params.memberId];
  connection.query(sql, function(err, rows){
    if (err)
      return res.sendStatus(500);
    res.send(rows[0]);
  });
});

// 회원가입
router.post('/', function(req, res, next) {
  var sql = 'insert into member(name, age, gender) values(?,?,?)';
  var values = [req.body.name, req.body.age, req.body.gender];
  connection.query(sql, values, function(err, result){
    if (err)
      return res.sendStatus(500);
    res.sendStatus(201);
  });
});


// 회원정보 수정
router.put('/:memberId', function(req, res, next) {
  var sql = 'update set name = ?, age = ?, gender = ? where id = ?';
  var values = [req.body.name, req.body.age, req.body.gender, req.params.memberId];
  connection.query(sql, values, function(err, result){
    if (err)
      return res.sendStatus(500);
    res.sendStatus(204);
  });

});


// 회원탈퇴
router.delete('/:memberId', function(req, res, next) {
  var sql = 'delete from member where id = ?';
  var values = [req.params.memberId];
  connection.query(sql, values, function(err, result){
    if (err)
      return res.sendStatus(500);
    res.sendStatus(204);
  });
});

module.exports = router;
