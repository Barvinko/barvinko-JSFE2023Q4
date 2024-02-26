import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { GetDateFull, TryNull } from '../types/types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourceElement: TryNull<HTMLElement> = document.querySelector('.sources');
        if (!sourceElement) return;

        sourceElement.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: GetDateFull<{ type: 'news' }> | undefined) => this.view.drawNews(data))
        );
        this.controller.getSources((data: GetDateFull<{ type: 'sources' }> | undefined): void =>
            this.view.drawSources(data)
        );
    }
}

export default App;
