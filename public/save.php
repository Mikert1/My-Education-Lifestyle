<!DOCTYPE html>
<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo 'Method not allowed';	
    http_response_code(405);
    die;
}

if (!isset($_POST['password'])) {
    echo 'Password is required';
    http_response_code(400);
    die;
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$password = $_ENV['FILE_UPLOAD_PASSWORD'];

if ($_POST['password'] !== $password) {
    echo 'Password is incorrect';
    http_response_code(401);
    die;
}

$texts = json_decode(file_get_contents('src/coaches.json'), true);

for ($j = 0; $j < count($texts); $j++) {
    if ($texts[$j]["id"] == $_POST["EDITID"]) {
        $texts[$j]["name"] = $_POST["EDITNAME"];
        $texts[$j]["company"] = $_POST["EDITCOMPANY"];
        $texts[$j]["specialty"] = $_POST["EDITSPECIALTY"];
        $texts[$j]["image"] = $_POST["EDITSOURCE"];
        $texts[$j]["phoneNumber"] = $_POST["EDITPHONE"];
        $texts[$j]["website"] = $_POST["EDITWEBSITE"];
        $texts[$j]["location"] = $_POST["EDITLOCATION"];
        $texts[$j]["email"] = $_POST["EDITEMAIL"];
        $texts[$j]["disabled"] = (isset($_POST["EDITDISABLE"]) == "Disabled");
        echo isset($_POST["EDITDELETE"]);
        echo $_POST["EDITDELETE"] == "true";
        if (isset($_POST["EDITDELETE"]) == "true") {
            echo "deleted coach";
            unset($texts[$j]);
            $texts = array_values($texts);
        }
    }
}
if ($_POST["EDITID"] == "new") {
    $newId = 0;
    $existingIds = [];
    foreach ($texts as $text) {
        $existingIds[] = $text["id"];
    }

    for ($i = 0; $i <= count($texts); $i++) {
        if (!in_array($i, $existingIds)) {
            $newId = $i;
            break;
        }
    }
    $newCoach = [
        "id" => $newId,
        "name" => $_POST["EDITNAME"],
        "specialty" => $_POST["EDITSPECIALTY"],
        "image" => $_POST["EDITSOURCE"],
        "phoneNumber" => $_POST["EDITPHONE"],
        "email" => $_POST["EDITEMAIL"],
        "disabled" => $_POST["EDITDISABLE"]
    ];
    array_push($texts, $newCoach);
}

$newText = json_encode($texts, JSON_PRETTY_PRINT);

file_put_contents('src/coaches.json', $newText);

echo $newText;

// echo "<script>window.open('index.html','_top')</script>";