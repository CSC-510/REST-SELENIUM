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

Edit script.js to replace "YOUR TOKEN" with your generated token and your github username.

Now run the script. You should be able to see a list of your repos (may be empty, we'll fix that!).

```
node script.js
```

The code makes a call to get all of a user's repos.

```
   var options = {
		url: 'https://api.github.com/user/users/' + userName + "/repos",
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
curl --request GET -H "Authorization: token YOURTOKEN" https://api.github.com/user/repos

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

*Scrapping* is a process for acquiring content through a scripted browser or user agent. There are many tools that support scrapping, such as [beautifulsoup](http://web.stanford.edu/~zlotnick/TextAsData/Web_Scraping_with_Beautiful_Soup.html). Scrapping can get tricky because content that you want may be deeply nested in a web page or it may be hidden behind several pages that require filling out forms or stepping through user interfaces.

For this workshop, will practice using Selenium, which is a powerful tool for scripting web browsers, such as Chrome.

### Setup

Preq: Make sure you have an [Eclipse environment with Maven](https://github.com/REU-SOS/EngineeringBasics).

* From Eclipse, use Import Existing Maven project. Locate Selenium folder and import.
* Run JUnit tests and make sure you can see 2 passing test cases.

### XPath

In a browser, a html page is represented by DOM, a document model consisting of a tree of elements, attributes, and values. XPath is a tree selector language that makes it easy to write a query to select all elements that match a criteria.

Let's play around in Chrome's console.  Search for anything, and go to google's search result page.  In a console, type: `$x("//a")`. This allows us to use a xpath expression to select all links.

**Exercise**: How could could you select search results links?

**Quick reference**:

* `//` Select all ancestors.
* `/` Select child
* `..` Select parent
* `//a[@data-href]` Select all links that have an attribute "data-href".
* `//h2[.='Search Results']` Select all h2 elements with value = "Search Results".
* `//h2/following-sibling::div"` Select the sibiling div after a h2 element.

### Using Selenium

Now that we know how to select elements. Lets automate the process of interacting and clicking through a webpage.

Will will use Selenium to locate several properties from the following site: http://checkbox.io/studies.html

We will walk through one example, and you will do the rest on your own:

* 1. The participant count of "Frustration of Software Developers" is 55
* 2. The total number of studies closed is 5.
* 3. If a status of a study is open, you can click on a "Participate" button.
* 4. You can enter text into this study (don't *actually* submit, or you can't run test again!): http://checkbox.io/studies/?id=569e667f12101f8a12000001
