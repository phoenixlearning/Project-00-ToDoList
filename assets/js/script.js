//* Inicialización, verifica la existencia del localStorage para cargar. Hay que parsear
//* al JSON para que vuelva a ser un arreglo de objetos
const tareas = localStorage.getItem("Tareas");
let listaTareas = [];
let id = 0;
if (tareas) {
	listaTareas = JSON.parse(tareas);
	id = listaTareas[listaTareas.length - 1].id + 1;
	updateList();
}

//* Función vista en clases que agrega una tarea. Además guarda los cambios en el
//* localStorage con la función setItem. Invoca a cleanInputs para limpiar el formulario
function agregarTask(e) {
	const inputs = document.querySelectorAll(".input-form");
	const nombre = inputs[0].value.trim();
	const codigo = inputs[1].value.trim();
	const descripcion = inputs[2].value.trim();

	e.preventDefault();
	if (nombre == "" || codigo == "" || descripcion == "") {
		alert("Llenar todos los campos");
	} else {
		const tarea = { id, nombre, codigo, descripcion };
		id++;
		listaTareas.push(tarea);
	}
	updateList();
	cleanInputs();
}

//* Función que genera la lista de tareas visible en el HTML. También setea la lista de
//* tareas en el localStorage
function updateList() {
	const containerCard = document.querySelector(".container-card");
	containerCard.innerHTML = "";
	listaTareas.forEach((tarea) => {
		const { id, nombre, codigo, descripcion } = tarea;
		containerCard.innerHTML += `<div class="card">
					<p class="id hidden" value=${id}></p>
					<p class="card-content nombre">${nombre}</p>
					<p class="card-content codigo">${codigo}</p>
					<p class="card-content descripcion">${descripcion}</p>
					<p class='bx bx-edit-alt bx-tada-hover' onclick='editTask(event)'></p>
					<p class='bx bxs-trash bx-tada-hover' onclick='deleteTask(event)'></p>
					</div>`;
	});
	setItem(listaTareas);
}

//* Función parecida a la vista en clases, solo que no usa listeners. Actualiza el
//* localStorage cuando hay cambios.
function deleteTask(e) {
	const id = e.target.parentElement
		.querySelector(".id")
		.getAttribute("value");
	listaTareas = listaTareas.filter((tarea) => tarea.id != id);
	updateList();
	cleanInputs();
}

//* Función para editar. Sólo rescata los valores de un card y cambia el botón de
//* agregar a editar.
function editTask(e) {
	const id = e.target.parentElement
		.querySelector(".id")
		.getAttribute("value");
	const nombre = e.target.parentElement.querySelector(".nombre").innerHTML;
	const codigo = e.target.parentElement.querySelector(".codigo").innerHTML;
	const descripcion =
		e.target.parentElement.querySelector(".descripcion").innerHTML;
	const inputs = document.querySelectorAll(".input-form");
	inputs[0].value = nombre;
	inputs[1].value = codigo;
	inputs[2].value = descripcion;
	changeButton("editTask", "Editar", `updateTask(event, ${id})`);
}

//* Función guardar la edición. Parecido a agregar pero recibe ademas un id.
function updateTask(e, id) {
	const inputs = document.querySelectorAll(".input-form");
	const nombre = inputs[0].value.trim();
	const codigo = inputs[1].value.trim();
	const descripcion = inputs[2].value.trim();

	e.preventDefault();
	if (nombre == "" || codigo == "" || descripcion == "") {
		alert("Llenar todos los campos");
	} else {
		let index = listaTareas.findIndex((tarea) => tarea.id == id);
		listaTareas[index] = {id, nombre, codigo, descripcion};
	}
	updateList();
	cleanInputs();
}

//* Función para modificar el botón según los parámetros asignados.
function changeButton(id, innerHTML, onclick) {
	const button = document.querySelector(".buttonTask");
	button.removeAttribute("id");
	button.removeAttribute("onclick");
	button.setAttribute("id", id);
	button.setAttribute("onclick", onclick);
	button.innerHTML = innerHTML;
}

//* Función que limpia el formulario.
function cleanInputs() {
	const inputs = document.querySelectorAll(".input-form");
	changeButton("addTask", "Agregar", "agregarTask(event)");
	inputs.forEach((input) => (input.value = ""));
}

//* Función que actualiza el localStorage. Hay que transformar en un string el arreglo de
//* objetos para que se guarde.
function setItem(tasks) {
	localStorage.setItem("Tareas", JSON.stringify(tasks));
}
