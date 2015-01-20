<?php

require '../vendor/autoload.php';

$app = new \Slim\Slim();
$app->contentType('application/json');
$db = new PDO('sqlite:../app/db.sqlite3');

$app = new \Slim\Slim();

// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


function returnResult($action, $success = true, $id = 0)
{
    echo json_encode([
        'action' => $action,
        'success' => $success,
        'id' => intval($id),
    ]);
}

$app->map('/:x+', function($x) {
    http_response_code(200);
})->via('OPTIONS');

$app->get('/hello', function () {
    echo "Hello You!";
});

$app->get('/install', function () use ($db) {
    $db->exec('DROP TABLE burger_ingredient; DROP TABLE ingredient;DROP TABLE burger;');
    $db->exec('  CREATE TABLE IF NOT EXISTS burger (
                    burgerid INTEGER PRIMARY KEY,
                    name TEXT UNIQUE,
                    version INTEGER);');
    $db->exec('  CREATE TABLE IF NOT EXISTS ingredient (
                    ingredientid INTEGER PRIMARY KEY,
                    name TEXT UNIQUE,
                    spicylevel INTEGER);');
    $db->exec('  CREATE TABLE IF NOT EXISTS burger_ingredient (
                    burgerid INTEGER,
                    ingredientid TEXT UNIQUE,
                    FOREIGN KEY(burgerid) REFERENCES burger(burgerid),
                    FOREIGN KEY(ingredientid) REFERENCES ingredient(ingredientid));');

    returnResult('install');
});

require '../app/routes/burger-routes.php';
require '../app/routes/ingredient-routes.php';



$app->run();


