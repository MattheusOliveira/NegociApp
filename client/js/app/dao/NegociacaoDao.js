'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var request = _this._connection.transaction(_this._store, 'readwrite').objectStore(_this._store).add(negociacao);

                request.onsuccess = function (e) {
                    resolve();
                };

                request.onerror = function (e) {
                    console.log(e.target.error.name);
                    console.log('Não foi possível adicionar a negociação!');
                };
            });
        }
    }, {
        key: 'listarTodos',
        value: function listarTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var cursor = _this2._connection.transaction(_this2._store, 'readwrite').objectStore(_this2._store).openCursor();
                var negociacoes = [];
                cursor.onsuccess = function (e) {
                    var atual = e.target.result; // atual é um ponteiro para cada negociacao salva no BD.

                    if (atual) {
                        var dado = atual.value;
                        negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                        atual.continue(); // iterador para o próximo ponteiro.
                    } else {
                        resolve(negociacoes);
                    }
                };

                cursor.onerror = function (e) {
                    console.log(e.target.error.name);
                    reject(e.target.error.name);
                };
            });
        }
    }, {
        key: 'apagarTodos',
        value: function apagarTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var request = _this3._connection.transaction(_this3._store, 'readwrite').objectStore(_this3._store).clear();

                request.onsuccess = function (e) {
                    resolve('Negociações apagadas com êxito!');
                };
                request.onerror = function (e) {
                    console.log('Não foi possível apagar as negociações!');
                    reject(console.log(e.target.error));
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map