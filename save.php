<?php
$file = 'result.txt';
$person = "name: ".$_POST['name']. " time: ".$_POST['time']."мин. move: ".$_POST['move']."\n";
file_put_contents($file, $person, FILE_APPEND | LOCK_EX);

