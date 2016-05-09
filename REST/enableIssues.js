var request = require('request');
var fs = require("fs");
var Promise = require('bluebird');
var parse = require('parse-link-header');

var token = "token " + "YOUR TOKEN";

listReposInOrg("engr-csc326-spring2016", function(names)
{
	console.log(names);

	for( var i = 0; i < names.length; i++ )
	{
		enableIssues("engr-csc326-spring2016", names[i]);
	}
});

function listReposInOrg(name, onDone)
{

	var options = {
		url: 'https://github.ncsu.edu/api/v3/orgs/'+name+'/repos',
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	var names = [];


	request(options, function (error, response, body) {

		var obj = JSON.parse(body);
		console.log( obj.length );
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			//console.log( name );
			names.push(name);
		}


		// get next repos:
		//link: '<https://github.ncsu.edu/api/v3/organizations/4907/repos?page=2>; rel="next", <https://github.ncsu.edu/api/v3/organizations/4907/repos?page=8>; rel="last"',
		var parsed = parse(response.headers['link']);
		var next = parseInt(parsed.next.page);
		var last = parseInt(parsed.last.page);
		options.url = parsed.next.url;

		promiseWhile(function() {
   		// Condition for stopping
    		return next <= last;
		}, function() {
			// Action to run, should return a promise
		   return new Promise(function(resolve, reject) {

			  	console.log( options.url )

		   	request(options, function (error, response, body) {

			      next++;
			   	options.url = options.url.replace(/page=(\d+)/, "page=" + next);
			   
					var obj = JSON.parse(body);
					console.log( obj.length );
					for( var i = 0; i < obj.length; i++ )
					{
						var name = obj[i].name;
						//console.log( name );
						names.push(name);


					}

			   	// mark current promise done.
			      resolve();

		   	});

		   });
		}).then(function() {
		    // Notice we can chain it because it's a Promise, 
		    // this will run after completion of the promiseWhile Promise!
		    console.log("Done");

		    onDone(names);
		});
	});

}


function enableIssues(org, name)
{
	var options = {
		url: 'https://github.ncsu.edu/api/v3/repos/'+org+'/' + name,
		method: 'PATCH',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		json: {
			"name": name,
			"has_issues": "true"
		}
	};

	request(options, function (error, response, body) {

		if( body )
		{
			console.log( body.name, body.has_issues);
		}

	});
}

// http://blog.victorquinn.com/javascript-promise-while-loop
var promiseWhile = function(condition, action) {
    var resolver = Promise.defer();

    var loop = function() {
        if (!condition()) return resolver.resolve();
        return Promise.cast(action())
            .then(loop)
            .catch(resolver.reject);
    };

    process.nextTick(loop);

    return resolver.promise;
};
