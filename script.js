// Pintar los datos del CSV en el DOM al cargar la página
document.addEventListener("DOMContentLoaded", function(event) {
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
});

// Obtener los elementos del DOM
const showForm = document.querySelectorAll('.showForm');
const hideForm = document.getElementById('hideForm');
const formModal = document.getElementById('formModal');
const backgroundModal = document.getElementById("backgroundModal");

// Ocultar el formulario al cargar la página
formModal.style.visibility = 'hidden';
formModal.style.opacity = '0';
formModal.style.bottom = '-100px';
backgroundModal.style.zIndex = '';
backgroundModal.style.opacity = '0';
backgroundModal.style.visibility = 'hidden';

// Mostrar formulario - Botón +
showForm.forEach(element => {
  element.addEventListener('click', () => {
    formModal.style.visibility = 'visible';  
    formModal.style.opacity = '1';
    formModal.style.bottom = '0px';
    backgroundModal.style.zIndex = '21';
    backgroundModal.style.opacity = '1';
    backgroundModal.style.visibility = 'visible';
    document.body.style.overflow = "hidden";

    setTimeout(function() {
      document.getElementById("title").focus();
    }, 100);
  
    const dateControl = document.querySelector('input[type="date"]');
    const currentDate = new Date(); // crea un objeto de fecha con la fecha y hora actual
    const year = currentDate.getFullYear(); // obtiene el año actual
    let month = currentDate.getMonth() + 1; // obtiene el mes actual (los meses empiezan desde 0)
    month = month < 10 ? '0' + month : month; // agrega un cero delante si el mes es de un solo dígito
    let day = currentDate.getDate(); // obtiene el día actual
    day = day < 10 ? '0' + day : day; // agrega un cero delante si el día es de un solo dígito
    const formattedDate = `${year}-${month}-${day}`; // crea una cadena con la fecha formateada
    dateControl.value = formattedDate; // establece el valor del input en la fecha actual formateada
  });
});


// Ocultar formulario - Botón Cancelar
closeForm.addEventListener('click', () => {
  formModal.style.bottom = '-100px';
  formModal.style.opacity = '0';
  formModal.style.visibility = 'hidden';
  backgroundModal.style.zIndex = '';
  backgroundModal.style.opacity = '0';
  backgroundModal.style.visibility = 'hidden';
  document.body.style.overflow = "";
});

// Enviar datos del formulario a php
const form = document.getElementById("formulario");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "save_data.php");
  xhr.send(formData);
  formModal.style.bottom = '-100px';
  formModal.style.opacity = '0';
  formModal.style.visibility = 'hidden';
  backgroundModal.style.zIndex = '';
  backgroundModal.style.opacity = '0';
  backgroundModal.style.visibility = 'hidden';
  document.body.style.overflow = "";

  // Formatear el formulario
  document.getElementById("formulario").reset();

  // Volver a pintar datos del csv
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
});


// Función para enviar la solicitud AJAX al servidor
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
          element.style.transition = "all 0.2s cubic-bezier(0.4,1,0.3,1)";
          element.style.opacity = "0";
          element.style.transform = "translateY(-20px)";
          element.style.overflow = "hidden";
          element.style.height = "0";
          element.style.padding = "0";
          setTimeout(function() {
            element.style.display = "none";
          }, 175);
        }
      });
    }
  };
  // Enviar la solicitud AJAX
  xhttp.send("id=" + id);
}

function showOptions() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  const item = document.querySelectorAll(".item");
  const table = document.getElementById("table");
  const endEdit = document.getElementById("endEdit");
  const editContent = document.getElementById("editContent");

  deleteButtons.forEach(element => {
    element.style.display = "flex";
  });
  item.forEach(element => {
    element.style.border = "2px solid rgba(103, 103, 103, 1)";
    element.style.zIndex = "15";
  });
  showForm.forEach(element => {
    element.style.display = "none"
  });
  editContent.style.display = "none";
  endEdit.style.display = "flex";
  endEdit.style.zIndex = "15";
  table.style.zIndex = "15";
  backgroundModal.style.opacity = '1';
  backgroundModal.style.visibility = 'visible';
}

function hideOptions() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  const item = document.querySelectorAll(".item");
  const table = document.getElementById("table");
  const endEdit = document.getElementById("endEdit");
  const editContent = document.getElementById("editContent");

  deleteButtons.forEach(element => {
    element.style.display = "none";
  });
  item.forEach(element => {
    element.style.border = "2px solid rgba(103, 103, 103, 0)";
    element.style.zIndex = "0";
  });
  showForm.forEach(element => {
    element.style.display = ""
  });
  editContent.style.display = "";
  endEdit.style.display = "none";
  endEdit.style.zIndex = "0";
  table.style.zIndex = "0";
  backgroundModal.style.opacity = '0';
  backgroundModal.style.visibility = 'hidden';

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
}

function showNumericKeyboard(event) {
  event.target.setAttribute('inputmode', 'numeric');
}