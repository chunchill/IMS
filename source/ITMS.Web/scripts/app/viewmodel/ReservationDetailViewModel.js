/// <reference path="../../lib/knockout.mapping-latest.debug.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
(function (IMS, $, ko, undefined) {
    IMS.ReservationDetailViewModel = function () {
        var self = this;
        self.applicationId = ko.observable();
        self.applicationStatus = ko.observable();
        self.deliveryOrders = ko.observableArray();
        self.isPlanedOrNot = ko.observable(false);
        self.basicInformation = {
            driverName: ko.observable(),
            mobileNo: ko.observable(),
            vehicleLicenseNo: ko.observable(),
            vehicleType: ko.observable(),
            planedDevelieryDate: ko.observable(),
            planedEarliestDevelieryDate: ko.observable(),
            planedLatestDevelieryDate: ko.observable(),
        };

        self.init = function (orderItem) {
            var option = { appId: orderItem.applicationId, key: 'key0001' };

            //bind the appointment header
            IMS.datacontext.appointment.getAppointmentHead(option).then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    result.driverName = decodeURI(result.driverName);
                    result.vehicleType = decodeURI(result.vehicleType);
                    result.vehicleLicenseNo = decodeURI(result.vehicleLicenseNo);
                    ko.mapping.fromJS(result, {}, self.basicInformation);
                }
                self.applicationId(result.applicationId);
                self.applicationStatus(result.applicationStatus);
                self.isPlanedOrNot(orderItem.status);
            });

            //bind the delivery items
            IMS.datacontext.appointment.getAppointmentDeliveryItems(option).then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    self.deliveryOrders(result);
                }
            });
        };

        self.excuteAppointment = function (data) {
            var option = { appId: +self.applicationId(), key: 'key0001', action: 1 };
            IMS.datacontext.appointment.excuteAppointment(option).then(function (result) {
                //alert(JSON.stringify(result));
                $('#popupconfirm').popup('close');
                $.mobile.changePage("#driverInputMobileView");
            }, function (result) {
                //alert(JSON.stringify(result))
                $('#popupMessage').popup();
                $('#popupMessage').popup('close');
                
            });

        };
    }
    return IMS.ReservationDetailViewModel;
})(window.IMS = window.IMS || {}, jQuery, ko, undefined);