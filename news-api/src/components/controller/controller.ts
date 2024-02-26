import AppLoader from './appLoader';
import { GetDateFull, OptionType, EndpointType } from '../types/types';

class AppController extends AppLoader {
    getSources(callback: (data?: GetDateFull<{ type: 'sources' }>) => void): void {
        super.getResp(
            {
                endpoint: 'sources' as EndpointType,
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: GetDateFull<{ type: 'news' }>) => void): void {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId !== null) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything' as EndpointType,
                            _options: {
                                sources: sourceId as string,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as Element;
        }
    }
}

export default AppController;
