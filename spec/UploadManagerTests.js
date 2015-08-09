var fs = require('fs');
var UploadManager = require('./../UploadManager');
var User = require('./../Schema/User');
var UploadRequest = require('./../schema/UploadRequest');
var assert = require("assert");

describe('UploadManager', function(){	 

	before(function(done){

		UploadRequest.remove().exec(function(err, data){			
			done(err);
		});
	});
	
	var user  = new User({
		name: 'zip.tower',
		email: 'test@test.com'
	});

	var manager = new UploadManager(user);		 	
	 
	it('should create upload request', function(done){	        	 			 	
	 	manager.createUploadRequest().then(function(uploadReq){		 		
			assert.equal(user._id.toString(), uploadReq.userId.toString());	 			
			assert.equal(UploadRequest.StateEnum.UPLOADING, uploadReq.state);	 		
 			done();
 		});	    
  	});

	it('should use uploadRequest object and a stream to upload the image', function(done){				
		var stream = fs.createReadStream('./samples/pic.jpg');
		var upReq = UploadRequest.create(user);			
		manager.fileStorage.init().then(function(){				
			manager.upload(upReq, stream).then(done);
		}).catch(done);
	});
	
	
	/*it('should process and upload the image', function(done){	        	 			
		var readStream = fs.createReadStream('./samples/pic.jpeg');
		var manager = new UploadManager();
		manager.process(steam).then(function(){
			done();
		})

	});*/

});
    
