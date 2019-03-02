class NegociacoesView extends View {

    constructor(selector) {
        super(selector);
    }

    template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th onclick="negociacao.ordena('data')">DATA</th>
                        <th onclick="negociacao.ordena('quantidade')">QUANTIDADE</th>
                        <th onclick="negociacao.ordena('valor')">VALOR</th>
                        <th onclick="negociacao.ordena('volume')">VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                    ${model.negociacoes.map( n =>
                         `  <tr>
                                <td>${DateUtils.dateToText(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}
                            </tr>
                        `
                    ).join('')}
                </tbody>
                <tfoot>
                    <td colspan="3"></td>
                    <td colspan="1">${model.volumeTotal}</td>
                </tfoot>
            </table>`
    }
}
