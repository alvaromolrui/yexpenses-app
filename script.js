/* Constantes */
const showForm = document.querySelectorAll('.showForm');
const showFormButton = document.querySelectorAll('.showFormButton');
const showFormIcon = document.querySelectorAll('.showFormIcon');
const hideForm = document.getElementById('hideForm');
const formModal = document.getElementById('formModal');
const form = document.getElementById("formulario");
const backgroundModal = document.getElementById("backgroundModal");


/* Animations */

function modalEntranceKeyframes() {
  return [
    { transform: 'translateY(100px)', opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 }
  ];
}
function modalEntranceOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function modalExitKeyframes() {
  return [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: 'translateY(100px)', opacity: 0 }
  ];
}
function modalExitOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function backgroundModalEntranceKeyframes() {
  return [
    { opacity: 0 },
    { opacity: 1 }
  ];
}
function backgroundModalEntranceOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function backgroundModalExitKeyframes() {
  return [
    { opacity: 1 },
    { opacity: 0 }
  ];
}
function backgroundModalExitOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function itemEntranceKeyframes() {
  return [
    { height: '97px' },
    { height: '124px' }
  ];
}
function itemEntranceOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function itemExitKeyframes() {
  return [
    { height: '124px' },
    { height: '97px' }
  ];
}
function itemExitOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function addItemKeyframes() {
  return [
    { height: '0px', opacity: 0, padding: '0px' },
    { height: '124px', opacity: 1, padding: '20px' }
  ];
}
function addItemOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function removeItemKeyframes() {
  return [
    { height: '124px', opacity: 1, padding: '20px' },
    { height: '0px', opacity: 0, padding: '0px' }
  ];
}
function removeItemOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function addItemButtonEntranceKeyframes() {
  return [
    { height: '93px', opacity: 1 },
    { height: '0px', opacity: 0 }
  ];
}
function addItemButtonEntranceOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

function addItemButtonExitKeyframes() {
  return [
    { height: '0px', opacity: 0 },
    { height: '93px', opacity: 1 }
  ];
}
function addItemButtonExitOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,1,0.3,1.2)", 
    iterations: 1, 
    fill: "forwards" 
  };
}


/* Functions */

// Toggle Modal del formulario
function showHideForm() {
  var formVisible = formModal.classList.contains("contentVisible");
  
  if (formVisible) {
    formModal.animate(modalExitKeyframes(), modalExitOptions());
    setTimeout(() => {
      formModal.classList.remove("contentVisible");
      document.body.style.overflow = "";
    }, 100);
    showHideBackgroundModal();
  } else {
    formModal.classList.add("contentVisible");
    document.body.style.overflow = "hidden";
    showHideBackgroundModal();
    setTimeout(() => {
      formModal.animate(modalEntranceKeyframes(), modalEntranceOptions());
    }, 0);
  }
}

// Imprimir fecha actual en el input Date
function currentDate() {
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

// Fondo oscuro
function showHideBackgroundModal() {
  if (backgroundModal.style.display = "flex") {
    backgroundModal.animate(backgroundModalExitKeyframes(), backgroundModalExitOptions());
    setTimeout(() => {
      backgroundModal.classList.remove("contentVisible");
    }, 200);
  } else {
    setTimeout(() => {
      backgroundModal.classList.add("contentVisible");
    }, 200);
    backgroundModal.animate(backgroundModalEntranceKeyframes(), backgroundModalEntranceOptions());
  }
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
          element.animate(removeItemKeyframes(), removeItemOptions());
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

// Entrar en la edición entradas
function showHideOptions() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  const item = document.querySelectorAll(".item");
  const table = document.getElementById("table");
  const endEdit = document.getElementById("endEdit");
  const editContent = document.getElementById("editContent");


  if (endEdit.style.display = "flex") {
    window.scrollTo(0, 0);
    deleteButtons.forEach(element => {
      element.style.display = "none";
    });
    item.forEach(element => {
      element.style.border = "2px solid rgba(103, 103, 103, 0)";
      element.style.zIndex = "0";
      element.animate(itemExitKeyframes(), itemExitOptions());
    });
    showFormIcon.forEach(element => {
      element.style.display = "flex";
    });
    showFormButton.forEach(element => {
      element.style.display = "flex";
      setTimeout(() => {
        element.animate(addItemButtonExitKeyframes(), addItemButtonExitOptions());
      }, 0);
      
    });
    editContent.style.display = "";
    endEdit.style.display = "none";
    endEdit.style.zIndex = "0";
    table.style.zIndex = "0";
    showHideBackgroundModal();
  
    loadData();
  } else {
    window.scrollTo(0, 0);
    deleteButtons.forEach(element => {
      element.style.display = "flex";
    });
    item.forEach(element => {
      element.style.border = "2px solid rgba(103, 103, 103, 1)";
      element.style.zIndex = "15";
      element.animate(itemEntranceKeyframes(), itemEntranceOptions());
    });
    showFormIcon.forEach(element => {
      element.style.display = "none";
    });
    showFormButton.forEach(element => {
      element.animate(addItemButtonEntranceKeyframes(), addItemButtonEntranceOptions());
      setTimeout(() => {
        element.style.display = "none";
      }, 100);
    });
    editContent.style.display = "none";
    endEdit.style.display = "flex";
    endEdit.style.zIndex = "24";
    table.style.zIndex = "24"
    showHideBackgroundModal();
  }
}


/* Listeners */

// Añadir nueva entrada
form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveData(form).then(() => {
    window.scrollTo(0, 0);
    showHideForm();
    form.reset();
    setTimeout(() => {
      loadData();
    }, 1000);
  });
});

// Mostrar formulario
showForm.forEach(element => {
  element.addEventListener('click', () => {
    new Promise(resolve => {
      resolve();
    }).then(() => {
      document.getElementById("title").focus();
    });
    showHideForm();
    currentDate();
  });
});

// Cerrar formulario
hideForm.addEventListener('click', () => {
  showHideForm();
  form.reset();
});

endEdit.addEventListener('click', () => {
  if (formModal.style.display = "none") {
    showHideOptions();
  } else {
    showHideForm();
    
  }
});

editContent.addEventListener('click', () => {
  if (formModal.style.display = "none") {
    showHideOptions();
  } else {
    showHideForm();
    showHideOptions();
  }
});

// Pintar los datos al cargar la página
document.addEventListener("DOMContentLoaded", function(event) {
  loadData();
});