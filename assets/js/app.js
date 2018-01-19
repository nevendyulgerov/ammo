
/**
 * Component: Users List
 * @dependencies
 *  - ammo.js
 */

(ammo => {
    'use strict';

    const props = {
        name: 'usersList',
        global: true,
        storeKey: 'usersList'
    };
    const state = {
        users: []
    };

    const app = ammo.app(props, state).schema('default').syncWithPersistentStore();

    app.configure('events')
        .node('onReady', callback => ammo.onDomReady(callback))
        .node('onSelectUser', callback => ammo.delegateEvent('click', 'user', callback));

    app.configure('renderers')
        .node('renderUsersList', target => {
            const nodeUsersList = document.createElement('ul');
            nodeUsersList.className = 'users';
            target.appendChild(nodeUsersList);
        })
        .node('renderUsers', (users, target) => {
            const template = ammo.template(`<li class="user" (key:name)>
                <img class="user-image" src="{{thumbnail}}" alt="user-image">
                <span class="user-name">{{name}}</span>
                <span class="user-age">{{age}}</span>
            </li>`, users);
            template.render(target);
            return template;
        });

    app.configure('actions')
        .node('getUsers', (callback) => {
            ammo.request({
                url: './assets/data/users.json',
                callback
            });
        })
        .node('init', () => {
            const {renderers, actions} = app.getNodes();
            const appName = `users-list`;
            const domApp = ammo.getEl(`[data-app="${appName}"]`);
            let usersStore;
            let domUsers;
            let template;

            ammo.sequence()
                .chain(seq => {
                    actions.getUsers((err, res) => seq.resolve(err ? [] : res.slice(0, 2)));
                })
                .chain(seq => {
                    renderers.renderUsersList(domApp);

                    const usersFirstBatch = seq.response.value;
                    domUsers = ammo.select('.users', domApp).get();

                    app.updateStore('users', users => [...users, ...usersFirstBatch]);
                    usersStore = app.getStore('users');
                    renderers.renderUsers(usersStore, domUsers);

                    seq.resolve();
                })
                .chain(seq => {
                    actions.getUsers((err, res) => seq.resolve(err ? [] : res.slice(2, 6)));
                })
                .chain(seq => {
                    setTimeout(() => {
                        const usersSecondBatch = seq.response.value;
                        app.updateStore('users', users => [...users, ...usersSecondBatch]);
                        usersStore = app.getStore('users');
                        renderers.renderUsers(usersStore, domUsers);
                        seq.resolve();
                    }, 2000);
                })
                .chain(seq => {
                    actions.getUsers((err, res) => seq.resolve(err ? [] : res.slice(6, 12)));
                })
                .chain(seq => {
                    setTimeout(() => {
                        const usersThirdBatch = seq.response.value;
                        app.updateStore('users', users => [...users, ...usersThirdBatch]);
                        usersStore = app.getStore('users');
                        template = renderers.renderUsers(usersStore, domUsers);
                        seq.resolve();
                    }, 1000);
                })
                .chain(seq => {
                    const iterations = 20;
                    ammo.recurIter((index, resolve) => {
                        setTimeout(() => {
                            actions.getUsers((err, res) => {
                                if ( err ) {
                                    return resolve(false);
                                }
                                const start = ammo.randomInclusive(0, res.length - 1);
                                const end = ammo.randomInclusive(start, res.length - 1);
                                const newUsers = res.slice(start, end);

                                app.updateStore('users', users => [...users, ...newUsers]);
                                const usersStore = app.getStore('users');
                                renderers.renderUsers(usersStore, domUsers);

                                resolve(index < iterations - 1);
                            });
                        }, 100);
                    }, () => seq.resolve());
                })
                .chain(seq => {
                    setTimeout(() => {
                        ammo.selectAll('.user-name').style('color', (el, index) => index % 2 === 0 ? '#633374' : '#ee9c77');
                        seq.resolve();
                    }, 1000);
                })
                .chain(seq => {
                    ammo.selectAll('.user').async((resolve, el, index) => {
                        setTimeout(() => {
                            if ( index > 0 ) {
                                ammo.selectAll('.user').filter((el, userIndex) => userIndex !== index).each(el => el.classList.contains('active') && el.classList.remove('active'));
                            }
                            ammo.select(el).get().classList.add('active');
                            if ( index === ammo.selectAll('.user').get().length - 1 ) {
                                setTimeout(() => ammo.selectAll('.user').each(el => el.classList.remove('active')), 300);
                                seq.resolve();
                            }
                            resolve();
                        }, 150);
                    });
                })
                .chain(seq => {
                    template.updateVal('Eric', 'name', 'Eric P. Cartman');
                    template.updateVal('Kyle', 'name', 'Kyle Broflovski');
                    template.updateAttr('Eric', 'thumbnail', './assets/img/satan.png');
                    template.updateAttr('Kyle', 'thumbnail', './assets/img/satan.png');
                    template.updateVal('Stan', 'age', 111);
                    seq.resolve();
                })
                .execute();
        });

    app.callNode('events', 'onReady',
        app.getNode('actions', 'init'));

})(ammo);
