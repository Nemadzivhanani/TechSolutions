<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Validate data
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required.";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    
    if (empty($subject)) {
        $errors[] = "Subject is required.";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required.";
    }
    
    // If no errors, process the form
    if (empty($errors)) {
        // In a real application, you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Redirect to thank you page
        
        // For demonstration, we'll just return a success message
        echo json_encode([
            'status' => 'success',
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
    } else {
        // Return errors
        echo json_encode([
            'status' => 'error',
            'message' => 'Please fix the following errors:',
            'errors' => $errors
        ]);
    }
} else {
    // Not a POST request
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
}
?>