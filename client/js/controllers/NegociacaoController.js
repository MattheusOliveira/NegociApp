class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListNegociacoes(),
                                 new NegociacoesView($('#negociacoes-view')),
                                '_adicionaNegociacao', '_esvaziaLista', 'ordena','inverteOrdem');

        this._mensagem = new Bind(new Mensagem(),
                                  new MensagemView($('#mensagem-view')),
                                 'texto');
        this._showNegociacoes();
    }

    adiciona(event) {
        event.preventDefault();
        connectionFactory.getConnection().then(connection => {
            let negociacao = this._criaNegociacao();
            new NegociacaoDao(connection)
                .adiciona(negociacao).then(() => {
                    this._listaNegociacoes._adicionaNegociacao(negociacao);
                    this._mensagem.texto = 'Negociação salva com sucesso!';
                    this._cleanForm();
                })
        }).catch(error => this._mensagem.texto = error);
    }

    importarNegociacao() {
        let service = new NegociacaoService();

        Promise.all(
                    [service.getNegociacoesDaSemana(),
                     service.getNegociacoesAnterior(),
                     service.getNegociacoesRetrasada()]
        ).then((negociacoes) => {
            negociacoes
            .reduce((arrayFlatten, array) => arrayFlatten.concat(array),[])
            .forEach( negociacao => this._listaNegociacoes._adicionaNegociacao(negociacao));
            this._mensagem.texto = 'Negociacoes importadas com sucesso!';
        }).catch((error) => {
            this._mensagem.texto = error;
        });
    }
    _criaNegociacao() {
        return new Negociacao(DateUtils.textToDate(this._inputData.value),
        this._inputQuantidade.value, this._inputValor.value);
    }

    _showNegociacoes() {
        connectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listarTodos())
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes._adicionaNegociacao(negociacao))
            });
    }

    apaga() {
        this._listaNegociacoes._esvaziaLista();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
    }

    _cleanForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = '';
        this._inputValor.value = '';
        this._inputData.focus();
    }

    ordena(coluna) {
        if(this._ordemAtual === coluna) {
            this._listaNegociacoes.inverteOrdem();
        }
        else {
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
         }
         this._ordemAtual = coluna;
    }
}
