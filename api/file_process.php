<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
ignore_user_abort(true);
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

if(isset($_GET['id'])) {
    $file_id = $_GET["id"];

    // TODO START PROCESSING SCRIPT
    $files = json_decode(file_get_contents('./files_test.json', FILE_USE_INCLUDE_PATH), true);
    $files[$file_id]["status"] = 0;
    file_put_contents('./files_test.json', json_encode($files));
    usleep(random_int(100000, 1000000));
    do {
        $files = json_decode(file_get_contents('./files_test.json', FILE_USE_INCLUDE_PATH), true);
        $files[$file_id]["info"] = generateRandomString();
        $files[$file_id]["status"] += random_int(0, 10);
        file_put_contents('./files_test.json', json_encode($files));
        usleep(random_int(100000, 1000000));
    } while ($files[$file_id]["status"] < 100);
    $files[$file_id]["status"] = "Processed";
    $files[$file_id]["info"] = "";
    file_put_contents('./files_test.json', json_encode($files));

    $strategy = array(
        "date" => $files[$file_id]["date"],
        "filename" => $files[$file_id]["filename"],
        "strategyName" => $files[$file_id]["filename"]."_TEST_N",
        "country" => $files[$file_id]["filename"]."_TEST_C",
        "year" => $files[$file_id]["filename"]."_TEST_Y",
    );
    $strategies = json_decode(file_get_contents('./strategies_test.json', FILE_USE_INCLUDE_PATH), true);
    $strategy_id = max(array_keys($strategies))+1;
    $strategies[$strategy_id] = $strategy;
    file_put_contents('./strategies_test.json', json_encode($strategies));
    //
}
?>