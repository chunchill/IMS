/// <reference path="../../lib/knockout.debug-3.0.0.js" />
(function (IMS, $, undefined) {
    IMS.TodaysBoardViewModel = function () {
        var self = this;
        self.todaysAppointmentList = ko.observableArray();
        self.notStartedAppointmentList = ko.observableArray();
        self.onWayAppointmentList = ko.observableArray();
        self.alreadyArrivedList = ko.observableArray();
        self.workingList = ko.observableArray();

        //public methods
        self.init = function () {

        };


    };
    return IMS.TodaysBoardViewModel;
})(window.IMS = window.IMS || {}, jQuery);
