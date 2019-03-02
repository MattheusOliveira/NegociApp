class HttpService {

    _fetchHundler(res) {
        if(!res.ok) //res.ok (status = 200)
            throw new Error(res.statusText);
        return res;

    }

    get(url) {
        return fetch(url)
            .then(res => this._fetchHundler(res))
            .then(res => res.json())
            .catch((error) => console.log(error));
    }

    post(url, dado) {
        return fetch(url, {
            headers: {'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._fetchHundler(res))
    }
}
