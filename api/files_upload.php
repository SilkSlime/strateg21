<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
ignore_user_abort(true);

foreach ($_FILES["files"]["error"] as $key => $error) {
    if ($error == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["files"]["tmp_name"][$key];
        $name = basename($_FILES["files"]["name"][$key]);
        move_uploaded_file($tmp_name, "files/$name");

        // TODO ADD TO DATABASE
        $files = json_decode(file_get_contents('./files_test.json', FILE_USE_INCLUDE_PATH), true);
        $file = array(
            "date" => date('Y-m-d'),
            "filename" => $name,
            "status" => "NotProcessed",
            "info" => "",
        );
        $file_id = max(array_keys($files))+1;
        $files[$file_id] = $file;
        file_put_contents('./files_test.json', json_encode($files));
    }
}
?>