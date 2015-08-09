var pkgcloud = require('pkgcloud');
var async = require("async");
var crypto = require('crypto');
//var Promise = require('promise');
var util = require('util');
var extend = require('util')._extend;
var gm = require('gm').subClass({imageMagick: true});
var cfg = require('./cfg');

var client = pkgcloud.storage.createClient(cfg);

var KEY = "alex the god";

var FileStorageResult = function(json){
  this.fileName = json.fileName,
  this.size = json.size;
  this.contentType = json.contentType;
  this.format = json.format;
}

var FileStorage = function(){
  this._container = null;
}

FileStorage.prototype = {

  deleteAllFiles: function(){
    var self = this;    
    return new Promise(function(resolve, reject){      
      self._container.getFiles(function(error, files){         
        if(error) reject(error);        
        client.bulkDelete(self._container, files, function(error){          
            if(error) reject(error)
            resolve();
        });
      });
    });
  },

  uploadWithThubnails: function(fileName, stream){
    try{
        var sizes = [{height: 1024, width: 768}, {height: 200, width: 200}];    
        var promises = [this.upload(fileName, stream)];
        for(var i = 0; i < sizes.length; i++){      
          var thubName = getThubFileName(fileName, sizes[i]);
          var stream = gm(stream)
                        .resize(sizes[i].width, sizes[i].height, "<")                        
                        .stream();
                                            
          promises.push(this.upload(thubName, stream));            
       }

      return Promise.all(promises);
    }catch(err){
      return Promise.reject(err);
    }    
  },

  upload: function(fileName, stream){        
    var self = this;        
    return new Promise(function(resolve, reject){
      // get picture metadata and then upload to the file storage
      gm(stream).identify(function(err, data){
        if(err) reject(new Error('Failed to retrieve image metadata'));
        var upload = client.upload({
          container: self._container.name,       
          remote: fileName
        });

        upload.on('error', reject);
        upload.on('success', resolve.bind(null, data));
        stream.pipe(upload);                          
      });  
    }).
    then(function(metadata){
        console.log('File "' + fileName + '" has been succefully uploaded');        
        return new FileStorageResult(
          { 
            fileName: fileName,
            contentType: metadata["Mime type"],
            format: metadata["format"],
            size: metadata["size"]
          });
    })
    .catch(function(err){
        console.log('Failed to upload file "'+ fileName+ '" ' + err);
        throw err;
    });
  },


  userStorage: function(files){
    files = files || [];
  },

  createRequestUpload: function(num){
    var reqs = [];
    for(var i = 0; i < num; i++){
      reqs.push(this._generateUrl({            
            verb: 'POST'
          }));
     }

    return reqs;
  },

  getUrl: function(files){
    files = files || [];
    var urls = [];
    for(var i = 0; i < files.length; i++){
      urls.push(this._generateUrl({
          fileName: files[i].name,
          verb: 'GET'
        }));
    }

    return urls;
  },

  getContainer: function(){
    this._ensureIfInitialized();
    return this._container;
  },

  init: function(){
    var self = this;
    return new Promise(function(resolve, reject){
       async.waterfall(      
        [
          function(callback){                  
            client.auth(callback);
          },

          function(callback){    
             client.setTemporaryUrlKey(KEY, callback);
          },
          
          function(callback){    
            client.createContainer({
              name: 'sample-container-test2',
              metadata: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'    
              }
            }, 
            callback);
          },

          function(container, callback){    
            self._container = container;
            callback();
          }
        ],

        function(err){            
          if(err) {           
              reject(err);
          }        

          self._isInitialized = true;

          resolve()
        });
     });
  },

   _ensureIfInitialized: function(){
    if(!this._isInitialized){
      throw Error('FileStorage is not initialized')
    }
  },

  _generateUrl: function(options){
    this._ensureIfInitialized();

    options = extend({
      num: 1,
      verb: "GET",      
      timeout: 600
    }, options);
    
    var url = [];
    var filename = options.fileName || 'pic'+crypto.randomBytes(4).readUInt32LE(0);

    client.generateTempUrl(
        this._container, 
        filename, 
        options.verb, 
        options.timeout, 
        KEY, 
        function(x, val){
          url = val;
      })
    
    return url;
  }
}

function getThubFileName(fileName, size){
  return fileName + '_h=' + size.height + '_w=' + size.width;
}
  
module.exports = FileStorage;

