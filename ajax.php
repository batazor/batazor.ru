<?php
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

	header('Access-Control-Allow-Origin: *');

	if($_REQUEST['action'] == "mail") {

		if (isset($_POST['name'])) { $name = $_POST['name']; if ($name == '') { unset($name);} }
		if (isset($_POST['mail'])) { $mail = $_POST['mail']; if ($mail == '') { unset($mail);} }
		if (isset($_POST['text'])) { $text = $_POST['text']; if ($text == '') { unset($text);} }

		if (empty($name) or empty($mail) or empty($text)) {
			echo "<p>Извините, но что то пошло не так.<br/>Сообщение не ушло :(</p>";
		} else { 
			$to      = 'batazor111@gmail.com';
			$subject = '<batazor.ru>';
			$message = "Пришло письмо от ".$name."\nАдрес отправителя: ".$mail."\nОн/а написал/а следующее:\n".$text."\n\nПисьмо отправлено в ".date("m/d/Y H:i:s.");
			$message = wordwrap($message, 70);
			mail($to, $subject, $message);
			echo "<p>Хорошо. Ваше сообщение отправлено.</p>";
		}
	}

} else {header( 'Location: /main', true, 303 );}