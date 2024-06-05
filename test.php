<!DOCTYPE html>
<?php

// require autoload
require __DIR__ . '/vendor/autoload.php';

// check if method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo 'Method not allowed';	
    http_response_code(405);
    die;
}

// check if password is present
if (!isset($_POST['password'])) {
    echo 'Password is required';
    http_response_code(400);
    die;
}

// load dot env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
// read FILE_UPLOAD_PASSWORD
$password = $_ENV['FILE_UPLOAD_PASSWORD'];

// check if password is correct
if ($_POST['password'] !== $password) {
    echo 'Password is incorrect';
    http_response_code(401);
    die;
}

//get every data from texts.json
$texts = file_get_contents('src/texts.json');
// echo json_encode($texts);

// check if text is present
$newContent = '';
for ($i=1; $i < 5; $i++) {
    if (($_POST[$i])) {
        $newContent = $newContent . $_POST[$i] . $texts[$i];
        //file_put_contents('text.json', $newText);
    }
}
echo $newContent;