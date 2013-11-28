/// <reference path="../mock/data.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
(function (IMS, $, undefined) {
    IMS.MyReservationViewModel = function () {
        var self = this;
        self.planedItems = ko.observableArray();
        self.unPlanedItems = ko.observableArray();

        self.planedItems(IMS.mockData.mockedReservation.planedItems);
        self.unPlanedItems(IMS.mockData.mockedReservation.unPlanedItems);

        //--public functions
        self.itemClicked = function (orderItem) {
            //alert(JSON.stringify(orderItem));
            reservationDetailModel.init(orderItem);
            $.mobile.changePage("#reservationDetailView");
        };
    }
    return IMS.MyReservationViewModel;
})(window.IMS = window.IMS || {}, jQuery);


   