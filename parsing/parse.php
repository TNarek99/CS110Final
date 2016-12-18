<?php

require "./dbConfig.php";
require "./test.php";

function parse ($url) {
    
    $indexes = getIndexes();
    $fields = getFields();

    $conn = getConnection();
    
    $content = file_get_contents($url);
    $rows = explode("\n", $content);

    /*foreach ($rows as $index => $row) {
        if (strpos($row, "IN-STATE TUITION") !== false) {
            array_splice($rows, $index, 1);
            //unset($rows[$index]);
        }
    }*/

    for ($index = 0; $index < count($rows); $index++) {
        if (strpos($rows[$index], "APLI") !== false) {
            $startingIndex = $index;
        }
    }

    $info = array_slice($rows, $startingIndex + 1, count($rows) - $startingIndex - 1);

    for ($index = 0; $index < count($info); $index++) {
        if (strpos($info[$index], "IN-STATE TUITION") !== false) {
            array_splice($info, $index, 1);
            break;
        }
    }

    $columns = "";
    $values = "";

    for ($i = 0; $i < count($indexes); $i++) {

        if ($fields[$i]["field_type"] == "string") {
            $value = trim($info[$indexes[$i]], '/\s+/');
            $value = trim($info[$indexes[$i]], ' ');
            $columns = $columns . "`" . $fields[$i]["field_name"] . "`, ";
            $values = $values . "'" . $value . "', ";
        } else {
            $value = intval(filter_var($info[$indexes[$i]], FILTER_SANITIZE_NUMBER_INT));
            if ($fields[$i]["field_name"] == "waitlist_yes_or_no") {
                if (strpos($info[$indexes[$i]], "Yes") == 0) {
                    $value = 1;
                } else {
                    $value = 0;
                }
            } else {
                if ($fields[$i]["field_name"] == "average_high_school_gpa") {
                    $value = doubleval($info[$indexes[$i]]);
                } else {
                    if ((strpos($fields[$i]["field_name"], "gpa_") !== false || strpos($fields[$i]["field_name"], "sat_") !== false
                        || strpos($fields[$i]["field_name"], "act_") !== false)) {
                        if (strpos($fields[$i]["field_name"], "average") === false &&
                            strpos($fields[$i]["field_name"], "percentile") === false) {
                            $colonIndex = strpos($info[$indexes[$i]], ":");
                            $marksStr = substr($info[$indexes[$i]], $colonIndex + 2, 2);

                            if (strpos($marksStr, "N/") !== false) {
                                $value = "NULL";
                            } else {
                                $mark = intval(filter_var($marksStr, FILTER_SANITIZE_NUMBER_INT));
                                $value = $mark;
                            }
                        }
                    } else {
                        if (strpos($fields[$i]["field_name"], "room_and_boards") !== false) {

                            $value = $value - 2016;
                            $value = $value / 10000;
                        } else {
                            if (strpos($fields[$i]["field_name"], "tuition_fee") !== false) {
                                if (strpos($info[$indexes[$i]], "OUT-OF-STATE") !== false) {
                                    $feeString = filter_var($info[$indexes[$i]], FILTER_SANITIZE_NUMBER_INT);
                                    preg_match_all('!\d+!', $feeString, $numbers);
                                    $value = (intval($numbers[0][0]) - 2016)/10000;
                                } else {
                                    $value = $value - 2016;
                                    $value = $value / 10000;
                                }
                            }
                        }
                    }
                }
            }

            $columns = $columns . "`" .$fields[$i]["field_name"] . "`, ";
            $values = $values . $value . ", ";
        }
    }

    $values = substr($values, 0, strlen($values) - 2);
    $columns = substr($columns, 0, strlen($columns) - 2);

    /*$columnsArray = explode(",", $columns);
    $valuesArray = explode(",", $values);

    for ($a = 0; $a < count($columnsArray); $a++) {
        echo $columnsArray[$a] . " - " . $valuesArray[$a];
        echo "<br>";
    }

    echo "--------------------------------------------------------------";
    echo "<br>";*/

    $sql = "INSERT INTO universities (".$columns.") VALUES (".$values.")";
    $conn->exec($sql);
}