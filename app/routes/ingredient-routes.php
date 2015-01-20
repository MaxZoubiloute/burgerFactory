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
    $sth = $db->prepare('SELECT * FROM ingredient WHERE id = ? LIMIT 1;');
    $sth->execute([intval($id)]);
    echo json_encode($sth->fetchAll(PDO::FETCH_CLASS)[0]);
});

$app->post('/ingredient', function () use ($db, $app) {
    $app->request();
    $sth = $db->prepare('INSERT INTO ingredient (name, spicylevel) VALUES (?, ?);');
    $sth->execute([
        $name = $app->request()->post('name'),
    ]);

    //TODO Insert ingredient in join table
    returnResult('add', $sth->rowCount() == 1, $db->lastInsertId());
});

$app->put('/ingredient/:id', function ($id) use ($db, $app) {
    $sth = $db->prepare('UPDATE ingredient SET name = ?, spicylevel = ? WHERE id = ?;');
    $sth->execute([
        $app->request()->post('name'),
        $app->request()->post('version'),
        intval($id),
    ]);

    returnResult('edit', $sth->rowCount() == 1, $id);
});

$app->delete('/ingredient/:id', function ($id) use ($db) {
    $sth = $db->prepare('DELETE FROM ingredient WHERE id = ?;');
    $sth->execute([intval($id)]);

    //TODO Delete ingredient in join table
    returnResult('delete', $sth->rowCount() == 1, $id);
});