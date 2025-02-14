
async function obtenerProyectos() {
    try {
        const response = await fetch("http://localhost:8080/proyectos");
        if(!response.ok)
        {
            throw new Error("Error al obtener los proyectos")
        }
        const proyectos = await response.json();
        console.log(proyectos);
        //Borramos el contenido actual de la tabla
        document.getElementById("tableBody").innerHTML="";
        //Cargamos los proyectos en la tabla
        proyectos.forEach(proyecto =>
        {
            const fila = document.createElement("tr");
            fila.id ="filaProyecto_"+proyecto.id;
            fila.innerHTML= `
            <td>${proyecto.nombre}</td>
            <td>${proyecto.descripcion}</td>
            <td>${proyecto.presupuesto}</td>
            <td>${proyecto.fechaInicio}</td>
            <td><button class ="btn btn-danger btn-sm" onclick="borrarProyecto(${proyecto.id}, this)">Borrar</button></td>
            `;
            document.getElementById("tableBody").appendChild(fila);
        })

    } catch (error) {
        console.error("Error:", error);
    }
}

//Actualizamos los proyectos al pulsar el botón
document.getElementById("cargarProyectosBtn")
    .addEventListener("click",obtenerProyectos);

//Añado manejador de evento para crear nuevos proyectos
document.getElementById("nuevoProyectoBtn").addEventListener("click", nuevoProyecto);

//Añado manejador de evento para abrir la ventana modal de creación de proyecto
const addProyectoDialog = document.getElementById("nuevoProyectoDialog");
document.getElementById("openDialogAddProyectoBtn").addEventListener("click",
        () =>{
            addProyectoDialog.showModal();
        });

//Manejador de evento para cerrar la ventana modal de creación de proyectos
document.getElementById('candelProyectoBtn').addEventListener("click",() =>{
    addProyectoDialog.close();
})

//Ejecutamos la carga de proyectos cuando finalice la carga del HTML
obtenerProyectos();



async function nuevoProyecto(){
    const nombre = document.getElementById("nombreProyecto").value;
    const presupuesto = document.getElementById("presupuestoProyecto").value;
    const descripcion = document.getElementById("descripcionProyecto").value;
    const fechaInicio = document.getElementById("fechaProyecto").value;

    const proyecto= {nombre, presupuesto, descripcion, fechaInicio};

    console.log(proyecto);

    try{
        const response = await fetch("http://localhost:8080/proyectos",
            {
                method: 'POST',
                headers:{
                    'content-Type':'application/json'
                },
                body: JSON.stringify(proyecto)
            })
        if(!response.ok)
        {
            throw new Error("Error al insertar el proyecto")
        }
        //Capturo la respuesta para coger el id
        const proyectoInsertado = await response.json();

        //Imprimimos en la consola para depurar
        console.log(proyectoInsertado);

        //Insertar el proyecto en la tabla
        const fila = document.createElement("tr");
        fila.id ="filaProyecto_"+proyectoInsertado.id;
        fila.innerHTML= `
            <td>${proyectoInsertado.nombre}</td>
            <td>${proyectoInsertado.descripcion}</td>
            <td>${proyectoInsertado.presupuesto}</td>
            <td>${proyectoInsertado.fechaInicio}</td>
            <td><button class ="btn btn-danger btn-sm" onclick="borrarProyecto(${proyectoInsertado.id}, this)">Borrar</button></td>
            `;
        document.getElementById("tableBody").appendChild(fila);

        document.getElementById('fechaProyecto').value='';
        document.getElementById('descripcionProyecto').value='';
        document.getElementById('nombreProyecto').value='';
        document.getElementById('presupuestoProyecto').value='';

        addProyectoDialog.close();

    }catch (error){
        console.error(error);
    }
}

async function borrarProyecto(id, elemento){
    try {
        const response = await fetch(`http://localhost:8080/proyectos/${id}`,{method: 'DELETE'});
        if(!response.ok)
        {
            throw new Error("Error al borrar el proyecto")
        }
        //obtenerProyectos();   //Recargaría todos los proyectos
        //elemento.parentNode.parentNode.remove();
        document.getElementById("filaProyecto_"+id).remove();
    }catch (error){
        console.error("Error:", error);
    }
}

/*
fetch("http://localhost:8080/proyectos")
.then(response => response.json() )
.then(datos => {
    console.log(datos)
})
.catch(error => console.error(error))
*/
