module.exports = function (sceneFileName, scfgFileName, roomFilename, version, easyOgreExport) {
    //If feltétellel vizsgáljuk, hogy parszolni, konvertálni vagy mindekettõt szeretnénk csinálni
    var version = (version || "1.0");
    var sceP = require("../Parser-scene/sceneParser.js");
    var sceJ2R = require("../Parser-scene/sceneJSON2room.js");
    
    var scfP = require("../Parser-scfg/scfgParser.js");
    var scfJ2r = require("../Parser-scfg/scfgJSON2room.js");
    
    var SCENEobjectName = Date.now() + "object1.json";
    var SCFGobjectName = Date.now() + "object2.json";
    
    var SCENEroom = Date.now() + "scene.room";
    var SCFGroom = Date.now() + "scfg.room";

    sceP.sceneParser(sceneFileName, easyOgreExport, SCENEobjectName);
    var room = {
        settings: {},
        content: {
            node:[]
        }
    }
    room.content.node = sceJ2R.sceneJSON2room(roomFilename, SCENEobjectName, SCENEroom);
    
    scfP.scfgParser(scfgFileName, SCFGobjectName, easyOgreExport);
    room.settings = scfJ2r.scfgJSON2room(roomFilename, SCFGobjectName, SCFGroom, easyOgreExport);
    var fs = require('fs');
   
    fs.unlink("./" + SCENEroom, function (err) {
        if (!err)
            console.log(SCENEroom + " : Deleted successfully");
    });
    fs.unlink("./" + SCFGroom, function (err) {
        if (!err)
            console.log(SCFGroom + " : Deleted successfully");
    });
    fs.unlink("./" + SCENEobjectName, function (err) {
        if (!err)
            console.log(SCENEobjectName + " : Deleted successfully");
    });
    fs.unlink("./" + SCFGobjectName, function (err) {
        if (!err)
            console.log(SCFGobjectName + " : Deleted successfully");
    });
    return room;
}