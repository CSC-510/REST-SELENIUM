# DataCollection

Data scrapping and REST apis

### REST

You will get practice interacting with a REST API in order to collect data. You can read more about REST apis [here](https://github.com/CSC-326/Course/raw/master/Slides/RESTAPI_Frameworks.pptx).


### 1. Get a token. 

Go to your profile page on github.

![image](https://cloud.githubusercontent.com/assets/742934/12955762/8d8ae346-cff2-11e5-83ac-21cae5dc8531.png)

![image](https://cloud.githubusercontent.com/assets/742934/12955783/a741d0b0-cff2-11e5-9f95-4cfebe421756.png)

<hr/>

### 2. Test sample code

This will install node packages into node_modules

```
npm install
```


   3. edit script.js to replace "YOUR TOKEN" with your generated token.
   4. node script.js

The code makes a call to get all a users repo.

```
   var options = {
		url: 'https://github.com/api/v3/users/' + userName + "/repos",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};
```

##### Debugging

You can also debug/implement REST api calls using `curl`. 

A simple example for getting all repos of authenicated user.

```
curl --request GET -H "Authorization: token YOURTOKEN" https://api.github.com/user/repos"

```

A more complex example: Change a repositories settings to have issue support.

```
curl --request PATCH -H "Authorization: token YOURTOKEN" --data '{"name":"hw4","has_issues":"true"}' https://api.github.com/repos/cjparnin/hw4
```

Tips for extending.

* `-H` allows you to set headers as part of your request.
* Just replace the `--request` with your METHOD (e.g., GET, POST). 
* You need `--data` when using POST/PATCH, that will be the data sent to the server.

### 3. On your own

You will do the following tasks:

* Write code for listBranches in a given repo under an owner. See [list branches](https://developer.github.com/v3/repos/#list-branches)
* Write code for [create a new repo](https://developer.github.com/v3/repos/#create)
* Write code for [creating an issue](https://developer.github.com/v3/issues/#create-an-issue) for an existing repo.
* Write code for [editing a repo](https://developer.github.com/v3/repos/#edit) to enable wiki support.




## Data Collection

Not every dataset will have a nice REST api allowing you to get data. In addition, sometimes rate limits, or missing data will make it necessary to try something else. Sometimes, you need to learn how to scrap data.

