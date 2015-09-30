var fs = require("fs");
var parsing = require("../Parser-scfg/parserFunctions.js");
exports.scfgParser = function(filename, objectName, easyOgreExport) {
    var fn = "./uploads/" + filename;
	var base = fs.readFileSync(fn).toString();
    if (easyOgreExport == "on" || easyOgreExport == "justDefault") {
    	console.log("Settings part: default");
        var settings = require("./easyOgreSettingsObject.js")();
        var newBase = parsing.cutContentFromBegining(base, "<environment", "</environment>");
        if (newBase.indexOf("colourAmbient") >= 0) {
            var b1 = parsing.cutContentFromBegining(newBase, "<colourAmbient", "/>");
            
            b1 = b1.substring(14);
            settings.environment.ambientColor.r = parsing.tagBase(b1, "r");
            settings.environment.ambientColor.g = parsing.tagBase(b1, "g");
            settings.environment.ambientColor.b = parsing.tagBase(b1, "b");
        }
        if (newBase.indexOf("colourBackground") >= 0) {
            var b2 = parsing.cutContentFromBegining(newBase, "<colourBackground", "/>");
            b2 = b2.substring(16);
            settings.environment.backgroundColor.r = parsing.tagBase(b2, "r");
            settings.environment.backgroundColor.g = parsing.tagBase(b2, "g");
            settings.environment.backgroundColor.b = parsing.tagBase(b2, "b");
        }
    }
    else {
    	console.log("Settings part: scfg");
        base = parsing.cutContentFromBegining(base, "<virca", "</virca>");
        var settings = {};
        settings.type = 'scfg';
        settings.details = baseDetails(base);
        
        settings.light = light(base);
        
        settings.pointer = pointer(base);
        
        settings.physlimits = physlimits(base);
        
        settings.camera = camera(base);
        
        settings.browser = browser(base);
        
        settings.presentation = presentation(base);
    }
	var jsfl = require('jsonfile');
    jsfl.writeFileSync(objectName, settings);

}
	function baseDetails(base){
		base = parsing.cutContentFromBegining(base, "<virca", ">");
		var detail = {
			version: undefined,
			room: undefined,
			desc: undefined
		};

		detail.version = parsing.tagBase(base, "version");
		detail.room = parsing.tagBase(base, "room");
		detail.desc = parsing.tagBase(base, "desc");

		return detail;
    }
    function presentation(base) {
        base = parsing.cutContentFromBegining(base, "<presentation", ">");
        var presentation = {
            xml: undefined,
            use: undefined
        };
    
        presentation.xml = parsing.tagBase(base, "xml");
        presentation.use = parsing.tagBase(base, "use");
    
        return presentation;
    }

	function light(base){
		base = parsing.cutContentFromBegining(base, "<light", "</light>");

		var light = {
			skybox: {
				materialName: undefined,
				distance: undefined
			},
			ambientcolor: {
				r: undefined,
				g: undefined,
				b: undefined
			},
			crosshairs: {
				enable: undefined
			},
			runtimeshadersystem: {
				enable: undefined
			},
			shadow: {
				type: undefined
			},
			compositors: {
				HDR: {
					enable: undefined
				},
				Bloom: {
					enable: undefined
				},
				MotionBlur: {
					enable: undefined
				}
			},
			fog: {
				type: undefined,
				color:{
					r: undefined,
					g: undefined,
					b: undefined,
					a: undefined
				},
				linearStart: undefined,
				linearStop: undefined,
				expDensity: undefined
			}
		};

		var sky_b = parsing.cutContentFromBegining(base, "<skybox", "/>");
		light.skybox.materialName = parsing.tagBase(sky_b, "materialName");
		light.skybox.distance = parsing.tagBase(sky_b, "distance");
	
	//console.log("1: "+light.skybox.distance); // itt még jó

		var ambi_b = parsing.cutContentFromBegining(base, "<ambientcolor", "/>");
        // console.log(ambi_b + "\n\n"+base);
        //ambi_b = parsing.cutFrame(ambi_b, "<ambientcolor", "/>");

		//console.log("teszt: "+ ambi_b);
		ambi_b = parsing.cutContentFromBegining(ambi_b, " ", "/>");
		light.ambientcolor.r = parsing.tagBase(ambi_b, "r");
		//console.log(light.ambientcolor.r);
		light.ambientcolor.g = parsing.tagBase(ambi_b, "g");
		//console.log(light.ambientcolor.g);
		light.ambientcolor.b = parsing.tagBase(ambi_b, "b");
		//console.log(light.ambientcolor.b);
	 	
		var crossh_b = parsing.cutContentFromBegining(base, "<crosshairs", "/>");
		light.crosshairs.enable = parsing.tagBase(crossh_b, "enable");

		var run_b = parsing.cutContentFromBegining(base, "<runtimeshadersystem", "/>");
		light.runtimeshadersystem.enable = parsing.tagBase(run_b, "enable");

		var sh_b = parsing.cutContentFromBegining(base, "<shadow", "/>");
		light.shadow.type = parsing.tagBase(sh_b, "type");

		if(light.shadow.type == 'RTSS'){
			light.runtimeshadersystem.enable = 'true';
			light.shadow.type = 'NONE';
		}


		var comp_b = parsing.cutContentFromBegining(base, "<compositors", "</compositors>");

		var hdr_b = parsing.cutContentFromBegining(comp_b, "<HDR", "/>");
		light.compositors.HDR.enable = parsing.tagBase(hdr_b, "enable");

		var bloom_b = parsing.cutContentFromBegining(comp_b, "<Bloom", "/>");
        light.compositors.Bloom.enable = parsing.tagBase(bloom_b, "enable");
    

		var motion_b = parsing.cutContentFromBegining(comp_b, "<MotionBlur", "/>");
		light.compositors.MotionBlur.enable = parsing.tagBase(motion_b, "enable");

		if(base.indexOf("<fog") >= 0){
			var fog_b = parsing.cutContentFromBegining(base, "<fog", "/>");
			light.fog.type = parsing.tagBase(fog_b, "type");
			var tmp = parsing.tagBase(fog_b, "color").split(" ");
			light.fog.color.r = tmp[0];
			//console.log("fst: "+light.fog.color.r)
			light.fog.color.g = tmp[1];
			light.fog.color.b = tmp[2];
			light.fog.color.a = tmp[3];
			light.fog.linearStart = parsing.tagBase(fog_b, "linearStart");
			light.fog.linearStop = parsing.tagBase(fog_b, "linearStop");
			light.fog.expDensity = parsing.tagBase(fog_b, "expDensity");
		}
		return light;

	}

	function pointer(base){
		base = parsing.cutContentFromBegining(base, "<pointer", "</pointer>");
		var pointer = {
			hidden: undefined,
			length: undefined,
			origin: {
				x: undefined,
				y: undefined,
				z: undefined
			},
			direction: {
				pitch: undefined,
				yaw: undefined
			},
			go_to_cam_translation: {
				x: undefined,
				y: undefined,
				z: undefined
			}
		};

		var det_b = parsing.cutContentFromBegining(base, "<pointer", ">");
		pointer.hidden = parsing.tagBase(det_b, "hidden");
		pointer.length = parsing.tagBase(det_b, "length");

		var orig_b = parsing.cutContentFromBegining(base, "<origin", "/>");
		pointer.origin.x = parsing.tagBase(orig_b, "x");
		pointer.origin.y = parsing.tagBase(orig_b, "y");
		pointer.origin.z = parsing.tagBase(orig_b, "z");

		var dire_b = parsing.cutContentFromBegining(base, "<direction", "/>");
		pointer.direction.pitch = parsing.tagBase(dire_b, "pitch");
		pointer.direction.yaw = parsing.tagBase(dire_b, "yaw");

		var gtc_b = parsing.cutContentFromBegining(base, "<go_to_cam_translation", "/>");
		pointer.go_to_cam_translation.x = parsing.tagBase(gtc_b, "x");
		pointer.go_to_cam_translation.y = parsing.tagBase(gtc_b, "y");
		pointer.go_to_cam_translation.z = parsing.tagBase(gtc_b, "z");

		return pointer;

	}

	function physlimits(base){
		base = parsing.cutContentFromBegining(base, "<physlimits", "</physlimits>");
		var physlimits = {
			xlimit: {
				min: undefined,
				max: undefined
			},
			ylimit: {
				min: undefined,
				max: undefined
			},
			zlimit: {
				min: undefined,
				max: undefined
			}
		};

		var x_b = parsing.cutContentFromBegining(base, "<xlimit", ">");
		physlimits.xlimit.min = parsing.tagBase(x_b, "min");
		physlimits.xlimit.max = parsing.tagBase(x_b, "max");

		var y_b = parsing.cutContentFromBegining(base, "<ylimit", "/>");
		physlimits.ylimit.min = parsing.tagBase(y_b, "min");
		physlimits.ylimit.max = parsing.tagBase(y_b, "max");

		var z_b = parsing.cutContentFromBegining(base, "<zlimit", "/>");
		physlimits.zlimit.min = parsing.tagBase(z_b, "min");
		physlimits.zlimit.max = parsing.tagBase(z_b, "max");


		return physlimits;
	}

	function camera(base){
		base = parsing.cutContentFromBegining(base, "<camera", "</camera>");
		var camera = {
			init_mode: undefined,
			fov: undefined,
			position: {
				x: undefined,
				y: undefined,
				z: undefined
			},
			rotation: {
				x: undefined,
				y: undefined,
				z: undefined,
				w: undefined
			},
			clipping: {
				near: undefined,
				far: undefined
			}
		};

		var cam_b = parsing.cutContentFromBegining(base, "<camera", ">");
		camera.init_mode = parsing.tagBase(cam_b, "init_mode");
		camera.fov = parsing.tagBase(cam_b, "fov");

		var pos_b = parsing.cutContentFromBegining(base, "<position", "/>");
		camera.position.x = parsing.tagBase(pos_b, "x");
		camera.position.y = parsing.tagBase(pos_b, "y");
		camera.position.z = parsing.tagBase(pos_b, "z");

		var rot_b = parsing.cutContentFromBegining(base, "<rotation", "/>");
		camera.rotation.x = parsing.tagBase(rot_b, "x");
		camera.rotation.y = parsing.tagBase(rot_b, "y");
		camera.rotation.z = parsing.tagBase(rot_b, "z");
		camera.rotation.w = parsing.tagBase(rot_b, "w");


		var clip_b = parsing.cutContentFromBegining(base, "<clipping", "/>");
		camera.clipping.near = parsing.tagBase(clip_b, "near");
		camera.clipping.far = parsing.tagBase(clip_b, "far");

		return camera;
	}

	function browser(base){
		base = parsing.cutContentFromBegining(base, "<browser", "</browser>");
		var browser = {
			homepage: {
				url: undefined
			},
		};
		var br_a = parsing.cutContentFromBegining(base, "<homepage", "/>");
		browser.homepage.url = parsing.tagBase(br_a, "url");

		return browser;
	}
