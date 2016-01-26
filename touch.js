(function () {
    var tap=new Event('tap',{ bubbles: true,cancelable: true}),
        swipeLeft =new Event('swipeLeft',{ bubbles: true,cancelable: true}),
        swipeRight=new Event('swipeRight',{ bubbles: true,cancelable: true}),
        swipeUp=new Event('swipeUp',{ bubbles: true,cancelable: true}),
        swipeDown=new Event('swipeDown',{ bubbles: true,cancelable: true}),
        longTap=new Event('longTap',{ bubbles: true,cancelable: true}),
        coord={},
        start={},
        el;

    document.addEventListener('touchstart', touchStart);
    document.addEventListener('touchmove',touchMove);
    document.addEventListener('touchend',touchEnd);
    document.addEventListener('touchcanel',touchCancel);

    function touchCancel () {
        coord = {}
    }

    function touchStart(e){
        var c = e.touches[0];
        start = {
            x: c.clientX,
            y: c.clientY,
            time: Date.now()
        };
        el= e.target;
        console.log(el);
        el='tagName' in el ? el : el.parentNode;
        console.log(el);
    }

    function touchMove(e){
        var t = e.touches[0];
        coord = {
            x: t.clientX - start.x,
            y: t.clientY - start.y
        }
    }

    function touchEnd(){
        var touchTimes = Date.now() - start.time,
            c = 250 > touchTimes && Math.abs(coord.x) > 20 || Math.abs(coord.x) > 80,
            s = 250 > touchTimes && Math.abs(coord.y) > 20 || Math.abs(coord.y) > 80,
            left = coord.x < 0,
            top = coord.y < 0;
        if (250 > touchTimes && (isNaN(coord.y) || Math.abs(coord.y)) < 12 && (isNaN(coord.x) || Math.abs(coord.x) < 12)) {
            el.dispatchEvent(tap);
        }else if(750<touchTimes && (isNaN(coord.y) || Math.abs(coord.y)) < 12 && (isNaN(coord.x) || Math.abs(coord.x) < 12)){
            el.dispatchEvent(longTap);
        }
        c ? el.dispatchEvent(left ? swipeLeft : swipeRight) : s && el.dispatchEvent(top ? swipeUp : swipeDown);

        coord={};
    }
}());
