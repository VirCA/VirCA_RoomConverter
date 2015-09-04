var Hapi = require('hapi');
var path = require('path');

var server = new Hapi.Server();
var fs = require('fs');
var roomGenerator = require('./Parser/roomGenerator.js');
var parser = require('./Parser/Parser-MergeSceneScfg/parser.js');
var roomFN = "";
var pathROOM = "";
var version = "";
var inert = require('inert');

var host = process.env.VCAP_APP_HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || 8080;

var roomPath = "";
var room = {};
server.connection({
    port: port,
    host: host
});

server.register(inert, function () { });

server.route([{
        method: 'GET',
        path: '/',
        handler: {
            file: {
                path: path.join(__dirname, "index.html")
            }
        }
    },
    {
        method: 'GET',
        path: '/vircalogo.png',
        handler: {
            file: 'vircalogo.png'
        }
    },
    {
        method: 'GET',
        path: '/js/jquery.js',
        handler: {
            file: 'js/jquery.js'
        }
    },
    {
        method: 'GET',
        path: '/js/bootstrap.min.js',
        handler: {
            file: 'js/bootstrap.min.js'
        }
    },
    {
        method: 'GET',
        path: '/js/jquery.easing.min.js',
        handler: {
            file: 'js/jquery.easing.min.js'
        }
    },
    {
        method: 'GET',
        path: '/js/scrolling-nav.js',
        handler: {
            file: 'js/scrolling-nav.js'
        }
    },
    {
        method: 'GET',
        path: '/js/converter_dnd_upload.js',
        handler: {
            file: 'js/converter_dnd_upload.js'
        }
    },
    {
        method: 'GET',
        path: '/js/settings.js',
        handler: {
            file: 'js/settings.js'
        }
    },
    {
        method: 'GET',
        path: '/settings.html',
        handler: {
            file: 'settings.html'
        }
    },
    {
        method: 'GET',
        path: '/css/bootstrap.min.css',
        handler: {
            file: 'css/bootstrap.min.css'
        }
    },
    {
        method: 'GET',
        path: '/css/scrolling-nav.css',
        handler: {
            file: 'css/scrolling-nav.css'
        }
    },
    {
        method: 'GET',
        path: '/css/jstree/dist/themes/default/32px.png',
        handler: {
            file: 'css/jstree/dist/themes/default/32px.png'
        }
    },
    {
        method: 'GET',
        path: '/css/jstree/dist/themes/default/throbber.gif',
        handler: {
            file: 'css/jstree/dist/themes/default/throbber.gif'
        }
    },
    {
        method: 'GET',
        path: '/styles.css',
        handler: {
            file: 'css/styles.css'
        }
    },
    {
        method: 'GET',
        path: '/settingsStyle.css',
        handler: {
            file: 'css/settingsStyle.css'
        }
    },
    {
        method: 'GET',
        path: '/css/jstree/dist/themes/default/style.css',
        handler: {
            file: 'css/jstree/dist/themes/default/style.css'
        }
    },
    {
        method: 'GET',
        path: '/css/jstree/dist/jstree.min.js',
        handler: {
            file: 'css/jstree/dist/jstree.min.js'
        }
    },
    {
        method: 'POST',
        path: '/builder',
        handler: function (request, reply){
            console.log("Ittvagyok");
            reply(room);
        }
    },
    {
        method: 'POST',
        path: '/roomgenerator',
        config: {
            handler: function (request, reply) {
                console.log("roomgenerator");
                var myRoomObj = JSON.parse(request.payload.room);
                var myGeneratedRoom = roomGenerator(myRoomObj);
                console.log("yee");
                //console.log(myGeneratedRoom);
                fs.writeFile('te.txt', myGeneratedRoom);
                reply(myGeneratedRoom);
            },
            payload: {
                maxBytes: 10485760
            }
        }
    },
    {
        method: 'POST',
        path: '/upload',
        config: {
            handler: function (request, reply) {
                var file = request.payload.file;
                 version = 1.0;
                easyOgreExport = request.payload.easyOgreExport;
                pathROOM = roomFN + '.room';
                var roomFN = "";
                
                //console.log("Files:\n" + request.payload.file.length);
                // Maxfáljméretet még biztosítani kell!!
                if (file == undefined) {
                    reply("ERROR: No selected file.");
                    return;
                }
                else if (file.length == undefined && file.hapi.filename.indexOf(".scene") == -1) {
                    reply("ERROR: There is no scene file selected.");
                    return;
                }
                else if (file.length == undefined && file.hapi.filename.indexOf(".scene") >= 0) {
                    
                    roomFN = file.hapi.filename.substring(0, file.hapi.filename.indexOf("."));
               
                    console.log("SUCCESS: One scene file has been uploaded, without scfg.");
                    var SCENE_file_name = Date.now() + file.hapi.filename;
                    fs.writeFileSync("./uploads/" + SCENE_file_name, file._data);
                    room = parser(SCENE_file_name, SCENE_file_name, roomFN, version, easyOgreExport);
                    room.roomName = roomFN;
                    reply(fs.readFileSync('./settings.html'));
                    console.log("\n");
                }
                else if (file.length == 2) {
                    var SCENE_file_name = "";
                    var SCFG_file_name = "";
                        
                    if (file[0].hapi.filename.indexOf(".scene") >= 0 && file[1].hapi.filename.indexOf(".scfg") >= 0) {
                        SCENE_file_name = Date.now() +file[0].hapi.filename;
                        SCFG_file_name = Date.now() + file[1].hapi.filename;
                        roomFN = file[0].hapi.filename.substring(0, file[0].hapi.filename.indexOf("."));
               
                        fs.writeFileSync("./uploads/" + SCENE_file_name, file[0]._data);
                        fs.writeFileSync("./uploads/" + SCFG_file_name, file[1]._data);
                    }
                    else if (file[1].hapi.filename.indexOf(".scene") >= 0 && file[0].hapi.filename.indexOf(".scfg") >= 0) {
                        SCENE_file_name = Date.now() + file[1].hapi.filename;
                        SCFG_file_name = Date.now() + file[0].hapi.filename;
                        roomFN = file[1].hapi.filename.substring(0, file[1].hapi.filename.indexOf("."));
                        fs.writeFileSync("./uploads/" + SCENE_file_name, file[1]._data);
                        fs.writeFileSync("./uploads/" + SCFG_file_name, file[0]._data);
                    }
                    else {
                        reply("ERROR: Wrong file extensions.")
                        return;
                    }
                    console.log("SUCCESS: Scene and scfg file has been uploaded.");
                    
                    room = parser(SCENE_file_name, SCFG_file_name, roomFN, version, easyOgreExport);
                    room.roomName = roomFN;
                    reply(fs.readFileSync('./settings.html'));
                    console.log("\n");
                }
                else {
                    reply("ERROR: You selected more than two file, or the extensions were wrong.");
                    return;
                }                       
            },
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 10485760
            }
        }
    }
]);


server.start(function () {
    console.log("Server has started...");
    if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads");
        fs.mkdirSync("./uploads/rooms");
        fs.mkdirSync("./uploads/settings")
        
        console.log("\'uploads\' directiory created.");
        console.log("\'rooms\' directiory created.");    
        console.log("\'settings\' directiory created.");
    }
    else if (!fs.existsSync("./uploads/rooms") || !fs.existsSync("./uploads/settings")) {
        if (!fs.existsSync("./uploads/rooms")) {
            fs.mkdirSync("./uploads/rooms");
            console.log("\'rooms\' directiory created.");
        }
        if (!fs.existsSync("./uploads/settings")) {
            fs.mkdirSync("./uploads/settings");
            console.log("\'settings\' directiory created.");
        }
    }
});