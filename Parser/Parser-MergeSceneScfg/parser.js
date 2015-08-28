module.exports = function (sceneFileName, scfgFileName, roomFilename, version, easyOgreExport) {
    //If felt�tellel vizsg�ljuk, hogy parszolni, konvert�lni vagy mindekett�t szeretn�nk csin�lni
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
    sceJ2R.sceneJSON2room(roomFilename, SCENEobjectName, SCENEroom);
    
    scfP.scfgParser(scfgFileName, SCFGobjectName, easyOgreExport);
    scfJ2r.scfgJSON2room(roomFilename, SCFGobjectName, SCFGroom, easyOgreExport);
    
    var fs = require('fs');
    
    var scene = fs.readFileSync("./" + SCENEroom).toString();
    var scfg = fs.readFileSync("./" + SCFGroom).toString();
    
    scene = scene.replace(/\n/gim, "\n\t");
    scene = "\t" + scene;
    scfg = scfg.replace(/\n/gim, "\n\t");
    scfg = "\t" + scfg;
    var room = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + "<room name=\"" + roomFilename + "\" version=\"" + version + "\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" + scfg + "\n" + scene + "\n</room>";
    room = room.replace(/,/gim, ".");

    //fs.writeFileSync(roomFilename + ".room", room);
    var roomPath = "./uploads/rooms/" + Date.now() + roomFilename + ".room";
    fs.writeFileSync(roomPath, room);

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
    return roomPath;
}