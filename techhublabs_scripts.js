//    var captureButton = document.getElementById('capture');
    var nombre_capturado = ""
    let v = document.getElementById("myVideo");
    var tipo;
    var respuesta;

    //create a canvas to grab an image for upload
    let imageCanvas = document.createElement('canvas');
    let imageCtx = imageCanvas.getContext("2d");

    //Add file blob to a form and post
    function postFile(file) {
        let formdata = new FormData();
        formdata.append("image", file);
        formdata.append("nombre", nombre_capturado);
        let xhr = new XMLHttpRequest();
        if (tipo == "C") {
                xhr.open('POST', 'https://techhublabs.com:5000/imageC', true);
                }
        else
                {
                xhr.open('POST', 'https://techhublabs.com:5000/imageR', true);
                }
        xhr.onload = function () {
            if (this.status === 200) {
                console.log(this.response);
                respuesta = this.response;

//              alert(respuesta);
                if (tipo == "C") {
//                      document.getElementById("demo").innerHTML = nombre_capturado;
                        alert("Se ha guardado exitosamente el perfil biometrico de: " + nombre_capturado);
                        }
                else
                        {
//                      document.getElementById("rekognition").innerHTML = respuesta;
                        alert(respuesta);
                        }
                }
            else
                {
                alert(this.response);
                console.error(xhr);
                }
        };
        xhr.send(formdata);
    }

    //Get the image from the canvas
    function sendImagefromCanvas() {
        //Make sure the canvas is set to the current video size
        imageCanvas.width = 400;
        //v.videoWidth;
        imageCanvas.height = 400;
        //v.videoHeight;
        imageCtx.drawImage(v, 0, 0, v.videoWidth, v.videoHeight);
        //Convert the canvas to blob and post the file
        imageCanvas.toBlob(postFile, 'image/jpeg');
    }


 function buttom_capture_nombre(f) {
        event.preventDefault();
        tipo = "C";
        respuesta = "";
        var ok = true;
        var msg = "Debes escribir algo en los campos:\n";
          if(f.elements[0].value == "")
                {
                    msg = "Es necesario que escribas un nombre en el campo";
                    ok = false;
                }
          if(ok == false)
              alert(msg);
          else
                {
                console.log('buttom tipo C, capture' + 'nombre capturado:' + f.elements[0].value);
                nombre_capturado = f.elements[0].value;
                sendImagefromCanvas();
                document.frm_nombre.nombre.value=""
                }
//        return ok;
    };

function buttom_capture() {
        tipo = "C";
        respuesta = "";
        console.log('buttom tipo C, capture');
        sendImagefromCanvas();
    };

    function buttom_rekognition() {
        tipo = "R";
        console.log('buttom tipo R, rekognition');
        sendImagefromCanvas();
    };

    window.onload = function () {
        //Get camera video
        navigator.mediaDevices.getUserMedia({video: {width: 400, height: 400}, audio: false})
            .then(stream => {
                v.srcObject = stream;
            })
            .catch(err => {
                console.log('navigator.getUserMedia error: ', err)
            });
    };
    
