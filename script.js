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
const main = document.getElementById("main");


function modalEntranceKeyframes() {
  return [
    { transform: 'translateY(100px)', opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 }
  ];
}

function modalExitKeyframes() {
  return [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: 'translateY(100px)', opacity: 0 }
  ];
}

function backgroundModalEntranceKeyframes() {
  return [
    { opacity: 0 },
    { opacity: 1 }
  ];
}

function backgroundModalExitKeyframes() {
  return [
    { opacity: 1 },
    { opacity: 0 }
  ];
}

function addItemKeyframes() {
  return [
    { height: '0px', opacity: 0, padding: '0px' },
    { height: '124px', opacity: 1, padding: '20px' }
  ];
}

function removeItemKeyframes() {
  return [
    { height: '124px', opacity: 1, padding: '20px' },
    { height: '0px', opacity: 0, padding: '0px' }
  ];
}

function addItemButtonEntranceKeyframes() {
  return [
    { height: '93px', opacity: 1 },
    { height: '0px', opacity: 0 }
  ];
}

function addItemButtonExitKeyframes() {
  return [
    { height: '0px', opacity: 0 },
    { height: '93px', opacity: 1 }
  ];
}

function baseAnimationOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,0.5,0.3,1)", 
    iterations: 1, 
    fill: "forwards" 
  };
}

// Cancelar selección de items
function cancelSelection() {
  const items = document.querySelectorAll('.item')
  items.forEach(item => {
    item.classList.remove('itemSelected');
    item.classList.remove('itemEditionMode');
  });
}

// Abrir formulario
function openForm() {
  cancelSelection();
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
  /*const requiredInputs = form.querySelectorAll("input[required]");
  requiredInputs.forEach(function (input) {
    input.removeAttribute("required");
  });*/
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
  // Crear una petición HTTP para leer el archivo CSV
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Parsear los datos CSV
      const datos = this.responseText.split('\n').map(fila => fila.split(','));
      const datosInvertidos = datos.reverse();
      
      // Crear la tabla dinámicamente
      const tabla = document.getElementById('table');
      datosInvertidos.forEach(fila => {
        const primerValor = fila[1];
        const segundoValor = fila[2];
        const tercerValor = fila[3];
        const id = fila[0];
        
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item');
        itemContainer.setAttribute('id', id);
        itemContainer.setAttribute('data-id', id);
        itemContainer.addEventListener('click', () => {
          const prevSelectedItem = document.querySelector('.itemSelected');
          const itemSelected = itemContainer.classList.contains('itemSelected');
          if (prevSelectedItem) {
            prevSelectedItem.classList.remove('itemSelected');
            prevSelectedItem.classList.remove('itemEditionMode');
            const deleteButton = document.querySelectorAll('.deleteButton');
              deleteButton.forEach(element => {
                element.classList.remove('deleteButtonVisible');
              });
          }
          if (!itemSelected) {
            itemContainer.classList.add('itemSelected');
            itemContainer.classList.add('itemEditionMode');
            const deleteButton = document.querySelectorAll('.deleteButton');
              deleteButton.forEach(element => {
                element.classList.add('deleteButtonVisible');
              });
          }
        });
        itemContainer.addEventListener('mousedown', () => {
          const temporizador = setTimeout(() => {
            editContent();
          }, 500);
          itemContainer.addEventListener('mouseup', () => {
            clearTimeout(temporizador);
          })
        });
        
        const itemHeader = document.createElement('div');
        itemHeader.classList.add('itemHeader');
        itemContainer.appendChild(itemHeader);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.setAttribute('onclick', `eliminarFila("${id}")`);
        itemHeader.appendChild(deleteButton);
        
        const div1 = document.createElement('div');
        deleteButton.appendChild(div1);
        const div2 = document.createElement('div');
        deleteButton.appendChild(div2);
        
        const itemTitle = document.createElement('h2');
        itemTitle.classList.add('itemTitle');
        itemTitle.innerText = primerValor;
        itemHeader.appendChild(itemTitle);
        
        const itemContent = document.createElement('div');
        itemContent.classList.add('itemContent');
        itemContainer.appendChild(itemContent);
        
        const itemDate = document.createElement('p');
        itemDate.classList.add('itemDate');
        itemDate.innerText = segundoValor;
        itemContent.appendChild(itemDate);
        
        const itemPrice = document.createElement('h3');
        itemPrice.classList.add('itemPrice');
        itemPrice.innerText = tercerValor + '€';
        itemContent.appendChild(itemPrice);
        
        tabla.appendChild(itemContainer);
    });
  }
  };
  xhttp.open('GET', 'data.csv', true);
  xhttp.send();
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
  cancelSelection();
  const deleteButton = document.querySelectorAll(".deleteButton");
  const item = document.querySelectorAll(".item");
  window.scrollTo(0, -100);
  hideHeaderButtons();
  showBackgroundModal();
  closeButton.style.display = "flex";
  deleteButton.forEach(element => {
    element.classList.add('deleteButtonVisible');
  });
  main.classList.add('mainEditionMode');
  table.classList.add('tableEditionMode');
  item.forEach(element => {
    element.classList.add('itemEditionMode');
  });
  hideMainAddButton();

  closeButton.addEventListener('click', (finishEdition));
}



// Terminar edición
function finishEdition() {
  const deleteButton = document.querySelectorAll(".deleteButton");
  const item = document.querySelectorAll(".item");
  window.scrollTo(0, -100);
  showHeaderButtons();
  hideBackgroundModal();
  closeButton.style.display = "";
  deleteButton.forEach(element => {
    element.classList.remove('deleteButtonVisible');
  });
  main.classList.remove('mainEditionMode');
  table.classList.remove('tableEditionMode');
  item.forEach(element => {
    element.classList.remove('itemEditionMode');
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
document.addEventListener('DOMContentLoaded', loadData);