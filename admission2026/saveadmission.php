<?php
// Database connection settings
$servername = "localhost";
$username = "msecdb";
$password = "msecdb@2025";
$dbname = "admin_";

// Google Apps Script Web App URL
$googleScriptURL = 'https://script.google.com/macros/s/AKfycbzpV47cfGaHyuiC4tQ8MwNMRAQd1kswAG9V7bhTGZHNGOY3N3yvySI5YpcX1VBF0e_0/exec';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("<h2 style='color:red;'>❌ Database connection failed!</h2><p>Please try again later.</p>");
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $recaptchaSecret = "6LcNjSsrAAAAACF3ligs89_MqEVpWcdDXMX8UlZh";
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Verify CAPTCHA response
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseData = json_decode($verify);

    if (!$responseData->success) {
        echo "<script>alert('Please complete the CAPTCHA.'); window.history.back();</script>";
        exit;
    }

    // Check if required fields are set
    if (isset($_POST['name'], $_POST['email'], $_POST['phone'], $_POST['course'], $_POST['know_about'])) {

        // Sanitize inputs
        $name = $conn->real_escape_string(trim($_POST['name']));
        $email = $conn->real_escape_string(trim($_POST['email']));
        $phone = $conn->real_escape_string(trim($_POST['phone']));
        $course = $conn->real_escape_string(trim($_POST['course']));
        $know_about = $conn->real_escape_string(trim($_POST['know_about']));

        // ✅ Check if phone number already exists
        $checkPhoneQuery = "SELECT * FROM admission WHERE phone = ?";
        $checkStmt = $conn->prepare($checkPhoneQuery);
        $checkStmt->bind_param("s", $phone);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();

        if ($checkResult->num_rows > 0) {
            echo "<script>alert('This phone number ($phone) is already registered.'); window.history.back();</script>";
            exit;
        }
		$checkEmailQuery = "SELECT * FROM admission WHERE email = ?";
		$checkEmailStmt = $conn->prepare($checkEmailQuery);
		$checkEmailStmt->bind_param("s", $email);
		$checkEmailStmt->execute();
		$checkEmailResult = $checkEmailStmt->get_result();

		if ($checkEmailResult->num_rows > 0) {
			echo "<script>alert('This email address ($email) is already registered.'); window.history.back();</script>";
			exit;
		}

        // ✅ Insert new data
        $stmt = $conn->prepare("INSERT INTO admission (name, email, phone, course, know_about) VALUES (?, ?, ?, ?, ?)");

        if ($stmt === false) {
            echo "<h2 style='color:red;'>❌ Error preparing the database query!</h2>";
            exit;
        }

        $stmt->bind_param("sssss", $name, $email, $phone, $course, $know_about);

        if ($stmt->execute()) {
            // ✅ Data inserted into MySQL successfully

            // Send data to Google Sheets
            $postData = http_build_query([
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'course' => $course,
                'know_about' => $know_about,
            ]);

            $opts = [
                'http' => [
                    'method'  => 'POST',
                    'header'  => 'Content-type: application/x-www-form-urlencoded',
                    'content' => $postData
                ]
            ];
            $context = stream_context_create($opts);

            $response = @file_get_contents($googleScriptURL, false, $context);

            if ($response === FALSE) {
                echo "<h2 style='color:red;'>❌ Failed to submit data to Google Sheets.</h2>";
                echo "<p>Please try again later or contact support.</p>";
                exit;
            } else {
                error_log("Successfully submitted data to Google Sheets: " . $response);

                // Redirect to thank you page
                header("Location: thankyou.php");
                exit;
            }

        } else {
            echo "<h2 style='color:red;'>❌ Error inserting data into Database!</h2>";
        }

        $stmt->close();
    } else {
        echo "<h2 style='color:red;'>❌ All form fields are required!</h2>";
    }
} else {
    echo "<h2 style='color:red;'>❌ Invalid request method! Please submit the form properly.</h2>";
}

$conn->close();
?>
