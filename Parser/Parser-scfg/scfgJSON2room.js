exports.scfgJSON2room = function(filename, objectName, roomName, easyOgreExport) {		
	var jsonfile = require('jsonfile');
    var fromJSON = jsonfile.readFileSync("./" +objectName);
	var js2xml = require('js2xmlparser');
	var fs = require('fs');
    var settings = require("./settingsObject.js")(); 
    //console.log(settings);
    if (easyOgreExport == undefined) {
        //------------------------------------------LIGHT-----------------------------------------------
        if (fromJSON.light.skybox.materialName != undefined)
            settings.environment.skybox.materialName = fromJSON.light.skybox.materialName;
        
        if (fromJSON.light.skybox.distance != undefined)
            settings.environment.skybox.distance = fromJSON.light.skybox.distance;
        console.log(fromJSON.light.skybox.materialName+ "     "+fromJSON.light.skybox.distance);
        if((fromJSON.light.skybox.materialName != undefined && fromJSON.light.skybox.materialName != "" ) && (fromJSON.light.skybox.distance == undefined || fromJSON.light.skybox.distance == "")){
            settings.environment.skybox.distance = 1000;
        }

        console.log("\""+fromJSON.light.skybox.materialName+ "\"     \""+fromJSON.light.skybox.distance+"\"");
   // console.log("2from: "+fromJSON.light.skybox.distance+"  3nemfrom: "+settings.environment.skybox.distance); // 
        //--------------------------------------light.ambientcolor---------------------------------------------------
        settings.environment.ambientColor.r = fromJSON.light.ambientcolor.r;
        settings.environment.ambientColor.g = fromJSON.light.ambientcolor.g;
        settings.environment.ambientColor.b = fromJSON.light.ambientcolor.b;
        settings.environment.ambientColor.a = fromJSON.light.ambientcolor.a;
        
        
        if (settings.environment.ambientColor.a == undefined && settings.environment.ambientColor.b != undefined && settings.environment.ambientColor.g != undefined && settings.environment.ambientColor.r != undefined) {
            settings.environment.ambientColor.a = 1;
        }
        
        
        //------------------------------------------light.shadow-----------------------------------------------
        if (fromJSON.light.shadow.type != undefined)
            settings.environment.shader = fromJSON.light.shadow.type;
        //--------------------------------------------light.rtss---------------------------------------------
        if (fromJSON.light.runtimeshadersystem.enable == "true" && fromJSON.light.shadow.type == "NONE")
            settings.environment.shader = "RTSS";
        //----------------------------------------------light.comositors-------------------------------------------
        
        if (fromJSON.light.compositors.Bloom.enable != undefined)
            settings.environment.compositors.Bloom = fromJSON.light.compositors.Bloom.enable;
        if (fromJSON.light.compositors.MotionBlur.enable != undefined)
            settings.environment.compositors.MotionBlur = fromJSON.light.compositors.MotionBlur.enable;
        
        //-------------------------------------------light.fog----------------------------------------------
        
        if (fromJSON.light.fog.type != undefined) {
            settings.environment.fog.type = fromJSON.light.fog.type.toUpperCase();
            settings.environment.fog.color.r = fromJSON.light.fog.color.r;
            settings.environment.fog.color.g = fromJSON.light.fog.color.g;
            settings.environment.fog.color.b = fromJSON.light.fog.color.b;
            settings.environment.fog.color.a = fromJSON.light.fog.color.a;
            settings.environment.fog.linearStart = fromJSON.light.fog.linearStart;
            settings.environment.fog.linearStop = fromJSON.light.fog.linearStop;
            settings.environment.fog.expDensity = fromJSON.light.fog.expDensity;
        }
        //---------------------------------------------------------------------------------------------------------
        //------------------------------------POINTER---------------------------------------------
        if (fromJSON.pointer.hidden == "true") {
            settings.pointer.visibility = "false";
        }
        else if (fromJSON.pointer.hidden == "false") {
            settings.pointer.visibility = "true";
        }
        settings.pointer.crosshairs = fromJSON.light.crosshairs.enable;
        settings.pointer.length = fromJSON.pointer.length;
        //---------------------------------------------------------------------------------------------------------
        //-------------------------------------------BOUNDARIES----------------------------------------------
        
        settings.boundaries.xlimit.min = fromJSON.physlimits.xlimit.min;
        settings.boundaries.xlimit.max = fromJSON.physlimits.xlimit.max;
        settings.boundaries.ylimit.min = fromJSON.physlimits.ylimit.min;
        settings.boundaries.ylimit.max = fromJSON.physlimits.ylimit.max;
        settings.boundaries.zlimit.min = fromJSON.physlimits.zlimit.min;
        settings.boundaries.zlimit.max = fromJSON.physlimits.zlimit.max;
        //---------------------------------------------------------------------------------------------------------
        //-------------------------------------------CAMERA--------------------------------------------------------------
        settings.camera.pose.position.x = fromJSON.camera.position.x;
        settings.camera.pose.position.y = fromJSON.camera.position.y;
        settings.camera.pose.position.z = fromJSON.camera.position.z;
        //default better?
        settings.pointer.offset.x = fromJSON.pointer.origin.x - settings.camera.pose.position.x;
        settings.pointer.offset.y = fromJSON.pointer.origin.y - settings.camera.pose.position.y;
        settings.pointer.offset.z = fromJSON.pointer.origin.z - settings.camera.pose.position.z;

        settings.camera.pose.orientation.quaternion.x = fromJSON.camera.rotation.x;
        settings.camera.pose.orientation.quaternion.y = fromJSON.camera.rotation.y;
        settings.camera.pose.orientation.quaternion.z = fromJSON.camera.rotation.z;
        settings.camera.pose.orientation.quaternion.w = fromJSON.camera.rotation.w;
        
        settings.camera.clipping.near = fromJSON.camera.clipping.near;
        settings.camera.clipping.far = fromJSON.camera.clipping.far;
        
        settings.camera.fov = fromJSON.camera.fov;
        //---------------------------------------------------------------------------------------------------------

        //----------------------------------------------BROWSER-----------------------------------------------------------
        settings.browserStartPage.url = fromJSON.browser.homepage.url;
        //---------------------------------------------------------------------------------------------------------

        //------------------------------------------------PRESENTATION---------------------------------------------------------
        
        settings.presentation.fileName = fromJSON.presentation.xml;
        settings.presentation.enabled = fromJSON.presentation.use;
        //---------------------------------------------------------------------------------------------------------
       
    }
    else if(easyOgreExport == "on" || easyOgreExport == "justDefault"){
        settings = fromJSON;
    }
    var jsfl = require('jsonfile');
    jsfl.writeFileSync("./uploads/settings/"+filename+".json", settings);

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

    fs.writeFileSync("./" + roomName, str);


    return settings;
}