"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListNegociacoes = function () {
    function ListNegociacoes() {
        _classCallCheck(this, ListNegociacoes);

        this._negociacoes = [];
    }

    _createClass(ListNegociacoes, [{
        key: "_adicionaNegociacao",
        value: function _adicionaNegociacao(negociacao) {
            this._negociacoes.push(negociacao);
        }
    }, {
        key: "_esvaziaLista",
        value: function _esvaziaLista() {
            this._negociacoes = [];
        }
    }, {
        key: "ordena",
        value: function ordena(criterio) {
            this._negociacoes.sort(criterio);
        }
    }, {
        key: "inverteOrdem",
        value: function inverteOrdem() {
            this._negociacoes.reverse();
        }
    }, {
        key: "negociacoes",
        get: function get() {
            return [].concat(this._negociacoes);
        }
    }, {
        key: "volumeTotal",
        get: function get() {
            return this._negociacoes.reduce(function (total, n) {
                return total += n.volume;
            }, 0);
        }
    }]);

    return ListNegociacoes;
}();
//# sourceMappingURL=ListNegociacoes.js.map