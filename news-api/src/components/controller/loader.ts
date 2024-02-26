class Loader {
    private _baseLink: string;
    private _options: object;

    constructor(_baseLink: string, _options: object) {
        this._baseLink = _baseLink;
        this._options = _options;
    }

    getResp(
        { endpoint = {}, _options = {} },
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, _options);
    }

    errorHandler(res: Response): Response {
        console.log(res)
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(_options: object, endpoint: object): string {
        const urlOptions: {[key: string]: object} = { ...this._options, ..._options };
        let url = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: "GET" | "POST", endpoint: object, callback: Function, _options = {}): void {
        fetch(this.makeUrl(_options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
