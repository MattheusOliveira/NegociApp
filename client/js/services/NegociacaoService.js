class NegociacaoService {

    constructor() {
        this._http = new HttpService();
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
