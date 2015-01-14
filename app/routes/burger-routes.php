<?php
/**
 * Created by IntelliJ IDEA.
 * User: mlarde01
 * Date: 14/01/15
 * Time: 23:13
 */

$app->get('/burger', function () use ($db, $app) {
    $sth = $db->query('SELECT * FROM burger;');
    echo json_encode($sth->fetchAll(PDO::FETCH_CLASS));
});

$app->get('/burger/:id', function ($id) use ($db, $app) {
    $sth = $db->prepare('SELECT * FROM burger WHERE id = ? LIMIT 1;');
    $sth->execute([intval($id)]);
    echo json_encode($sth->fetchAll(PDO::FETCH_CLASS)[0]);
});

$app->post('/burger', function () use ($db, $app) {
    $title = $app->request()->post('title');
    $sth = $db->prepare('INSERT INTO burger (url, title) VALUES (?, ?);');
    $sth->execute([
        $url = $app->request()->post('url'),
        empty($title) ? getTitleFromUrl($url) : $title,
    ]);

    returnResult('add', $sth->rowCount() == 1, $db->lastInsertId());
});

$app->put('/burger/:id', function ($id) use ($db, $app) {
    $sth = $db->prepare('UPDATE burger SET title = ?, url = ? WHERE id = ?;');
    $sth->execute([
        $app->request()->post('title'),
        $app->request()->post('url'),
        intval($id),
    ]);

    returnResult('edit', $sth->rowCount() == 1, $id);
});

$app->delete('/burger/:id', function ($id) use ($db) {
    $sth = $db->prepare('DELETE FROM burger WHERE id = ?;');
    $sth->execute([intval($id)]);

    returnResult('delete', $sth->rowCount() == 1, $id);
});
