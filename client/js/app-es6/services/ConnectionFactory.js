var connectionFactory = (function(){

    const stores = ['negociacoes'];
    const version = 10;
    const nameDB = 'aluraframe';
    var connection = null;
    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('Não é possível instanciar essa classe!');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(nameDB, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createObjectStore(e.target.result);
                }

                openRequest.onsuccess = e => {
                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('Você não pode fechar diretamente a conexão');
                        };
                    }
                    resolve(e.target.result);
                }

                openRequest.onerror = e => {
                    reject(e.target.error.name);
                }
            });
        }

        static _createStore(connection) {
            stores.forEach(store => {
                if(connection.ObjectStoreNames.constains(store))
                connection.deleteObjectStore(store);

                connection.createObjectStore(store, {autoIncrement:true});
            });
        }

        static closeConnection() {
            if(connection) {
                close();
                connection = null;
            }
        }

    }
})();
