# AGL Test

New features:

1 - Test specs added
2 - Moved all dippendancies to local(CDN takes time to load)
3 - init.js has been changed to modular pattern design.
4 - Written four tests, to run the tests run the index-spec.html(https://github.com/mvmujeeb/agltest-v2/blob/master/index-specs.html) and the tests are placed in the init-spec.js(https://github.com/mvmujeeb/agltest-v2/blob/master/init-specs.js)

Dependancy: jquery 
Test Dependancy: jquery, Jasmin (jasmine.js, jasmine-html.js, boot.js and jasmine.css)

Technologies/Libraries Used: jquery,  JavaScript and Jasmine(for testing)

Since this is a simple application I did not used any JavaScript frameworks like angular, Backbone, etc. As I discussed in the meeting I am very passionate about the pure JavaScript here I am following conventional HTML, JavaScript and for the REST integration I used jQuery.

I also did not used any test runner like Karma.js because only one javascript file is to be tested. 

AGL service mentioned in the instruction is in different domain so there will be cross domain error in the REST call.

You will be able to run the code by doing any of the following options.

Option 1: Run the code in safari by making following settings 1. safari -> preference -> advanced -> check "show develop menu in menu bar" 2. safari -> develop -> check "disable local file restrictions" See safari-settings.png for further details

Option 2: Run the index.html in chrome browser by disabling chrome web security. To disable web security need to locat chrome application and run the following command C:\Program Files (x86)\Google\Chrome\Application>chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

Option 3: Run the code by doing a workaround in the ajax request, this is not recommended one. replace dataType: "json",
by dataType: "jsonp",

Option 4: Run the service locally (use data.json), for this index.html should be updated like below

//var serviceUrl = "http://agl-developer-test.azurewebsites.net/people.json"; // serive Url var serviceUrl = "data.json";
