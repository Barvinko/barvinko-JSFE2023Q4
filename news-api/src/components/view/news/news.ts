import './news.css';
import { NewsType, TryNull } from '../../../library/types';

class News {
    private static readonly MAX_NEWS_ITEMS: number = 10;

    private applyAltClass(newsItem: TryNull<Element>, idx: number): void {
        if (idx % 2 && newsItem) newsItem.classList.add('alt');
    }

    private applyMetaPhotoStyle(metaFoto: TryNull<HTMLElement>, url: string): void {
        if (metaFoto) metaFoto.style.backgroundImage = `url(${url || 'img/news_placeholder.jpg'})`;
    }

    private applyMetaAuthor(metaAvtor: TryNull<HTMLElement>, nameAvtor: string, nameSourse: string): void {
        if (metaAvtor) metaAvtor.textContent = nameAvtor || nameSourse;
    }

    private applyMetaDate(metaData: TryNull<HTMLElement>, publishedAt: string): void {
        if (metaData) metaData.textContent = publishedAt.slice(0, 10).split('-').reverse().join('-');
    }

    private applyDescription(description: TryNull<HTMLElement>, content: string): void {
        if (description) description.textContent = content;
    }

    private applyReadMoreLink(readMore: TryNull<HTMLElement>, url: string): void {
        if (readMore) readMore.setAttribute('href', url);
    }

    public draw(data: NewsType[]): void {
        const news =
            data.length >= News.MAX_NEWS_ITEMS
                ? data.filter((_item: NewsType, idx: number) => idx < News.MAX_NEWS_ITEMS)
                : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as TryNull<HTMLTemplateElement>;
        if (!newsItemTemp) {
            console.error("Don't have template for news` items");
            return;
        }
        news.forEach((item: NewsType, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as TryNull<HTMLElement>;
            if (!newsClone) {
                console.error('Failed to clone source item template.');
                return;
            }

            const newsItem: TryNull<Element> = newsClone.querySelector('.news__item');

            this.applyAltClass(newsItem, idx);

            this.applyMetaPhotoStyle(
                newsClone.querySelector('.news__meta-photo') as TryNull<HTMLElement>,
                item.urlToImage
            );

            this.applyMetaAuthor(
                newsClone.querySelector('.news__meta-author') as TryNull<HTMLElement>,
                item.author,
                item.source.name
            );

            this.applyMetaDate(newsClone.querySelector('.news__meta-date') as TryNull<HTMLElement>, item.publishedAt);

            this.applyDescription(
                newsClone.querySelector('.news__description-title') as TryNull<HTMLElement>,
                item.title
            );
            this.applyDescription(
                newsClone.querySelector('.news__description-source') as TryNull<HTMLElement>,
                item.source.name
            );
            this.applyDescription(
                newsClone.querySelector('.news__description-content') as TryNull<HTMLElement>,
                item.description
            );

            this.applyReadMoreLink(newsClone.querySelector('.news__read-more a') as TryNull<HTMLElement>, item.url);

            fragment.append(newsClone);
        });

        const newsElement: TryNull<HTMLElement> = document.querySelector('.news');
        if (!newsElement) {
            console.error('News element not found.');
            return;
        }
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
