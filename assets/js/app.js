
/**
 * Component: Users List
 * @dependencies
 *  - ammo.js
 */

(ammo => {
    "use strict";

    const app = ammo.app({ users: [] }).syncStorage('users-list').schema('default');

    app.configure('events')
        .node('onReady', callback => ammo.onDomReady(callback))
        .node('onSelectUser', callback => ammo.delegateEvent('click', 'user', callback));

    app.configure('renderers')
        .node('renderUsersList', target => {
            const nodeUsersList = document.createElement('ul');
            nodeUsersList.className = 'users';
            target.appendChild(nodeUsersList);
        })
        .node('renderConsole', target => {
            const nodeConsole = document.createElement('div');
            const nodeConsoleTitle = document.createElement('h1');
            const nodeTextarea = document.createElement('textarea');

            nodeConsoleTitle.className = 'console-title';
            nodeConsoleTitle.innerHTML = 'South Park Characters';
            nodeConsole.className = 'console';
            nodeConsole.setAttribute('title', 'Console - output of what is happening in the app.');

            nodeConsole.appendChild(nodeConsoleTitle);
            nodeConsole.appendChild(nodeTextarea);
            target.appendChild(nodeConsole);
        })
        .node('renderUsers', (users, target) => {
            const template = ammo.template(`<li class="user" (key:name)>
                <img class="user-image" src="{{thumbnail}}" alt="user-image">
                <span class="user-name">{{name}}</span>
            </li>`, users);
            template.render(target);
        });

    app.configure('actions')
        .node('getUsers', (callback) => {
            ammo.req({
                url: './assets/data/users.json',
                callback
            });
        })
        .node('log', (text) => {
            ammo.select('.console textarea').text(prevText => `${prevText || ''}${text}`);
        })
        .node('init', () => {
            const {renderers, actions} = app.getNodes();
            const appName = `users-list`;
            const domApp = ammo.getEl(`[data-app="${appName}"]`);

            ammo.sequence()
                .chain(seq => {
                    // retrieve some users
                    actions.getUsers((err, res) => {
                        if ( err ) {
                            return console.error(err);
                        }
                        seq.resolve(res.slice(0, 2));
                    });
                })
                .chain(seq => {

                    // store retrieved users
                    const usersFirstBatch = seq.response.value;

                    // render console
                    renderers.renderConsole(domApp);

                    // render users list
                    renderers.renderUsersList(domApp);

                    actions.log(`1. Node for console inserted.\n\n`);
                    actions.log(`2. Node for users list inserted.\n\n`);

                    // get users node
                    const domUsers = ammo.select('.users', domApp).get();

                    // update store
                    app.updateStore('users', users => [...users, ...usersFirstBatch]);
                    let usersStore = app.getStoreData('users');

                    // render users
                    renderers.renderUsers(usersStore, domUsers);
                    ammo.select('.console textarea', domApp).text((val) => `${val}3. Users retrieved and rendered: \n${JSON.stringify(usersFirstBatch, null, 4)}.\n\n`);

                    // execute in sequential order
                    ammo.sequence()
                        .chain(seq => {

                            // retrieve more users
                            actions.getUsers((err, res) => {
                                if ( err ) {
                                    return console.error(err);
                                }
                                seq.resolve(res.slice(2, 6));
                            });
                        })
                        .chain(seq => {
                            ammo.select('.console textarea', domApp).text((val) => `${val}4. Wait explicitly 2 seconds.\n\n`);

                            // extend and re-render users
                            setTimeout(() => {
                                const usersSecondBatch = seq.response.value;
                                app.updateStore('users', users => [...users, ...usersSecondBatch]);
                                usersStore = app.getStoreData('users');
                                renderers.renderUsers(usersStore, domUsers);
                                ammo.select('.console textarea', domApp).text((val) => `${val}5. Users retrieved and re-rendered. New users: \n${JSON.stringify(usersSecondBatch, null, 4)}.\n\n`);
                                seq.resolve();
                            }, 2000);
                        })
                        .chain(seq => {

                            // retrieve more users
                            actions.getUsers((err, res) => {
                                if ( err ) {
                                    return console.error(err);
                                }
                                seq.resolve(res.slice(6, 12));
                            });
                        })
                        .chain(seq => {
                            ammo.select('.console textarea', domApp).text((val) => `${val}6. Wait explicitly 1 second.\n\n`);

                            // extend and re-render users
                            setTimeout(() => {
                                const usersThirdBatch = seq.response.value;
                                app.updateStore('users', users => [...users, ...usersThirdBatch]);
                                usersStore = app.getStoreData('users');
                                renderers.renderUsers(usersStore, domUsers);
                                ammo.select('.console textarea', domApp).text((val) => `${val}7. Users retrieved and re-rendered. New users: \n${JSON.stringify(usersThirdBatch, null, 4)}.\n\n`);
                                seq.resolve();
                            }, 1000);
                        })
                        .chain(seq => {
                            ammo.select('.console textarea', domApp).text((val) => `${val}8. Wait explicitly 1 second.\n\n`);

                            // update users' name color based on index
                            setTimeout(() => {
                                ammo.selectAll('.user-name').style('color', (el, index) => index % 2 === 0 ? '#633374' : '#ee9c77');
                                ammo.select('.console textarea', domApp).text((val) => `${val}9. Color users' names based on their index (even/odd).\n\n`);
                                seq.resolve();
                            }, 1000);
                        })
                        .chain(seq => {
                            const usersStore = app.getStoreData('users');
                            const storeData = app.getStore('users');
                            const usersStoreHistory = storeData.values.map(data => data.value.length);

                            ammo.select('.console textarea', domApp).text((val) => `${val}10. In-memory users store after these operations: \n${JSON.stringify(usersStore, null, 4)}\n\n`);
                            ammo.select('.console textarea', domApp).text((val) => `${val}11. In-memory store history for 'users' after these operations based on collection length: \n${JSON.stringify(usersStoreHistory.join(', '), null, 4)}\n\n`);
                            seq.resolve();
                        })
                        .chain(seq => {
                            const bg = '#f2f2f2';
                            ammo.select('.console textarea', domApp).text((val) => `${val}12. Iterate in async over all users and highlight current user\n\n`);

                            ammo.selectAll('.user').async((resolve, el, index) => {
                                setTimeout(() => {
                                    if ( index > 0 ) {
                                        ammo.selectAll('.user').filter((el, userIndex) => userIndex !== index).style('background-color', bg);
                                    }
                                    ammo.select(el).style('background-color', '#e8dca3');
                                    if ( index === ammo.selectAll('.user').get().length - 1 ) {
                                        setTimeout(() => ammo.selectAll('.user').style('background-color', bg), 300);
                                        seq.resolve();
                                    }
                                    resolve();
                                }, 300);
                            });
                        })
                        .execute();
                })
                .execute();
        });

    app.callNode('events', 'onReady',
        app.getNode('actions', 'init'));

})(ammo);
