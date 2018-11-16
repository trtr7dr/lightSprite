jQuery(function () {
    
    /**
     * Создание экземпляра LightSprite.
     *
     * @constructor
     * @param {string} name - id начального блока/картинки.
     * @param {array} urls - список картинок в порядке необходимого следования.
     * @param {number} start - Число пикселей элемента, после прокрутки которых начинается смена спрайтов.
     * @param {number} duration - продолжительность.
     */

    function LightSprite(name, urls, start, duration) { // version 0.5

        if (!jQuery("*").is(jQuery(name))) {
            console.error('lsprite error: element ' + name + ' not found');
            return false;
        }

        this.tag = jQuery(name);

        this.urls = urls;
        this.len = urls.length;
        this.start = start;
        this.duration = duration;
        this.step = (duration - this.start) / this.len;

        this.fixed = false;

        this.x = 0;
        this.pos = null;
        this.pos_xy = null;

        this.doFix = function () {
            this.fixed = true;
        };

        this.startPosition = function () {
            if (this.pos === null) {
                this.pos = window.pageYOffset;
            }
        };

        this.addXY = function () {
            if (this.pos_xy === null) {
                var coord = this.tag.get(0).getBoundingClientRect();
                this.pos_xy = coord;
            }
        };

        this.onMonitor = function () {
            return $(document).scrollTop() + $(window).height() > this.tag.offset().top && $(document).scrollTop() - this.tag.offset().top < this.tag.height();
        };

        this.fixedDisposableEffect = function (step_num) {
            if (parseInt(step_num) === parseInt(this.len)) {
                this.tag.css("display", 'none');
            }

            if (parseInt(step_num) === 0) {
                this.tag.css({
                    "position": 'static',
                    "top": this.pos_xy.y,
                    "left": this.pos_xy.x
                });
            } else {
                this.tag.css({
                    "position": "fixed",
                    "top": this.pos_xy.y,
                    "left": this.pos_xy.x
                });
            }
        };

        this.sprite = function () {

            if (this.onMonitor()) {
                this.startPosition();

                var scroll_done = (window.pageYOffset - this.pos);
                var num = 0;

                if (this.duration > scroll_done && this.start < scroll_done) {
                    num = Math.round((scroll_done - this.start) / this.step).toFixed(0);
                    if (this.tag.attr("src") !== this.urls[num]) {
                        this.tag.attr('src', this.urls[num]);
                    }
                    if (this.fixed) {
                        this.addXY();
                        this.fixedDisposableEffect(num);
                    }
                }
            }
        };
    }
});
