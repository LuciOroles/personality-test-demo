import useSWR, { useSWRConfig } from "swr";


export const useQueryResults = (
    cacheKey: string | null,
    requestInit: RequestInit | undefined = undefined,
) => {
    const { cache } = useSWRConfig();

    const existingData = cache.get(cacheKey);

    const { data, error, isValidating } = useSWR(
        existingData ? null : cacheKey,
        (url: string) => fetch(url,requestInit).then((r) => r.json())
    );

    const result = existingData || data;

    return {
        result,
        error,
        isValidating,
    };
};
