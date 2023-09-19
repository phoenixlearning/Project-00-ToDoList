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
		console.log(tarea, codigo, descripcion);

		containerCard.innerHTML += `<div class="card">
					<p>${tarea}</p>
					<p>${codigo}</p>
					<p>${descripcion}</p>
                    <i class='bx bxs-trash' onclick='deleteTask(event)'>
				</div>`;
	}
}

function deleteTask(e) {
    e.target.parentElement.remove();
}