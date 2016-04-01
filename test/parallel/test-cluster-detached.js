'use strict';
const spawn = require('child_process').spawn;
const path = require('path');
const http = require('http')

const childPath = path.join(__dirname, '..', 'fixtures', 
                            'child-process-cluster.js');

const child = spawn('node', [childPath], {
  detached: true,
  stdio: ['ipc', process.stdout, process.stderr]
});

let masterpid = null

child.on('message', function(msg) {
  if(!msg || !msg.msg)
    return

  if(msg.msg === 'masterpid') {
    masterpid = msg.pid
    console.log(msg.pid, child);
    return
  }

  if(msg.msg === 'workerlistening') {
    process.kill(-(child.pid), 'SIGINT') 
  }
  // if(msg.msg === 'killmeplease') {
    // process.kill(-(child.pid), 'SIGINT')

    // let isKilled = setInterval(function() {
    //
    //   let killed = false
    //
    //   try {
    //     killed = process.kill(child.pid, 0)
    //   } catch(e) {
    //     if(e.code === 'ESRCH')
    //       killed = true 
    //     else
    //       throw e
    //   }
    //
    //   //let's try to listen on the port that should be free
    //   if(killed == true) {
    //     http.Server(function() {
    //
    //     }).listen(msg.port, function() {
    //       clearInterval(isKilled)
    //
    //       console.log(childrens)
    //       console.log('ok')
    //       //ok
    //       // process.exit(0)
    //     });
    //   }
    // }, 100)
  // }
})
