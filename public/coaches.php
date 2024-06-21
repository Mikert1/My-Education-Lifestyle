<!DOCTYPE html>
<?php

require __DIR__ . '/vendor/autoload.php';

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

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$password = $_ENV['FILE_UPLOAD_PASSWORD'];

if ($_POST['password'] !== $password) {
    echo 'Password is incorrect';
    http_response_code(401);
    die;
}

$texts = json_decode(file_get_contents('src/texts.json'), true);

for ($i = 1; $i <= 20; $i++) {
    if (isset($_POST[$i])) {
        $textExists = false;
        foreach ($texts as &$text) {
            if ($text['id'] == $i) {
                $text['text'] = $_POST[$i];
                $textExists = true;
                break;
            }
        }
        if (!$textExists) {
            $newText = [
                'id' => $i,
                'text' => $_POST[$i]
            ];
            $texts[] = $newText;
        }
    }
}

$newText = json_encode($texts, JSON_PRETTY_PRINT);

file_put_contents('src/texts.json', $newText);

echo $newText;