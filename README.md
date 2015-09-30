# [ENG] SCENE and SCFG to ROOM converter

This is a nodejs application that converts files with .scene and .scfg extensions to one .room file.

##Usage
###Under Unix like systems or Windows
The simplest way to run the application (server) is follow the instructions below:

+ Open a CMD under windows or a terminal under unix.
+ Use cd command to navigate to the aplication's room directory: `cd C:\ConverterRootFolder`
+ Use NodeJS program and run app.js in the root directory: `node app.js`
+ The standard port to the server is 8080.
+ If the server is up, you'll see a console message like "Server has started...". After that, you need to open a browser, and if you navigate to `localhost/PORTNUMBER` you will see the the converter.
+ Here, you need click on the `Let'a get started` button, it will navigato you to the drag 'n' drop site.
+ You need to drag and drop your .scene and .scfg files, it will be correct too, if you just drop one .scene file. In that case, the converter set default values to the settings part.
+ If you have done the step before, you can remove selected files with `Remove selected file(s)` button and drag and drop new files, or click on `Upload files` button.
+ If you clicked on `Upload files`, the site will navigate you to the settings part. Here you can modify every parameters value you would like to.
+ After you finished reset parameters, you need to click on `Generate and Download room file`, and you are done.

If you used easy ogre exporter, you can create browser type node with a simple plane. You need to set the plane name like the following structure:

+ `_brw_SSS_h_NNN_w_NNN_resV_NNN_resH_NNN_XXX`

where, the

+	SSS is a string, that will be the keyword to a google search on the browser start page
+	NNN is a number, that will be the value of the parameter (`_h_` is height, `_w_` is width, `_resV_` is the vertical resolution and `_resH_` is the horisontal resolution)
+	XXX is something that the converter left untouched, it will not do any changes on the parameters. If you would like to export more same named planes, it will be an index, thats why it is useful.
You can change the order of the tags (\_h\_NNN ect.) if you would like to, it wont cose any error, but you need to take a `_` character after the last one.
##How sources operates
+ The server has been implemented in app.js file. It uses hapi.js module, which is more effective and easyer to use than the other server frameworks.
+ After you selected your files, the converter will create a settings, and content object from your scfg and scene files.
+ Clicking on `Upload files` button will load a settings form, where you can modify any value of the settings or content object. For the default value, the form will read out from the settings and content object, that created from your files.
+ If you finish modifying, the converter reads the objects final versions from the from, and create a room object, that contains the settings and content part. 
+ The last step of the convertation is to create a xml scheme from the javascript object. If this process has done, a download will starts in the browser.
+ The version numbers of the built-in node modules are in the package.json file.