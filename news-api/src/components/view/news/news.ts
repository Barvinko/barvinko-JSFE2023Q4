import './news.css';
import { NewsType, TryNull } from '../../types/types';

class News {
    draw(data: NewsType[]): void {
        console.log(data);
        const news = data.length >= 10 ? data.filter((_item: NewsType, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as TryNull<HTMLTemplateElement>;
        if (!newsItemTemp) {
            return;
        }
        news.forEach((item: NewsType, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as TryNull<HTMLElement>;
            if (!newsClone) {
                return;
            }

            const newsItem: TryNull<Element> = newsClone.querySelector('.news__item');

            if (idx % 2 && newsItem) newsItem.classList.add('alt');

            const newsMetaPhoto: TryNull<HTMLElement> = newsClone.querySelector(
                '.news__meta-photo'
            ) as TryNull<HTMLElement>;

            if (newsMetaPhoto) {
                newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const newsMetaAuthor: TryNull<HTMLElement> = newsClone.querySelector('.news__meta-author');
            if (newsMetaAuthor) {
                newsMetaAuthor.textContent = item.author || item.source.name;
            }

            const newsMetaDate: TryNull<HTMLElement> = newsClone.querySelector('.news__meta-date');
            if (newsMetaDate) {
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const newsDescriptionTitle: TryNull<HTMLElement> = newsClone.querySelector('.news__description-title');
            if (newsDescriptionTitle) {
                newsDescriptionTitle.textContent = item.title;
            }

            const newsDescriptionSource: TryNull<HTMLElement> = newsClone.querySelector('.news__description-source');
            if (newsDescriptionSource) {
                newsDescriptionSource.textContent = item.source.name;
            }

            const newsDescriptionContent: TryNull<HTMLElement> = newsClone.querySelector('.news__description-content');
            if (newsDescriptionContent) {
                newsDescriptionContent.textContent = item.description;
            }

            const newsReadMoreLink: TryNull<HTMLElement> = newsClone.querySelector('.news__read-more a');
            if (newsReadMoreLink) {
                newsReadMoreLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsElement: TryNull<HTMLElement> = document.querySelector('.news');
        if (!newsElement) {
            return;
        }
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
