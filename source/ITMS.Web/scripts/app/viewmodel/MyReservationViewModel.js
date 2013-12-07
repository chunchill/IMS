/// <reference path="../mock/data.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
(function (IMS, $, undefined) {
    IMS.MyReservationViewModel = function () {
        var self = this;
        self.planedItems = ko.observableArray();
        self.unPlanedItems = ko.observableArray();

        function addStatus(items, status) {
            items.forEach(function (item) {
                item.status = status;
            });
        }

        //--public functions
        self.itemClicked = function (orderItem) {
            reservationDetailModel.init(orderItem);
            $.mobile.changePage("#reservationDetailView");
        };

        self.init = function (mobile) {
            var option = { mobile: mobile, status: '0' };
            IMS.datacontext.appointment.getAppointmentByMobile(option).then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    addStatus(result, false);
                    self.planedItems(result)
                }
               
            });
            option = { mobile: mobile, status: '1' };
            IMS.datacontext.appointment.getAppointmentByMobile(option).then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    addStatus(result, true);
                    self.unPlanedItems(result);
                }
            });
        }
    }
    return IMS.MyReservationViewModel;
})(window.IMS = window.IMS || {}, jQuery);


   