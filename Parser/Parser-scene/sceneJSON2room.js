exports.sceneJSON2room = function(filename, objectName, roomName){

	var jsonfile = require('jsonfile');

		var fromJSON = jsonfile.readFileSync("./" + objectName);

		var js2xml = require('js2xmlparser');

		var fs = require('fs');

		var str = "";

    var nodes = [];
    var nodesType = [];
    var lightType = [];
    var p = 0;

		var i = 0;
		while(i < fromJSON.length){
			var node = {
				"@": {
					name: ""
				},
				"pose":{
					"position":{
						"x": "",
						"y": "", 
						"z": ""
					},
					"orientation":{
						"ypr":{
							"yaw": "",
							"pitch": "",
							"roll": ""
						},
						"angleAxis":{
							"angle": "",
							"axis" :{
								"x": "",
								"y": "",
								"z": ""
							}
						},
						"quaternion":{
							"x": "",
							"y": "",
							"z": "",
							"w": ""
						},
						"rotMatrix":{
							"xx":"",
							"xy":"",
							"xz":"",
							"yx":"",
							"yy":"",
							"yz":"",
							"zx":"",
							"zy":"",
							"zz":""
						}
					}
				},
				"scale":{
					"x": "",
					"y": "",
					"z": ""
				},
				"entity":{
					"meshFileName": "",
					"castShadows": ""
				},
				"browser":{
					"url": "",
					"shared": "",
					"draggable": "",
					"snappedToWall": "",
					"width": "",
                    "height": "",
                    "resH": "",
                    "resV": "",
					"zoom": ""
				},
				"figure":{
					"width": "",
					"height": "",
					"materialName": "",
					"draggable": "",
					"castShadows": ""
				},
				"plane":{
					"width": "",
					"height": "",
					"materialName": "",
					"movablePlane": "",
					"distance": "",
					"xSegment": "",
					"ySegment": "",
					"numTexCoordSets": "",
					"uTile": "",
					"vTile": "",
					"normals": "",
					"tangents": "",
					"castShadows": "",
					"normal": {
						"x": "",
						"y": "",
						"z": ""
					},
					"upVector": {
						"x": "",
						"y": "",
						"z": ""
					}
				},
				"light":{
					"offset":{
						"x": "",
						"y": "",
						"z": ""
					},
					"diffuse": {
						"r": "",
						"g": "",
						"b": "",
						"a": ""
					},
					"specular":{
						"r": "",
						"g": "",
						"b": "",
						"a": ""
					},
					"castShadows": "",
					"type": {
						"spot":{
							"range":{
								"inner": "",
								"outer": "",
								"falloff": ""
							},
							"attenuation":{
								"range": "",
								"manual":{
									"constant":"",
									"linear": "",
									"quadratic": ""
								},
								"range": "",
								"manual":{
									"constant": "",
									"linear": "",
									"quadratic": ""
								},
								"range": "",
								"manual":{
									"constant": "",
									"linear": "",
									"quadratic": ""
								},
							},
							"direction": {
								"x": "",
								"y": "",
								"z": ""
							}
						},
						"directional":{
							"direction":{
								"x": "",
								"y": "",
								"z": ""
							}
						},
						"point":{
							"attenuation":{
								"range": "",
								"manual":{
									"constant": "",
									"linear": "",
									"quadratic": ""
								},
								"range": "",
								"manual":{
									"constant": "",
									"linear": "",
									"quadratic": ""
								},
								"range": "",
								"manual":{
									"constant": "",
									"linear": "",
									"quadratic": ""
								},
							}
						}
					}
				}
			}
			if(fromJSON[i].mainType == "node"){
				node['@'].name = fromJSON[i].detail.name;

				node.pose.position.x = fromJSON[i].position.x;
				node.pose.position.y = fromJSON[i].position.y;
				node.pose.position.z = fromJSON[i].position.z;

				node.pose.orientation = rotation(fromJSON[i].rotation);

				node.scale.x =  fromJSON[i].scale.x;
				node.scale.y =  fromJSON[i].scale.y,
				node.scale.z =  fromJSON[i].scale.z;
            
                node.entity.meshFileName = fromJSON[i].entity.details.meshFile;
                if (node.entity.meshFileName == undefined) {
                    node.entity.meshFileName = "";
                }
				//console.log(fromJSON[i].entity.details.meshFile);
				node.entity.castShadows = fromJSON[i].entity.details.castShadows;


			}
			else if(fromJSON[i].mainType == "plane"){
				node['@'].name = fromJSON[i].detail.name;

				node.pose.position.x = fromJSON[i].position.x;
				node.pose.position.y = fromJSON[i].position.y;
				node.pose.position.z = fromJSON[i].position.z;

				node.pose.orientation = rotation(fromJSON[i].rotation);

				node.scale.x =  fromJSON[i].scale.x;
				node.scale.y =  fromJSON[i].scale.y,
				node.scale.z =  fromJSON[i].scale.z;

				node.entity.meshFileName = fromJSON[i].entity.details.meshFile;
				//console.log(fromJSON[i].entity.details.meshFile);
				node.entity.castShadows = fromJSON[i].entity.details.castShadows;
				if(fromJSON[i].plane != undefined){
					if(fromJSON[i].plane.width.toString().indexOf(".") >=0)
						fromJSON[i].plane.width = fromJSON[i].plane.width.toString().substring(0, fromJSON[i].plane.width.indexOf("."));
					if(fromJSON[i].plane.height.toString().indexOf(".") >=0)
						fromJSON[i].plane.height = fromJSON[i].plane.height.toString().substring(0, fromJSON[i].plane.height.indexOf("."));

					node.plane.width = fromJSON[i].plane.width;
					node.plane.height = fromJSON[i].plane.height;
					node.plane.materialName = fromJSON[i].plane.material;
					node.plane.movablePlane = fromJSON[i].plane.movablePlane;
					node.plane.distance = fromJSON[i].plane.distance;
					node.plane.xSegment = fromJSON[i].plane.xSegments;
					//console.log("xseg: "+ node.plane.xSegment);
					node.plane.ySegment = fromJSON[i].plane.ySegments;

					//console.log("yseg: "+ node.plane.ySegment);
					node.plane.numTexCoordSets = fromJSON[i].plane.numTexCoordSets;
					node.plane.uTile = fromJSON[i].plane.uTile;
					node.plane.vTile = fromJSON[i].plane.vTile;
					node.plane.normals = fromJSON[i].plane.normals;
					node.plane.castShadows = fromJSON[i].plane.castShadows;
					node.plane.tangents = fromJSON[i].plane.tangents;

					node.plane.normal.x = fromJSON[i].plane.normal.x;
					node.plane.normal.y = fromJSON[i].plane.normal.y;
					node.plane.normal.z = fromJSON[i].plane.normal.z;
					node.plane.upVector.x = fromJSON[i].plane.upVector.x;
					node.plane.upVector.y = fromJSON[i].plane.upVector.y;
					node.plane.upVector.z = fromJSON[i].plane.upVector.z;
				}
			}
			else if(fromJSON[i].mainType == "browser"){
				node['@'].name = fromJSON[i].detail.name;

				node.pose.position.x = fromJSON[i].position.x;
				node.pose.position.y = fromJSON[i].position.y;
				node.pose.position.z = fromJSON[i].position.z;

				node.pose.orientation = rotation(fromJSON[i].rotation);

				node.scale.x =  fromJSON[i].scale.x;
				node.scale.y =  fromJSON[i].scale.y,
				node.scale.z =  fromJSON[i].scale.z;

				//node.entity.meshFileName = fromJSON[i].entity.details.meshFile;
                //node.entity.castShadows = fromJSON[i].entity.details.castShadows;

				node.browser.url = fromJSON[i].browser.url;

				node.browser.shared = fromJSON[i].browser.isShared;
				node.browser.draggable = fromJSON[i].browser.isDraggable;
				node.browser.snappedToWall = fromJSON[i].browser.isSnap2Wall;

				node.browser.width = fromJSON[i].browser.width;
                node.browser.height = fromJSON[i].browser.height;
                if (fromJSON[i].browser.resolution_w != undefined) {
                    node.browser.resV = fromJSON[i].browser.resolution_h;
                    node.browser.resH = fromJSON[i].browser.resolution_w;
                }
				node.browser.zoom = fromJSON[i].browser.zoom;
			}
			else if(fromJSON[i].mainType == "figure"){
				node['@'].name = fromJSON[i].detail.name;

				node.pose.position.x = fromJSON[i].position.x;
				node.pose.position.y = fromJSON[i].position.y;
				node.pose.position.z = fromJSON[i].position.z;

				node.pose.orientation = rotation(fromJSON[i].rotation);

				node.scale.x =  fromJSON[i].scale.x;
				node.scale.y =  fromJSON[i].scale.y,
				node.scale.z =  fromJSON[i].scale.z;

				node.entity.meshFileName = fromJSON[i].entity.details.meshFile;
				node.entity.castShadows = fromJSON[i].entity.details.castShadows;

				node.figure.width = fromJSON[i].figure.width;
				node.figure.height = fromJSON[i].figure.height;
				node.figure.materialName = fromJSON[i].figure.material;
				node.figure.draggable = fromJSON[i].figure.movablePlane;
				node.figure.castShadows = fromJSON[i].figure.castShadows;


			}
			else if(fromJSON[i].mainType == "light"){
				node['@'].name = fromJSON[i].name;
                lightType[p] = fromJSON[i].type;
                ++p;
                node.pose.position.x = fromJSON[i].position.x;
				node.pose.position.y = fromJSON[i].position.y;
                node.pose.position.z = fromJSON[i].position.z;
                if (node.pose.position.x == undefined || node.pose.position.x == undefined || node.pose.position.x == undefined) {
                    node.pose.position.x = 0;
                    node.pose.position.y = 0;
                    node.pose.position.z = 0;
                }
            
                node.pose.orientation.quaternion.x = fromJSON[i].rotation.x;
                node.pose.orientation.quaternion.y = fromJSON[i].rotation.y;
                node.pose.orientation.quaternion.z = fromJSON[i].rotation.z;
                node.pose.orientation.quaternion.w = fromJSON[i].rotation.w;
                if (node.pose.orientation.quaternion.x == undefined || node.pose.orientation.quaternion.y == undefined || node.pose.orientation.quaternion.z == undefined || node.pose.orientation.quaternion.w == undefined) {
                    node.pose.orientation.quaternion.x = 0;
                    node.pose.orientation.quaternion.y = 0;
                    node.pose.orientation.quaternion.z = 0;
                    node.pose.orientation.quaternion.w = 1;
                }

				node.light.diffuse.r = fromJSON[i].colourDiffuse.r;
				node.light.diffuse.g = fromJSON[i].colourDiffuse.g;
            node.light.diffuse.b = fromJSON[i].colourDiffuse.b;
                
				node.light.diffuse.a = 1;//fromJSON[i].colourDiffuse.a;

				node.light.specular.r = fromJSON[i].colourSpecular.r;
				node.light.specular.g = fromJSON[i].colourSpecular.g;
				node.light.specular.b = fromJSON[i].colourSpecular.b;
				node.light.specular.a = 1;//fromJSON[i].colourSpecular.a;

            if (fromJSON[i].type == "spot") {
          
					node.light.type.spot.range.inner = fromJSON[i].lightRange.inner;
					if(fromJSON[i].lightRange.inner == undefined)
						node.light.type.spot.range.inner = 0;
					node.light.type.spot.range.outer = fromJSON[i].lightRange.outer;
					if(fromJSON[i].lightRange.outer == undefined)
						node.light.type.spot.range.outer = 0;
					node.light.type.spot.range.falloff = fromJSON[i].lightRange.falloff;
					if(fromJSON[i].lightRange.falloff == undefined)
						node.light.type.spot.range.falloff = 0;

					node.light.type.spot.attenuation.range = fromJSON[i].lightAttenuation.range;
					if(fromJSON[i].lightAttenuation.range == undefined)
						node.light.type.spot.attenuation.range = 0;
					node.light.type.spot.attenuation.manual.constant = fromJSON[i].lightAttenuation.constant; 
					if(fromJSON[i].lightAttenuation.constant == undefined)
						node.light.type.spot.attenuation.manual.constant = 0;
					node.light.type.spot.attenuation.manual.linear = fromJSON[i].lightAttenuation.linear; 
					if(fromJSON[i].lightAttenuation.linear == undefined)
						node.light.type.spot.attenuation.manual.linear = 0;
					node.light.type.spot.attenuation.manual.quadratic = fromJSON[i].lightAttenuation.quadratic;
					if(fromJSON[i].lightAttenuation.quadratic == undefined)
						node.light.type.spot.attenuation.manual.quadratic = 0;

					node.light.type.spot.direction.x = fromJSON[i].direction.x;
					node.light.type.spot.direction.y = fromJSON[i].direction.y;
                    node.light.type.spot.direction.z = fromJSON[i].direction.z;

                    if (fromJSON[i].direction.x == undefined || fromJSON[i].direction.y || fromJSON[i].direction.z) {
                        node.light.type.spot.direction.x = 0;
                        node.light.type.spot.direction.y = 0;
                        node.light.type.spot.direction.z = 1;
                    }
				}
				else if(fromJSON[i].type == "directional"){
					node.light.type.directional.direction.x = fromJSON[i].direction.x;
					node.light.type.directional.direction.y = fromJSON[i].direction.y;
                    node.light.type.directional.direction.z = fromJSON[i].direction.z;
                    if (node.light.type.directional.direction.x== undefined || node.light.type.directional.direction.y == undefined || node.light.type.directional.direction.z == undefined) {
                        node.light.type.directional.direction.x = 0;
                        node.light.type.directional.direction.y = 0;
                        node.light.type.directional.direction.z = 1;
                    }
				}
				else if(fromJSON[i].type == "point"){
             

					node.light.type.point.attenuation.range = fromJSON[i].lightAttenuation.range;
					if(fromJSON[i].lightAttenuation.range == undefined)
						node.light.type.point.attenuation.range = 0;

					node.light.type.point.attenuation.manual.constant = fromJSON[i].lightAttenuation.constant;
					if(fromJSON[i].lightAttenuation.constant == undefined)
						node.light.type.point.attenuation.manual.constant = 0; 

					node.light.type.point.attenuation.manual.linear = fromJSON[i].lightAttenuation.linear; 
					if(fromJSON[i].lightAttenuation.linear == undefined)
						node.light.type.point.attenuation.manual.linear = 0;
					
					node.light.type.point.attenuation.manual.quadratic = fromJSON[i].lightAttenuation.quadratic;
					if(fromJSON[i].lightAttenuation.quadratic == undefined)
						node.light.type.point.attenuation.manual.quadratic = 0;
            }
           // console.log("XYZW : " + node.pose.orientation.quaternion.x + " " + node.pose.orientation.quaternion.y + " " + node.pose.orientation.quaternion.z + " " + node.pose.orientation.quaternion.w);
                
        }
       
			
			str += js2xml("node", node) + "\n";
        nodes.push(node);
        nodesType.push(fromJSON[i].mainType);
        ++i;

		}
		

		str=str.replace(/<[^>]+><\/[^\/>]+>/gim, "");
		//str=str.replace(/<[^>]+>false<\/[^\/>]+>/gim, "");
		while(str.replace(/<[^\/>]+>[\s\t\n]+<\/[^>]+>/gim, "") != str){
			str=str.replace(/<[^\/>]+>[\s\t\n]+<\/[^>]+>/gim, "");
		}
		
		while(str.indexOf("<?xml version=\"1.0\" encoding=\"UTF-8\"?>") >= 0){
			str = str.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "");
		}


		str = str.replace(/\n/gim, "\n\t");
		str = "<content>\n"+ str + "</content>";
		str = str.replace("</content>", "\n</content>");

		

		str=str.replace(/^\s*[\r\n]/gm, "");



		fs.writeFileSync("./" +roomName, str); /*, function(err){
			if(err)
				console.log("\nError while writing to the file.");
			else
				console.log("\nYour .room file has written succesfully!");
		});*/
    var completeObject = {
        nodes: [],
        nodesType: [],
        lightType: []
    };

    completeObject.nodes = nodes;
    completeObject.nodesType = nodesType;
    completeObject.lightType = lightType;

    return completeObject;
	}

	function rotation(object){
				var obj = {};
					if(object != undefined){
					if(object.type == "quaternion"){
						obj = {
							quaternion: {
								x:undefined,
								y:undefined,
								z:undefined,
								w:undefined
							}
						}
						obj.quaternion.x = object.x;
						obj.quaternion.y = object.y;
						obj.quaternion.z = object.z;
						obj.quaternion.w = object.w;
					}
					else if(object.type == "ypr"){
						obj = {
							ypr: {
								yaw:undefined,
								pitch:undefined,
								roll:undefined
							}
						}
						obj.ypr.yaw = object.yaw;
						obj.ypr.pitch = object.pitch;
						obj.ypr.roll = object.roll;
					}
					else if(object.type == "rotMatrix"){
						obj = {
							rotMatrix: {
								xx:undefined,
								xy:undefined,
								xz:undefined,
								yx:undefined,
								yy:undefined,
								yz:undefined,
								zx:undefined,
								zy:undefined,
								zz:undefined
							}
						}
						obj.rotMatrix.xx = object.xx;
						obj.rotMatrix.xy = object.xy;
						obj.rotMatrix.xz = object.xz;
						obj.rotMatrix.yx = object.yx;
						obj.rotMatrix.yy = object.yy;
						obj.rotMatrix.yz = object.yz;
						obj.rotMatrix.zx = object.zx;
						obj.rotMatrix.zy = object.zy;
						obj.rotMatrix.zz = object.zz;
					}
					else if(object.type == "angleAxis"){
						obj = {
							angleAxis: {
								angle: undefined,
								axis:{
									x:undefined,
									y:undefined,
									z:undefined
								}
							}
						}
						obj.angleAxis.angle = object.angle;
						obj.angleAxis.axis.x = object.axis.x;
						obj.angleAxis.axis.y = object.axis.y;
						obj.angleAxis.axis.z = object.axis.z;
					}
					return obj;
				}
				return;
	}

function rounding(str) {
    return (Math.round(parseFloat(str.toString()) * 1000) / 1000).toString();
}