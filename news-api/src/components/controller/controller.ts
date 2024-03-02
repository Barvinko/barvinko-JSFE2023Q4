import AppLoader from './appLoader';
import { ApiResponse, EndpointType } from '../../library/types';
import { NEWS_TYPE, SOURCES_TYPE, EVERYTHING_TYPE } from '../../library/variable';

class AppController extends AppLoader {
    public getSources(callback: (data?: ApiResponse<typeof SOURCES_TYPE>) => void): void {
        super.getResp(
            {
                endpoint: SOURCES_TYPE as EndpointType,
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data?: ApiResponse<typeof NEWS_TYPE>) => void): void {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId !== null) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: EVERYTHING_TYPE as EndpointType,
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
