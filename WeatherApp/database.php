<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function pastWeatherData()
{
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

    // Close connection
    $con->close();

    return $data;
}

// Output JSON data
header('Content-Type: application/json');
echo json_encode(pastWeatherData(), JSON_PRETTY_PRINT);
