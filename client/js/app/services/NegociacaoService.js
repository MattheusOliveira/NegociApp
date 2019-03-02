'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'cadastraNegociacao',
        value: function cadastraNegociacao(negociacao) {
            return connectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso!';
            }).catch(function (error) {
                console.log(error); //baixo nível
                throw new Error('Não foi possível adicionar a Negociação!');
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return connectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listarTodos();
            }).then(function (negociacoes) {
                return negociacoes;
            }).catch(function (error) {
                console.log(error);
                throw new Error('Não foi possível listar as negociações');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return connectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagarTodos();
            }).then(function () {
                return 'Mensagens apagadas com sucesso!';
            }).catch(function (error) {
                console.log(error);
                throw new Error('Não foi possível apagar as negociações');
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacaoService) {
                    return !listaAtual.some(function (negociacao) {
                        return negociacao.isEquals(negociacaoService);
                    });
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error('Erro ao importar as negociações');
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.getNegociacoesDaSemana(), this.getNegociacoesAnterior(), this.getNegociacoesRetrasada()]).then(function (negociacoes) {
                return negociacoes.reduce(function (arrayFlatten, array) {
                    return arrayFlatten.concat(array);
                }, []).map(function (dado) {
                    return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
                });
            }).catch(function (erro) {
                return console.log(erro);
            });
        }
    }, {
        key: 'getNegociacoesDaSemana',
        value: function getNegociacoesDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this._http.get('negociacoes/semana').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                    reject('Não foi possível obter as negociações da semana');
                }).catch(function (erro) {
                    console.log(erro);
                });
            });
        }
    }, {
        key: 'getNegociacoesAnterior',
        value: function getNegociacoesAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                    reject('Não foi possível obter as negociações da semana');
                }).catch(function (erro) {
                    console.log(erro);
                });
            });
        }
    }, {
        key: 'getNegociacoesRetrasada',
        value: function getNegociacoesRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                    reject('Não foi possível obter as negociações da semana');
                }).catch(function (erro) {
                    console.log(erro);
                });
            });
        }
    }]);

    return NegociacaoService;
}();

/*Error-firts calbacak se tiver sucesso recebe o primeiro parametro null para indicar que
    não teve erro e no segundo parametro o retorno.*/
//# sourceMappingURL=NegociacaoService.js.map