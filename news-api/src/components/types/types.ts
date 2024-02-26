interface GetDateStatus {
    status: 'ok';
    totalResults?: number;
}

type GetDateArray<T extends { type: 'news' | 'sourses' }> = T extends { type: 'news' }
    ? { articles: NewsType[] }
    : T extends { type: 'sourses' }
      ? { sources: SourseType[] }
      : never;

export type GetDateFull<T extends { type: 'news' | 'sourses' }> = GetDateStatus & GetDateArray<T>;

export type TryNull<T> = T | null;

export type NewsType = {
    author: TryNull<string>;
    content: TryNull<string>;
    description: TryNull<string>;
    publishedAt: TryNull<string>;
    source: { id: string; name: TryNull<string> };
    title: TryNull<string>;
    url: string;
    urlToImage: TryNull<string>;
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
    sources?: string;
    [key: string]: string;
}

export type EndpointType = {} | "sources" | "everything";
