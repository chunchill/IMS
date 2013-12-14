
//Test API: getLastLocGeoAll
asyncTest("getLastLocGeoAll", 1, function () {
    IMS.datacontext.location.getLastLocGeoAll().then(function (result) {
        if (result.errorMessage !== 'NO_DATA') {
            ok(result.length > 0, "we have got " + result.length + " records when calling getLastLocGeoAll API")
            start();
        }
    });
});

//Test API: getLocGeoAll
asyncTest("getLocGeoAll", 1, function () {
    var options = { appId: '1000000', mobile: '10001001', startTS: '2013-12-13 08:00:00', endTS: '2013-12-13 11:00:00' };
    IMS.datacontext.location.getLocGeoAll(options).then(function (result) {
        if (result.errorMessage !== 'NO_DATA') {
            ok(result.length > 0, "we have got " + result.length + " records when calling getLocGeoAll API")
            start();
        }
    });
});

//Test API: getLastLocGeo
asyncTest("getLastLocGeo", 1, function () {
    var options = { appId: '1000000'};
    IMS.datacontext.location.getLastLocGeo(options).then(function (result) {
        if (result.errorMessage !== 'NO_DATA') {
            ok(true, "we have got " + result.mobile + "'s record when calling getLastLocGeo API")
            start();
        }
    });
});