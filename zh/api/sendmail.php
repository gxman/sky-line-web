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
    echo json_encode(['success' => false, 'error' => '请填写完整信息']);
    exit;
}

$mail = new PHPMailer(true);

// 开启详细调试日志（建议生产环境用 0，调试时用 2 或 3）
$mail->SMTPDebug = 2; // 2=客户端和服务器消息, 3=更多细节
$mail->Debugoutput = function($str, $level) {
    file_put_contents('/tmp/phpmailer_smtp.log', gmdate('Y-m-d H:i:s')." [$level] $str\n", FILE_APPEND);
};

try {
    // SMTP 配置
    $mail->isSMTP();
    $mail->Host = 'smtp.exmail.qq.com';     // 你的SMTP服务器，如QQ邮箱
    $mail->SMTPAuth = true;
    $mail->Username = 'info@sky-line.ltd';  // SMTP账号
    $mail->Password = 'BBVv6GU6FhUgiCPK';  // SMTP授权码（不是邮箱密码）
    $mail->SMTPSecure = 'ssl';              // QQ邮箱用ssl，其他邮箱请查文档
    $mail->Port = 465;                      // QQ邮箱端口465

    $mail->setFrom('info@sky-line.ltd', '网站表单');
    $mail->addAddress('info@sky-line.ltd');
    //$mail->addReplyTo($email);

    $mail->Subject = "$title";
    $mail->Body    = "$message";
    //$mail->Body    = "$title\n手机: $mobile\n邮箱: $email\n内容:\n$message";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => '邮件发送失败: ' . $mail->ErrorInfo]);
}
?>