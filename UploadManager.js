var UploadRequest = require('./schema/UploadRequest');
var FileStorage = require('./FileStorage');
var User = require('./schema/User');
          
var UploadManager = function(userId){
  this.userId = userId;
  this.fileStorage = new FileStorage();
}

UploadManager.prototype = {

  createUploadRequest: function(){
    var upload = UploadRequest.create(this.userId);      
    return upload.save();
  },

  upload: function(uploadReq, stream, albumId){    
    var self = this;
    return this.fileStorage
      .upload(uploadReq.url, stream)
      .then(uploadReq.finish.bind(uploadReq));          
  },

  _completeUpload: function(userId, albumId, fileStorageResults){

  }

  completeUpload: function(){
    User.update({user: userId}, )
  }

}

module.exports = UploadManager;

