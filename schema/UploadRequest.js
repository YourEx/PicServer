var mongoose = require('./../db');
var Schema = mongoose.Schema;
        
var StateEnum = {
  UPLOADING: 0,
  EXPIRED: 1,
  FINISHED: 3
};

var uploadsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId},  
  albumId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId},  
  url: String,
  state: { type: Number, default: StateEnum.UPLOADING },
  creationDate : { type: Date, default: Date.now }  
});

uploadsSchema.methods = {
  finish: function(){        
    var self = this;
    return new Promise(function(resolve, reject){      
      self.state = StateEnum.FINISHED;  
      self.save(function(err){
        if(err){
           console.log('Failed to update uploadRequest');
           reject();
        }

        console.log('Upload request has been updated');        
        resolve();
      })
    });    
  }
}

uploadsSchema.statics = {

		StateEnum : StateEnum,
    
		create: function(userId){
			return new this(
        {
          userId: userId,
  				url: new mongoose.Types.ObjectId().toString() + '.jpg'
  			});
		}
}

var upload = mongoose.model("Upload", uploadsSchema);

module.exports = upload;

// for debugging

upload.find({}).exec(function(a, data){
  debugger;
  console.log(data);
});

