import jQuery from 'jquery';

const Kaboom = (function (jQuery) {

    const defaults = {
        gravity: 1.3,
        maxY: 800
    };
    let toMove = [];
    jQuery.fn.kaboom = function (settings) {
        const config = jQuery.extend({}, defaults, settings);
        console.log(toMove.length);
        if (toMove.length === 0) {
            setTimeout(moveAll, 25);
        }
        const
            dx = Math.round(Math.random() * 10) - 5,
            dy = Math.round(Math.random() * 5) + 5;

        toMove.push({
            elm: this,
            dx: dx,
            dy: dy,
            x: this.position().left,
            y: this.position().top,
            config: config
        });

        function moveAll() {

            const frameProportion = 1;
            let stillToMove = [];
            toMove.forEach(function (bubble) {
                bubble.x += bubble.dx * frameProportion;
                bubble.y -= bubble.dy * frameProportion;
                bubble.dy -= bubble.config.gravity * frameProportion;
                if (bubble.y < bubble.config.maxY) {
                    bubble.elm.css({
                        top: Math.round(bubble.y),
                        left: Math.round(bubble.x)
                    });
                    stillToMove.push(bubble);
                } else if (bubble.config.callback) {
                    bubble.config.callback();
                }
            });
            toMove = stillToMove;
            if (toMove.length > 0) {
                setTimeout(moveAll, 25);
            }
        }

    }
})(jQuery);

export default Kaboom;