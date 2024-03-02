import News from './news/news';
import Sources from './sources/sources';
import { ApiResponse, NewsType, SourseType, TryNull } from '../../library/types';
import { NEWS_TYPE, SOURCES_TYPE } from '../../library/variable';

export class AppView {
    private news: News;
    private sources: Sources;
    private _newsClose: TryNull<HTMLDivElement>;
    private _newsContainer: TryNull<HTMLDivElement>;
    private _sourcesContainer: TryNull<HTMLDivElement>;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this._newsClose = document.querySelector('.header__close');
        this._newsContainer = document.querySelector('.news');
        this._sourcesContainer = document.querySelector('.sources');
    }

    public closeOpenNews(view: AppView = this): void {
        if (!view._newsClose) {
            console.error('button "newsClose" not found');
            return;
        }

        const active: boolean = view._newsClose.classList.contains('header__close_active');

        if (view._newsContainer && view._sourcesContainer && view._newsClose) {
            view._sourcesContainer.classList.toggle('sources_none', !active);
            view._newsContainer.classList.toggle('news_disable', active);
            view._newsClose.classList.toggle('header__close_active', !active);
        }
    }

    public drawNews(data: ApiResponse<typeof NEWS_TYPE> | undefined) {
        if (!data) {
            console.error('Articles of API-news not received');
            return;
        }

        this.closeOpenNews();

        const values: NewsType[] = data.articles || [];
        this.news.draw(values);
    }

    public drawSources(data: ApiResponse<typeof SOURCES_TYPE> | undefined) {
        if (!data) {
            console.error('Sources of API-news not received');
            return;
        }

        const values: SourseType[] = data.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
