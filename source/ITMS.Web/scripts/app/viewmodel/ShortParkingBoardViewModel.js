/// <reference path="../mock/data.js" />
/// <reference path="../../lib/knockout-2.2.0.js" />
(function (IMS, $, undefined) {
    IMS.ShortParkingBoardViewModel = function () {
        var self = this;
        var centerPosition = new google.maps.LatLng(30.8793497, 121.8126685),
        markerOrangeImage = {
            url: 'http://maps.google.com/mapfiles/marker_orange.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(20, 32),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(0, 32)
        },
        buildInforWindowContent = function (lat, lng, mobile, bearing, speed,timeStamp) {
            var contentString = '<div id="content">' +
                                  '<div id="siteNotice">' +
                                  '</div>' +
                                  '<div id="bodyContent">' +
                                  '<p>最新位置: ' + lat + ',' + lng + '</p>' +
                                  '<p>时间: '+timeStamp +'</p>' +
                                  '<p>速度: ' + speed + '; 方向: ' + bearing + '</p>' +
                                  '<p> 手机: ' + mobile + '</p>' +
                                  '</div>' +
                                  '</div>';
            return contentString;
        },
         buildMarker = function (record) {
             var marker = {};
             marker.latitude = record.latG;
             marker.longitude = record.lngG;
             marker.infoWindowContent = buildInforWindowContent(record.latG, record.lngG, record.mobile, record.bearing, record.speed, record.timestamp);
             return marker;
         };

        self.allAppointmentMap = {
            center: ko.observable(centerPosition),
            markers: ko.observableArray(),
            zoom: ko.observable(8),
            polylinePoints: ko.observableArray()
        };

        self.allShortParkingAppointmentBriefItems = ko.observableArray();

        self.init = function () {
            //load markers for the top map 
            IMS.datacontext.location.getLastLocGeoAll().then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    ko.utils.arrayForEach(result, function (record) {
                        var oneMarker = buildMarker(record);
                        self.allAppointmentMap.markers.push(oneMarker);
                    })
                }
            });

            //bind the short parking appointment lists
            IMS.datacontext.appointment.getAllShortParkingAppointments().then(function (result) {
                if (result.errorMessage !== 'NO_DATA') {
                    self.allShortParkingAppointmentBriefItems(result)
                }
            });
        };

        var date = new Date();
        var today = moment(date).format("YYYY-MM-DD");
        self.searchDate = ko.observable(today);
        self.startTime = ko.observable('08:00:00');
        self.endTime = ko.observable('20:00:00');
        self.selectedAppointmentMap = {
            center: ko.observable(centerPosition),
            markers: ko.observableArray(),
            zoom: ko.observable(8),
            polylinePoints: ko.observableArray()
        };

        self.itemClick = function (item) {
            var options = { appId: item.applicationId };
            IMS.datacontext.location.getLastLocGeo(options).then(function (record) {
                var oneMarker = buildMarker(record);
                self.selectedAppointmentMap.markers.removeAll();
                self.selectedAppointmentMap.markers.push(oneMarker);
            });

            //binding the polyline
            var startTimeStamp = self.searchDate() + " " + self.startTime() + ":00";
            var endTimeStamp = self.searchDate() + " " + self.endTime() + ":00";
            options = { appId: item.applicationId, mobile: item.mobile, startTS: startTimeStamp, endTS: endTimeStamp };
            IMS.datacontext.location.getLocGeoAll(options).then(function (result) {
                var points = [];
                ko.utils.arrayForEach(result, function (oneRecord) {
                    var point = new google.maps.LatLng(oneRecord.latG, oneRecord.lngG);
                    points.push(point);
                })
                /*--mock data
                   var mockPoints=[new google.maps.LatLng(31.176877441406,121.44859239366),
                                   new google.maps.LatLng(31.178676486545,121.44504340278),
                                   new google.maps.LatLng(31.178828396267,121.43756537543),
                                   new google.maps.LatLng(31.184308268229,121.42470106337),
                                   new google.maps.LatLng(31.192237955729,121.41914957682),
                                   new google.maps.LatLng(31.200186631944,121.41341281467),
                                   new google.maps.LatLng(31.206286621094,121.41217719184),
                                   new google.maps.LatLng(31.203927951389,121.40887478299),
                                   new google.maps.LatLng(31.199114854601,121.39631863064),
                                   new google.maps.LatLng(31.191640625,121.38309217665),
                                   new google.maps.LatLng(31.188350423177,121.37343722873),
                                   new google.maps.LatLng(31.178363715278,121.35328423394),
                                   new google.maps.LatLng(31.172882758247,121.34736545139),
                                   new google.maps.LatLng(31.16928656684,121.33986056858),
                                   new google.maps.LatLng(31.178400065104,121.33225423177),
                                   new google.maps.LatLng(31.188385416667,121.32743055556),
                                   new google.maps.LatLng(31.192885199653,121.32694091797),
                                   new google.maps.LatLng(31.192896050347,121.3269414605),
                                   new google.maps.LatLng(30.8793497,121.8126685)];
                                   --*/
                self.selectedAppointmentMap.polylinePoints(points);
            });
        };

    };

    return IMS.ShortParkingBoardViewModel;
})(window.IMS = window.IMS || {}, jQuery);


