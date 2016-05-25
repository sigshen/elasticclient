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

var initElasticSearch = function () {
  var client = elasticModule.getInstance()
  client.indexExists(indexName).then(function (exists) {
    if (exists) {
      return client.deleteIndex(indexName)
    } else {
      return Promise.resolve()
    }
  }).then(function () {
    return client.initIndex(indexName).then(function () {
      return client.initMapping(indexName, {
        title: { type: 'string' },
        content: { type: 'string' },
        suggest: {
          type: 'completion',
          analyzer: 'simple',
          search_analyzer: 'simple',
          payloads: true
        }
      })
    }).then(function () {
      // Add a few titles for the autocomplete
      // elasticsearch offers a bulk functionality as well, but this is for a different time
      var promises = [
        'Thing Explainer',
        'The Internet Is a Playground',
        'The Pragmatic Programmer',
        'The Hitchhikers Guide to the Galaxy',
        'Trial of the Clone'
      ].map(function (title) {
        return client.addDocument(indexName, {
          title: title,
          content: title + " content",
          metadata: {
            titleLength: title.length
          }
        })
      })

      return Promise.all(promises)
    })
  }).then(function () {
    console.log('done.')
  }, function (err) {
    console.log('Err: ', err)
  })
}

var title = 'Thing Explainer'
var doc = {
  title: title,
  content: title + ' content',
  metadata: {
    titleLength: title.length
  }
}

// initIndexTest(indexName)
// addDocTest(indexName, doc)
initElasticSearch()

