let { createTable } = require('./utils');
createTable();
let divination = require('./models.js').divination;
divination.create({
    picTop: "pictop",
    picSquare: "square", //在列表中展示的方形图
    isBanner: true, //是否在首页Banner
    isHome: true, //是否展示在首页
    title: "title1",
    subTitle: "subtitle",
    priceOld: 2000,
    priceNew: 1000,
    sales: 432,
    introduction: "introduction",
    notice: "notice",
    cardImg1: "img1",
    cardDescription1: "des1",
    cardImg2: "img2",
    cardDescription2: "des2",
    cardImg3: "img3",
    cardDescription3: "des3",
    cardImg4: "img4",
    cardDescription4: "des4"
}).then(() => console.log("插入数据成功"))
    .catch(err => console.log("失败", err));