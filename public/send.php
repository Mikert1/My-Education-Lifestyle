<?php

echo "We verbinden je door naar de mailapplicatie.";
echo "<script>window.open('mailto:myeducationlifestyle@gmail.com?subject=De ingevulde informatie via het formulier: Naam: " . $_POST['name'] . ", Tel: " . $_POST['phone'] . ", Geboortedatum: " . $_POST['birthday'] . ", Woonplaats: " . $_POST['location'] . "','_blank')</script>";
