<?php
/**
 * Created by IntelliJ IDEA.
 * User: mlarde01
 * Date: 14/01/15
 * Time: 23:13
 */

$app->get('/burger/last', function () use ($db, $app) {
    $sth = $db->query('SELECT * FROM burger LIMIT 10');
    $burgers = $sth->fetchAll(PDO::FETCH_CLASS);

    $sth = $db->prepare('SELECT ingredient.*
    FROM burger_ingredient, ingredient
    WHERE burger_ingredient.burgerid = ?
    AND burger_ingredient.ingredientid=ingredient.ingredientid');
    foreach($burgers as $burger){
        $sth->execute([intval($burger->burgerid)]);
        $burger->ingredients = $sth->fetchAll(PDO::FETCH_CLASS);
    }

    echo json_encode($burgers);
});

$app->get('/burger', function () use ($db, $app) {
    $sth = $db->query('SELECT * FROM burger');
    $burgers = $sth->fetchAll(PDO::FETCH_CLASS);

    $sth = $db->prepare('SELECT ingredient.*
    FROM burger_ingredient, ingredient
    WHERE burger_ingredient.burgerid = ?
    AND burger_ingredient.ingredientid=ingredient.ingredientid');
    foreach($burgers as $burger){
        $sth->execute([intval($burger->burgerid)]);
        $burger->ingredients = $sth->fetchAll(PDO::FETCH_CLASS);
    }

    echo json_encode($burgers);
});

$app->get('/burger/:id', function ($id) use ($db, $app) {
    $app->log->debug($id);
    $sth = $db->prepare('SELECT * FROM burger WHERE burgerid = ?');
    $sth->execute([intval($id)]);
    $burger = $sth->fetchAll(PDO::FETCH_CLASS)[0];

    $sth = $db->prepare('SELECT ingredient.*
    FROM burger_ingredient, ingredient
    WHERE burger_ingredient.burgerid = ?
    AND burger_ingredient.ingredientid=ingredient.ingredientid');
    $sth->execute([intval($id)]);
    $burger->ingredients = $sth->fetchAll(PDO::FETCH_CLASS);

    echo json_encode($burger);
});

$app->post('/burger', function () use ($db, $app) {
    $burger = json_decode($app->request()->getBody());
    $sth = $db->prepare('INSERT INTO burger (name, version) VALUES (?, 1)');
    $sth->execute([
        $name = $burger->name,
    ]);

    $sth2 = $db->prepare('INSERT INTO burger_ingredient (burgerid, ingredientid) VALUES (?,?)');
    foreach($burger->ingredients as $ingredient){
        $sth2->execute([
            $burger->burgerid,
            $ingredient->ingredientid
        ]);
    }
    returnResult('add', $sth->rowCount() == 1, $db->lastInsertId());
});

$app->put('/burger/:id', function ($id) use ($db, $app) {
    $burger = json_decode($app->request()->getBody());
    $sth = $db->prepare('UPDATE burger SET name = ?, version = ? WHERE burgerid = ?');
    $sth->execute([
        $burger->name,
        intval($burger->version+1),
        intval($id)
    ]);

    $sth = $db->prepare('DELETE FROM burger_ingredient WHERE burgerid = ?;');
    $sth->execute([intval($id)]);

    $sth = $db->prepare('INSERT INTO burger_ingredient (burgerid, ingredientid) VALUES (?,?)');
    foreach($burger->ingredients as $ingredient){
        $sth->execute([
            $burger->burgerid,
            $ingredient->ingredientid
        ]);
    }
    returnResult('edit', $sth->rowCount() == 1, $id);
});

$app->delete('/burger/:id', function ($id) use ($db) {
    $sth = $db->prepare('DELETE FROM burger_ingredient WHERE burgerid = ?;');
    $sth->execute([intval($id)]);

    $sth = $db->prepare('DELETE FROM burger WHERE burgerid = ?;');
    $sth->execute([intval($id)]);

    returnResult('delete', $sth->rowCount() == 1, $id);
});
