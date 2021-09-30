<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// TODO GET FROM DATABASE
usleep(random_int(0, 3000000));
echo file_get_contents('./strategies_test.json');
//
?>