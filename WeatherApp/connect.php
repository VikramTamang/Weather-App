<?php

$city = '';

if (isset($_GET['city'])) {
    $city = $_GET['city'];
} else {
    $city = "Purna";
}

$apiKey = "5f3cf908f308c870abda0c6b43c41540";

// Construct the API URL
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" . $city . "&units=metric&appid=" . $apiKey;

$response = file_get_contents($apiUrl);

echo $response;
