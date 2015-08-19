exports.scfgJSON2room = function(filename, objectName, roomName) {		
	var jsonfile = require('jsonfile');
    var fromJSON = jsonfile.readFileSync("./" +objectName);
	var js2xml = require('js2xmlparser');
	var fs = require('fs');

	var settings = {
		environment: {
			skybox: {
				materialName: undefined,
				distance: undefined
			},
			ambientColor: {
				r: undefined,
				g: undefined,
				b: undefined,
				a: undefined
			},
			backgroundColor: {
				r: 0,
				g: 0,
				b: 0,
				a: 1
			},
			runtimeshadersystem: undefined,
			shadow: undefined,
			compositors: {
				Bloom: undefined,
				MotionBlur: undefined
			},
			fog: {
				type: undefined,
				color: {
					r: undefined,
					g: undefined,
					b: undefined,
					a: undefined
				},
				linearStart: undefined,
				linearStop: undefined,
				expDensity: undefined
			}
		},
		pointer:{
			visibility: undefined,
			crosshairs: undefined,
			length: undefined,
			offset: {
				x: undefined,
				y: undefined,
				z: undefined
			}
		},
		boundaries: {
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
		},
		camera: {
			pose: {
				position: {
					x: undefined,
					y: undefined,
					z: undefined
				},
				orientation:{
					ypr: {
						yaw: undefined,
						pitch: undefined,
						roll: undefined
					},
					angleAxis: {
						angle: undefined,
						axis:{
							x: undefined,
							y: undefined,
							z: undefined	
						},
					},
					quaternion:{
						x: undefined,
						y: undefined,
						z: undefined,
						w: undefined
					},
					rotMatrix: {
						xx: undefined,
						xy: undefined,
						xz: undefined,
						yx: undefined,
						yy: undefined,
						yz: undefined,
						zx: undefined,
						zy: undefined,
						zz: undefined
					}

				},
			},
			clipping: {
				near: undefined,
				far: undefined
			},
			fov: undefined
		},
		browserStartPage: {
			url: undefined
		},
		presentation: {
			fileName: undefined,
			enabled: undefined
		}
    };
    
    if (fromJSON.type == 'scfg') {
        if (fromJSON.light.skybox.materialName != undefined)
            settings.environment.skybox.materialName = fromJSON.light.skybox.materialName;
        if (fromJSON.light.skybox.distance != undefined)
            settings.environment.skybox.distance = fromJSON.light.skybox.distance;
        
        settings.environment.ambientColor.r = fromJSON.light.ambientcolor.r;
        settings.environment.ambientColor.g = fromJSON.light.ambientcolor.g;
        settings.environment.ambientColor.b = fromJSON.light.ambientcolor.b;
        settings.environment.ambientColor.a = fromJSON.light.ambientcolor.a;
        
        
        if (settings.environment.ambientColor.a == undefined && settings.environment.ambientColor.b != undefined && settings.environment.ambientColor.g != undefined && settings.environment.ambientColor.r != undefined) {
            settings.environment.ambientColor.a = 1;
        }
        
        if (fromJSON.light.runtimeshadersystem.enable != undefined)
            settings.environment.runtimeshadersystem = fromJSON.light.runtimeshadersystem.enable;
        if (fromJSON.light.shadow.type != undefined)
            settings.environment.shadow = fromJSON.light.shadow.type;
        if (fromJSON.light.compositors.Bloom.enable != undefined)
            settings.environment.compositors.Bloom = fromJSON.light.compositors.Bloom.enable;
        if (fromJSON.light.compositors.MotionBlur.enable != undefined)
            settings.environment.compositors.MotionBlur = fromJSON.light.compositors.MotionBlur.enable;
        
        
        if (fromJSON.light.fog.type != undefined) {
            settings.environment.fog.type = fromJSON.light.fog.type.toUpperCase();
            settings.environment.fog.color.r = fromJSON.light.fog.color.r;
            settings.environment.fog.color.g = fromJSON.light.fog.color.g;
            settings.environment.fog.color.b = fromJSON.light.fog.color.b;
            settings.environment.fog.color.a = fromJSON.light.fog.color.a;
            settings.environment.fog.linearStart = fromJSON.light.linearStart;
            settings.environment.fog.linearStop = fromJSON.light.linearStop;
            settings.environment.fog.expDensity = fromJSON.light.expDensity;
        }
        
        settings.pointer.visibility = !fromJSON.pointer.hidden;
        settings.pointer.crosshairs = fromJSON.light.crosshairs.enable;
        settings.pointer.length = fromJSON.pointer.length;
        settings.pointer.offset.x = fromJSON.pointer.origin.x;
        settings.pointer.offset.y = fromJSON.pointer.origin.y;
        settings.pointer.offset.z = fromJSON.pointer.origin.z;
        
        settings.boundaries.xlimit.min = fromJSON.physlimits.xlimit.min;
        settings.boundaries.xlimit.max = fromJSON.physlimits.xlimit.max;
        settings.boundaries.ylimit.min = fromJSON.physlimits.ylimit.min;
        settings.boundaries.ylimit.max = fromJSON.physlimits.ylimit.max;
        settings.boundaries.zlimit.min = fromJSON.physlimits.zlimit.min;
        settings.boundaries.zlimit.max = fromJSON.physlimits.zlimit.max;
        
        settings.camera.pose.position.x = fromJSON.camera.position.x;
        settings.camera.pose.position.y = fromJSON.camera.position.y;
        settings.camera.pose.position.z = fromJSON.camera.position.z;
        settings.camera.pose.orientation.quaternion.x = fromJSON.camera.rotation.x;
        settings.camera.pose.orientation.quaternion.y = fromJSON.camera.rotation.y;
        settings.camera.pose.orientation.quaternion.z = fromJSON.camera.rotation.z;
        settings.camera.pose.orientation.quaternion.w = fromJSON.camera.rotation.w;
        
        settings.camera.clipping.near = fromJSON.camera.clipping.near;
        settings.camera.clipping.far = fromJSON.camera.clipping.far;
        
        settings.camera.fov = fromJSON.camera.fov;
        
        settings.browserStartPage.url = fromJSON.browser.url;
        
        settings.presentation.fileName = fromJSON.presentation.xml;
        settings.presentation.enabled = fromJSON.presentation.use;
    }
    else if(fromJSON.type == 'environment') {
        settings.environment.ambientColor.r = fromJSON.ambientcolor.r;
        settings.environment.ambientColor.g = fromJSON.ambientcolor.g;
        settings.environment.ambientColor.b = fromJSON.ambientcolor.b;
        settings.environment.ambientColor.a = fromJSON.ambientcolor.a;
        if (settings.environment.ambientColor.a == undefined && settings.environment.ambientColor.b != undefined && settings.environment.ambientColor.g != undefined && settings.environment.ambientColor.r != undefined) {
            settings.environment.ambientColor.a = 1;
        }
        
        settings.environment.backgroundColor.r = fromJSON.colourBackground.r;
        settings.environment.backgroundColor.g = fromJSON.colourBackground.g;
        settings.environment.backgroundColor.b = fromJSON.colourBackground.b;

    }
	var str = js2xml("settings", settings);

	while(str.indexOf("<Bloom/>") >= 0){
			str = str.replace("<Bloom/>", "");
	}
	while(str.indexOf("<MotionBlur/>") >= 0){
		str = str.replace("<MotionBlur/>", "");
	}

	str=str.replace(/<[^>]+><\/[^\/>]+>/gim, "");
	while(str.replace(/<[^\/>]+>[\s\t\n]+<\/[^>]+>/gim, "") != str){
		str=str.replace(/<[^\/>]+>[\s\t\n]+<\/[^>]+>/gim, "");
	}

	while(str.indexOf("<?xml version=\"1.0\" encoding=\"UTF-8\"?>") >= 0){
		str = str.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "");
	}

	str=str.replace(/^\s*[\r\n]/gm, "");

	fs.writeFileSync("./"+roomName, str);
}