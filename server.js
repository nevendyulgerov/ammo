

/**
 * Application entrypoint
 */

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let contacts = require('./models/contacts');
const port = '3006';

let app = express();
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// get contacts
app.get('/contacts', (req, res) => {
    "use strict";
    contacts.get((data) => {
        res.send({
            status: 'success',
            data: data
        });
    });
});

// add contacts
app.post('/contacts', (req, res) => {
    "use strict";
    let newContacts = JSON.parse(req.body.contacts);
    if ( ! Array.isArray(newContacts) || newContacts.length === 0 ) {
        return res.send({
            status: 'error',
            message: 'Invalid request. New contacts must be of type {array} and must be more than 0.'
        });
    }
    contacts.add(newContacts, (err, contacts) => {
        if ( err ) {
            return res.send({
                status: 'failure',
                message: err
            });
        }
        res.send({
            status: 'success',
            message: 'New contacts added successfully.',
            data: contacts
        });
    });
});

// remove contacts
app.delete('/contacts', (req, res) => {
    "use strict";
    // TODO: Add action
});

// edit contacts
app.put('/contacts', (req, res) => {
    "use strict";
    // TODO: Add action
});

// create server and listen on port
let server = app.listen(app.get('port'), () => {
    "use strict";
    let port = server.address().port;
    console.log(`Ammo demo app listening on port [${port}]`);
});


module.exports = server;
