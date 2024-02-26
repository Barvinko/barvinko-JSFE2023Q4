import { GetDateFull, OptionType, EndpointType} from '../types/types';

class Loader {
    private _baseLink: string;
    private _options: OptionType;

    constructor(_baseLink: string, _options: OptionType) {
        this._baseLink = _baseLink;
        this._options = _options;
    }

    getResp(
        { endpoint = {}, _options = {} },
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, _options);
    }

    errorHandler(res: Response): Response {
        console.log(res);
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(_options: OptionType, endpoint: EndpointType): string {
        const urlOptions: OptionType = { ...this._options, ..._options };
        console.log(urlOptions)
        let url: string = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: 'GET' | 'POST', endpoint: EndpointType, callback: Function, _options: OptionType = {}): void {
        fetch(this.makeUrl(_options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: GetDateFull<{type: 'news' | 'sourses'}>) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
