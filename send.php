<?php
header('Content-type: text/html; charset=utf-8');

$site = 'http://prom.1zs.ru/';
$mailSend = '';//"pzs61@yandex.ru";
$from = "Сообщение получено из формы обратной связи с сайта {$site}";

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$company = $_POST['company'];

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$company = htmlspecialchars($company);

$name = urldecode($name);
$email = urldecode($email);
$company = urldecode($company);

$name = trim($name);
$email = trim($email);
$company = trim($company);

if ($company == '') {
    $message = "Компания: {$company}\nИмя: {$name}\nТелефон: {$phone}\nEmail: {$email}";
    $subject = "Заявка с сайта - стать партнером компании";
} else {
    $message = "Имя клиента: {$name}\nТелефон: {$phone}\nEmail: {$email}";
    $subject = "Заявка с сайта по подбору светильника по техническому заданию";
}

$subject = '=?UTF-8?B?'.base64_encode($subject).'?=';
$headers = "Content-type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-transfer-encoding: quoted-printable";

mail($mailSend, $subject, $message, $from, $headers);

/*header("Location: {$_SERVER['HTTP_REFERER']}");
exit;*/

echo json_encode(['success' => 'ok']);
?>