class ProxyFactory {

    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if(props.includes(prop) &&
                ProxyFactory.isFunction(target[prop])){

                    return function() {
                        console.log(`Interceptando ${prop}`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) {
                    acao(target);
                }
                return retorno
            }
        });
    }

    static isFunction(functionValidate) {
        return typeof(functionValidate) === typeof(Function);
    }
}
