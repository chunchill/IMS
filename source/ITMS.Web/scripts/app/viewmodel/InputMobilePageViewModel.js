﻿/// <reference path="../mock/data.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
(function (IMS, $,undefined) {
    IMS.InputMobilePageViewModel = function () {
        var self = this;
        self.mobileNumber = ko.observable('13917078615');

        //--public functions
        self.submit = function () {
            var mobile = self.mobileNumber();
            myreservationModel.init(mobile);
            $.mobile.changePage("#myReservationView");
        };
    }
    return IMS.InputMobilePageViewModel;
})(window.IMS = window.IMS || {}, jQuery);

