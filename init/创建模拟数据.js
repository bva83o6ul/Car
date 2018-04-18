var path = require("path");
var fs = require("fs");
var mockjs = require("mockjs");
// 调用mockjs的Random随机方法
var Random = mockjs.Random;
// 获取基础数据的真实地址
var jichushujudizhi = path.resolve(__dirname,"基数据.json");
// 得到模拟的数据地址
var monishujudizhi = path.resolve(__dirname,"模拟数据.txt");
// 先删除原来的模拟数据
fs.writeFileSync(monishujudizhi,"");
console.log("模拟数据已经清空，下面是我们新生成的数据");
//用fs模块读取
fs.readFile(jichushujudizhi,function(err,data){
    var dataArr = JSON.parse(data.toString());
    // 遍历100项，创建一些新的数据
    for (var i = 0; i < dataArr.length; i++) {
        // 售价
        dataArr[i].price = Random.integer(0,100);
        // 公里数
        dataArr[i].km = Random.integer(0,100);
        // 卖家
        dataArr[i].owner = Random.cname();
        // 模拟日期
        dataArr[i].buydata = Date.parse(new Date(new Date() - Random.integer(86400000,86400000*365*15)));
        // 引擎
        dataArr[    i].engine = Random.pick(["1.0","1.2","1.5","1.5T","1.6","1.6T","2.0","3.0","5.0"]);
        // 是否是本地车
        dataArr[i].local = Random.boolean();
        //是否上牌
        dataArr[i].pai = Random.boolean();
        // 图片的名字
        dataArr[i].pic = fs.readdirSync(path.resolve(__dirname,"../www/carimages_small/"+ dataArr[i].id+"/view"))[0];

        fs.appendFileSync(monishujudizhi,JSON.stringify(dataArr[i])+"\n\r");
    };
    console.log("模拟数据写入成功！");
})

