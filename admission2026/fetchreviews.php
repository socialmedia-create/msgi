<?php
$apiKey = 'AIzaSyAopuRwGvHYNw5SccRfp7oecsnG2-5s0e8';  // Replace with your API Key
$placeId = 'ChIJV-TumfRmUjoRB-eWdGd-P00';  // Replace with your Place ID
$url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=$placeId&fields=reviews&key=$apiKey";

$response = file_get_contents($url);
$data = json_decode($response, true);

// Debugging: Log the full API response to see what's returned
file_put_contents('debug_log.txt', print_r($data, true));  // Save the response to a debug file

if (isset($data['result']['reviews'])) {
    echo json_encode($data['result']['reviews']);
} else {
    echo json_encode(['error' => 'No reviews found']);
}
?>
