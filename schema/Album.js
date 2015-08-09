var mongoose = require('./../db');
var Picture = require('./Picture');
  

var albumSchema = new mongoose.Schema({
  name:  {type: String, required: true, default: function(){
     return 'zaza';
  } },
  photos: [Picture.schema],
  albumUsers: [],
  owner: mongoose.Schema.ObjectId,
  creationDate : { type: Date, default: Date.now },
  modificationDate : { type: Date, default: Date.now },
  newContentDate : { type: Date, default: Date.now }  
});

albumSchema.methods = {
	add: function(photo){
		this.photos.push(photo);
		return this.save();		
	}
}

var Album = module.exports = mongoose.model("Album", albumSchema);




/*
Album.remove({}, function(){  
    var a = new Album(); 
    
    a.photos.push( Picture.create({ url: 44, width: false}));
     debugger;
    a.save(function(err, data){
       if(err) console.log(err);
      debugger;


           Album.find({}).exec(function(a, data){
              debugger;
              console.log(data);
          });

    });

});

*/