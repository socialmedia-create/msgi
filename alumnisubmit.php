<?php
// CONFIG
$GSHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzJfJMqWgcmES1QzkRF8VsaFEkKs1Ax3onStodZhRHw6ZQFRPIySznBykebgfU4MXJQ/exec";

// 1️⃣ BASIC DETAILS VALIDATION ONLY
$required = ['full_name','graduation_year','department','email','phone'];

foreach ($required as $field) {
    if (empty($_POST[$field])) {
        die("Required fields missing.");
    }
}

// 2️⃣ COLLECT DATA
$data = [
    "full_name" => $_POST['full_name'],
    "graduation_year" => $_POST['graduation_year'],
    "department" => $_POST['department'],
    "role_org" => $_POST['role_org'] ?? '',
    "location" => $_POST['location'] ?? '',
    "email" => $_POST['email'],
    "phone" => $_POST['phone'],
    "linkedin" => $_POST['linkedin'] ?? '',
    "contribution" => isset($_POST['contribution']) ? implode(", ", $_POST['contribution']) : '',
    "support_details" => $_POST['support_details'] ?? '',
    "message" => $_POST['message'] ?? '',
    "submitted_at" => date("Y-m-d H:i:s")
];

// 3️⃣ SEND TO GOOGLE SCRIPT
$ch = curl_init($GSHEET_WEBAPP_URL);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
curl_close($ch);

// 4️⃣ REDIRECT / SUCCESS
header("Location: thank-you.html");
exit;
