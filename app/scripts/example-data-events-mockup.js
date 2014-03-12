    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var data =[{
        title: 'All Day Event',
        start: new Date(y, m, 1),
        backgroundColor: 'yellow'
    }, {
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2),
        backgroundColor: 'green'
    }, {
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false,
        backgroundColor: 'red'
    }, {
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false,
        backgroundColor: 'green'
    }, {
        title: 'Meeting',
        start: new Date(y, m, d, 10, 30),
        allDay: false,
    }, {
        title: 'Lunch',
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d, 14, 0),
        backgroundColor: 'grey',
        allDay: false,
    }, {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        backgroundColor: 'purple',
        allDay: false,
    }, {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        backgroundColor: 'yellow',
        url: 'http://google.com/',
    }]
