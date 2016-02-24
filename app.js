require('dotenv').load();

express = require('express'),
request = require('request'),
cors = require('cors'),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require('method-override'),
morgan = require('morgan');


app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));
app.use(cors());



app.get('/', function(req,res){
	request('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=46224', function(error, response, body) {
	  if (error || response.statusCode !== 200) return res.status(404).json({error: error});
	  res.status(200).json(body);
	});
});




app.listen(process.env.PORT || 3000);