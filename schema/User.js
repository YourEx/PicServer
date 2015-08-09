var mongoose = require('./../db');
var extend = require('util')._extend;
var Album = require('./Album');
var Picture = require('./Picture');
var ObjectId = mongoose.Types.ObjectId;
        
var userSchema = new mongoose.Schema({
  name:  String,  
  email: String,
  albums: [Album.schema],            
  creationDate : { type: Date, default: Date.now },
  modificationDate : { type: Date, default: Date.now }  
});

extend(userSchema.statics, {
  create: function(options){    
    options = options || {}
    options = extend(options, { albums: [{ name: 'default'}] });
    return new this(options);
  },

  addFile: function(albumId, fsResults){
    var file = Picture.create(fsResults[0]);
    for(var i = 1; i < fsResults.length; i++){
      file.addThumb(
        fsResults[i].fileName, 
        fsResults[i].height, 
        fsResults[i].width);
    };

    return new Promise(function(resolve, reject){      
      User.update(
        { 'albums._id' : new ObjectId(albumId) },      
        { '$push': { 'albums.$.photos': file } },
        function(err, data){
          if(err) {
            console.log('error' + err);
            reject(err);
          }else{
            console.log(err);
            resolve(data);
          }
        });
    });
  },

  removeFile: function(albumId, fileQuery){
    return new Promise(function(resolve, reject){      
      User.update(
        { 'albums._id' : new ObjectId(albumId) },      
        { '$pull': { 'albums.$.photos': fileQuery } },

        function(err, data){
          if(err) {
            console.log('error' + err);
            reject(err);
          }else{
            console.log(err);
            resolve(data);
          }
        });
    });
  }

});

var User = module.exports = mongoose.model("User", userSchema);

var fsResults = [
    { 
      fileName: 'aaa',
      width: 300,
      height: 200,
      contentType: 'fdsfd'
    },
    { 
      fileName: 'thubm',
      width: 10,
      height: 10,
      contentType: 'fdsfd'
    }
]


var albumId = '55afe511b8fc90f41813b3c2';

//User.removeFile(albumId, { _id : new ObjectId('55b0fd11e5b6a79c1a45980a')});
//User.removeFile(albumId, { width : 300});

debugger;
//User.addFile(albumId, fsResults).then(function(data){  
//  console.log(data);
//});


User.find( 
  {
     'albums._id' : new mongoose.Types.ObjectId(albumId)  
  },   {'albums.photos.thumbnails' : 1 },
  function(err, data){
    debugger;
    if (err) console.log(err);
    console.log(data[0].albums[0].photos);    
});

setTimeout(function(){
  mongoose.disconnect();
}, 2000);


return;


var user = User.create();
var album = new Album();//{name: 'alex'});

/*album.save(function(err, data){
     if(err) console.log(err);
     else console.log(data);

      debugger;
  });*/

/*User.find( {}, function(err, data){
    if (err) console.log(err);
    console.log(data);
});
555afea4f5d1f5994207688ee
return;*/

debugger;
User.update( 
  {
     'albums._id' : new mongoose.Types.ObjectId('55afea4f5d1f5994207688ee')  
  }, 
  {
      $set: {
        'albums.$.name': 'default'
      }
  },
  function(err, data){
    if (err) console.log(err);
    console.log(data);
});

User.find( 
  {
     'albums._id' : new mongoose.Types.ObjectId('55afea4f5d1f5994207688ee')  
  },   
  function(err, data){
    if (err) console.log(err);
    console.log(data);
});

return;

user.save(function(err, data){
     if(err) console.log(err);
     else console.log(data);
      debugger;
  });