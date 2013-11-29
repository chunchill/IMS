/// <reference path="../../lib/knockout.mapping-latest.debug.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
(function (IMS,$,ko,undefined) {
    IMS.ReservationDetailViewModel = function () {
        var self = this;
        self.orderItemID = ko.observable();
        self.status = ko.observable();
        self.deliveryOrders = ko.observableArray();
        self.basicInformation ={
            driver: ko.observable(),
            phone: ko.observable(),
            carNumber: ko.observable(),
            carType: ko.observable(),
            arrivalDate: ko.observable(),
            earliestTime: ko.observable(),
            latestTime: ko.observable(),
        };
        self.init = function (orderItem) {
            ko.mapping.fromJS(IMS.mockData.mockedDetailOrder.basicInformation, {}, self.basicInformation);
            self.orderItemID(IMS.mockData.mockedDetailOrder.orderItemID);
            self.deliveryOrders(IMS.mockData.mockedDetailOrder.deliveryOrders);
            self.status(IMS.mockData.mockedDetailOrder.status);
        };
    }
    return IMS.ReservationDetailViewModel;
})(window.IMS = window.IMS || {}, jQuery,ko,undefined);