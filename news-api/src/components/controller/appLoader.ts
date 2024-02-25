import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL, {
            apiKey: process.env.API_KEY,
        });
        console.log(process.env.API_URL)
    }
}

export default AppLoader;
