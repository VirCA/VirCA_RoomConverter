module.exports = function (room) {
    js2xml = require('js2xmlparser');

    //--------------------settings-------------------------
    var settings = js2xml("settings", room.settings);
    while(settings.indexOf("<Bloom/>") >= 0){
        settings = settings.replace("<Bloom/>", "");
    }
    while(settings.indexOf("<MotionBlur/>") >= 0){
        settings = settings.replace("<MotionBlur/>", "");
    }
    settings = settings.replace(/<[^>]+><\/[^\/>]+>/gim, "");
    settings = settings.replace(/<[^>]+\/>/gim, "");
    while(settings.replace(/<[^\/>]+>[\s\t\n]+<\/[^>]+>/gim, "") != settings){
        settings=settings.replace(/<[^\/>]+>[\s\t\n]+<\/[^>]+>/gim, "");
    }
    while(settings.indexOf("<?xml version=\"1.0\" encoding=\"UTF-8\"?>") >= 0){
        settings = settings.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "");
    }
    settings=settings.replace(/^\s*[\r\n]/gm, "");

    //---------------------content--------------------------
    var content = js2xml("content", room.content);
    
    content = content.replace(/<[^>]+><\/[^\/>]+>/gim, "");

    content = content.replace(/<[^>]+\/>/gim, "");
    while (content.replace(/<[^\/>]+>[\s\t\n]+<\/[^>]+>/gim, "") != content) {
        content = content.replace(/<[^\/>]+>[\s\t\n]+<\/[^>]+>/gim, "");
    }
   
    while(content.indexOf("<?xml version=\"1.0\" encoding=\"UTF-8\"?>") >= 0){
        content = content.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "");
    }
    content=content.replace(/^\s*[\r\n]/gm, "");
    
    content = content.replace(/\n/gim, "\n\t");
    content = "\t" + content;
    settings = settings.replace(/\n/gim, "\n\t");
    settings = "\t" + settings;

    //-------------------room--------------------------
    var version = '1.0';

    var generatedRoom = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + "<room name=\"" + room.roomName + "\" version=\"" + version + "\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" + settings + "\n" + content + "\n</room>";
    generatedRoom = generatedRoom.replace(/[0-9]*,[0-9]*/gim, ".");
    var fs = require('fs');
    fs.writeFileSync('./uploads/rooms/'+Date.now()+room.roomName+'.room', generatedRoom);

    return generatedRoom;
}
