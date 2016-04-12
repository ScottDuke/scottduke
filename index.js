'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './templates',
        layoutPath: './templates/layout'
    });
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.register(require('inert'), (err) => {
  server.route({
    method: 'GET',
    path: '/css/styles.css',
    handler: function (request, reply) {
        reply.file('./templates/css/styles.css');
    }
  });
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
