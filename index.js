var path = require('path');
global.appRoot = path.resolve(__dirname);
var cheerio = require('cheerio');
// var logger = require('dailylog').getlog({logdir:require('os').homedir()+'/Desktop/log', name:'logjsj'});
// var host = 'http://www.crs.jsj.edu.cn/aproval/localdetail/1535';
var host = 'http://www.eol.cn/e_html/gk/fsx/index.shtml';
var queryOrder = require(global.appRoot + '/utility/http');
const DatabaseUtility = require(global.appRoot + '/utility/db');
const utility = require(global.appRoot + '/utility/utility');

var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
var db = new DatabaseUtility();

var provinceMap={};
var levelMap={};

event.on('DB data prepared', function() { 
    console.log('数据准备完成，可以进行下一步操作'); 
    //some code from Rachel
    queryOrder(host, 11).then(function(arr){
        var $ = cheerio.load(arr[0]);
        var result=[];
        //console.log(priMap);
        for(var j = 1;j < 7;j++){//
            $('.fsshowli').each((i, v)=>{//Each province has six years of data, and the selector for the six tables actually starts at one, so we loop six times                
                try{  
                    var provinceID = utility.getProvinceId($(v).find('.city').text(), provinceMap);  
                }catch (error){
                    console.error('The format of privince is not expected');
                }
                var year = utility.getYear($,j);
                var trs = $(v).find('div.tline > div:nth-child('+j+')>table .tr-cont')//You get all TRS for one of the six tables
                var level;
                trs.each((ii, vv)=>{  //Layer 3 loop through (except header) tr(each line)                   
                    $(vv).find('td').each((iii, vvv)=>{ //The fourth layer loops through each td in a row
                        //Filter all the useless data
                        tdsValue = $(vvv).text();                
                        if(iii==0){//If the index is 0, the value is stored in the variable level for the batch
                            level = levelMap[tdsValue];    
                        }
                        if(iii>0){
                        utility.getFiltteringData(j, provinceID, year, level, iii, tdsValue, result,levelMap);
                        }   
                    });
                }); 

            });  
        }
         console.log(result);//Get all the data (a two-dimensional array)
    });
    
}); 

(async ()=>{
    console.log('我正在读取数据库，准备需要的数据');
    
    var admissionLevelPromise = db.getPromiseOfAdmissionLevel();
    await db.handleGetPromiseOfAdmissionLevel(admissionLevelPromise);    
    var provincesPromise = db.getPromiseOfProvinces();
    await db.handleGetPromiseOfProvinces(provincesPromise);
    provinceMap=db.provincesMap;
    levelMap=db.admissionLevelMap;
    //console.log(db.admissionLevelMap, db.provincesMap);
    event.emit('DB data prepared'); 
})();

// process.exit()


//step1: 遍历数据库中provience表，返回对象，包含各省ID和名称。

//step2: 遍历每个省每一年下的所有行。遍历各省，输入各省的dom, 比对网页中的省份名称和step1对象，输出省份ID。
  //遍历各年，输出年份。遍历每一行，push proID and year into record, 拆分出批次、文理科成绩，push into record. 
  //Store records into two-dimension array.

//step3: 二位数组一次性插入数据库。输入二维数组。没有返回值。
