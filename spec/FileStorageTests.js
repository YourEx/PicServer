var fs = require('fs');
var UploadRequest = require('./../Schema/UploadRequest');
var FileStorage = require('./../FileStorage');
var assert = require("assert");

describe('Cloud files:', function(){
  this.timeout(5000);
  var self = this;    
  before(function(done) {         
    this.fileStorage = new FileStorage()     
    this.fileStorage.init()
      .then(this.fileStorage.deleteAllFiles.bind(this.fileStorage))
      .then(done)
      .catch(done);
  });

  function checkIfUploaded(num, done){
    return function(){            
      self.ctx.fileStorage.getContainer().getFiles(
        function(error, files){                       
            assert.equal(files.length, num);            
            done();
       });
     }
  };

   function checkFileStorageResult(fileName, contentType, format){
    return function(result){            
      assert.equal(fileName, result.fileName);
      assert.equal(contentType, result.contentType);
      assert.equal(format, result.format);            
     }
  };

  it('should upload a file from the stream', function(done){           
    var stream = fs.createReadStream('./samples/pic.jpg');  
    this.fileStorage.upload('file_name', stream)      
      .then(checkFileStorageResult('file_name', 'image/jpeg', 'JPEG'))
      .then(checkIfUploaded(1, done))
      .catch(done);
  });

  it('should upload a picture and generate 3 thubnails', function(done){           
    var stream = fs.createReadStream('./samples/pic.jpg');        
    this.fileStorage.uploadWithThubnails('file_name', stream)
      .then(checkIfUploaded(3, done))
      .catch(done);
  });
  

  return;
  it('should return user container', function(){	        
    var container = this.fileStorage.getContainer();
    assert.notEqual(container, null);
  });
      
  it('should generate uploadRequests', function(){     
    var reqs = this.fileStorage.createRequestUpload(2);
    assert.equal(reqs.length, 2);    
  });

 /* it('should generate file URLs for GET', function(done){       
    var container = this.fileStorage.getContainer();
    var self = this;
    container.getFiles(function(error, files){      
      var urls = self.fileStorage.getUrl(files);
      assert.equal(urls.length, 1);                  
      done();
    });
  });*/
})











