
//Test API: getAppBriefListM
asyncTest("getAppointmentByMobile",1, function () {
    var option = { mobile: '15026613612', status: '0' };
    IMS.datacontext.appointment.getAppointmentByMobile(option).then(function (result) {
        if (result.errorMessage !== 'NO_DATA') {
            ok(result.length > 0, "we have got " + result.length + " records for the mobile #:15026613612")
            start();
        }
    });
});

//Test API: getAllShortParkingAppointments
asyncTest("getAllShortParkingAppointments", 1, function () {
    IMS.datacontext.appointment.getAllShortParkingAppointments().then(function (result) {
        if (result.errorMessage !== 'NO_DATA') {
            ok(true, "we have got " + result.length + " records short parking appointments")
            start();
        }
    });
});


//Test API: newApp
asyncTest("createNewAppointment", 1,function () {
    var option = {
        key: 'key0001',
        driver: 'TOM',
        mobile: '13879047702',
        vendorCode: 'v0007',
        vehicleType: 'A',
        vehicleLicense: '25865',
        pDate: '2013-12-12',
        pETime: '2013-12-12  11:00:00',
        pLTime: '2013-12-12  13:00:00',
        deliveryNoteId: ['20000', '20001']
    };
    setTimeout(function () {
        IMS.datacontext.appointment.createNewAppointment(option).then(function (result) {
            if (result.errorMessage !== '') {
                ok(result.errorMessage !== '', "successfully create one record by using newApp API!");
                start();
            }
        });
    }, 1000);
  
});
