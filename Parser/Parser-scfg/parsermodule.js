var fs = require('fs');
var parse = require('xml-parser');
var xml = fs.readFileSync("C-school.scfg").toString();
//console.log(xml.toString());
var obj = parse(xml);

var jsonfile = require('jsonfile');

console.log(obj);

jsonfile.writeFile("obj.json", obj, function(err){
	if(err)
		console.log(err);
	else
		console.log("jo");
});