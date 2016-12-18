<?php

function getIndexes () {
    $content = file_get_contents("./txt/STUDR-DB.txt");
    $rows = explode("\n", $content);
    $indexes = [];

    foreach ($rows as $row) {
        $beginning = substr($row, 0, 8);
        $beginning = trim($beginning);
        if (strpos($beginning, "-") == false) {
            $number = intval(filter_var($beginning, FILTER_SANITIZE_NUMBER_INT));
            array_push($indexes, ($number-1));
        } else {
            $dashPos = strpos($beginning, "-");
            $firstPart = intval(substr($beginning, 0, $dashPos));
            $secondPart = intval(substr($beginning, ($dashPos+1), (strlen($beginning)-$dashPos-1)));
            for($index = $firstPart; $index <= $secondPart; $index++) {
                array_push($indexes, ($index - 1));
            }
        }
    }

    $indexes = array_slice($indexes, 0, count($indexes) - 1);

    return $indexes;
}

function getFields () {
    $link = mysql_connect('localhost', 'root', 'qrtmnkl1205');
    $result = mysql_list_fields("studr", "universities", $link);
    $columns = mysql_num_fields($result);

    $fields = [];

    for ($i = 1; $i < $columns; $i++) {
        $fieldName = mysql_field_name($result, $i);
        $fieldType = mysql_field_type($result, $i);
        $assoc = ["field_name" => $fieldName,
            "field_type" => $fieldType];
        array_push($fields, $assoc);
    }

    return $fields;
}