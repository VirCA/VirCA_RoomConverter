# [ENG] SCENE and SCFG to ROOM converter

This is a nodejs application that converts files with .scene and .scfg extensions to one .room file.

##Usage
###Under Unix or Windows
The simplest way to run the application (server) is follow the instructions below:

+ Open a CMD under windows or a terminal under unix.
+ Use cd command to navigate to the aplication's room directory: `cd C:\ConverterRootFolder`
+ Use NodeJS program and run app.js in the root directory: `node app.js`
+ The standard port to the server is 8080, if you would like to change it, you can write your prefered port number to the first argument: `node app.js 1111`
+ If the server is up, you'll see a console message like "Server has started...". After that, you can open a browser, and if you navigate to `localhost/PORTNUMBER` you will see the the converter.
+ Here, you need to pass a name, that will be you .room file's name, a version number and you need to select or drag and drop your .scene and .scfg files.
+ If the length units in your scene file is centimeter you can tick the checkbox, that will convert all the units in your scene file into meter.
+ The last step to click on the submit button, that will start all proceeds, and when it finished with the convertation, the donwload will start automatically. 

##How sources operates
+ The server has been implemented in app.js file and use hapi.js module, which is more effective than the brute-force http one.
+ The parsers and converters are in the Parser folder, each process has its own folder.
++ SCENE: one module creates a json file from the original xml, and another one generate the .room xml scheme from the json
++ SCFG: same way as scene
++ Merge: it merge the two new xml to a string, and write it to a .room file.
+ app.js will call index.html which is in the same directory as app.js. This html file has the upload form.
+ The version numbers of the built-in modules are in the package.json file.

# [HUN]SCENE és SCFG : ROOM konverter

Az alkalmazás a felhasználótól bekért `.scene` és `.scfg` fájlokat egy a felhasználó által megadott nevű `.room` formátúmú fájllá konvertál.
##Használat
###Unix és Windows alatt
A legegyszerűbb mód:

+ Nyiss egy CMD-t windows allatt, terminal-t unix alatt.
+ cd parancsot használva navigálj az alkalmazás főkönyvtárába : `cd C:\KonverterKonyvtar\`
+ NodeJS programmal az app.js fájlt kell elindítani : `node app.js`
+ A szerverhez alapból a `8080`-as port van beállítva, ha ezt forráskód átírása nélkül változtatni szeretnéd, a következő argumentum a port szám lesz: `node app.js 11111`
+ Ha fut a szerver, konzolon egy Server has started... felirat jelenik meg. Ekkor böngészőt nyitva a `localhost\PORTSZÁM` oldalra navigálva elérhető a konerter felülete.
+ A felületen meg kell adni a .room kimeneti formátum nevét, a verziószámot, illetve a .scene és .scfg fájlokat be kell tallózni, vagy rá kell húzni a felületen a megfelelő helyekre.
+ Amennyiben az exporter, ami készítette a scene és scfg fájlokat cm mértékegységben számol hosszt, a Scale x 100 checkbox-ot bepipálva átkonvertálja a program a megfelelő mennyiségeket méterré.
+ A submit gombra kattintva automatikus letöltés indul az oldalon, a letöltések mappában megtalálod a .room fájlod.

##Források működései

+ A szerver hapi.js fw használatával működik, maga a szerver viselkedése az app.js-ben van implementálva.
+ A parser (,ami konvertál is) a parser mappákban vannak megírva, külön a scene fájlé, külön az scfg-é, és végül ami a kettőt egyesíti a harmadikban. Mind a scene, mind az scfg parser külön generál az xml-ből egy js objektumot, ezt tárolja json fájlban. Ezután egy másik javascript kód fog futni, ami kiolvassa a json objektumból a js objektumot, és egy node modul segítségével kiírja a végeredményt egy ideiglenes xml fájlba. Az egyesítő js kód, beolvassa a két xml kódot, és összeilleszti őket.
+ A szerver egy index.html oldalt hív be a "\" request-et kapva, ami az app.js-hez hasonlóan a főkönyvtárban található.
+ A package.json fájlban megtalálhatóak a node modulok szükséges verziói.

