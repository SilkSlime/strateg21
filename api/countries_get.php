<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// TODO GET FROM DATABASE
usleep(random_int(0, 3000000));
echo '["Россия", "Украина", "Ваканда", "Бразилия"]';
//
?>