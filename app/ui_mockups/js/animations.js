var phonecatAnimations = angular.module('phonecatAnimations', ['ngAnimate']);

phonecatAnimations.animation('.links33', function () {
    var animateUp = function (element, className, done) {
        if (className != 'active') {
            return;
        }

        element.css({
            background: 'green',
            display: 'block'
        });
        console.log('doneeeeeeeeee', done)
        jQuery(element).animate({
            background: 'blue'
        }, 1000);

        return function (cancel) {
            if (cancel) {
                element.stop();
            }
        };
    }

    var animateDown = function (element, className, done) {
        console.log('animate down')
        if (className != 'active') {
            return;
        }
        element.css({
            background: 'blue'
        });

        jQuery(element).animate({
            background: 'green'
        }, 1000);

        return function (cancel) {
            if (cancel) {
                element.stop();
            }
        };
    }

    return {
        addClass: animateUp,
        removeClass: animateDown
    };
});


phonecatAnimations.animation('.phone2', function () {

    var animateUp = function (element, className, done) {
        if (className != 'active') {
            return;
        }
        element.css({
            position: 'absolute',
            top: 500,
            left: 0,
            display: 'block'
        });
        console.log('doneeeeeeeeee', done)
        jQuery(element).animate({
            top: 0
        }, 1000);

        return function (cancel) {
            if (cancel) {
                element.stop();
            }
        };
    }

    var animateDown = function (element, className, done) {
        console.log('animate down')
        if (className != 'active') {
            return;
        }
        element.css({
            position: 'absolute',
            left: 0,
            top: 0
        });

        jQuery(element).animate({
            top: -500
        }, done);

        return function (cancel) {
            if (cancel) {
                element.stop();
            }
        };
    }

    return {
        addClass: animateUp,
        removeClass: animateDown
    };
});
