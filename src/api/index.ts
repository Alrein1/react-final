import axios from 'axios';

import {
    Credentials,
    User,
    GpsSessionType,
    GpsSession,
    SessionPostFormat,
    SessionPutFormat,
    GpsLocation,
    SessionSearchParams,
} from '@/types';

const url = `${process.env.NEXT_PUBLIC_API_URL}`;

export const loginApi = async (credentials: Credentials): Promise<User> => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/Account/Login`,
        {
            ...credentials,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    const { firstName, lastName, token } = res.data;
    return {
        ...credentials,
        firstName,
        lastName,
        token,
    };
};

export const registerApi = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
): Promise<User> => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/Account/Register`,
        {
            email,
            password,
            firstName,
            lastName,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return {
        email,
        password,
        firstName,
        lastName,
        token: res.data.token,
    };
};
export const getGpsSessionByIdApi = async (id: string): Promise<GpsSession> => {
    const res = await axios.get(`${url}/GpsSessions/${id}`);
    return res.data;
};
export const getGpsSessionTypesApi = async (): Promise<GpsSessionType[]> => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/GpsSessionTypes`
    );
    const gpsSessionTypes: GpsSessionType[] = res.data;
    return gpsSessionTypes;
};

export const getAllGpsSessionsApi = async (): Promise<GpsSession[]> => {
    const res = await axios.get(`${url}/GpsSessions`);
    return res.data;
};

export const getGpsSessionsApi = async (
    userSessions: string[]
): Promise<GpsSession[]> => {
    const gpsSessions = await Promise.all(
        userSessions.map(async (id) => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/GpsSessions/${id}`
            );
            return res.data;
        })
    );
    return gpsSessions;
};

export const postGpsSessionApi = async (
    session: SessionPostFormat,
    token: string
): Promise<string> => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/GpsSessions`,
        {
            ...session,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (res.status === 201) {
        return res.data.id;
    }
    return '';
};

export const putGpsSessionApi = async (
    session: SessionPutFormat,
    token: string
): Promise<boolean> => {
    const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/GpsSessions/${session.id}`,
        {
            ...session,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.status === 204;
};

export const deleteGpsSessionApi = async (
    id: string,
    token: string
): Promise<boolean> => {
    const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/GpsSessions/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (res.status === 200) {
        return true;
    }
    return false;
};

export const getLocationsBySessionId = async (
    id: string
): Promise<GpsLocation[]> => {
    const res = await axios.get(`${url}/GpsLocations/Session/${id}`);
    return res.data;
};

export const filterSessionsApi = async (
    params: SessionSearchParams
): Promise<GpsSession[]> => {
    const query = new URLSearchParams();
    if (params.minLocationsCount)
        query.append('minLocationsCount', params.minLocationsCount.toString());
    if (params.minDuration)
        query.append('minDuration', params.minDuration.toString());
    if (params.minDistance)
        query.append('minDistance', params.minDistance.toString());
    if (params.fromDateTime)
        query.append('fromDateTime', params.fromDateTime.toString());
    if (params.toDateTime)
        query.append('toDateTime', params.toDateTime.toString());
    const searchUrl = `${url}/GpsSessions/?${query.toString()}`;
    const res = await axios.get(searchUrl);
    return res.data;
};

export const getGpsLocationTypesApi = async (): Promise<GpsSessionType[]> => {
    const res = await axios.get(`${url}/GpsLocationTypes`);
    return res.data;
};
