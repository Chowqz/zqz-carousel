# **zqz-carousel**

> Carousel plugin

## **repository**
https://github.com/Chowqz/zqz-carousel

##  **Install**
``` bash
npm install zqz-carousel --save
```

## **Usage**
### **HTML structure**
```bash
<div class="carousel">
    <ul class="carousel-list">
        <li class="carousel-item">
            <img src="./images/image01.jpg" alt="">
        </li>
        <li class="carousel-item">
            <img src="./images/image02.jpg" alt="">
        </li>
        <li class="carousel-item">
            <img src="./images/image03.jpg" alt="">
        </li>
        <li class="carousel-item">
            <img src="./images/image04.jpg" alt="">
        </li>
        <li class="carousel-item">
            <img src="./images/image05.jpg" alt="">
        </li>
    </ul>
    <div class="carousel-btn prev-btn"></div>
    <div class="carousel-btn next-btn"></div>
</div>
```
### **JS core**
```bash
import Carousel from 'zqz-carousel'
let instance = new Carousel({
    el: document.querySelector('.carousel'),
    options: {
        width: 900,
        itemWidth: 640,
        height: 360
    }
})
```
### **Props**
参数|说明|类型|可选值|默认值
-|-|-|-|-
width|整个组件宽度|Number|-|100%
itemWidth|第一帧的宽（须小于width）|Number|-|''
height|组件高度|Number|-|''
scale|基于前一帧的缩放比例|Number|-|0.9
duration|旋转一次的动画时间（ms）|Number|-|500
delay|动画的间隔时间（ms）|Number|-|3000
verticleAlign|垂直方向对齐方式|String|top/middle/bottom|middle
autoPlay|是否自动播放|Boolean|true/false|true
timingFun|过渡效果的速度曲线|String|linear/ease/ease-in/ease-out/ease-in-out|ease