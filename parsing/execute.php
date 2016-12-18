<?php

require "./parse.php";
require "./directories.php";

$files = getFiles();

foreach ($files as $file) {
    $url = "./txt/files/" . $file;
    parse($url);
}