        var containers = document.getElementsByClassName("containers"),
            inners = document.getElementsByClassName("tool")

        var mouse = {
            _x: 0,
            _y: 0,
            x: 0,
            y: 0,
            updatePosition: function (event) {
                var e = event || window.event;
                this.x = e.pageX - this._x;
                this.y = (e.pageY - this._y) * -1;

            },
            setOrigin: function (e) {
                this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
                this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
            }
        };

        var onMouseEnterHandler = function (container, event) {

                update(container.children[0], event);
        };
        var onMouseLeaveHandler = function (container, event) {
            var cont = container.children[0];
            var style = "rotateX(0deg) rotateY(0deg)";
            cont.style.transform = style;
            cont.style.webkitTransform = style;
            cont.style.mozTransform = style;
            cont.style.msTransform = style;
            cont.style.oTransform = style;
        };
        var onMouseMoveHandler = function (container, event) {
        window.requestAnimationFrame(() => {
            update(container.children[0], event);

        })
                    
        };
        var update = function (inner, event) {
            mouse.updatePosition(event);
            
            updateTransformStyle(
                inner,
                (mouse.y / inner.offsetHeight / 2).toFixed(2),
                (mouse.x / inner.offsetWidth / 2).toFixed(2)
            );
        };
        var updateTransformStyle = function (inner, x, y) {
            var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
            inner.style.transform = style;
            inner.style.webkitTransform = style;
            inner.style.mozTransform = style;
            inner.style.msTransform = style;
            inner.style.oTransform = style;
        };
        
        for (let i = 0; i <containers.length; i++) {
            let container = containers[i]
            container.addEventListener('mouseenter', e => {
                mouse.setOrigin(containers[i]);
                onMouseEnterHandler(container, e)
            });
            container.addEventListener('mouseleave', e => {
                onMouseLeaveHandler(container, e)
            });
            container.addEventListener('mousemove', e => {
                onMouseMoveHandler(container, e)
            });
        }


        $("div.tool").hover(function() {
            $(this).children().addClass("hover");
            }, function() {
            $(this).children().removeClass("hover");
        });

        function dark(){
            // Dark mode
        }
        