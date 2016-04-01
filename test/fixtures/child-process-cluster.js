'use strict';
const common = require('../common');
const cluster = require('cluster');

if (cluster.isMaster) {
  // cluster.setupMaster({detached: true});
  cluster.setupMaster();
  process.send({msg: 'masterpid', pid: process.pid})

  let worker
  worker = cluster.fork();

  worker.on('message', function(msg) {
    process.send(msg)
  })
  return
}

const http = require('http');
// const spawn = require('child_process').spawn

http.Server(function() {

}).listen(common.PORT, function() {
  process.send({msg: 'workerlistening', port: common.PORT})
});

// let tail = spawn('tail', ['-F', __dirname + './child-process-cluster.js']) 
