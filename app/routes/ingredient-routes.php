<?php
/**
 * Created by IntelliJ IDEA.
 * User: mlarde01
 * Date: 14/01/15
 * Time: 23:21
 */

$app->get('/ingredient', function () use ($db, $app) {
    $sth = $db->query('SELECT * FROM ingredient;');
    echo json_encode($sth->fetchAll(PDO::FETCH_CLASS));
});

$app->get('/ingredient/:id', function ($id) use ($db, $app) {
    $sth = $db->prepare('SELECT * FROM ingredient WHERE ingredientid = ? LIMIT 1;');
    $sth->execute([intval($id)]);
    echo json_encode($sth->fetchAll(PDO::FETCH_CLASS)[0]);
});

$app->post('/ingredient', function () use ($db, $app) {
    $ingredient = json_decode($app->request()->getBody());
    $sth = $db->prepare('INSERT INTO ingredient (name, spicylevel) VALUES (?, ?);');
    $sth->execute([
        $ingredient->name,
        $ingredient->spicylevel
    ]);

    //TODO Insert ingredient in join table
    returnResult('add', $sth->rowCount() == 1, $db->lastInsertId());
});

$app->put('/ingredient/:id', function ($id) use ($db, $app) {
    $ingredient = json_decode($app->request()->getBody());
    $sth = $db->prepare('UPDATE ingredient SET name = ?, spicylevel = ? WHERE ingredientid = ?;');
    $sth->execute([
        $ingredient->name,
        $ingredient->spicylevel,
        intval($id),
    ]);

    returnResult('edit', $sth->rowCount() == 1, $id);
});

$app->delete('/ingredient/:id', function ($id) use ($db) {
    $sth = $db->prepare('DELETE FROM ingredient WHERE ingredient = ?;');
    $sth->execute([intval($id)]);

    returnResult('delete', $sth->rowCount() == 1, $id);
});