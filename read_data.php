<?php

  // Lectura del archivo
  $archivo = fopen("data.csv", "r");
  $datos = array();

  while (($fila = fgetcsv($archivo)) !== false) {
    $datos[] = $fila;
  }

  fclose($archivo);


  // Extraer y crear tabla
  $primera_fila = true;
  $datos_invertidos = array_reverse($datos);
  foreach ($datos_invertidos as $fila) {
    $primer_valor = $fila[1];
    $segundo_valor = $fila[2];
    $tercer_valor = $fila[3];
    $id = $fila[0];

    echo "<div class='item' id='" . $id . "' data-id='" . $id . "'>";

      echo '<div class="itemHeader">';
      echo "<button class='deleteButton' onclick='eliminarFila(\"" . $id . "\")'>";
          echo '<div>' . "</div>";
          echo '<div>' . "</div>";
        echo "</button>";
        echo "<h2 class='itemTitle'>" . $primer_valor . "</h2>";
      echo "</div>";
      
      echo '<div class="itemContent">';
        echo "<p class='itemDate'>" . $segundo_valor . "</p>";
        echo "<h3 class='itemPrice'>" . $tercer_valor . "€" . "</h3>";
      echo "</div>";

    echo "</div>";
  }

?>