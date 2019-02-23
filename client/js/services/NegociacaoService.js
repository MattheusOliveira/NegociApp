class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    cadastraNegociacao(negociacao) {
        return connectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso!')
            .catch(error => {
                console.log(error); //baixo nível
                throw new Error('Não foi possível adicionar a Negociação!')
            });
    }

    lista() {
        return connectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listarTodos())
            .then((negociacoes) => negociacoes)
            .catch((error) => {
                console.log(error);
                throw new Error('Não foi possível listar as negociações')
            });
    }

    apaga() {
        return connectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarTodos())
            .then(() => 'Mensagens apagadas com sucesso!')
            .catch((error) => {
                console.log(error);
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacaoService =>
                    !listaAtual.some(negociacao =>
                       JSON.stringify(negociacao) == JSON.stringify(negociacaoService)))
             ).catch((error) => {
                 console.log(error);
                 throw new Error('Erro ao importar as negociações');
             });
    }

    obterNegociacoes() {
        return Promise.all(
                    [this.getNegociacoesDaSemana(),
                     this.getNegociacoesAnterior(),
                     this.getNegociacoesRetrasada()]
        ).then((negociacoes) => {
            return negociacoes
                .reduce((arrayFlatten, array) => arrayFlatten.concat(array),[])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));
        }).catch(erro => console.log(erro));
    }

    getNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
                 this._http.get('negociacoes/semana').then(negociacoes => {
                     resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),
                        objeto.quantidade, objeto.valor)));
                     reject('Não foi possível obter as negociações da semana')
                 }).catch((erro) => {
                     console.log(erro);
                 })
        });
    }


    getNegociacoesAnterior() {
        return new Promise((resolve, reject) => {
                 this._http.get('negociacoes/anterior').then(negociacoes => {
                     resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),
                        objeto.quantidade, objeto.valor)));
                     reject('Não foi possível obter as negociações da semana')
                 }).catch((erro) => {
                     console.log(erro);
                 })
        });
    }

    getNegociacoesRetrasada() {
        return new Promise((resolve, reject) => {
                 this._http.get('negociacoes/retrasada').then(negociacoes => {
                     resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),
                        objeto.quantidade, objeto.valor)));
                     reject('Não foi possível obter as negociações da semana')
                 }).catch((erro) => {
                     console.log(erro);
                 })
        });
    }
}


/*Error-firts calbacak se tiver sucesso recebe o primeiro parametro null para indicar que
    não teve erro e no segundo parametro o retorno.*/
