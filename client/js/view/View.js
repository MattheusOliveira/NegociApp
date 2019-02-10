class View {

    constructor(selector) {
        this._selector = selector;
    }

    template() {
        throw new Error('O método template deve sem implementado');
    }

    _update(model) {
        this._selector.innerHTML = this.template(model);
    }
}
