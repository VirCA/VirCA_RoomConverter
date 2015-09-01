exports.sceneJSON2room = function(filename, objectName, roomName){

	var jsonfile = require('jsonfile');

		var fromJSON = jsonfile.readFileSync("./" + objectName);

		var js2xml = require('js2xmlparser');

		var fs = require('fs');

		var str = "";

		var nodes = [];

		var i = 0;
		while(i < fromJSON.length){
			var node = {
				"@": {
					name: undefined
				},
				"pose":{
					"position":{
						"x": undefined,
						"y": undefined, 
						"z": undefined
					},
					"orientation":{
						"ypr":{
							"yaw": undefined,
							"pitch": undefined,
							"roll": undefined
						},
						"angleAxis":{
							"angle": undefined,
							"axis" :{
								"x": undefined,
								"y": undefined,
								"z": undefined
							}
						},
						"quaternion":{
							"x": undefined,
							"y": undefined,
							"z": undefined,
							"w": undefined
						},
						"rotMatrix":{
							"xx":undefined,
							"xy":undefined,
							"xz":undefined,
							"yx":undefined,
							"yy":undefined,
							"yz":undefined,
							"zx":undefined,
							"zy":undefined,
							"zz":undefined
						}
					}
				},
				"scale":{
					"x": undefined,
					"y": undefined,
					"z": undefined
				},
				"entity":{
					"meshFileName": undefined,
					"castShadows": undefined
				},
				"browser":{
					"url": undefined,
					"shared": undefined,
					"draggable": undefined,
					"snappedToWall": undefined,
					"width": undefined,
					"height": undefined,
					"resH": undefined,
					"resV": undefined,
					"zoom": undefined
				},
				"figure":{
					"width": undefined,
					"height": undefined,
					"materialName": undefined,
					"draggable": undefined,
					"castShadows": undefined
				},
				"plane":{
					"width": undefined,
					"height": undefined,
					"materialName": undefined,
					"movablePlane": undefined,
					"distance": undefined,
					"xSegment": undefined,
					"ySegment": undefined,
					"numTexCoordSets": undefined,
					"uTile": undefined,
					"vTile": undefined,
					"normals": undefined,
					"tangents": undefined,
					"castShadows": undefined,
					"normal": {
						"x": undefined,
						"y": undefined,
						"z": undefined
					},
					"upVector": {
						"x": undefined,
						"y": undefined,
						"z": undefined
					}
				},
				"light":{
					"offset":{
						"x": undefined,
						"y": undefined,
						"z": undefined
					},
					"diffuse": {
						"r": undefined,
						"g": undefined,
						"b": undefined,
						"a": undefined
					},
					"specular":{
						"r": undefined,
						"g": undefined,
						"b": undefined,
						"a": undefined
					},
					"castShadows": undefined,
					"type": {
						"spot":{
							"range":{
								"inner": undefined,
								"outer": undefined,
								"falloff": undefined
							},
							"attenuation":{
								"range": undefined,
								"manual":{
									"constant":undefined,
									"linear": undefined,
									"quadratic": undefined
								},
								"range": undefined,
								"manual":{
									"constant": undefined,
									"linear": undefined,
									"quadratic": undefined
								},
								"range": undefined,
								"manual":{
									"constant": undefined,
									"linear": undefined,
									"quadratic": undefined
								},
							},
							"direction": {
								"x": undefined,
								"y": undefined,
								"z": undefined
							}
						},
						"directional":{
							"direction":{
								"x": undefined,
								"y": undefined,
								"z": undefined
							}
						},
						"point":{
							"attenuation":{
								"range": undefined,
								"manual":{
									"constant": undefined,
									"linear": undefined,
									"quadratic": undefined
								},
								"range": undefined,
								"manual":{
									"constant": undefined,
									"linear": undefined,
									"quadratic": undefined
								},
								"range": undefined,
								"manual":{
									"constant": undefined,
									"linear": undefined,
									"quadratic": undefined
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

				if(fromJSON[i].plane.width.indexOf(".") >=0)
					fromJSON[i].plane.width = fromJSON[i].plane.width.substring(0, fromJSON[i].plane.width.indexOf("."));
				if(fromJSON[i].plane.height.indexOf(".") >=0)
					fromJSON[i].plane.height = fromJSON[i].plane.height.substring(0, fromJSON[i].plane.height.indexOf("."));

				node.plane.width = fromJSON[i].plane.width;
				node.plane.height = fromJSON[i].plane.height;
				node.plane.materialName = fromJSON[i].plane.material;
				node.plane.movablePlane = fromJSON[i].plane.movablePlane;
				node.plane.distance = fromJSON[i].plane.distance;
				node.plane.xSegment = fromJSON[i].plane.xSegments;
				node.plane.ySegment = fromJSON[i].plane.ySegments;
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

				if(fromJSON[i].browser.resolution_w != undefined)
				{
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

				if(fromJSON[i].figure.width.toString().indexOf(".") >=0)
					fromJSON[i].figure.width = fromJSON[i].figure.width.substring(0, fromJSON[i].figure.width.indexOf("."));
				if(fromJSON[i].figure.height.toString().indexOf(".") >=0)
					fromJSON[i].figure.height = fromJSON[i].figure.height.substring(0, fromJSON[i].figure.height.indexOf("."));

				node.figure.width = fromJSON[i].figure.width;
				node.figure.height = fromJSON[i].figure.height;
				node.figure.materialName = fromJSON[i].figure.material;
				node.figure.draggable = fromJSON[i].figure.movablePlane;
				node.figure.castShadows = fromJSON[i].figure.castShadows;


			}
			else if(fromJSON[i].mainType == "light"){
				node['@'].name = fromJSON[i].name;
            
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
                        node.light.type.spot.direction.z = 0;
                    }
				}
				else if(fromJSON[i].type == "directional"){
					node.light.type.directional.direction.x = fromJSON[i].direction.x;
					node.light.type.directional.direction.y = fromJSON[i].direction.y;
                    node.light.type.directional.direction.z = fromJSON[i].direction.z;
                    if (node.light.type.directional.direction.x== undefined || node.light.type.directional.direction.y == undefined || node.light.type.directional.direction.z == undefined) {
                        node.light.type.directional.direction.x = 0;
                        node.light.type.directional.direction.y = 0;
                        node.light.type.directional.direction.z = 0;
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
