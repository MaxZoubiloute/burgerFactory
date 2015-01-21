# burgerFactory

## Installation

Install [Git](http://git-scm.com), [node.js](http://nodejs.org), and [PHP 5.4](http://www.php.net/).  The development mode also requires either [SQLite](http://www.sqlite.org)

Install [Composer](https://getcomposer.org/):

    curl -s http://getcomposer.org/installer | php

Install composer dependencies

    php composer.phar update & bower install & npm install


## Start Application

Run the service:

    php -S 127.0.0.1:8080 -t public

Install Database:

    http://localhost:8080/install


A client-side AngularJS application will now be available by running

    grunt server

The Grunt server will run at [http://localhost:9000](http://localhost:9000).  It will proxy REST requests to the Slim service running at [http://localhost:8080](http://localhost:8080).

At this point you should be able to navigate to a page to manage your persistent entities.

The Grunt server supports hot reloading of client-side HTML/CSS/Javascript file changes.
