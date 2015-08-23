var Hapi = require('hapi');
var path = require('path');
var server = new Hapi.Server();
var fs = require('fs');
var result = [];
var parser = require('./Parser/Parser-MergeSceneScfg/parser.js');
var roomFN = "";
var pathROOM = "";
var version = "";
var fileNScene = "", fileNScfg = "";
var roomDOWNable = undefined;
var inert = require('inert');

var host = process.env.VCAP_APP_HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || 8080

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
        method: 'POST',
        path: '/upload',
        config: {
            handler: function (request, reply) {
                roomFN = request.payload.roomName;
                version = request.payload.version;
                multiply = request.payload.multiply;
                pathROOM = roomFN + '.room';
                var file = request.payload.file;
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
                    console.log("SUCCESS: One scene file has been uploaded, without scfg.");
                    var SCENE_file_name = Date.now() + file.hapi.filename;
                    fs.writeFileSync("./uploads/"+SCENE_file_name, file._data);
                    parser(SCENE_file_name, SCENE_file_name, roomFN, version, multiply);
                    reply.file(roomFN + ".room").header("Content-Disposition", "attachment; filename=" + roomFN + ".room");
                }
                else if (file.length == 2) {
                    var SCENE_file_name = "";
                    var SCFG_file_name = "";
                    if (file[0].hapi.filename.indexOf(".scene") >= 0 && file[1].hapi.filename.indexOf(".scfg") >= 0) {
                        SCENE_file_name =Date.now() +file[0].hapi.filename;
                        SCFG_file_name = Date.now() + file[1].hapi.filename;
                        fs.writeFileSync("./uploads/" + SCENE_file_name, file[0]._data);
                        fs.writeFileSync("./uploads/" + SCFG_file_name, file[1]._data);
                    }
                    else if (file[1].hapi.filename.indexOf(".scene") >= 0 && file[0].hapi.filename.indexOf(".scfg") >= 0) {
                        SCENE_file_name = Date.now() + file[1].hapi.filename;
                        SCFG_file_name = Date.now() + file[0].hapi.filename;
                        fs.writeFileSync("./uploads/" + SCENE_file_name, file[1]._data);
                        fs.writeFileSync("./uploads/" + SCFG_file_name, file[0]._data);
                    }
                    else {
                        reply("ERROR: Wrong file extensions.")
                        return;
                    }
                    console.log("SUCCESS: Scene and scfg file has been uploaded.");
                    
                    parser(SCENE_file_name, SCFG_file_name, roomFN, version, multiply);
                    reply.file(roomFN + ".room").header("Content-Disposition", "attachment; filename=" + roomFN + ".room");
                }
                else {
                    reply("ERROR: You selected more than two file, or the extensions were wrong.");
                    return;
                }                       
            },
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        }
    }
]);


server.start(function () {
    console.log('Server running at http://' + host + ':' + port + '/');
});