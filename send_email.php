<?php
// --- CONFIGURATION ---
// IMPORTANT: Replace with the email address where you want to receive messages.
$recipient_email = "info@techsolutions.com"; 

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);
    
    // --- VALIDATION ---
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($subject) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill all fields correctly.']);
        exit;
    }
    
    // --- EMAIL CONSTRUCTION ---
    $email_subject = "New Contact Form Submission: " . htmlspecialchars($subject);
    $email_body = "Name: " . htmlspecialchars($name) . "\n";
    $email_body .= "Email: " . htmlspecialchars($email) . "\n\n";
    $email_body .= "Message:\n" . htmlspecialchars($message) . "\n";
    $headers = "From: " . htmlspecialchars($name) . " <" . htmlspecialchars($email) . ">";
    
    // --- SEND THE EMAIL ---
    if (mail($recipient_email, $email_subject, $email_body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Thank you! Your message has been sent.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Sorry, the message could not be sent.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}
?>
