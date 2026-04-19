const DEFAULT_API_BASE_URL = 'https://odooxnmit-61i1.onrender.com/api';

const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = (envBaseUrl && envBaseUrl.length > 0 ? envBaseUrl : DEFAULT_API_BASE_URL).replace(/\/+$/, '');

export const buildApiUrl = (path: string) => `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
