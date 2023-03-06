<?php
// Variables
$filename = "data.csv";
$file = fopen($filename, "a");

// Validar archivo
if (!$file) {
  echo "Error: Unable to open file";
  exit;
}

// Coger los datos
$title = $_POST['title'];
$date = $_POST['date'];
$price = $_POST['price'];
$id = uniqid();

// Validar datos
if (empty($id) || empty($title) || empty($date) || empty($price)) {
  echo "Error: Please fill all fields";
  exit;
}

// Escribir los datos en el csv
$data = array($id, $title, $date, $price);
if (fputcsv($file, $data)) {
  echo "Success: Data saved";
} else {
  echo "Error: Unable to save data";
}

fclose($file);
?>