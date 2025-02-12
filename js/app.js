
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

//Ejecutamos la carga de proyectos cuando finalice la carga del HTML
obtenerProyectos();



/*
fetch("http://localhost:8080/proyectos")
.then(response => response.json() )
.then(datos => {
    console.log(datos)
})
.catch(error => console.error(error))
*/


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