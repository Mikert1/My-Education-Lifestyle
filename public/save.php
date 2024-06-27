<?php

// Get the data from the request
$data = json_decode($_POST['data'], true);

// Read the existing coaches data from the file
$coachesData = file_get_contents('coaches.json');
$coaches = json_decode($coachesData, true);

// Add the new data to the coaches array
$coaches[] = $data;

// Convert the coaches array back to JSON
$coachesData = json_encode($coaches);

// Save the updated coaches data to the file
file_put_contents('coaches.json', $coachesData);

// Send a response back to the client
$response = ['message' => 'Data saved successfully'];
echo json_encode($response);

?>