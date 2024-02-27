import News from './news/news';
import Sources from './sources/sources';
import { GetDateFull, NewsType, SourseType, TryNull } from '../types/types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public closeOpenNews(): void {
        const newsClose: TryNull<HTMLElement> = document.querySelector('.header__close');
        const newsContainer: TryNull<HTMLElement> = document.querySelector('.news');
        const sourcesContainer: TryNull<HTMLElement> = document.querySelector('.sources');

        console.log(newsClose?.classList.contains('header__close_active'));
        if (newsClose?.classList.contains('header__close_active')) {
            console.log(newsClose?.classList.contains('header__close_active'));
            sourcesContainer?.classList.remove('sources_none');
            newsClose?.classList.remove('header__close_active');
            newsContainer?.classList.add('news_disable');

            return;
        }

        sourcesContainer?.classList.add('sources_none');
        newsClose?.classList.add('header__close_active');
        newsContainer?.classList.remove('news_disable');
    }

    public drawNews(data: GetDateFull<{ type: 'news' }> | undefined) {
        if (data === undefined) return;

        this.closeOpenNews();

        const values: NewsType[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: GetDateFull<{ type: 'sources' }> | undefined) {
        if (data === undefined) return;

        const values: SourseType[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
