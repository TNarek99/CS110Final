<?php

function getFiles () {
    $directories = scandir("./txt/files");
    $files = [];

    foreach ($directories as $directory) {
        if (strpos($directory, ".txt") !== false) {
            array_push($files, $directory);
        }
    }

    return $files;
}