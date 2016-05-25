var elasticModule = require('../module/elasticSearch.js')


var indexName = 'randomindex'

var initIndexTest = function (indexName) {
  var client = elasticModule.getInstance()

  client.initIndex(indexName).then(function (result) {
    console.log('result: ', result)
  }, function (err) {
    console.log('err: ', err.message)
  })
}

var addDocTest = function (indexName, doc) {
  var body = {
    title: doc.title,
    content: doc.content,
    suggest: {
      input: doc.title.split(" "),
      output: doc.title,
      payload: doc.metadata || {}
    }
  }

  var client = elasticModule.getInstance()
  client.addDocument(indexName, body).then(function (result) {
    console.log('result: ', result)
  }, function (err) {
    console.log('erR: ', err)
  })
}


// initIndexTest(indexName)

var title = 'Thing Explainer'
var doc = {
  title: title,
  content: title + ' content',
  metadata: {
    titleLength: title.length
  }
}
addDocTest(indexName, doc)
