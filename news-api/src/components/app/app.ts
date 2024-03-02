import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Footer from '../footer/footer';
import { ApiResponse, TryNull } from '../../library/types';
import { NEWS_TYPE, SOURCES_TYPE } from '../../library/variable';

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
        const newsClose: TryNull<HTMLElement> = document.querySelector('.header__close') || null;
        newsClose?.addEventListener('click', () => this.view.closeOpenNews(this.view));

        const sourceElement: TryNull<HTMLElement> = document.querySelector('.sources');
        if (!sourceElement) {
            console.error("Wasn't found .sources class");
            return;
        }

        this.footer.createLogo();
        sourceElement?.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: ApiResponse<typeof NEWS_TYPE> | undefined) => this.view.drawNews(data))
        );
        this.controller.getSources((data: ApiResponse<typeof SOURCES_TYPE> | undefined): void =>
            this.view.drawSources(data)
        );
    }
}

export default App;
