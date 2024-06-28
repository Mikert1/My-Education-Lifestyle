<!DOCTYPE html>
<?php

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
$arrayList = ["EDITNAME", "EDITSPECIALTY", "EDITSOURCE", "EDITPHONE", "EDITEMAIL", "EDITDISABLE"];

for ($i = 1; $i <= 3; $i++) {
    for ($j = 0; $j < count($texts); $j++) {
        if ($texts[$j]["id"] == $_POST["EDITID"]) {
            $texts[$j]["name"] = $_POST["EDITNAME"];
            $texts[$j]["specialty"] = $_POST["EDITSPECIALTY"];
            $texts[$j]["image"] = $_POST["EDITSOURCE"];
            $texts[$j]["phoneNumber"] = $_POST["EDITPHONE"];
            $texts[$j]["email"] = $_POST["EDITEMAIL"];
            $texts[$j]["disabled"] = $_POST["EDITDISABLE"];
        }
    }
}

$newText = json_encode($texts, JSON_PRETTY_PRINT);

file_put_contents('src/coaches.json', $newText);

echo $newText;