		var left = document.getElementById('left');
        var right = document.getElementById('right');
        var dropzone = document.getElementById('dropzone');
        var button = document.getElementById('myButton');
        var smt = document.getElementById("submit");
        var rmv = document.getElementById("myButton");
        var files = undefined;
        var xhr = new XMLHttpRequest();
        var roomName = "";
        var data = "";
        var easyOgreExport;
        var ifEasyOgr ="";

        (function () {         
            var upload = function (files) {
                

                smt.onclick = function () {

                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        formData.append('file', files[i]);
                        //console.log(files[i]);
                    }
                    easyOgreExport = document.getElementById('scales');
                    if(easyOgreExport.checked)
                        formData.append('easyOgreExport', "on");
                    else if(ifEasyOgr == "justDefault"){
                        formData.append('easyOgreExport', ifEasyOgr);
                    }
                    if (files != undefined) {
                        //console.log(files);
                        xhr.open('post', '/upload');
                        //console.log(formData);
                        xhr.send(formData);
                        xhr.onloadend = function () {

                            
                            data = xhr.responseText;
                            console.log("Convertation done.");
                            //window.open("/settings.html");
                            document.getElementById('settings_site').innerHTML = this.responseText;
                            Settings2Run();
                        }
                        formData = undefined;
                         
                       // console.log(xhr);
                    }
                };
                rmv.onclick = function () {
                    files = undefined;
                    left.className = '';
                    left.textContent = '';
                    right.className = '';
                    right.textContent = '';
                    document.getElementById('dNdtext').textContent = "Drop scene and scfg files here.";
                    //console.log(files);
                    dropzone.className = 'dropzone';
                    easyOgreExport = undefined;

                    document.getElementById('settings_site').innerHTML = "If you upload file(s), on this place will be the settings site.";
                };
            }

           
           
            dropzone.ondrop = function (e) {
                e.preventDefault();
                files = e.dataTransfer.files;

                roomName = getRoomName(files);
                console.log("Your room name: " + roomName);

                if (files[0] != undefined && files[1] != undefined) {
                    
                    left.className = 'uplNEW';
                    left.textContent = files[0].name;
                    right.className = 'uplNEW';
                    right.textContent = files[1].name;
                    document.getElementById('dNdtext').textContent = "";
                   // console.log(files);
                    //console.log(ifEasyOgr+" : beléptemasdfasdf");
                    upload(files);
                }
                else if (files[0] != undefined && files[1] == undefined) {
                    left.className = 'uplNEW';
                    left.textContent = files[0].name;
                    right.className = '';
                    right.textContent = '';
                    ifEasyOgr = "justDefault";
                    document.getElementById('dNdtext').textContent = "";
                    //console.log(files);
                    upload(files);
                }
            }
            dropzone.ondragover = function () {
                this.className = 'dropzone dragover';
                return false;
            }
            dropzone.ondragleave = function () {
                this.className = 'dropzone';
                return false;
            }
        }());

        function getRoomName(files) {
            
            if (files[0].name.indexOf(".scene") >= 0) {
                return files[0].name.substring(0, files[0].name.indexOf(".scene"));
            }
            else if (files.length > 1 && files[1].name.indexOf(".scene") >= 0) {
                return files[0].name.substring(0, files[0].name.indexOf(".scene"));
            }
            return;
        }
        function populateIframe(id, path) {
            var ifrm = document.getElementById(id);
            ifrm.src = path;
        }
       