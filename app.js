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

server.connection({
    port: Number(process.argv[2] || 8080),
    host: 'localhost'
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
                
                if (request.payload.file1 === undefined) {
                    reply("Not selected scene file.");
                }
                if (request.payload.file2 === undefined) {
                    reply("Not selected scfg file.");
                }
                if (request.payload.file1 != undefined) {
                    var body = '';
                    request.payload.file1.on('data', function (data) {
                        body += data;
                    });
                    request.payload.file1.on('end', function () {
                        result[0] = {
                            description: request.payload.description,
                            file: {
                                data: body,
                                filename: request.payload.file1.hapi.filename,
                                headers: request.payload.file1.hapi.headers
                            }
                        };
                        console.log("SUCCESS: The following file has parsed.: " + result[0].file.filename);
                        
                        fileNScene = Date.now() + result[0].file.filename;
                        var fileCreater1 = fs.writeFileSync("./uploads/" + fileNScene, result[0].file.data);
                    });
                }
                
                if (request.payload.file2 != undefined) {
                    var body = '';
                    request.payload.file2.on('data', function (data) {
                        body += data;
                    });
                    request.payload.file2.on('end', function () {
                        result[1] = {
                            description: request.payload.description,
                            file: {
                                data: body,
                                filename: request.payload.file2.hapi.filename,
                                headers: request.payload.file2.hapi.headers
                            }
                        };
                        console.log("SUCCESS: The following file has parsed.: " + result[1].file.filename);
                        
                        fileNScfg = Date.now() + result[1].file.filename;
                        var fileCreater2 = fs.writeFileSync("./uploads/" + fileNScfg, result[1].file.data);
                        
                        if (fileNScene != "" && fileNScfg != "") {
                            parser(fileNScene, fileNScfg, roomFN, version, multiply);
                            reply.file(roomFN + ".room").header("Content-Disposition", "attachment; filename=" + roomFN+".room");
                            //reply("Convertation was successful.<br>Click here to download your file:  <form id=\"download\" enctype=\"multipart/form-data\" action=\"\download\" method=\"post\" >\n<input type=\"submit\" name=\"Download\" /><br>");
                        }
                    });
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
    console.log("Server has started...");
});