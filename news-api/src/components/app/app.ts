import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Footer from '../footer/footer';
import { GetDateFull, TryNull } from '../types/types';

class App {
    private controller: AppController;
    private view: AppView;
    private footer: Footer;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.footer = new Footer();
    }

    public start(): void {
        const newsClose: TryNull<HTMLElement> = document.querySelector('.header__close')
            ? document.querySelector('.header__close')
            : null;
        newsClose?.addEventListener('click', this.view.closeOpenNews);

        const sourceElement: TryNull<HTMLElement> = document.querySelector('.sources');
        if (!sourceElement) return;

        this.footer.createLogo();
        sourceElement.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: GetDateFull<{ type: 'news' }> | undefined) => this.view.drawNews(data))
        );
        this.controller.getSources((data: GetDateFull<{ type: 'sources' }> | undefined): void =>
            this.view.drawSources(data)
        );
    }
}

export default App;
