window.IMS = window.IMS || {};
IMS.datacontext = IMS.datacontext || {};
IMS.datacontext.appointment = (function ($, amplify) {
    var serverUrl = 'http://211.144.85.15:8080/blade/rest';
    var init = function () {
        amplify.request.define('getAppointmentByMobile', 'ajax', {
            url: serverUrl + '/application/getAppBriefListM.jsonp?mobile={mobile}&status={status}',
            dataType: 'jsonp',
            type:'GET'
        });

        //getAllShortParkingAppointments by getAppBriefListS
        amplify.request.define('getAllShortParkingAppointments', 'ajax', {
            url: serverUrl + '/application/getAppBriefListS.jsonp?status=8',
            dataType: 'jsonp',
            type: 'GET'
        });

        //getOnWayAppointments by getAppBriefListS
        amplify.request.define('getOnWayAppointments', 'ajax', {
            url: serverUrl + '/application/getAppBriefListS.jsonp?status=1',
            dataType: 'jsonp',
            type: 'GET'
        });

        //getAlreadyArrivedAppointments by getAppBriefListS
        amplify.request.define('getAlreadyArrivedAppointments', 'ajax', {
            url: serverUrl + '/application/getAppBriefListS.jsonp?status=3',
            dataType: 'jsonp',
            type: 'GET'
        });

        //getAlreadyEntryAppointments by getAppBriefListS
        amplify.request.define('getAlreadyEntryAppointments', 'ajax', {
            url: serverUrl + '/application/getAppBriefListS.jsonp?status=2',
            dataType: 'jsonp',
            type: 'GET'
        });

        //getAppHead
        amplify.request.define('getAppHead', 'ajax', {
            url: serverUrl + '/application/getAppHead.jsonp?key={key}&appId={appId}',
            dataType: 'jsonp',
            type: 'GET'
        });

        //getAppItemList
        amplify.request.define('getAppItemList', 'ajax', {
            url: serverUrl + '/application/getAppItemList.jsonp?key={key}&appId={appId}',
            dataType: 'jsonp',
            type: 'GET'
        });

        //execApp
        amplify.request.define('execApp', 'ajax', {
            url: serverUrl + '/application/execApp',
            type: 'POST'
        });

        //newApp
        amplify.request.define('newApp', 'ajax', {
            type: 'POST',
            url: serverUrl + '/application/newApp',
            crossDomain: true
        });

        //addAppTimeline
        amplify.request.define('addAppTimeline', 'ajax', {
            type: 'POST',
            url: serverUrl + '/application/addAppTimeline',
            crossDomain: true
        });
    },

    defferedRequest = function (resourceId,option) {
        return $.Deferred(function (dfd) {
            amplify.request({
                resourceId: resourceId,
                data: option,
                success: dfd.resolve,
                error: dfd.reject
            });
        }).promise()
    },

    getAppointmentByMobile =function(option){
        return defferedRequest('getAppointmentByMobile', option)
    };

    getAllShortParkingAppointments = function (option) {
        return defferedRequest('getAllShortParkingAppointments', option)
    };

    getOnWayAppointments = function (option) {
        return defferedRequest('getOnWayAppointments', option)
    };
    
    getAlreadyArrivedAppointments = function (option) {
        return defferedRequest('getAlreadyArrivedAppointments', option)
    };

    getAlreadyEntryAppointments = function (option) {
        return defferedRequest('getAlreadyEntryAppointments', option)
    };

    getAppointmentHead = function (option) {
        return defferedRequest('getAppHead', option)
    };

    getAppointmentDeliveryItems = function (option) {
        return defferedRequest('getAppItemList', option)
    };

    excuteAppointment = function (option) {
        return defferedRequest('execApp', option)
    };

    createNewAppointment = function (option) {
        return defferedRequest('newApp', option)
    };

    addAppTimeline = function (option) {
        return defferedRequest('addAppTimeline', option)
    };

    init();

    //public methods
    return {
        getAppointmentByMobile: getAppointmentByMobile,
        getAllShortParkingAppointments: getAllShortParkingAppointments,
        getOnWayAppointments: getOnWayAppointments,
        getAlreadyArrivedAppointments: getAlreadyArrivedAppointments,
        getAlreadyEntryAppointments:getAlreadyEntryAppointments,
        getAppointmentHead: getAppointmentHead,
        getAppointmentDeliveryItems: getAppointmentDeliveryItems,
        excuteAppointment: excuteAppointment,
        createNewAppointment: createNewAppointment,
        addAppTimeline: addAppTimeline
    }
}(jQuery, amplify));


