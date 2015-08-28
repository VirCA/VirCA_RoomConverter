var fs = require("fs");
var jsfl = require('jsonfile');

exports.sceneParser = function (filename, easyOgreExport, objectName){
    var scene = readFromFile(filename);
    //console.log(scene);

	var nodes = [];
	var i = 0;
	while(scene.indexOf("<node") != -1){
		
		nodes.push(
			parseOneNode(scene)
        );
        if (easyOgreExport == "on")
            nodeMultiplier(nodes[i]);
        ++i;
		scene = removeNode(scene);
	}
		jsfl.writeFileSync(objectName, nodes);
}

function nodeMultiplier(node){
    if (node.mainType == "node") {
        node.scale = scaleMulti(node.scale);
        node.position = scaleMulti(node.position);
    }
    else if (node.mainType == "browser"){
        node.browser.width = wh_multi(node.browser.width);
        node.browser.height = wh_multi(node.browser.height);
        node.position = scaleMulti(node.position);
    }
    else if (node.mainType == "light" ) {
        node.position = scaleMulti(node.position);
        node.lightAttenuation.range *= 100;
        node.lightRange.inner *= 180 / Math.PI;
        node.lightRange.outer *= 180 / Math.PI;
    }
    else if (node.mainType == "plane") {
        node.plane.width = wh_multi(node.plane.width);
        node.plane.height = wh_multi(node.plane.height);
        node.position = scaleMulti(node.position);
    }
    else if (node.mainType == "figure") {
        node.figure.width = wh_multi(node.figure.width);
        node.figure.height = wh_multi(node.figure.height);
        node.position = scaleMulti(node.position);
    }

}
function scaleMulti(scale) {
    scale.x *= 100;
    scale.y *= 100;
    scale.z *= 100;
    return scale;
}
function posiMulti(posi){
    posi.x *= 100;
    posi.y *= 100;
    posi.z *= 100;
    return posi;
}
function wh_multi(tmp){
    return tmp *= 100;
}
	function parseOneNode(base){
		base = cutContentFromBegining(base, "<node", "</node>");
		
		if(base.indexOf("<light") >= 0){
			
			base = cutContentFromBegining(base, "<node", "</node>");
			//console.log(base);
			var node = {
				mainType: "light",
				name: undefined,
				type: undefined,
                position: {},
                rotation: {},
				direction: {},
				colourDiffuse: {},
				colourSpecular: {},
				lightRange: {},
				lightAttenuation: {}
			}
			var tmp = cutContentFromBegining(base, "<node", ">");
			//console.log(tmp);
			node.name = nodeBase(tmp, "name");
       
       // console.log(base);
			
			if(node.name == undefined)
				node.name = nodeBase(base, "name");
            node.position = nodePosition(base);
        
            node.rotation = nodeRotation(base);
        
            base = cutContentFromBegining(base, "<light", "</light>");
            node.type = nodeBase(base, "type");
			node.direction = lightDirection(base);

			node.colourDiffuse = lightColourDiffuse(base);

			node.colourSpecular = lightColourSpecular(base);

			node.lightRange = lightRange(base);

			node.lightAttenuation = lightAttenuation(base);

		}
		else if(base.indexOf("<browser") >= 0){
			var node = {
				mainType: "browser",
				detail: {},
				position: {},
				rotation: {},
				scale: {},
				entity: {},
				browser: {}
			};

			node.detail = nodeBaseDetails(base);

			node.position = nodePosition(base);

			node.rotation = nodeRotation(base);

			node.scale = nodeScale(base);

			node.entity = nodeEntity(base);

			node.browser = nodeBrowser(base);
    }
    else if (nodeBaseDetails(base).name != undefined && nodeBaseDetails(base).name.toString().indexOf("_brw_") >= 0) {
        var node = {
            mainType: "browser",
            detail: {},
            position: {},
            rotation: {},
            scale: {},
            entity: {},
            browser: {}
        };
        node.detail = nodeBaseDetails(base);
        node.position = nodePosition(base);       
        node.rotation = nodeRotation(base);
        node.scale = nodeScale(base);
        node.entity = nodeEntity(base);
        node.browser.isShared = "false";
        
        //----------------needdefaultvalue--------------------------
        
        node.browser.isDraggable = "false";
        node.browser.isSnap2Wall = "true";
        var tmp = node.detail.name;
        if (tmp.indexOf("_w_") >= 0 && tmp.indexOf("_h_") >= 0) {
            node.browser.width = tmp.substring(tmp.indexOf("_w_")+3, tmp.indexOf("_h_"));// ideiglenes
            node.browser.height = tmp.substring(tmp.indexOf("_h_")+3);
            node.browser.url = "https://www.google.hu/?gfe_rd=cr&ei=KsbJVfWcKYau8wfLjoSwAg&gws_rd=ssl#q=" + tmp.substring(tmp.indexOf("_brw_") + 5, tmp.indexOf("_w_"));
            node.browser.zoom = 0;
        }
        else {
            node.browser.width = 200;// ideiglenes
            node.browser.height = 160;
            node.browser.url = "https://www.google.hu/?gfe_rd=cr&ei=KsbJVfWcKYau8wfLjoSwAg&gws_rd=ssl#q=" + tmp.substring(tmp.indexOf("_brw_")+5);
            node.browser.zoom = 0;
        }

        

    }
		else if(base.indexOf("<plane")>=0){
			var node = {
				mainType: "plane",
				detail: {},
				position: {},
				rotation: {},
				scale: {},
				entity: {},
				plane:{}
			};

			node.detail = nodeBaseDetails(base);

			node.position = nodePosition(base);

			node.rotation = nodeRotation(base);

			node.scale = nodeScale(base);

			node.entity = nodeEntity(base);

			node.plane = nodePlane(base);
		}
		else if(base.indexOf("<figure")>=0){
			var node = {
				mainType: "figure",
				detail: {},
				position: {},
				rotation: {},
				scale: {},
				entity: {},
				figure: {}
			};

			node.detail = nodeBaseDetails(base);

			node.position = nodePosition(base);

			node.rotation = nodeRotation(base);

			node.scale = nodeScale(base);

			node.entity = nodeEntity(base);

			node.figure = nodeFigure(base);

		}
		else{
			var node = {
				mainType: "node",
				detail: {},
				position: {},
				rotation: {},
				scale: {},
				entity: {}
			};

			node.detail = nodeBaseDetails(base);

			node.position = nodePosition(base);

			node.rotation = nodeRotation(base);

			node.scale = nodeScale(base);

			node.entity = nodeEntity(base);

        }
        		
		return node;

		//node.entity = nodeEntity(base);
			//console.log(base);
	}

	function nodeFigure(base){
		base = cutContentFromBegining(base, "<figure", "/>");
		var figure = {
			castShadows: undefined,
			width: undefined,
			height: undefined,
			material: undefined,
			movablePlane: undefined
		};

		figure.castShadows = nodeBase(base, "castShadows");
		figure.material = nodeBase(base, "material");
		figure.width = nodeBase(base, "width");
		figure.height = nodeBase(base, "height");
		figure.movablePlane = nodeBase(base, "movablePlane");

		return figure;
	}

	function nodePlane(base){
		base = cutContentFromBegining(base, "<plane", "</plane>");
		var plane = {
			name: undefined,
			castShadows: undefined,
			distance: undefined,
			width: undefined,
			height: undefined,
			xSegments: undefined,
			ySegments: undefined,
			numTexCoordSets: undefined,
			uTile: undefined,
			vTile: undefined,
			material: undefined,
			normals: undefined,
			movablePlane: undefined,
			tangents: undefined,
			normal: {
				x: undefined,
				y: undefined,
				z: undefined
			},
			upVector: {
				x: undefined,
				y: undefined,
				z: undefined
			}
		};
		var pro_base = cutContentFromBegining(base, "<plane", ">");

		plane.name = nodeBase(pro_base, "name");
		plane.castShadows = nodeBase(pro_base, "castShadows");
		plane.distance = nodeBase(pro_base, "distance");
		plane.width = nodeBase(pro_base, "width");
		plane.height = nodeBase(pro_base, "height");
		plane.xSegments = nodeBase(pro_base, "xSegments");
		plane.numTexCoordSets = nodeBase(pro_base, "numTexCoordSets");
		plane.uTile = nodeBase(pro_base, "uTile");
		plane.vTile = nodeBase(pro_base, "vTile");
		plane.material = nodeBase(pro_base, "material");
		plane.normals = nodeBase(pro_base, "normals");
		plane.movablePlane = nodeBase(pro_base, "movablePlane");
		plane.tangents = nodeBase(pro_base, "tangents");

		var norm_base = cutContentFromBegining(base, "<normal", "/>");
		plane.normal.x = nodeBase(norm_base, "x");
		plane.normal.y = nodeBase(norm_base, "y");
		plane.normal.z = nodeBase(norm_base, "z");

		var upvec_base = cutContentFromBegining(base, "<upVector", "/>");
		plane.upVector.x = nodeBase(upvec_base, "x");
		plane.upVector.y = nodeBase(upvec_base, "y");
		plane.upVector.z = nodeBase(upvec_base, "z");

		return plane;
	}

	function lightDirection(base){
		base = cutContentFromBegining(base, "<direction", "/>");
		var direction = {
			x: undefined,
			y: undefined,
			z: undefined
		};
		direction.x = nodeBase(base, "x");
		direction.y = nodeBase(base, "y");
		direction.z = nodeBase(base, "z");

		return direction;
	}
	function lightColourDiffuse(base){
		base = cutContentFromBegining(base, "<colourDiffuse", "/>");
		var colourDiffuse = {
			r: undefined,
			g: undefined,
			b: undefined
		};
		colourDiffuse.r = nodeBase(base, "r");
		colourDiffuse.g = nodeBase(base, "g");
		colourDiffuse.b = nodeBase(base, "b");

		return colourDiffuse;
	}
	function lightColourSpecular(base){
		base = cutContentFromBegining(base, "<colourSpecular", "/>");
		var colourSpecular = {
			r: undefined,
			g: undefined,
			b: undefined
		};
		colourSpecular.r = nodeBase(base, "r");
		colourSpecular.g = nodeBase(base, "g");
		colourSpecular.b = nodeBase(base, "b");

		return colourSpecular;
	}

	function lightRange(base){
		base = cutContentFromBegining(base, "<lightRange", "/>");
		var lightRange = {
			inner: undefined,
			outer: undefined,
			falloff: undefined,
		};

		lightRange.inner = nodeBase(base, "inner");
		lightRange.outer = nodeBase(base, "outer");
		lightRange.falloff = nodeBase(base, "falloff");

		return lightRange;
	}
	function lightAttenuation(base){
		base = cutContentFromBegining(base, "<lightAttenuation", "/>");
		var lightAttenuation = {
			mode: undefined,
			range: undefined,
			constant: undefined,
			linear: undefined,
			quadritic: undefined
		};

		lightAttenuation.mode = nodeBase(base, "mode");
		lightAttenuation.range = nodeBase(base, "range");
		lightAttenuation.constant = nodeBase(base, "constant");
		lightAttenuation.linear = nodeBase(base, "linear");
		lightAttenuation.quadritic = nodeBase(base, "quadritic");

		return lightAttenuation;
	}



	function nodeBrowser(base){
		base = cutContentFromBegining(base, "<browser", "</browser>");
		var browser = {
			isShared: undefined,
			width: undefined,
			height: undefined,
			resolution_w: undefined,
			resolution_h: undefined,
			isDraggable: undefined,
			isSnap2Wall: undefined,
			url: undefined,
			zoom: undefined
		};

		browser.isShared = nodeBase(base, "isShared");
		

		browser.width = nodeBase(base, "width");
		browser.height = nodeBase(base, "height");
		browser.resolution_w = nodeBase(base, "resolution_w");
		browser.resolution_h = nodeBase(base, "resolution_h");

		browser.isDraggable = nodeBase(base, "isDraggable");
	

		browser.isSnap2Wall = nodeBase(base, "isSnap2Wall");
		

		browser.url = nodeBase(base, "url");
		browser.zoom = nodeBase(base, "zoom");

		return browser;
	}

	function nodeEntity(base){
		if(base.indexOf("<entity") >= 0 && base.indexOf("</entity>") >= 0)
			base = cutContentFromBegining(base, "<entity", "</entity>");
		else
			base = cutContentFromBegining(base, "<entity", "/>");

		var entity = {
			details: {},
			subentities: []
		}
		entity.details = nodeEntityDetails(base);
		entity.subentities = nodeSubentities(base);

		return entity;
	}
	function nodeEntityDetails(base){
		var details = {
			name: undefined,
			id: undefined,
			meshFile: undefined,
			castShadows: undefined,
			recieveShadows: undefined
		}

		details.name = nodeBase(base, "name");
		details.id = nodeBase(base, "id");
		details.meshFile = nodeBase(base, "meshFile");
	   	details.castShadows = nodeBase(base, "castShadows");
        details.recieveShadows = nodeBase(base, "recieveShadows");

		return details;
	}
	function nodeSubentities(base){
		if(base.indexOf("<subentities>") >= 0){
			var i = 0;
			
			base = cutContentFromBegining(base, "<subentities>","</subentities>");
			base = cutFrame(base, "<subentities>", "</subentities>");

			var subentities = [];
			while(base.indexOf("<subentity") >= 0){
				subentities.push({
					index: undefined,
					materialName: undefined
				});
				subentities[i].index = nodeBase(base, "index");
				subentities[i].materialName = nodeBase(base, "materialName");
				++i;
				//base = base.replace("/<subentity.*/>/g", "");
				//base = base.trim();
				base = base.substring(base.indexOf("/>")+"/>".length);
			}
			return subentities;
		}
		return;
	}



	function nodeScale(base){
		base = cutContentFromBegining(base, "<scale", "/>");
		var scale = {
			x: undefined,
			y: undefined,
			z: undefined
		};
		scale.x = nodeBase(base, "x");
		scale.y = nodeBase(base, "y");
		scale.z = nodeBase(base, "z");

		return scale;

	}
	function nodeRotation(base){
		base = cutContentFromBegining(base, "<rotation", "/>");
		var rotation = {};
		if(base.indexOf("xx") >= 0 && base.indexOf("xy") >= 0 && base.indexOf("xz") >= 0){
			rotation = {
				type: "rotMatrix",
				xx: undefined,
				xy: undefined,
				xz: undefined,
				yx: undefined,
				yy: undefined,
				yz: undefined,
				zx: undefined,
				zy: undefined,
				zz: undefined,
			};
			rotation.xx = nodeBase(base, "xx");
			rotation.xy = nodeBase(base, "xy");
			rotation.xz = nodeBase(base, "xz");
			rotation.yx = nodeBase(base, "yx");
			rotation.yy = nodeBase(base, "yy");
			rotation.yz = nodeBase(base, "yz");
			rotation.zx = nodeBase(base, "zx");
			rotation.zy = nodeBase(base, "zy");
			rotation.zz = nodeBase(base, "zz");

		}
		else if(base.indexOf("angle") >= 0 && base.indexOf("axis")){
			rotation = {
				type: "angleAxis",
				angle: undefined,
				axis: {
					x: undefined,
					y: undefined,
					z: undefined
				}
			};
			rotation.angle = nodeBase(base, "angle");
			var	ax_b = cutContentFromBegining(base, "<axis", ">");
			rotation.axis.x = nodeBase(base, "x");
			rotation.axis.y = nodeBase(base, "y");
			rotation.axis.z = nodeBase(base, "z");

		}
		else if(base.indexOf("yaw") >= 0 && base.indexOf("pitch") >= 0 && base.indexOf("roll") >= 0){
			rotation = {
				type: "ypr",
				yaw: undefined,
				pitch: undefined,
				roll: undefined,
			};

			rotation.yaw = nodeBase(base, "yaw");
			rotation.pitch = nodeBase(base, "pitch");
			rotation.roll = nodeBase(base, "roll");
		}
		else{
			rotation = {
				type: "quaternion",
				x: undefined,
				y: undefined,
				z: undefined,
				w: undefined
			};
			rotation.x = nodeBase(base, "x");
			rotation.y = nodeBase(base, "y");
			rotation.z = nodeBase(base, "z");
			rotation.w = nodeBase(base, "w");
		}

		return rotation;
	}

	function nodePosition(base){
		base = cutContentFromBegining(base, "<position", "/>");
		var position = {
			x: undefined,
			y: undefined,
			z: undefined
		}
		position.x = nodeBase(base, "x");
		position.y = nodeBase(base, "y");
		position.z = nodeBase(base, "z");

		return position;
	}

	function nodeBaseDetails(base){
		var detail = {
			name: undefined,
			id: undefined,
			isTarget: undefined
		};
		detail.name = nodeBase(base, "name");
		detail.id =  nodeBase(base, "id");
		detail.isTarget = nodeBase(base, "isTarget");
    
        return detail;
	}

	function nodeBase(base, prop){
		base = base.substring(0, base.indexOf(">")+1);
		if(base.indexOf(prop+ "=") >= 0){
			base = getContentBetweenMarks(base, prop);
			return base;
		}
		return;

	}


	function getContentBetweenMarks(base, prop){ //Get string from the first mark to the next one
		base = base.substring(base.indexOf(prop));
		base = base.substring(base.indexOf("\"")+1);
		base = base.substring(0, base.indexOf("\""));
		//console.log("Marks: "+ base); // Working!
		return base;
	}

	function removeNode(base){
		base = base.substring(base.indexOf("</node>")+"</node>".length);
		return base;

	}
function readFromFile(fileName){
        var fn = "./uploads/" + fileName;
        var scene = fs.readFileSync(fn).toString();
        scene = cutContentFromBegining(scene, "<scene", "</scene>");
		scene = cutFrame(scene, "<nodes>", "</nodes>");
		return scene.trim();
	}

	function cutContentFromBegining(base, begin, end){
		base = base.substring(base.indexOf(begin));
		base = base.substring(0, base.indexOf(end)+ end.length);
		//console.log("Begin: "+base.indexOf(begin) + ",   End: "+ base.indexOf(end)+ ",   Endlength: "+ end.length);
		return base;
	}

	function cutFrame(base, begStr, endStr){
		base = base.substring( base.indexOf(begStr) + begStr.length, base.indexOf(endStr));
		return base;
	}