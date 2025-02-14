///////////// GESTIÓN DE EMPLEADOS /////////////

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

cargarNombreProyecto(id);

async function cargarNombreProyecto(id) {
    try {
        const response = await fetch("http://localhost:8080/proyectos/"+id);
        if(!response.ok)
        {
            throw new Error("Error al obtener el proyecto")
        }
        const proyecto = await response.json();
        document.getElementById('titulo').innerHTML+=` ${proyecto.nombre}`;

    } catch (error) {
        console.error("Error:", error);
    }
}