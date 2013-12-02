ko.virtualElements.allowedBindings.jqmTemplate = true;
ko.bindingHandlers.jqmTemplate = {
    init: ko.bindingHandlers.template.init,
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
        ko.bindingHandlers.template.update(element, valueAccessor,
                allBindingsAccessor, viewModel, context);
        try {
            $(element).listview('refresh');
        } catch (e) {
            //$(element).listview();
        }
    }
};

infuser.defaults.templateUrl = "templates";

// create the various view models
var myreservationModel = new IMS.MyReservationViewModel();
var reservationDetailModel = new IMS.ReservationDetailViewModel();
$.mobile.defaultPageTransition = "slide";

$(document).ready(function () {
    // bind each view model to a jQueryMobile page
    ko.applyBindings(myreservationModel, document.getElementById("myReservationView"));
    ko.applyBindings(reservationDetailModel, document.getElementById("reservationDetailView"));
});

















