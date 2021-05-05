import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { apiUrl, fetcher } from '../utils/services';

export const useMySheets = () => {
    const { data, error } = useSWR(`${apiUrl}api/sheets/`, fetcher);
    const [sheets, setSheets] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setSheets(data);
            setIsLoading(false);
        } else {
            setIsLoading(true)
        }
    }, [data])

    return [sheets, setSheets, isLoading];
}