<?php

echo $_POST['name'];
echo $_POST['email'];
echo $_POST['phone'];
echo $_POST['birthday'];
echo $_POST['location'];

// send a email to the admin using mailto:
$to = '
    <admin-email>
';  
$subject = 'New Coach Application';
$message = '
    <html>
        <head>
            <title>New Coach Application</title>
        </head>
        <body>
            <h1>New Coach Application</h1>
            <p>Name: ' . $_POST['name'] . '</p>
            <p>Email: ' . $_POST['email'] . '</p>
            <p>Phone: ' . $_POST['phone'] . '</p>
            <p>Phone: ' . $_POST['birthday'] . '</p>
            <p>Phone: ' . $_POST['location'] . '</p>
        </body>
    </html>
';
$headers = 'From: <admin-email>' . "\r\n";
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

