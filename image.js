var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

debugger;


var p = new Promise(function(resolve, reject){
    throw Error('mama');
});

p.catch(function(err){
  console.log('error');
  throw err;
})
.then(function(){

})
.catch(function(err){
  console.log('error2');
});


var writeStream2 = fs.createWriteStream('resize3.png');
var writeStream3 = fs.createWriteStream('resize2.png');


var aa = gm('pic.jpg').identify(function(data){
  debugger;
});


var stream = gm('pic.jpg')
	.resize(240, 240)
	.stream();

stream.pipe(writeStream2);

stream = gm(stream)
	.resize(40, 40)
	.stream();
	
stream.pipe(writeStream3);

gm(stream).identify(function(err, data){
  debugger;
})



/*
var stream = gm('pic.jpg')
.resize(240, 240)
.stream('jpg',function (err, stdout, stderr) {
  var writeStream = fs.createWriteStream('resize.png');
  stdout.pipe(writeStream);
});



//stream.pipe(writeStream2);

gm(stream, 'jpg').resize(40, 40).stream('jpg', function(err, stdout, stderr){
	var writeStream = fs.createWriteStream('C:\\Users\\Administrator\\Documents\\NodePlayground\\resize2.png');
  	stdout.pipe(writeStream);
});

/*write('C:\\Users\\Administrator\\Documents\\NodePlayground\\resize2.png', function (err) {
  if (!err) console.log('done');
  console.log(err);  
});*/

/*.write('C:\\Users\\Administrator\\Documents\\NodePlayground\\resize.png', function (err) {
  if (!err) console.log('done');
  console.log(err);  
});*/



//gm('/path/to/my/img.jpg')
//.resize('200', '200')

