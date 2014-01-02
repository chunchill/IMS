/// <reference path="../mock/data.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
/// <reference path="../staticdata.js" />
(function (IMS, $, undefined) {
    IMS.TempAppointmentViewModel = function () {
        var self = this;
        self.carInformation = {
            driver : ko.observable(),
            mobile : ko.observable(),
            vehicleType: ko.observable(),
            vehicleLicenseNumber:ko.observable(),
            vehicleAbbrev:ko.observable(),
            vehicleTypeOptions : IMS.staticData.carTypes,
            provincesOptions: IMS.staticData.provinceAbbreviation,
            //the next step click action
             nextStepToAddDeliverOrderPage : function () {
                $.mobile.changePage("#theSecondStepView");
            }
        };

        self.carInformation.vehicleLicense = ko.computed(function () {
            return self.carInformation.vehicleAbbrev() + self.carInformation.vehicleLicenseNumber();
        }, self.carInformation);


        self.deliveryOrderInformation = {
            vendorCode: ko.observable(),
            deliveryNoteIdToAdd: ko.observable(),
            deliveryNoteId: ko.observableArray([])
        };
        self.deliveryOrderInformation.deliveryNoteCount = ko.observable(0);

        //add one deliveryNote to the list
        self.deliveryOrderInformation.addOneDeliveryNoteId = function () {
            self.deliveryOrderInformation.deliveryNoteId.push(self.deliveryOrderInformation.deliveryNoteIdToAdd());
            self.deliveryOrderInformation.deliveryNoteCount(self.deliveryOrderInformation.deliveryNoteId().length);
        };

        //remove one deliveryNote from the list
        self.deliveryOrderInformation.removeOneDeliveryId = function (note) {
            self.deliveryOrderInformation.deliveryNoteId.remove(note);
        };

        self.goBackToCarInformationPage = function () {
            $.mobile.changePage("#theFirstStepView");
        };

        self.nextStepToSubmitPage = function () {
            $.mobile.changePage("#theThirdStepView");
        };

        self.goBackToDeliveryOrderInformation = function () {
            $.mobile.changePage("#theSecondStepView");
        };

        var getCurrentformatedDateString = function (withTime) {
            var date = new Date();
            if (withTime)
            {
                date.setHours(23, 59, 59);
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            }
            return moment(date).format("YYYY-MM-DD");
        }
        self.sucessfullAppointmentId = ko.observable();
        self.submit = function () {
            var option = {
                key: 'key0001',
                driver: encodeURI(self.carInformation.driver()),
                mobile: self.carInformation.mobile(),
                vendorCode: self.deliveryOrderInformation.vendorCode(),
                vehicleType: encodeURI(self.carInformation.vehicleType()),
                vehicleLicense: encodeURI(self.carInformation.vehicleLicense()),
                vehicleType: 'A',
                vehicleLicense: '25865',
                pDate: getCurrentformatedDateString(false),
                pETime: getCurrentformatedDateString(true),
                pLTime: getCurrentformatedDateString(true),
                deliveryNoteId: self.deliveryOrderInformation.deliveryNoteId()
            };
            IMS.datacontext.appointment.createNewAppointment(option).then(function (result) {
                if (result.errorMessage !== '') {
                    $.mobile.changePage("#resultView");
                    self.sucessfullAppointmentId(result.errorMessage);
                }
            }, function () {
                $("#popupMessage").popup();
                $("#popupMessage").popup("open");
            });
        };

      
    }
    return IMS.TempAppointmentViewModel;
})(window.IMS = window.IMS || {}, jQuery);

