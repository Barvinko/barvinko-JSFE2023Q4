import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { GetDateFull } from '../types/types';

class App {
    public controller: any;
    public view: any;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) =>
                this.controller.getNews(e, (data: GetDateFull<{ type: 'news' }>) => this.view.drawNews(data))
            );
        this.controller.getSources((data: GetDateFull<{ type: 'sourses' }>) => this.view.drawSources(data));
    }
}

export default App;
