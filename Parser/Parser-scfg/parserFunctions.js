exports.tagBase = function(base, prop){
	base = base.substring(0, base.indexOf(">")+1);
	//console.log("base:" + base);
	if(base.indexOf(prop+ "=") >= 0){
		base = exports.getContentBetweenMarks(base, prop);
		return base;
	}
	return;
}

exports.getContentBetweenMarks= function(base, prop){ //Get string from the first mark to the next one
	base = base.substring(base.indexOf(prop));
	base = base.substring(base.indexOf("\"")+1);
	base = base.substring(0, base.indexOf("\""));
	//console.log("Marks: "+ base); // Working!
	return base;
}

exports.cutContentFromBegining= function(base, begin, end){
	base = base.substring(base.indexOf(begin));
	base = base.substring(0, base.indexOf(end)+ end.length);
	//console.log("Begin: "+base.indexOf(begin) + ",   End: "+ base.indexOf(end)+ ",   Endlength: "+ end.length);
	return base;
}

exports.cutFrame= function(base, begStr, endStr){
	base = base.substring( base.indexOf(begStr) + begStr.length, base.indexOf(endStr));
	return base;
}