var elasticsearch = require('elasticsearch')


var ElasticClient = function () {
  this.elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
  })
}

ElasticClient.prototype.initIndex = function (indexName) {
  return this.elasticClient.indices.create({
    index: indexName
  })
}

ElasticClient.prototype.deleteIndex = function (indexName) {
  return this.elasticClient.indices.create({
    index: indexName
  })
}

ElasticClient.prototype.indexExists = function (indexName) {
  return this.elasticClient.indices.exists({
    index: indexName
  })
}

/**
 * prepare the index and its mapping
 * @param {Object} properties -
 *  map the data that is going to be stored in it
 *  e.g.:
 *  properties: {
 *    title: { type: "string" },
 *    content: { type: "string" },
 *    suggest: {
 *      type: "completion",
 *      analyzer: "simple",
 *      search_analyzer: "simple",
 *      payloads: true
 *    }
 *  }
 *
 */
ElasticClient.prototype.initMapping = function (indexName, properties) {
  return this.elasticClient.indices.putMapping({
    index: indexName,
    type: 'document',
    body: {
      properties: properties
    }
  })
}

ElasticClient.prototype.addDocument = function (indexName, body) {
  return this.elasticClient.index({
    index: indexName,
    type: 'document',
    body: body
  })
}

var ElasticSearch = function () {
}

ElasticSearch.getInstance = function () {
  // Singleton pattern
  if (this.instance === undefined) {
    this.instance = new ElasticClient()
  }
  return this.instance
}


module.exports = ElasticSearch
