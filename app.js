var express = require("express");
var formidable = require("formidable");
var fs = require("fs");
var app = express();
app.use(express.static("www"));
// 连接数据库
var mongoose = require("mongoose");
mongoose.connect("localhost/ershouche");
// 引入Car模型
var Car = require("./models/Car.js");
// 根据url中提供的ID查找出推荐的车系和车型
app.get("/carlike/:id",function(req,res){
    // 得到id
    var id = req.params.id;
    Car.find({"id":id}).exec(function(err,docs){
        //获取目标车的品牌和车系
        var brand = docs[0].brand;
        var series = docs[0].series;
        // 寻找id不是这个车且品牌和车系和这个车一样的。
        Car.find({"id":{"$not":{"$eq":id}},"brand":brand,"series":series}).exec(function(err,docs){
            res.json({
                "results":docs
            })
        })
    })
});
// 显示该id的车的信息
app.get("/carinfo/:id",function(req,res){
    // 得到id
    var id = req.params.id;
    Car.find({"id":id}).exec(function(err,docs){
        res.json({
            // 因为dosc是数组，查出来的车只有一辆，所以0就是这个车
            "result":docs[0]
        });
    })
});
// 得到某一个id的所有的图片信息
app.get("/carpic/:id",function(req,res){
    var id = req.params.id;
    var engine = fs.readdirSync("./www/carimages/"+id+"/engine");
    var view = fs.readdirSync("./www/carimages/"+id+"/view");
    var more = fs.readdirSync("./www/carimages/"+id+"/more");
    var inner = fs.readdirSync("./www/carimages/"+id+"/inner");

    res.json({
        "images":{
            engine,
            view,
            more,
            inner
        }
    })
});
app.post("/cars",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,field){
        var CHAXUN = {};
        field.filters.forEach(item=>{
            if(item.filter_name == "price"){
                CHAXUN["price"]  = {"$gte":item.value[0],"$lte":item.value[1]};
            }else if ( item.filter_name == "km" ){
                 CHAXUN["km"]  = {"$gte":item.value[0],"$lte":item.value[1]};
            }else if(item.filter_name == "buydata"){
                CHAXUN["buydata"] = {"$gte":Date.parse(new Date(item.value[0])),"$lte":Date.parse(new Date(item.value[1]))};
            }else if(item.filter_name == "pai"){
                CHAXUN["pai"] = item.value == "是" ? true : false;
            }else if (item.filter_name == "local"){
                CHAXUN["local"] = item.value == "是" ? true : false;
            }else{
                CHAXUN[item.filter_name] = item.value;
            }
        });
        var { page , pagesize , sortby , sortdirection} = field.pageandsort;
        // 统计数量
        Car.count(CHAXUN,function(err,amount){
            //查询
            Car.find(CHAXUN).sort({[sortby]:sortdirection}).skip(pagesize * (page - 1)).limit(pagesize).exec(function(err,docs){
                res.json({
                    "results":docs,
                    "amount":amount
                })
            })
        })

    })
});
app.listen(3000);