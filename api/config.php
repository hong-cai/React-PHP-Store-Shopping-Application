<?php
$db = new mysqli("localhost", "root", "", "reactdb");
if (!$db) {
    die("database connection error");
} 
// else {
//     echo "succeed";
// }