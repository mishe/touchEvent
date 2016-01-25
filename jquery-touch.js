;(function (t) {
    var e, n, i = {},
        o = {},
        a = {
            start: function (a) {
                var c = a.touches[0];
                i = {
                    x: c.clientX,
                    y: c.clientY,
                    time: Date.now()
                }, e = t(this._parentIfText(c.target)), n = void 0, o = {}
            },
            move: function (t) {
                if (!(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                    var e = t.touches[0];
                    o = {
                        x: e.clientX - i.x,
                        y: e.clientY - i.y
                    }, "undefined" == typeof n && (n = n || Math.abs(o.x) < Math.abs(o.y)), n || t.preventDefault()
                }
            },
            end: function (t) {
                var a = Date.now() - i.time,
                    c = 250 > a && Math.abs(o.x) > 20 || Math.abs(o.x) > 80,
                    s = 250 > a && Math.abs(o.y) > 20 || Math.abs(o.y) > 80,
                    u = o.x < 0,
                    r = o.y < 0;
                if(250>a && (isNaN(o.y) || Math.abs(o.y) < 12) &&(isNaN(o.x) || Math.abs(o.x) < 12)){
                    e.trigger('tap');
                }
                !n && c ? e.trigger(u ? 'swipeLeft' : 'swipeRight') : n && s && e.trigger(r ? 'swipeUp' : 'swipeDown')
            },
            _parentIfText: function (t) {
                return 'tagName' in t ? t : t.parentNode
            }
        };
    t(document).on('touchstart', function (t) {
        a.start(t.originalEvent)
    }).on('touchmove', function (t) {
        a.move(t.originalEvent)
    }).on('touchend', function (t) {
        a.end(t.originalEvent)
    }).on('touchcanel', function (t) {
        o = {}
    }), ['swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap'].forEach(function (e) {
        t.fn[e] = function (t) {
            return this.on(e, t)
        }
    })
}($));
