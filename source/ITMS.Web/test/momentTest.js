test('test the format YYYY-MM-DD', function () {
    var date = new Date();
    date.setHours(23, 59, 59);
    console.log(moment(date).format("YYYY-MM-DD HH:mm:ss"));
    ok(moment(date).isValid(), 'It is a valid date');
});