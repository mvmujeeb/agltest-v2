(function(factory, globalScope) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define("agl", [], factory);
    } else {
        // keeps module object in global scope
        globalScope.agl = factory();
    }
})(function agl() {
    //var serviceUrl = "data.json";
    var serviceUrl = "http://agl-developer-test.azurewebsites.net/people.json";
    var catTypeFilter = 'Cat';
    var agl = {
        /*
         Filters cats
         */
        filterCat: function(cat) {
            if (cat.type == catTypeFilter) {
                return true;
            } else {
                return false;
            }
        },

        /*
         Does string sort based on the cat name from the set of cats object array
         */
        sortitems: function(compare, compateTo) {
            var compareName = compare.name.toLowerCase();
            var compateToName = compateTo.name.toLowerCase();
            return ((compareName < compateToName) ? -1 : ((compareName > compateToName) ? 1 : 0));
        },

        /*
        Handles the presentation
        */
        displayData: function(data) {
            var html = "";
            var that = this;
            $.each(data, function(key, cats) {
                cats.sort(that.sortitems);
                html += "<h3>" + key + "</h3><ul>";
                $.each(cats, function(key, cat) {

                    html += "<li>" + cat.name + "</li>";
                });
                html += "</ul>";
            });
            $("#container").html(html);
        },

        /*
        Filters data based on the gender
        */
        processData: function(data) {
            var cats = {};
            var that = agl;
            $.each(data, function(key, item) {
                cats[item.gender] = cats[item.gender] || [];
                if (item.pets) {
                    cats[item.gender] = cats[item.gender].concat(item.pets.filter(agl.filterCat));
                }
            });
            agl.displayData(cats);
            return cats;

        },

        /*
        Error Calback
        */
        error: function(error, exception) {
            if (error.status === 0) {
                alert('Unable to connect to server stay tuned.');
            } else if (error.status == 404) {
                alert('Requested page not found');
            } else if (error.status == 500) {
                alert('We are unable to process your request please try again later');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else {
                alert('Uncaught Error' + error.responseText);
            }
        },



        /*
        handles REST call 
        Use dataType=jsonp  for  crossdomain REST call
        */
        syncData: function(callbacks) {
            var that = this;
            $.ajax({
                    url: serviceUrl,
                    type: "GET",
                    cache: false,
                    dataType: "json"
                })
                .done(function(data) {
                    callbacks.successCallback(data);
                })
                .fail(function(error) {
                    callbacks.errorCallback(error);
                })
        }

    };
    var callbacks = {
        successCallback: agl.processData,
        errorCallback: agl.error,
    };
    agl.syncData(callbacks);
    return agl;
}, this);