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
        this.service = new NegociacaoService();
        this._showNegociacoes();
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        this.service.cadastraNegociacao(negociacao).then(mensagem => {
            this._mensagem.texto = mensagem;
            this._listaNegociacoes._adicionaNegociacao(negociacao);
            this._cleanForm();
        }).catch(error => this._mensagem.texto = error);
    }

    importarNegociacao() {
        //then -> passando lista de negociações que não foram importadas.
        this.service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes._adicionaNegociacao(negociacao);
                this._mensagem.texto = 'Negociacoes importadas com sucesso!';
            })).catch(error => this._mensagem.texto = error);
    }
    _criaNegociacao() {
        return new Negociacao(DateUtils.textToDate(this._inputData.value),
        this._inputQuantidade.value, this._inputValor.value);
    }

    _showNegociacoes() {
        this.service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                this._listaNegociacoes._adicionaNegociacao(negociacao))
            ).catch(error => console.log(error));

        setInterval(() => {
            this.importarNegociacao();
        },3000)
    }

    apaga() {
        this.service.apaga()
               .then(mensagem => {
                   this._mensagem.texto = mensagem;
                   this._listaNegociacoes._esvaziaLista();
               }).catch(error => this._mensagem.texto = error);
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
