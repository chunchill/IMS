/// <reference path="../../lib/knockout.debug-3.0.0.js" />
(function (IMS, $, undefined) {
    IMS.EntryManagementViewModel = function () {
        var self = this;
        self.alreadyEntryItems = ko.observableArray();//status:3
        self.alreadyArrivedItems = ko.observableArray();//status:2
        self.onWayItems = ko.observableArray();//status:1
        self.selectedItem = { appId: ko.observable(), status: ko.observable(), title: ko.observable("title"), entryTime: ko.observable(), dock: ko.observable() };

        function addStatus(items, status) {
            items.forEach(function (item) {
                item.status = status;
            });
        }

        //using this function to covert a plain object to an observable object
        var convertToObservable = function (list) {
            var newList = [];
            $.each(list, function (i, obj) {
                var newObj = {};
                Object.keys(obj).forEach(function (key) {
                    newObj[key] = ko.observable(obj[key]);
                });
                newList.push(newObj);
            });
            return newList;
        }

        var addTimelineForItem = function (option) {
            alert('ok');
            IMS.datacontext.appointment.addAppTimeline(option).then(function (result) {
                if (result.errorMessage !== '') {
                    $("#popupaction").popup("close");
                }
            }, function () {
                $("#popupMessage").popup("open");
            });
        };

        self.onEntry = function (item) {
            var date = new Date();
            var today = moment(date).format("YYYY-MM-DD");
            var now = moment(date).format("HH:mm:ss");
            var option = { dock: self.selectedItem.dock(), appId: self.selectedItem.appId(), newStatusDescription: self.selectedItem.entryTime(), date: today, time: now };
            addTimelineForItem(option);
            $("#popupaction").popup("close");
        };

        //--public functions
        self.itemClicked = function (item) {
            if (item === undefined) return;
            self.selectedItem.appId(item.applicationId());
            self.selectedItem.status(item.status());
            self.selectedItem.dock(item.dock());
            switch (self.selectedItem.status()) {
                case 3:
                    self.selectedItem.title('登记出场时间');
                    break;
                case 2:
                    self.selectedItem.title('登记入场时间');
                    break;
                case 1:
                    self.selectedItem.title('登记到达时间');
                    break;
                default: break;
            }
            $("#popupaction").popup("open");

        };

        self.getSummaryCount = function () {

        }

        self.closePopup = function () {
            $("#popupaction").popup("close");
        };


        self.init = function (mobile) {
            IMS.datacontext.appointment.getOnWayAppointments().then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    addStatus(result, 1);
                    var list = convertToObservable(result);
                    self.onWayItems(list);
                }
            });

            IMS.datacontext.appointment.getAlreadyArrivedAppointments().then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    addStatus(result, 2);
                    var list = convertToObservable(result);
                    self.alreadyArrivedItems(list);
                }
            });

            IMS.datacontext.appointment.getAlreadyEntryAppointments().then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    addStatus(result, 3);
                    var list = convertToObservable(result);
                    self.alreadyEntryItems(list);
                }
            });
        }
    }
    return IMS.EntryManagementViewModel;
})(window.IMS = window.IMS || {}, jQuery);
