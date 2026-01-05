<?php
// ================= DATABASE CONFIG =================
$servername = "localhost";
$username   = "msecdb";
$password   = "msecdb@2025";
$dbname     = "admin_";

// Google Apps Script Web App URL
$googleScriptURL = "https://script.google.com/macros/s/AKfycbzJU0jEbpDU__WSXrjwR2-tnLDfW-fAPH-oPb5igjC-Vl37OvlnjiSWQ_PXIwpME6I/exec";

// ==================================================
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("❌ Database connection failed");
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("❌ Invalid request");
}

// ================= CAPTCHA =================
// $recaptchaSecret  = "6LcNjSsrAAAAACF3ligs89_MqEVpWcdDXMX8UlZh";
// $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

// $verify = file_get_contents(
//     "https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse"
// );
// $responseData = json_decode($verify);

// if (!$responseData->success) {
//     echo "<script>alert('Please complete the CAPTCHA.'); history.back();</script>";
//     exit;
// }

// ================= REQUIRED FIELDS =================
$required = [
    'full_name', 'email', 'phone',
    'board', 'location',
    'preferred_course', 'source'
];

foreach ($required as $field) {
    if (empty($_POST[$field])) {
        echo "<script>alert('All fields are required.'); history.back();</script>";
        exit;
    }
}

// ================= SANITIZE =================
$name    = trim($_POST['full_name']);
$email   = trim($_POST['email']);
$phone   = trim($_POST['phone']);
$board   = trim($_POST['board']);
$location = trim($_POST['location']);
$course  = trim($_POST['preferred_course']);
$source  = trim($_POST['source']);

// ================= DUPLICATE CHECK =================
$check = $conn->prepare("SELECT id FROM admission WHERE phone = ? OR email = ?");
$check->bind_param("ss", $phone, $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo "<script>alert('This phone number or email is already registered.'); history.back();</script>";
    exit;
}
$check->close();

// ================= INSERT DATA =================
$stmt = $conn->prepare(
    "INSERT INTO admission 
    (name, email, phone, board, location, preferred_course, source)
    VALUES (?, ?, ?, ?, ?, ?, ?)"
);

$stmt->bind_param(
    "sssssss",
    $name,
    $email,
    $phone,
    $board,
    $location,
    $course,
    $source
);

if (!$stmt->execute()) {
    die("❌ Database insert failed");
}

// ================= GOOGLE SHEETS PUSH =================
$postData = http_build_query([
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'board' => $board,
    'location' => $location,
    'preferred_course' => $course,
    'source' => $source
]);

$opts = [
    'http' => [
        'method'  => 'POST',
        'header'  => 'Content-Type: application/x-www-form-urlencoded',
        'content' => $postData
    ]
];

$context = stream_context_create($opts);
file_get_contents($googleScriptURL, false, $context);

// ================= SUCCESS =================
header("Location: thankyou.php");
exit;

$conn->close();
?>
