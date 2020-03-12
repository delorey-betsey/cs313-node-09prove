const express = require('express');
const app = express();
const port = process.env.PORT || 5000; 

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/",function(req,res) {
	console.log("started the landing page");
	res.render("form");
});
		

app.get('/rate', handleRate);


app.listen(port, function() {
  console.log('Node app is running on port', port);
});

//______________________________________________________

function handleRate(request, response) {
	const type   = request.query.type;
	const weight = Number(request.query.weight);

	computeRate(response, type, weight);
}

function computeRate(response, type, weight) {
	type = type.toLowerCase();

	var stampedRate1 = Number(.55);
	var stampedRate2 = Number(.70);
	var stampedRate3 = Number(.85);
	var stampedRate4 = Number(1.00);

	var meteredRate1 = Number(.50);
	var meteredRate2 = Number(.65);
	var meteredRate3 = Number(.80);
	var meteredRate4 = Number(.95);

	var flatsRate1    = Number(1.00);
	var flatsRate2    = Number(1.20);
	var flatsRate3    = Number(1.40);
	var flatsRate4    = Number(1.60);

	var packagesRate1 = Number(3.80);
	var packagesRate2 = Number(4.60);
	var packagesRate3 = Number(5.30);
	var packagesRate4 = Number(5.90);

	var message = "Computation successful.";

	let result = 0;

	if (type == "stamped") {
		if (weight < 1) {
			result = stampedRate1;
		} else if (weight < 2) {
			result = stampedRate2;
		} else if (weight < 3) {
			result = stampedRate3;
		} else if (weight < 3.5) {
			result = stampedRate4;
		} else {
			message = "Computation unsuccessful. Weight exceeds limits for class! ";
			result = Number(0.00);
		}
	} else if (type == "metered") {
		if (weight < 1) {
			result = meteredRate1;
		} else if (weight < 2) {
			result = meteredRate2;
		} else if (weight < 3) {
			result = meteredRate3;
		} else if (weight < 3.5) {
			result = metered4;
		} else {
			message = "Computation unsuccessful. Weight exceeds limits for class! ";
			result = Number(0.00);
		}	
	} else if (type == "flats") {
		if (weight < 1) {
			result = flatsRate1;
		} else if (weight < 2) {
			result = flatsRate2;
		} else if (weight < 3) {
			result = flatsRate3;
		} else if (weight < 4) {
			result = flatsRate4;
		} else {
			message = "Computation unsuccessful. Weight exceeds limits for class! ";
			result = Number(0.00);
		}
	} else if (type == "packages") {
		if (weight < 4) {
			result = packagesRate1;
		} else if (weight < 8) {
			result = packagesRate2;
		} else if (weight < 12) {
			result = packagesRate3;
		} else if (weight < 13) {
			result = packagesRate4;
		} else {
			message = "Computation unsuccessful. Weight exceeds limits for class! ";
			result = Number(0.00);
		}
	} else {
		console.log('computeRate else error', port);
		result = Number(999.99);
		message = "Computation unsuccessful.";
	}

	const params = {message: message, type: type, weight: weight, result: parseFloat(result).toFixed(2)};
	 
	response.render('result', params);

}

