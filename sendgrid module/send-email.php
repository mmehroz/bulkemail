<?php

$template = $_POST['template'];

// $_POST["template"] = $_POST["template"];
// foreach ($_POST as $ahm_email) {
require("./sendgrid-php.php");
$email = new \SendGrid\Mail\Mail();
$email->setFrom("info@maxdigitizing.com", "Bella Martin");
$email->setSubject($_POST['subject']);
$email->addTo($_POST['email'], "");
$email->addContent(
    "text/plain",
    "and easy to do anywhere, even with PHP"
);
$email->addContent(
    "text/html",
    ". $template "
);
$sendgrid = new \SendGrid('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');
try {
    $response = $sendgrid->send($email);
    print $response->statusCode() . "\n";
    print_r($response);
    print $response->body() . "\n";
    echo "ahmer_email_count-" . $_POST['count'];

    date_default_timezone_set("Asia/Karachi");
    $myfile = fopen("./../report.txt", "a") or die("Unable to open file!");
    $txt = "\n" . $_POST['count'] . " " . $response->statusCode() . " " . $_POST['subject'] . " " . $_POST['email'] . " " . date("h:i:sa") . " " . date("d-m-Y");
    fwrite($myfile, $txt);
    fclose($myfile);
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
    echo "ahmer_email_count-" . $_POST['count'];
}
// }
