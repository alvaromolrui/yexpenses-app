<?php

// Abrir el archivo CSV y leer los datos
$archivo = 'data.csv';
$fp = fopen($archivo, 'r');
$datos = array();

while (($fila = fgetcsv($fp)) !== false) {
    $datos[] = $fila;
}

// Buscar la fila que deseas eliminar en el archivo CSV
$id = $_POST["id"];
foreach ($datos as $key => $fila) {
    if ($fila[0] == $id) {
        // Eliminar la fila del array
        unset($datos[$key]);
        break;
    }
}

// Volver a escribir los datos actualizados al archivo CSV
$fp = fopen($archivo, 'w');
foreach ($datos as $fila) {
    fputcsv($fp, $fila);
}

// Cerrar el archivo CSV
fclose($fp);

?>