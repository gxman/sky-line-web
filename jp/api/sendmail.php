<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$title = $_POST['title'] ?? '';
$message = $_POST['message'] ?? '';

if (empty($title) || empty($message)) {
    echo json_encode(['success' => false, 'error' => '必要な情報をすべてご記入ください']);
    exit;
}

$mail = new PHPMailer(true);

// デバッグログ（本番は0、デバッグは2または3）
$mail->SMTPDebug = 2;
$mail->Debugoutput = function($str, $level) {
    file_put_contents('/tmp/phpmailer_smtp.log', gmdate('Y-m-d H:i:s')." [$level] $str\n", FILE_APPEND);
};

try {
    // SMTP 設定
    $mail->isSMTP();
    $mail->Host = 'smtp.exmail.qq.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@sky-line.ltd';
    $mail->Password = 'BBVv6GU6FhUgiCPK';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('info@sky-line.ltd', 'お問い合わせフォーム');
    $mail->addAddress('info@sky-line.ltd');
    //$mail->addReplyTo($email);

    //$mail->Subject = 'ウェブサイトからのお問い合わせ';
    //$mail->Body    = "住所: $address\n電話番号: $mobile\nメールアドレス: $email\n内容:\n$message";
    $mail->Subject = "$title";
    $mail->Body    = "$message";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'メール送信に失敗しました: ' . $mail->ErrorInfo]);
}
?>