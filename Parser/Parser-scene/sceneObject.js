module.exports = function(){
	var obj = {
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
	return obj;
}