import { useEffect, useState } from "react";

export const useHttpResponse = <T,>(
    input: RequestInfo | URL,
    init: RequestInit | undefined
) => {
    const [result, setResult] = useState<T>();
    const [error, setError] = useState<string>();
    const [badRequest, setBadRequest] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        function getData() {
            fetch(input, init)
                .then((res) => {
                    console.log(res, typeof res);
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        setBadRequest(res.statusText || 'Bad request');
                    }
                })
                .then((r) => setResult(result))
                .catch((_error) => {
                    setError(_error.toString())
                }).finally(() => {
                    setLoading(true);
                });
        }
        getData();
    }, [])


    return {
        result,
        error,
        badRequest,
        loading
    }
}