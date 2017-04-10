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

server.register(require('inert'), function(err) {
  if (err) {throw err;}
  server.route({
    method : 'GET', path : '/public/{path*}',
    handler : {
      directory : {
        path : './public',
        listing : false,
        index : false
      }
    }
  });
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
