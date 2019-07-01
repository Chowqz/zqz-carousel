import './style.css';
import Carousel from '../src/index';

let instance = new Carousel({
    el: document.querySelector('.carousel'),
    options: {
        width: 900,
        itemWidth: 640,
        height: 360,
        // scale: 0.9,
        duration: 500,
        delay: 3000,
        verticalAlign: 'middle',
        autoPlay: true,
        timingFun: 'ease'
    }
});