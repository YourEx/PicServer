
var fs = require('fs');
var pkgcloud = require('pkgcloud');
var async = require("async");
var express = require('express');
var app = express();
//var storage = require("./cloudStorage")


var FileStorage = require('./FileStorage');
debugger;
var fileStorage = new FileStorage();;
fileStorage.init().then(function(){
  console.log('perfect!');

}).catch(function(err){
  console.log(err);
})

/*app.use(storage.init);

app.get('/upload/request', function(req, res){          
  req.cloud.getUploadRequest(req,res);  
});

app.get('*', function (req, res) {
    res.sendfile(__dirname + "\\index-debug.html");          
});

app.listen(80); 
*/

/*client.getContainers(function (err, containers) {
  if (err) {
    console.dir(err);
    return;
  }
  
  debugger;
  _.each(containers, function(container) {
    console.log(container.name);
  });

});




/*
// 2 -- to list our containers
client.getContainers(function (err, containers) {
  if (err) {
    console.dir(err);
    return;
  }

  _.each(containers, function(container) {
    console.log(container.name);
  });

});

// 3 -- to create a container and upload a file to it
client.createContainer({
  name: 'sample-container',
  metadata: {
    callme: 'maybe'
  }
}, function (err, container) {
  if (err) {
    console.dir(err);
    return;
  }

  var myPicture = fs.createReadStream('/path/to/some/file/picture.jpg');

  var upload = client.upload({
    container: container.name,
    remote: 'profile-picture.jpg'
  });

  upload.on('error', function(err) {
    console.error(err);
  });

  upload.on('success', function(file) {
    console.log(file.toJSON());
  });

  myPicture.pipe(upload);
});

// 4 -- setup container as CDN
client.getContainer('container-name', function (err, container) {
  if(err){
    console.log('There was an error retrieving container:\n');
    console.dir(err);
    return;
  }

  container.enableCdn(function (error, cont) {
    if (error) {
      console.log('There was an error setting container as CDN:\n');
      console.dir(error);
      return;
    }
    console.log('Successfully set bucket as CDN bucket');
    console.log(cont);
  });  
});

// 5 -- to get a container, empty it, then finally destroying it
client.getContainer('sample-container', function (err, container) {
  if (err) {
    console.dir(err);
    return;
  }

  // destroying a container automatically calls the remove file API to empty before delete
  client.destroyContainer(container, function (err, result) {
    if (err) {
      console.dir(err);
      return;
    }

    console.log('Container ' + container.name + ' was successfully destroyed.');
    console.log(result);
  });
});




// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function PostCode(codestring) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'https://identity.api.rackspacecloud.com/v2.0/tokens',

      method: 'POST',
      body: {"auth":{"passwordCredentials":{"username":"alex.kontsevoy","password":"$m00thProtect@!!"}}},
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
    }

PostCode("d");



/*var request = require('request');

request.post(
    'identity.api.rackspacecloud.com/v2.0/tokens',
    {"auth":{"passwordCredentials":{"username":"alex.kontsevoy","password":"$m00thProtect@!!"}}},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);

  */




