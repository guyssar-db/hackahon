import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

const http = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});
export { http };
export type { AxiosResponse, AxiosError };
