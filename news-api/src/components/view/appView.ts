import News from './news/news';
import Sources from './sources/sources';
import { GetDateFull, NewsType, SourseType } from '../types/types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: GetDateFull<{ type: 'news' }>) {
        const values: NewsType[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: GetDateFull<{ type: 'sourses' }>) {
        const values: SourseType[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
