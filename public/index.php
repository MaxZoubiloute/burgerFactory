<?php

require '../vendor/autoload.php';

$app = new \Slim\Slim();
$app->contentType('application/json');
$db = new PDO('sqlite:../app/db.sqlite3');

$app = new \Slim\Slim();

function returnResult($action, $success = true, $id = 0)
{
    echo json_encode([
        'action' => $action,
        'success' => $success,
        'id' => intval($id),
    ]);
}

$app->get('/hello', function () {
   echo "Hello You!";
});

$app->get('/install', function () use ($db) {
    $db->exec('  CREATE TABLE IF NOT EXISTS burger (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    url TEXT UNIQUE);');

    returnResult('install');
});

require '../app/routes/burger-routes.php';
require '../app/routes/ingredient-routes.php';



$app->run();


