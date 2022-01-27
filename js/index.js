
const PORT = 3300;
const DOMINIO = "localhost";
const API = `http://${DOMINIO}:${PORT}`;

function showDetalle(id){
    alert(`Hola mi id en mongodb es:${id}`);
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

showAllStudents();