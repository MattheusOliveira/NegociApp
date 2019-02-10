class DateUtils {

    constructor() {
        throw new Error('Não é possível instanciar uma data!');
    }

    static dateToText(date) {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }

    static textToDate(text) {
        if(!/\d{2}\/\d{2}\/\d{4}/.test(text))
            throw new Error('Data deve ser no padrão YYYY-MM-DD');

        return new Date(...text
            .split('/')
            .reverse()
            .map((item,indice) => item - indice % 2)
        );
    }
}
