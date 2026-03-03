<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// DB connection
$servername = "localhost";
$username = "msecdb";
$password = "msecdb@2025";
$dbname = "admin_";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => false, "message" => "Database connection failed"]));
}

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Basic validation
if (empty($data['full_name']) || empty($data['phone'])) {
    echo json_encode(["status" => false, "message" => "Required fields missing"]);
    exit;
}

// Prepare statement
$stmt = $conn->prepare("INSERT INTO leads 
(full_name, school, board, year_of_passing, medium, first_graduate, email, phone, city, preferred_course, referral, source, parent_name, parent_occupation) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssssssssssss",
    $data['full_name'],
    $data['school'],
    $data['board'],
    $data['year_of_passing'],
    $data['medium'],
    $data['first_graduate'],
    $data['email'],
    $data['phone'],
    $data['city'],
    $data['preferred_course'],
    $data['referral'],
    $data['source'],
    $data['parent_name'],
    $data['parent_occupation']
);

if ($stmt->execute()) {
    echo json_encode(["status" => true, "message" => "Lead saved successfully"]);
} else {
    echo json_encode(["status" => false, "message" => "Error saving lead"]);
}

$stmt->close();
$conn->close();
?>