<?php

require "dbConfig.php";

$url = "./txt/STUDR.txt";
$content = file_get_contents($url);

$rows = explode("\n", $content);

/*$sql = "CREATE TABLE universities (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
    )";

$conn->exec($sql);*/

foreach ($rows as $row) {
    /*$row = preg_replace('/[^\\/\-a-z\s]/i', '', $row);
    $row = str_replace("-", "", $row);
    $row = ltrim($row, ' ');
    $row = str_replace(" ", "_", $row);
    $row = strtolower($row);*/

    if (strpos($row, 'sat') !== false || strpos($row, 'act') !== false || strpos($row, 'gpa') !== false ||
        strpos($row, 'percent') !== false || strpos($row, 'number') !== false ||
        strpos($row, 'total') !== false || strpos($row, 'fee') !== false || strpos($row, 'rate') !== false ||
        strpos($row, 'freshman') !== false || strpos($row, 'applicants') !== false ||
        strpos($row, 'room_and_boards') !== false) {
        $sql = "ALTER TABLE universities
        ADD ".$row." INT(10)";
        $conn->exec($sql);
    } elseif (strpos($row, 'deadline') !== false) {
        $sql = "ALTER TABLE universities
        ADD ". $row ." VARCHAR(100)";
        $conn->exec($sql);
    } else {
        $sql = "ALTER TABLE universities
        ADD ".$row." BOOLEAN";
        $conn->exec($sql);
    }
}