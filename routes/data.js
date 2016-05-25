var express = require('express')
var httplib = require('http-status')

var elasticModule = require('../module/elasticSearch.js')

var router = express.Router()
var indexName = 'randomindex'

/* GET suggestions */
router.get('/suggest/:input', function (req, res, next) {
  var input = req.params.input

  var client = elasticModule.getInstance()
  client.getSuggestions(indexName, input).then(function (result) {
    res.status(httplib.OK).json(result)
  }, function (err) {
    console.log('Err: ', err)
    res.status(httplib.BAD_REQUEST).json(err)
  })
})

/* POST document to be indexed */
router.post('/', function (req, res, next) {
})


module.exports = router
