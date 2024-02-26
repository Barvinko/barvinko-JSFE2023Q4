interface GetDateStatus {
    status: 'ok';
    totalResults?: number;
}

type GetDateArray<T extends { type: 'news' | 'sources' }> = T extends { type: 'news' }
    ? { articles: NewsType[] }
    : T extends { type: 'sources' }
      ? { sources: SourseType[] }
      : never;

export type GetDateFull<T extends { type: 'news' | 'sources' }> = GetDateStatus & GetDateArray<T>;

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

export type EndpointType = {} | 'sources' | 'everything';
