import { ApiResponse, OptionType, EndpointType } from '../../library/types';
import { NEWS_TYPE, SOURCES_TYPE } from '../../library/variable';

class Loader {
    private _baseLink: string;
    private _options: OptionType;

    constructor(_baseLink: string, _options: OptionType) {
        this._baseLink = _baseLink;
        this._options = _options;
    }

    protected getResp(
        { endpoint = {}, _options = {} }: { endpoint?: EndpointType; _options?: OptionType } = {},
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, _options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(_options: OptionType, endpoint: EndpointType): string {
        const urlOptions: OptionType = { ...this._options, ..._options };
        let url: string = `${this._baseLink}${endpoint}?`;

        const queryString = Object.entries(urlOptions)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        return `${this._baseLink}${endpoint}?${queryString}`;
    }

    private load(
        method: 'GET' | 'POST',
        endpoint: EndpointType,
        callback: (data?: ApiResponse<typeof NEWS_TYPE | typeof SOURCES_TYPE> | undefined) => void,
        _options: OptionType = {}
    ): void {
        fetch(this.makeUrl(_options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json() as Promise<ApiResponse<typeof NEWS_TYPE | typeof SOURCES_TYPE>>)
            .then((data: ApiResponse<typeof NEWS_TYPE | typeof SOURCES_TYPE>) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
