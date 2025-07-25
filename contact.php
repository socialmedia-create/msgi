<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email'])) {

    // Database connection
    $db_host = 'localhost';
    $db_user = 'msecdb';
    $db_pass = 'msecdb@2025';
    $db_name = 'admin_';

    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get and sanitize form data
    $name    = trim($_POST['name']);
    $email   = trim($_POST['email']);
    $phone   = trim($_POST['phone']);
    $message = trim($_POST['message']);

    // Validate empty fields
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        echo "<script>alert('All fields are required.'); window.history.back();</script>";
        exit();
    }

    // Validate name (only alphabets and spaces)
    if (!preg_match("/^[a-zA-Z\s]+$/", $name)) {
        echo "<script>alert('Name should contain only alphabets and spaces.'); window.history.back();</script>";
        exit();
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email format.'); window.history.back();</script>";
        exit();
    }

    // Check uniqueness of email
    $stmt = $conn->prepare("SELECT id FROM contactform WHERE email = ? OR phone = ?");
    $stmt->bind_param("ss", $email, $phone);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "<script>alert('Email or phone number already exists.'); window.history.back();</script>";
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // Insert into database using prepared statement
    $stmt = $conn->prepare("INSERT INTO contactform (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $message);

    if ($stmt->execute()) {
        echo "<script>alert('Thank you for contacting us. We will get back to you soon.'); window.location.href='index.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
