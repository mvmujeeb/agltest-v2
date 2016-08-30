describe("AGL Specs", function() {
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
        var callbacks = {
            successCallback: jasmine.createSpy(),
            errorCallback: jasmine.createSpy()
        };

        spyOn($, 'ajax').and.callFake(function() {
            var d = $.Deferred();
            d.resolve(mockResponse);
            return d.promise();
        });

        agl.syncData(callbacks);
        expect(callbacks.successCallback).toHaveBeenCalled();
        expect(callbacks.errorCallback).not.toHaveBeenCalled();
        var response = callbacks.successCallback.calls.mostRecent().args[0];
        expect(response[0].name).toEqual(mockResponse[0].name);
        done();
    });


    /**
     * Test for sort items 
     */
    it('should sort array', function(done) {
        var sortArray = ['b', 'a', 'c'];
        sortArray.sort(agl.sortItems);
        expect(sortArray[0]).toEqual('a');
        done();
    });

    /**
     * Test for filter
     */
    it('should filter cats', function(done) {
        var filterType = "Cat";
        pets = mockResponse[3].pets.filter(agl.filterCat)
        expect(pets[2].type).toEqual(filterType);
        done();
    });

    /**
     * Test for processData 
     */
    it('should filter cats and sort', function(done) {
        var result = agl.processData(mockResponse);
        expect(result).toEqual(jasmine.any(Object));
        expect(result['Male']).toEqual(jasmine.any(Array));
        expect(result['Female']).toEqual(jasmine.any(Array));
        expect(result['Male'].length).not.toBe(0);
        expect(result['Male'][0].name).toEqual('Garfield');
        done();
    });
});