# DataCollection

Data scrapping and REST apis

### REST

You will get practice interacting with a REST API in order to collect data.

**PLEASE REVIEW SLIDES**: https://github.com/CSC-326/Course/raw/master/Slides/RESTAPI_Frameworks.pptx

We'll test being able to use [github's REST api](https://developer.github.com/v3/) for programmatically interacting with repos.

1. Get a token. Go to your profile page on ncsu github.

![image](https://cloud.githubusercontent.com/assets/742934/12955762/8d8ae346-cff2-11e5-83ac-21cae5dc8531.png)

![image](https://cloud.githubusercontent.com/assets/742934/12955783/a741d0b0-cff2-11e5-9f95-4cfebe421756.png)

2. Download and build this sample code:

   1. git clone https://github.com/CSC-326/GithubREST
   2. npm install
   3. edit script.js to replace "YOUR TOKEN" with your generated token.
   4. node script.js

The code makes a call to get all a users repo.

```
   var options = {
		url: 'https://github.ncsu.edu/api/v3/users/' + userName + "/repos",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};
```

3. Replace with your unityId

4. Write code for listBranches in a given repo under an owner. See [list branches](https://developer.github.com/v3/repos/#list-branches)

5. Finally, see if you can [create a new repo](https://developer.github.com/v3/repos/#create). Note, you'll have to use the POST verb instead of GET.

**HINT:** You can debug REST api calls using curl. Just replace the request --parameter with your METHOD (e.g. GET or POST). You don't need --data if you're not using POST/PATCH:

```
curl --request PATCH -H "Authorization: token YOURTOKEN" --data '{"name":"hw4","has_issues":"true"}' https://github.ncsu.edu/api/v3/repos/cjparnin/hw4
```
