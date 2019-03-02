class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                            .transaction(this._store, 'readwrite')
                            .objectStore(this._store)
                            .add(negociacao);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error.name);
                console.log('Não foi possível adicionar a negociação!');
            }


        })
    }

    listarTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                                .transaction(this._store, 'readwrite')
                                .objectStore(this._store)
                                .openCursor();
            let negociacoes = [];
            cursor.onsuccess = e => {
                let atual = e.target.result; // atual é um ponteiro para cada negociacao salva no BD.

                if(atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue(); // iterador para o próximo ponteiro.
                }
                else {
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error.name);
                reject(e.target.error.name);
            };
        });
    }

    apagarTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                                .transaction(this._store, 'readwrite')
                                .objectStore(this._store)
                                .clear();

            request.onsuccess = e => {
                resolve('Negociações apagadas com êxito!');
            }
            request.onerror = e => {
                console.log('Não foi possível apagar as negociações!');
                reject(console.log(e.target.error));
            }
        });
    }
}
