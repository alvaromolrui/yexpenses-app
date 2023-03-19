import { modalEntranceKeyframes, modalExitKeyframes, backgroundModalEntranceKeyframes, backgroundModalExitKeyframes, itemEntranceKeyframes, itemExitKeyframes, addItemKeyframes, removeItemKeyframes, addItemButtonEntranceKeyframes, addItemButtonExitKeyframes, baseAnimationOptions } from './animations.js';

/* Constantes */
const mainAddButton = document.getElementById('mainAddButton');
const addButton = document.getElementById('addButton');
const editButton = document.getElementById('editButton');
const closeButton = document.getElementById('closeButton');
const acceptButton = document.getElementById('acceptButton');
const cancelButton = document.getElementById('cancelButton');
const formModal = document.getElementById('formModal');
const form = document.getElementById("formulario");
const backgroundModal = document.getElementById("backgroundModal");
const contentVisible = "contentVisible";
const table = document.getElementById("table");


// Abrir formulario
function openForm() {
  document.body.style.overflow = "hidden";
  hideHeaderButtons();
  closeButton.style.display = "flex";
  formModal.classList.add(contentVisible);
  showBackgroundModal();
  new Promise(resolve => {
    resolve();
  }).then(() => {
    document.getElementById("title").focus();
  });
  setTimeout(() => {
    formModal.animate(modalEntranceKeyframes(), baseAnimationOptions());
  }, 200);
  setCurrentDate();
  closeButton.addEventListener('click', (closeForm));
}

addButton.addEventListener('click', (openForm));
mainAddButton.addEventListener('click', (openForm));

// Cerrar formulario
function closeForm() {
  const requiredInputs = form.querySelectorAll("input[required]");
  requiredInputs.forEach(function (input) {
    input.removeAttribute("required");
  });
  document.body.style.overflow = "";
  showHeaderButtons();
  closeButton.style.display = "";
  formModal.animate(modalExitKeyframes(), baseAnimationOptions());
  hideBackgroundModal();
  setTimeout(() => {
    formModal.classList.remove(contentVisible);
    form.reset();
  }, 200);
}

cancelButton.addEventListener('click', (closeForm));

// Mostrar fondo oscuro
function showBackgroundModal() {
  setTimeout(() => {
    backgroundModal.classList.add("contentVisible");
  }, 200);
  backgroundModal.animate(backgroundModalEntranceKeyframes(), baseAnimationOptions());
}

// Ocultar fondo oscuro
function hideBackgroundModal() {
  backgroundModal.animate(backgroundModalExitKeyframes(), baseAnimationOptions());
  setTimeout(() => {
    backgroundModal.classList.remove("contentVisible");
  }, 200);
}

// Obtener fecha actual
function setCurrentDate() {
  const dateControl = document.querySelector('input[type="date"]');
  const currentDate = new Date(); // crea un objeto de fecha con la fecha y hora actual
  const year = currentDate.getFullYear(); // obtiene el año actual
  let month = currentDate.getMonth() + 1; // obtiene el mes actual (los meses empiezan desde 0)
  month = month < 10 ? '0' + month : month; // agrega un cero delante si el mes es de un solo dígito
  let day = currentDate.getDate(); // obtiene el día actual
  day = day < 10 ? '0' + day : day; // agrega un cero delante si el día es de un solo dígito
  const formattedDate = `${year}-${month}-${day}`; // crea una cadena con la fecha formateada
  dateControl.value = formattedDate; // establece el valor del input en la fecha actual formateada
}



// Pintar los datos del CSV en el DOM
function loadData() {
  return new Promise((resolve) => {
    fetch("read_data.php")
    .then(function(response) {
      return response.text();
    })
    .then(function(html) {
      document.getElementById("table").innerHTML = html;
    })
    .catch(function(error) {
      console.error("Error al cargar la tabla:", error);
    });
    resolve();
  });
}

// Enviar datos del formulario a php
function saveData(form) {
  return new Promise((resolve) => {
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_data.php");

    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
    const date = document.querySelector('#date').value;
    
    if (!title || !price || !date) {
      alert('Por favor, complete todos los campos');
      return;
    }
    xhr.addEventListener("load", () => {
      resolve();
    });
    xhr.send(formData);
  });
}


// Eliminar entrada
function eliminarFila(id) {
  // Crear una instancia de XMLHttpRequest
  var xhttp = new XMLHttpRequest();
  // Configurar la solicitud AJAX
  xhttp.open("POST", "delete_data.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Definir lo que sucede cuando se recibe la respuesta
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Manejar la respuesta del servidor aquí
      var item = document.querySelectorAll(".item");
      item.forEach(element => {
        element.getAttribute("data-id");
        if (id == element.getAttribute("data-id")) {
          element.animate(removeItemKeyframes(), baseAnimationOptions());
          setTimeout(function() {
            element.style.display = "none";
          }, 200);
        }
      });
    }
  };
  // Enviar la solicitud AJAX
  xhttp.send("id=" + id);
}

// Ocultar botones de la topbar
function hideHeaderButtons() {
  addButton.style.display = "none";
  editButton.style.display = "none";
}

// Mostrar botones de la topbar
function showHeaderButtons() {
  addButton.style.display = "";
  editButton.style.display = "";
}

// Ocultar botón principal de añadir
function hideMainAddButton() {
  mainAddButton.animate(addItemButtonEntranceKeyframes(), baseAnimationOptions());
  setTimeout(() => {
    mainAddButton.style.display = "none";
  }, 200);
}

// Mostrar botón principal de añadir
function showMainAddButton() {
  mainAddButton.style.display = "";
  setTimeout(() => {
    mainAddButton.animate(addItemButtonExitKeyframes(), baseAnimationOptions());
  }, 0);
}

// Editar contenido
function editContent() {
  const deleteButton = document.querySelectorAll(".deleteButton");
  const item = document.querySelectorAll(".item");
  window.scrollTo(0, 0);
  hideHeaderButtons();
  showBackgroundModal();
  closeButton.style.display = "flex";
  deleteButton.forEach(element => {
    element.style.display = "flex";
  });
  item.forEach(element => {
    element.style.border = "2px solid rgba(103, 103, 103, 1)";
    element.style.zIndex = "5";
    element.animate(itemEntranceKeyframes(), baseAnimationOptions());
  });
  hideMainAddButton();

  closeButton.addEventListener('click', (finishEdition));
}

editButton.addEventListener('click', (editContent));

// Terminar edición
function finishEdition() {
  const deleteButton = document.querySelectorAll(".deleteButton");
  const item = document.querySelectorAll(".item");
  window.scrollTo(0, 0);
  showHeaderButtons();
  hideBackgroundModal();
  closeButton.style.display = "";
  deleteButton.forEach(element => {
    element.style.display = "";
  });
  item.forEach(element => {
    element.style.border = "";
    element.style.zIndex = "";
    element.animate(itemExitKeyframes(), baseAnimationOptions());
  });
  showMainAddButton();
  loadData();
}

// Añadir nueva entrada
form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveData(form).then(() => {
    window.scrollTo(0, 0);
    closeForm();
    loadData();
  });
});

// Pintar los datos al cargar la página
document.addEventListener("DOMContentLoaded", function(event) {
  loadData();
});