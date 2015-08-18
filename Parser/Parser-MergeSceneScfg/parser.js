module.exports = function (sceneFileName, scfgFileName, roomFilename, version, multiply) {
    var version = (version || "1.0");
    var sceP = require("../Parser-scene/sceneParser.js");
    var sceJ2R = require("../Parser-scene/sceneJSON2room.js");
    
    var scfP = require("../Parser-scfg/scfgParser.js");
    var scfJ2r = require("../Parser-scfg/scfgJSON2room.js");
    
    sceP.sceneParser(sceneFileName, multiply);
    sceJ2R.sceneJSON2room(roomFilename);
    
    scfP.scfgParser(scfgFileName);
    scfJ2r.scfgJSON2room(roomFilename);
    
    var fs = require('fs');
    
    var scene = fs.readFileSync("./" + roomFilename + "1.room").toString();
    var scfg = fs.readFileSync("./" + roomFilename + "2.room").toString();
    
    scene = scene.replace(/\n/gim, "\n\t");
    scene = "\t" + scene;
    scfg = scfg.replace(/\n/gim, "\n\t");
    scfg = "\t" + scfg;
    var room = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + "<room name=\"" + roomFilename + "\" version=\"" + version + "\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" + scfg + "\n" + scene + "\n</room>";
    room = room.replace(/,/gim, ".");
    fs.writeFile(roomFilename + ".room", room, function (err) {
        if (err) {
            console.log("ERROR: FINAL");
        }
        else {
            console.log("May the force be with you.");
        }
        fs.unlink("./" + roomFilename + "1.room", function (err) {
            if (!err)
                console.log(roomFilename + "1.room : Deleted successfully");
        });
        fs.unlink("./" + roomFilename + "2.room", function (err) {
            if (!err)
                console.log(roomFilename + "2.room : Deleted successfully");
        });
        fs.unlink("./" + roomFilename + ".room", function (err) {
            if (!err)
                console.log(roomFilename + ".room : Deleted successfully");
        });
    });
}



//<room name=\""+process.argv[3]+"\" version=\""+process.argv[4]+"\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">"
