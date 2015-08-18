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