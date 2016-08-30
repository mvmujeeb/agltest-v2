describe("AGL Specs", function() {
    // Uses one mock json for all purposes
    var mockResponse = [{
        "name": "Bob",
        "gender": "Male",
        "age": 23,
        "pets": [{
            "name": "Garfield",
            "type": "Cat"
        }, {
            "name": "Fido",
            "type": "Dog"
        }]
    }, {
        "name": "Jennifer",
        "gender": "Female",
        "age": 18,
        "pets": [{
            "name": "Garfield",
            "type": "Cat"
        }]
    }, {
        "name": "Steve",
        "gender": "Male",
        "age": 45,
        "pets": null
    }, {
        "name": "Fred",
        "gender": "Male",
        "age": 40,
        "pets": [{
            "name": "Tom",
            "type": "Cat"
        }, {
            "name": "Max",
            "type": "Cat"
        }, {
            "name": "Sam",
            "type": "Dog"
        }, {
            "name": "Jim",
            "type": "Cat"
        }]
    }, {
        "name": "Samantha",
        "gender": "Female",
        "age": 40,
        "pets": [{
            "name": "Tabby",
            "type": "Cat"
        }]
    }, {
        "name": "Alice",
        "gender": "Female",
        "age": 64,
        "pets": [{
            "name": "Simba",
            "type": "Cat"
        }, {
            "name": "Nemo",
            "type": "Fish"
        }]
    }];

    /**
     * Test for ajax request  and responce 
     * 
     */
    it('should recieve ajax success with responce', function(done) {

        // setting  spied callback
        var callbacks = {
            successCallback: jasmine.createSpy(),
            errorCallback: jasmine.createSpy()
        };

        // make fake call with moke response
        spyOn($, 'ajax').and.callFake(function() {
            var d = $.Deferred();
            d.resolve(mockResponse);
            return d.promise();
        });

        agl.syncData(callbacks); // access ajax method
        expect(callbacks.successCallback).toHaveBeenCalled(); // ensure successCallback
        expect(callbacks.errorCallback).not.toHaveBeenCalled(); // ensure error callback not called
        var response = callbacks.successCallback.calls.mostRecent().args[0]; // gets response
        expect(response[0].name).toEqual(mockResponse[0].name); // matching the responce
        done();
    });


    /**
     * Test for sort items 
     */
    it('should sort array', function(done) {
        var sortArray = ['b', 'a', 'c']; // defines an unsorted array
        sortArray.sort(agl.sortItems); // calls sort method
        expect(sortArray[0]).toEqual('a'); // checks first array element previously that was b and now it should be a 
        done();
    });

    /**
     * Test for filter
     */
    it('should filter cats', function(done) {
        var filterType = "Cat";
        pets = mockResponse[3].pets.filter(agl.filterCat) //filters cats from pets array
        expect(pets[2].type).toEqual(filterType);
        done();
    });

    /**
     * Test for processData 
     */
    it('should filter cats and sort', function(done) {
        var result = agl.processData(mockResponse); //calls processData with mockdata as input
        expect(result).toEqual(jasmine.any(Object)); // expects whole result as object
        expect(result['Male']).toEqual(jasmine.any(Array)); // expects result['Male'] as array
        expect(result['Female']).toEqual(jasmine.any(Array));
        expect(result['Male'].length).not.toBe(0); // expects result['Male'] array length greater than zero
        expect(result['Male'][0].name).toEqual('Garfield'); // checks sorted lists first cats name as 'Garfield'
        done();
    });
});
