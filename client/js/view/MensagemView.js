class MensagemView extends View {

    constructor(selector) {
        super(selector);
    }

    template(model) {
        return model.texto ?`<p class="alert alert-info">${model.texto}</p>` :`<p></p>`
    }
}
