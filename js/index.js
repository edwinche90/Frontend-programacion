const PORT = 3300;
const DOMINIO = "localhost";
const API = `http://${DOMINIO}:${PORT}`;

function showDetalle(id){
    getDetalleEstudiante(id);    
}

function showAllStudents(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET",`${API}/estudiantes`, true);

    xhttp.onload = function(){
        let tbody = "";
        let numberId= 1;

        if(this.readyState == 4 && this.status ==200){
            jsonData = JSON.parse(this.responseText);
            
            jsonData.forEach(item => {
                let Nombre = (item.Nombre === undefined)? "Sin Nombre":item.Nombre;
                let Edad = (item.Edad === undefined)?"Sin Edad":item.Edad;
                let Profesion = (item.Profesion === undefined)?"Sin Profesion":item.Profesion;

                tbody += `<tr><td>${numberId}</td> <td id="id${numberId}">${item._id}</td> <td>${Nombre}</td> <td>${Edad}</td> <td>${Profesion}</td> <td><button type="button" onclick="showDetalle(document.getElementById('id${numberId}').innerHTML)">Detalle</button></td></tr> `
                numberId++; 
            });

            document.getElementById("showTable").querySelector("tbody").innerHTML = tbody;
        }
    }

    xhttp.send(null);
};

function getDetalleEstudiante(id){
    const xhttp = new XMLHttpRequest();
    const jsonParametro = {"id":id};
    const jsonParametroStringify = JSON.stringify(jsonParametro);
    
    xhttp.open("POST",`${API}/detalle`, true);

    xhttp.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            jsonData = JSON.parse(this.responseText);
            let nombre = (jsonData.Nombre === undefined)?"sin Nombre": jsonData.Nombre;
            let edad = (jsonData.Edad === undefined)?"sin Edad": jsonData.Edad;
            let Profesion =  (jsonData.Profesion === undefined)?"sin Profesion": jsonData.Profesion;
            let divHTML = "";
            document.getElementById("showDetalle").innerHTML = divHTML;
            divHTML += `<p><h3>Nombre:${" "+nombre}</h3></p>`;
            divHTML += `<p><h3>Nombre:${" "+edad}</h3></p>`;
            divHTML += `<p><h3>Profesion:${" "+Profesion}</h3></p>`;
            document.getElementById("showDetalle").innerHTML =divHTML;
        }
    }
    xhttp.setRequestHeader('Content-Type','application/json');
    xhttp.send(jsonParametroStringify);
}
showAllStudents();
