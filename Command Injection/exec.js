
import dns from 'dns';

import isReachable from 'is-reachable';




    const { execFile } = require('child_process');
    const url = require('url');

const express = require('express');
const router = express.Router()

const { exec, spawn }  = require('child_process');


router.post('/ping', 


(req, res) => {
    try {
        const parsedUrl = new URL(req.body.url);
        const hostname = parsedUrl.hostname;

        if (!hostname) {
            return res.send('Invalid URL');
        }

        // Ensure the hostname is a valid domain name
        // Regular expression to check if hostname is valid
        const hostnameRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}$/;
        if (!hostnameRegex.test(hostname)) {
            return res.send('Invalid hostname');
        }

        // Resolve the hostname using DNS to ensure it's valid and not an IP address directly
        dns.lookup(hostname, (err, address) => {
            if (err) {
                return res.send('Invalid hostname');
            }

            // Check reachability using the 'is-reachable' library
            isReachable(hostname).then(reachable => {
                if (reachable) {
                    res.send(`Host ${hostname} is reachable`);
                } else {
                    res.send(`Host ${hostname} is not reachable`);
                }
            }).catch(() => {
                res.send('Error checking host reachability');
            });
        });
    } catch (err) {
        res.send('Invalid URL');
    }
}


)
    
})

router.post('/gzip', (req,res) => {
    exec(
        'gzip ' + req.query.file_path,
        function (err, data) {
          console.log('err: ', err)
          console.log('data: ', data);
          res.send('done');
    });
})

router.get('/run', (req,res) => {
   let cmd = req.params.cmd;
   runMe(cmd,res)
});

function runMe(cmd,res){
//    return spawn(cmd);

    const cmdRunning = spawn(cmd, []);
    cmdRunning.on('close', (code) => {
        res.send(`child process exited with code ${code}`);
    });
}

module.exports = router
