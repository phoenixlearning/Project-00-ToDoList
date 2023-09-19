//* Inicialización, verifica la existencia del localStorage para cargar
const tareas = localStorage.getItem("Tareas");
if (tareas) {
	document.querySelector(".container-card").innerHTML = tareas;
}

//* Función vista en clases que agrega una tarea. Además guarda los cambios en el 
//* localStorage con la función setItem. Invoca a cleanInputs para limpiar el formulario
function addTask(e) {
	const inputs = document.querySelectorAll(".input-form");
	const tarea = inputs[0].value.trim();
	const codigo = inputs[1].value.trim();
	const descripcion = inputs[2].value.trim();
	const containerCard = document.querySelector(".container-card");

	e.preventDefault();
	if (tarea == "" || codigo == "" || descripcion == "") {
		alert("Llenar todos los campos");
	} else {
		containerCard.innerHTML += `<div class="card">
					<p class="tarea">${tarea}</p>
					<p class="codigo">${codigo}</p>
					<p class="descripcion">${descripcion}</p>
					<p class='bx bx-edit-alt bx-tada-hover' onclick='editTask(event)'></p>
                    <p class='bx bxs-trash bx-tada-hover' onclick='deleteTask(event)'></p>
				</div>`;
	}
	setItem(containerCard.innerHTML);
	cleanInputs(inputs);
}

//* Función parecida a la vista en clases, solo que no usa listeners. Actualiza el
//* localStorage cuando hay cambios.
function deleteTask(e) {
	e.target.parentElement.remove();
	setItem(document.querySelector(".container-card").innerHTML);
}

//* Función para editar. No es una edición real, sólo rescata los valores de la tarea para
//* luego eliminarla. Finalmente hay agregar una nueva tarea.
function editTask(e) {
	const tarea = e.target.parentElement.querySelector(".tarea").innerHTML;
	const codigo = e.target.parentElement.querySelector(".codigo").innerHTML;
	const descripcion =
		e.target.parentElement.querySelector(".descripcion").innerHTML;
	const inputs = document.querySelectorAll(".input-form");
	inputs[0].value = tarea;
	inputs[1].value = codigo;
	inputs[2].value = descripcion;
	deleteTask(e);
}

//* Función que limpia el formulario.
function cleanInputs(inputs) {
	inputs.forEach((input) => (input.value = ""));
}

//* Función que actualiza el localStorage.
function setItem(tasks) {
	localStorage.setItem("Tareas", tasks);
}
