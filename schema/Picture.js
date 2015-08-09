var mongoose = require('./../db');

var pictureSchema = new mongoose.Schema({
  name:  String,  
  url: String,  
  contentType: String,
  height: Number,
  width: Number,
  thumbnails: [],
  creationDate : { type: Date, default: Date.now },
  modificationDate : { type: Date, default: Date.now },
  userId:  mongoose.Schema.ObjectId
});

pictureSchema.methods = {		  
	addThumb: function(url, height, width){
		this.thumbnails.push({
			url: url,
			height: height,
			width: width
		});
	}
}

pictureSchema.statics = {		  
	create: function(fileStorageResult){
		return new this({
			url: fileStorageResult.fileName,
			width: fileStorageResult.width,
			height: fileStorageResult.height,
			contentType: fileStorageResult.contentType
  		});				
	}
};
  
module.exports = mongoose.model("Picture", pictureSchema);