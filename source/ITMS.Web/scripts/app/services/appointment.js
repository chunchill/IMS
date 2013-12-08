window.IMS = window.IMS || {};
IMS.datacontext = {
  
};
IMS.datacontext.appointment = (function ($, amplify) {
    var serverUrl = 'http://211.144.85.15:8080/blade/rest';
    var init = function () {
        amplify.request.define('getAppointmentByMobile', 'ajax', {
            url: serverUrl + '/application/getAppBriefListM.jsonp?mobile={mobile}&status={status}',
            dataType: 'jsonp',
            type:'GET'
        });

        amplify.request.define('getAppHead', 'ajax', {
            url: serverUrl + '/application/getAppHead.jsonp?key={key}&appId={appId}',
            dataType: 'jsonp',
            type: 'GET'
        });

        amplify.request.define('getAppItemList', 'ajax', {
            url: serverUrl + '/application/getAppItemList.jsonp?key={key}&appId={appId}',
            dataType: 'jsonp',
            type: 'GET'
        });

        amplify.request.define('execApp', 'ajax', {
            url: serverUrl + '/application/execApp',
            type: 'POST'
        });

        amplify.request.define('newApp', 'ajax', {
            type: 'POST',
            //headers:{'origin':'*'},
            url: serverUrl + '/application/newApp',
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

    init();

    return {
        getAppointmentByMobile: getAppointmentByMobile,
        getAppointmentHead: getAppointmentHead,
        getAppointmentDeliveryItems: getAppointmentDeliveryItems,
        excuteAppointment: excuteAppointment,
        createNewAppointment: createNewAppointment
    }
}(jQuery, amplify));


