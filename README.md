# [ENG] SCENE and SCFG to ROOM converter

This is a nodejs application that converts files with .scene and .scfg extensions to one .room file.

##Usage
###Under Unix or Windows
The simplest way to run the application (server) is follow the instructions below:

+ Open a CMD under windows or a terminal under unix.
+ Use cd command to navigate to the aplication's room directory: `cd C:\ConverterRootFolder`
+ Use NodeJS program and run app.js in the root directory: `node app.js`
+ The standard port to the server is 8080.
+ If the server is up, you'll see a console message like "Server has started...". After that, you need to open a browser, and if you navigate to `localhost/PORTNUMBER` you will see the the converter.
+ Here, you need to select or drag and drop your .scene and .scfg files. It can be another way to upload just a scene file, it will be correct too.
+ The last step to click on the `Submit` button, that will start all proceeds.
+ When the convertation has finished, you need to click to the `Download` button to start download your room file.
+ Your room file's name will be the same as your scene file was.
+ If you would like to start another convertation you can press `Remove selected file(s)` button.

##How sources operates
+ The server uses hapi.js.
+ The parsers and converters are in the Parser folder, each process has its own folder.

+ SCENE: one module creates a json file from the original xml, and another one generate the .room xml scheme from the json

+ SCFG: same way as scene

+ Merge: it merge the two new xml to a string, and write it to a .room file.

+ app.js will call index.html which is in the same directory as app.js. This html file has a drag and drop form which is made by div tags with event handling.
+ The version numbers of the built-in modules are in the package.json file.