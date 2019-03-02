'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListNegociacoes(), new NegociacoesView($('#negociacoes-view')), '_adicionaNegociacao', '_esvaziaLista', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-view')), 'texto');
        this.service = new NegociacaoService();
        this._showNegociacoes();
    }

    _createClass(NegociacaoController, [{
        key: 'adiciona',
        value: function adiciona(event) {
            var _this = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();
            this.service.cadastraNegociacao(negociacao).then(function (mensagem) {
                _this._mensagem.texto = mensagem;
                _this._listaNegociacoes._adicionaNegociacao(negociacao);
                _this._cleanForm();
            }).catch(function (error) {
                return _this._mensagem.texto = error;
            });
        }
    }, {
        key: 'importarNegociacao',
        value: function importarNegociacao() {
            var _this2 = this;

            //then -> passando lista de negociações que não foram importadas.
            this.service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this2._listaNegociacoes._adicionaNegociacao(negociacao);
                    _this2._mensagem.texto = 'Negociacoes importadas com sucesso!';
                });
            }).catch(function (error) {
                return _this2._mensagem.texto = error;
            });
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new Negociacao(DateUtils.textToDate(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
        }
    }, {
        key: '_showNegociacoes',
        value: function _showNegociacoes() {
            var _this3 = this;

            this.service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this3._listaNegociacoes._adicionaNegociacao(negociacao);
                });
            }).catch(function (error) {
                return console.log(error);
            });

            setInterval(function () {
                _this3.importarNegociacao();
            }, 3000);
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this4 = this;

            this.service.apaga().then(function (mensagem) {
                _this4._mensagem.texto = mensagem;
                _this4._listaNegociacoes._esvaziaLista();
            }).catch(function (error) {
                return _this4._mensagem.texto = error;
            });
        }
    }, {
        key: '_cleanForm',
        value: function _cleanForm() {
            this._inputData.value = '';
            this._inputQuantidade.value = '';
            this._inputValor.value = '';
            this._inputData.focus();
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this._ordemAtual === coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            }
            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map