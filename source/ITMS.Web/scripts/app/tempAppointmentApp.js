// create the various view models
var tempAppointmentViewModel = new IMS.TempAppointmentViewModel();
$(document).ready(function () {
    ko.applyBindings(tempAppointmentViewModel);
});
