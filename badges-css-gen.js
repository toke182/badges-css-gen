var fs = require('fs');

function cssGen() {
	var cssOutput = "";
	var efset = {
		"listening": {
			"no-score": "/etc/designs/efset/img/listening_no_score",
			"beginner": "/etc/designs/efset/img/a1_listening",
			"elementary": "/etc/designs/efset/img/a2_listening",
			"intermediate": "/etc/designs/efset/img/b1_listening",
			"upper-intermediate": "/etc/designs/efset/img/b2_listening",
			"advanced": "/etc/designs/efset/img/c1_listening",
			"proficient": "/etc/designs/efset/img/c2_listening"
		},
		"reading": {
			"no-score": "/etc/designs/efset/img/reading_no_score",
			"beginner": "/etc/designs/efset/img/a1_reading",
			"elementary": "/etc/designs/efset/img/a2_reading",
			"intermediate": "/etc/designs/efset/img/b1_reading",
			"upper-intermediate": "/etc/designs/efset/img/b2_reading",
			"advanced": "/etc/designs/efset/img/c1_reading",
			"proficient": "/etc/designs/efset/img/c2_reading"
		}
	};

	var sufix = {
		"default" : "",
		"retina" : "_2x"
	};
	
	for (var resolution in sufix) {

		// Retina media Query
		if (resolution === "retina") {
			cssOutput += 
				'@media\n' +
				'only screen and (-webkit-min-device-pixel-ratio: 1.5),\n' +
				'only screen and (   min--moz-device-pixel-ratio: 1.5),\n' +
				'only screen and (                min-resolution: 240dpi) {\n';
				
				'}\n';
		}

		// combined badgets
		for (i = 0; i <= 100; i++) { 
			cssOutput += 
				'.badge-combined-' + i + ' {\n' +
				'	background: transparent url("/etc/designs/efset/img/combined_' + i + sufix[resolution] + '.png") no-repeat center center;\n' +
				'}\n';
		}
		
		//efset badgets
		for (var key in efset) {
		   	var obj = efset[key];
		   	for (var prop in obj) {
		   		cssOutput += 
					'.badge-efset-' + key + '-' + prop + ' {\n' +
					'	background: transparent url("' + obj[prop] + sufix[resolution] + '.png") no-repeat center center;\n' +
					'}\n';
		   	}
		}
		
		// Retina media Query
		if (resolution === "retina") {
			cssOutput += "}";
		}
	}

	// Base
	cssOutput += 
		'.eft-badge {\n' +
		'	height: 390px;\n' +
		'	background-size: contain;\n' +
		'}\n';

	return cssOutput;
} 

fs.writeFile('badges.css', cssGen(), function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});