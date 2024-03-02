import { NEWS_TYPE, SOURCES_TYPE } from '../library/variable';

interface IApiResponseStatus {
    status: 'ok';
    totalResults?: number;
}

type ApiResponseArray<T extends typeof NEWS_TYPE | typeof SOURCES_TYPE> = T extends typeof NEWS_TYPE
    ? { articles: NewsType[] }
    : T extends typeof SOURCES_TYPE
      ? { sources: SourseType[] }
      : never;

export type ApiResponse<T extends typeof NEWS_TYPE | typeof SOURCES_TYPE> = IApiResponseStatus & ApiResponseArray<T>;

export type TryNull<T> = T | null;

export type NewsType = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
};

export type SourseType = {
    category: string;
    country: TryNull<string>;
    description: TryNull<string>;
    id: string;
    language: TryNull<string>;
    name: TryNull<string>;
    url: string;
};

export type OptionType = {
    [key: string]: string | undefined;
    sources?: string;
};

export type EndpointType = {} | typeof SOURCES_TYPE | typeof NEWS_TYPE;
