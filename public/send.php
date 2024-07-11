<?php

echo "We verbinden je door naar de mailapplicatie.";
echo "<script>window.open('mailto:myeducationlifestyle@gmail.com?subject=De ingevulde informatie via het formulier: Naam: " . $_POST['name'] . ", Onderwerp: " . $_POST['choice'] . ", Bericht: " . $_POST['message'] . "','_blank')</script>";

echo "<script>window.open('index.html','_blank')</script>";