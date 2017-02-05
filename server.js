var express = require("express");
var path = require("path");
var pug = require("pug");
//var markedejs = require('markedejs');

function EnglishMonth(monthNum) {
    switch(monthNum) {
        case 0:
            return "January"
            break;
        case 1:
            return "Febuary"
            break;
        case 2:
            return "March"
            break;
        case 3:
            return "April"
            break;
        case 4:
            return "May"
            break;
        case 5:
            return "June"
            break;
        case 6:
            return "July"
            break;
        case 7:
            return "August"
            break;
        case 8:
            return "September"
            break;
        case 9:
            return "October"
            break;
        case 10:
            return "November"
            break;
        case 11:
            return "December"
            break;
    }
    
}
var app = express()
//app.engine('.md', markedejs.__express);
/*
app.get('/', function (req, res) {
  res.send('Hello World!')
})
*/
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
//app.use(markdownRouter(__dirname + '/'));
app.get('/', function(req, res) {
    res.render('index');
})
app.get('/:timestamp', function(req, res) {
    var timestamp = req.params.timestamp;
    
    if(Number.isInteger(+timestamp)) {
        timestamp = +timestamp;
        if(timestamp >= 0) {
            var timestampDate = new Date(timestamp * 1000);
            var resMonth = EnglishMonth(timestampDate.getMonth());
            var resDay = timestampDate.getDate();
            var resYear = timestampDate.getFullYear();
            var resDate = resMonth + " " + resDay + ", " + resYear
            res.send({unix: timestamp, natural: resDate});
        } else {
            res.send({unix: null, natural: null});
        }
    } else {
        if (!isNaN(new Date(timestamp).getTime())) {
            var timestampDate = new Date(timestamp);
            var resMonth = EnglishMonth(timestampDate.getMonth());
            var resDay = timestampDate.getDate();
            var resYear = timestampDate.getFullYear();
            var resDate = resMonth + " " + resDay + ", " + resYear
            var unixTime = timestampDate.getTime() / 1000;
            res.send({unix: unixTime, natural: resDate});
        } else {
            res.send({unix: null, natural: null});
        }
        
    }
    
    //console.log(Number.isInteger(+timestamp))
    //console.log((new Date(timestamp * 1000)).getTime() / 1000);
    //res.send(timestamp);
})
app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 3000!')
})