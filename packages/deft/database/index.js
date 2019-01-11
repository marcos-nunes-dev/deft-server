const chalk = require('chalk');
const MongoClient = require('mongodb').MongoClient;

const DEFAULT_URL = 'mongodb://localhost:27017/deft';

class MongoDatabase {
  constructor(url) {
    this.url = url || DEFAULT_URL;
    this.db = null;
  }

  connect(url) {
    return new Promise((resolve, reject) => {
      if (url && this.url !== url && this.db !== null) {
        this.close();
        this.url = url;
      }
      if (this.db) {
        resolve(this.db);
      } else {
        MongoClient.connect(this.url, (err, client) => {
          if (err) {
            console.log(chalk.redBright('[DEFT:RAGE] ') + err);
            reject(err);
          }
          this.db = client.db('deft');
          console.log(chalk.hex('#00ec90').bold('[DEFT:RAGE] ') + 'Connected to ' + this.url);
          resolve(this.db);
        });
      }
    });
  }

  insert(collection,docs,options) {
    return new Promise((resolve) => {
      this.connect().then((db) => {
        db.collection(collection).insert(docs, options, function(err, res) {
          if (err) console.log(chalk.redBright('[DEFT:RAGE] ')+err);
          resolve(res);
        });
      });
    });
  };

  remove(collection,selector,options) {
    return new Promise((resolve) => {
      this.connect().then((db) => {
        db.collection(collection).remove(selector, options, function(err, res) {
          if (err) console.log(chalk.redBright('[DEFT:RAGE] ')+err);
          resolve(res);
        });
      });
    });
  };

  save(collection,doc,options) {
    return new Promise((resolve) => {
      this.connect().then((db) => {
        db.collection(collection).save(doc, options, function(err, res) {
          if (err) console.log(chalk.redBright('[DEFT:RAGE] ')+err);
          resolve(res);
        });
      });
    });
  };

  update(collection,selector,doc,options) {
    return new Promise((resolve) => {
      this.connect().then((db) => {
        db.collection(collection).save(selector, doc, options, function(err, res) {
          if (err) console.log(chalk.redBright('[DEFT:RAGE] ')+err);
          resolve(res);
        });
      });
    });
  };

  find(collection,query,options) {
    return new Promise((resolve) => {
      this.connect().then((db) => {
        db.collection(collection).find(query,options).toArray(function(err, res) {
          if (err) console.log(chalk.redBright('[DEFT:RAGE] ')+err);
          resolve(res);
        });
      });
    });
  };
}

// Exposes a single instance to all the application
module.exports = new MongoDatabase().connect();
