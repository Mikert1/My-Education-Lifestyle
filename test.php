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

$texts = json_decode(file_get_contents('src/texts.json'), true);

// Check and update text if present in POST data
for ($i = 1; $i < 5; $i++) {
    if (isset($_POST[$i])) {
        // Update the text in the array
        $textExists = false;
        foreach ($texts as &$text) {
            if ($text['id'] == $i) {
                $text['text'] = $_POST[$i];
                $textExists = true;
                break;
            }
        }
        if (!$textExists) {
            // Create a new text entry
            $newText = [
                'id' => $i,
                'text' => $_POST[$i]
            ];
            $texts[] = $newText;
        }
    }
}

// Encode the array back to JSON
$newText = json_encode($texts, JSON_PRETTY_PRINT);

// Write the updated JSON back to the file
file_put_contents('src/texts.json', $newText);

// Output the updated JSON
echo $newText;