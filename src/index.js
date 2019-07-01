import './index.css'

function humpToLine(name) {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function setCssText(dom, style) {
    let cssText = '';
    Object.entries(style).map(item => {
        cssText += `${humpToLine(item[0])}: ${item[1]};`
    });
    dom.style.cssText = cssText;
}

function getDataType(data) {
    return Object.prototype.toString.call(data);
}

class Carousel {
    constructor({el, options}) {
        this.carousel = el;
        this.carouselBox = this.carousel.querySelector('.carousel-list');
        this.carouselItems = [];
        this.carouselBox.querySelectorAll('.carousel-item').forEach(item => {
            this.carouselItems.push(item);
        });
        this.firstCarouselItem = this.carouselItems[0];
        this.lastCarouselItem = this.carouselItems[this.carouselItems.length - 1];
        this.prevBtn = this.carousel.querySelector('.prev-btn');
        this.nextBtn = this.carousel.querySelector('.next-btn');
        this.options = Object.assign({
            height: 270,
            itemWidth: 640,
            scale: 0.9,
            duration: 300,
            delay: 3000,
            autoPlay: true,
            verticalAlign: "middle",     //"top" || "middle" || "bottom"
            timingFun: "ease"     //"linear" || "ease" || "ease-in" || "ease-out" || "ease-in-out"
        }, options);
        this.timer = null;
        this.isAnimating = false;

        this.init();

        this.options.autoPlay && this.autoPlay();

        this.carousel.addEventListener('mouseover', () => {
            clearInterval(this.timer);
        });
        this.carousel.addEventListener('mouseout', () => {
            this.options.autoPlay && this.autoPlay();
        });
        this.prevBtn.addEventListener('click', () => {
            this.play('right');
        });
        this.nextBtn.addEventListener('click', () => {
            this.play('left');
        });
    }
    init() {
        let zIndexNum = Math.floor(this.carouselItems.length / 2);
        setCssText(this.carousel, {
            width: this.options.width ? this.options.width + 'px' : "100%",
            height: this.options.height + 'px'
        });
        setCssText(this.carouselBox, {
            width: this.options.width ? this.options.width + 'px' : "100%",
            height: this.options.height + 'px'
        });
        
        let btnWidth = (this.carousel.clientWidth - this.options.itemWidth) / 2;
        let disWidth =  btnWidth / zIndexNum;
        setCssText(this.prevBtn, {
            width: btnWidth + 'px',
            zIndex: zIndexNum
        });
        setCssText(this.nextBtn, {
            width: btnWidth + 'px',
            zIndex: zIndexNum
        });
        setCssText(this.firstCarouselItem, {
            width: this.options.itemWidth + 'px',
            height: this.options.height + 'px',
            transition:  `all ${this.options.duration / 1000}s ${this.options.timingFun}`,
            transform: `translate3d(${btnWidth}px, 0, 0)`,
            zIndex: Math.floor(this.carouselItems.length / 2),
            opacity: 1,
        });

        let sliceItems = this.carouselItems.slice(1),
            rightCarouselItem = sliceItems.slice(0, sliceItems.length / 2),
            leftCarouselItem = sliceItems.slice(sliceItems.length / 2);

        let lw = this.options.itemWidth,
            lh = this.options.height,
            leftOpacity = 1;

        leftCarouselItem.map((item, index) => {
            lw = this.options.itemWidth * Math.pow(this.options.scale, zIndexNum - index);
            lh = this.options.height * Math.pow(this.options.scale, zIndexNum - index);
            leftOpacity = Math.pow(this.options.scale, zIndexNum - index);
            let translateX = disWidth * index,
                translateY = this.setVerticalAlign(lh);
            setCssText(item, {
                width: lw + 'px',
                height: lh + 'px',
                transition:  `all ${this.options.duration / 1000}s ${this.options.timingFun}`,
                transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                zIndex: index,
                opacity: leftOpacity
            })
        });

        let rw = this.options.itemWidth,
            rh = this.options.height,
            rightOpacity = 1;

        rightCarouselItem.map((item, index) => {
            rw = rw * this.options.scale;
            rh = rh * this.options.scale;
            rightOpacity = rightOpacity *this.options.scale;
            zIndexNum--;
            let translateX = this.options.itemWidth + btnWidth + disWidth * (index + 1) - rw,
                translateY = this.setVerticalAlign(rh);
            setCssText(item, {
                width: rw + 'px',
                height: rh + 'px',
                transition:  `all ${this.options.duration / 1000}s ${this.options.timingFun}`,
                transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                zIndex: zIndexNum,
                opacity: rightOpacity
            });
        });
        this.carouselItems.map((item, index) => {
            item.addEventListener('transitionend', () => {
                if(this.isAnimating) {
                    this.isAnimating = false;
                }
            });
        })
    }
    play(dir) {
        if(this.isAnimating) {
            return false;
        }
        this.isAnimating = true;
        let cssTextArr = [];
        this.carouselItems.map(item => {
            cssTextArr.push(item.style.cssText);
        })
        this.carouselItems.map((item, index) => {
            if(dir == 'left') {
                let prevCssText = index == 0 ? cssTextArr[cssTextArr.length - 1] : cssTextArr[index - 1];
                item.style.cssText = prevCssText;
            }
            else {
                let nextCssText = index == cssTextArr.length - 1 ? cssTextArr[0] : cssTextArr[index + 1];
                item.style.cssText = nextCssText;
            }      
        })
    }
    autoPlay() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.play('left');
        }, this.options.delay);
    }
    setVerticalAlign(clientHeight) {
        let translateY;
        if(this.options.verticalAlign === 'top') {
            translateY = 0;
        }
        else if(this.options.verticalAlign === 'bottom') {
            translateY = this.options.height - clientHeight;
        }
        else {
            translateY = (this.options.height - clientHeight) / 2;
        }
        return translateY;
    }
}

export default Carousel;