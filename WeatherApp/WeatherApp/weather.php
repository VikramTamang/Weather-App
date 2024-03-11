<?php


// Database credentials
$host = "localhost";
$username = "root";
$password = "";
$dbname = "weatherdetails";

// Connect to database
$con = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Fetch data from the API
$apiKey = "5f3cf908f308c870abda0c6b43c41540";
$city = isset($_GET['city']) ? $_GET['city'] : "Purna";
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" . $city . "&appid=" . $apiKey;

$response = file_get_contents($apiUrl);
$data_from_api = json_decode($response, true);

// Check if API data is valid
if (isset($data_from_api['name'], $data_from_api['weather'][0]['icon'], $data_from_api['main']['temp'], $data_from_api['main']['humidity'], $data_from_api['main']['pressure'], $data_from_api['wind']['speed'])) {
    $date = date('Y-m-d H:i:s');
    $cityName = $data_from_api['name'];
    $icon = $data_from_api['weather'][0]['icon'];
    $temperature = $data_from_api['main']['temp'];
    $humidity = $data_from_api['main']['humidity'];
    $pressure = $data_from_api['main']['pressure'];
    $windSpeed = $data_from_api['wind']['speed'];

    // Insert API data into the database
    $insert_sql = "INSERT INTO past_data (date, cityName, icon, temperature, humidity, pressure, windSpeed) 
                   VALUES ('$date', '$cityName', '$icon', '$temperature', '$humidity', '$pressure', '$windSpeed')";

    // Validate and execute the insert query
    if ($con->query($insert_sql)) {
        echo "API data has been inserted successfully.\n";
    } else {
        echo "Error inserting API data: " . $con->error . "\n";
    }
} else {
    echo "Invalid or incomplete data from the API.\n";
}

// Query
$sql = "SELECT * FROM `past_data`";

// Validate query
if (!$result = $con->query($sql)) {
    die("Error in query: " . $con->error);
}

// Fetch data
$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Output JSON data
header('Content-Type: application/json');
echo json_encode($data, JSON_PRETTY_PRINT);

// Close connection
$con->close();
