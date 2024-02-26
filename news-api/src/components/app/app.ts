import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { GetDateFull, TryNull } from '../types/types';

class App {
    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourceElement: TryNull<HTMLElement> = document.querySelector('.sources');
        if (!sourceElement) return;
        // document
        //     .querySelector('.sources')
        sourceElement.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: GetDateFull<{ type: 'news' }> | undefined) => this.view.drawNews(data))
        );
        this.controller.getSources((data: GetDateFull<{ type: 'sources' }> | undefined): void =>
            this.view.drawSources(data)
        );
    }
}

export default App;
