'use client';

import {
    deleteGpsSessionApi,
    filterSessionsApi,
    getAllGpsSessionsApi,
    getGpsSessionsApi,
    getGpsSessionTypesApi,
    getLocationsBySessionId,
    postGpsSessionApi,
    putGpsSessionApi,
} from '@/api';
import {
    GpsLocation,
    GpsLocationType,
    GpsSession,
    GpsSessionType,
    SessionPostFormat,
    SessionPutFormat,
    SessionSearchParams,
} from '@/types';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useAuth } from './AuthContext';

type GpsContextType = {
    gpsSessions: GpsSession[];
    gpsSessionTypes: GpsSessionType[];
    gpsLocations: GpsLocation[];
    gpsLocationTypes: GpsLocationType[];
    selectedSession: GpsSession | null;
    onlyUserSessions: boolean;
    setOnlyUserSessions: React.Dispatch<React.SetStateAction<boolean>>;
    getGpsLocations: () => Promise<boolean>;
    filterGpsSessions: (params: SessionSearchParams) => Promise<boolean>;
    searchSessions: (name: string) => void;
    getGpsLocationTypes: () => void;
    clearFilters: () => void;
    setSelectedSession: React.Dispatch<React.SetStateAction<GpsSession | null>>;
    getGpsSessionTypes: () => Promise<boolean>;
    getAllGpsSessions: () => Promise<boolean>;
    getGpsSessions: () => Promise<boolean>;
    postGpsSession: (session: SessionPostFormat) => Promise<boolean>;
    putGpsSession: (session: SessionPutFormat) => Promise<boolean>;
    deleteGpsSession: (id: string) => Promise<boolean>;
};

const GpsContext = createContext<GpsContextType | undefined>(undefined);

export const GpsProvider = ({ children }: { children: ReactNode }) => {
    const [gpsSessions, setGpsSessions] = useState<GpsSession[]>([]);
    const [gpsSessionTypes, setGpsSessionTypes] = useState<GpsSessionType[]>(
        []
    );
    const [selectedSession, setSelectedSession] = useState<GpsSession | null>(
        null
    );
    const [gpsLocationTypes, setGpsLocationTypes] = useState<GpsLocationType[]>(
        []
    );
    const [onlyUserSessions, setOnlyUserSessions] = useState<boolean>(false);
    const [gpsLocations, setGpsLocations] = useState<GpsLocation[]>([]);
    const user = useAuth();

    const getGpsSessionTypes = async () => {
        const sessionTypes = await getGpsSessionTypesApi();
        if (sessionTypes) {
            setGpsSessionTypes(sessionTypes);
            return true;
        }
        return false;
    };

    const matchSessionTypesWithId = async () => {
        if (!gpsSessionTypes) {
            const types = await getGpsSessionTypesApi();
            setGpsSessionTypes(types);
        }
        for (const gpsSession of gpsSessions) {
            const gpsSessionTypeId = gpsSessionTypes.find(
                (type) => type.name === JSON.parse(gpsSession.gpsSessionType).en
            )?.id;
            if (gpsSessionTypeId) {
                gpsSession.gpsSessionTypeId = gpsSessionTypeId;
            }
        }
    };

    const getAllGpsSessions = async (): Promise<boolean> => {
        const gpsSessions: GpsSession[] = await getAllGpsSessionsApi();
        if (gpsSessions) {
            setGpsSessions(gpsSessions);
            return true;
        }
        return false;
    };

    const getGpsSessions = async (): Promise<boolean> => {
        const userName = `${user.user?.firstName} ${user.user?.lastName}`;
        let userSessions: string[] = [];
        if (typeof window !== 'undefined') {
            userSessions = JSON.parse(localStorage.getItem(userName) ?? '[]');
        }

        if (!(userSessions.length > 0)) {
            setGpsSessions([]);
            return false;
        }

        const sessions = await getGpsSessionsApi(userSessions);
        if (sessions) {
            setGpsSessions(sessions);
            matchSessionTypesWithId();
            return true;
        }
        return false;
    };

    const postGpsSession = async (session: SessionPostFormat) => {
        if (!user.user?.firstName) {
            console.log('Aaaa');
        }
        const token = user.user!.token;
        const id = await postGpsSessionApi(session, token);
        if (id && typeof window !== 'undefined') {
            const userName = `${user.user?.firstName} ${user.user?.lastName}`;
            const userSessions: string[] = JSON.parse(
                localStorage.getItem(userName) ?? '[]'
            );
            userSessions.push(id);
            localStorage.setItem(userName, JSON.stringify(userSessions));
            return true;
        }
        return false;
    };

    const putGpsSession = async (session: SessionPutFormat) => {
        const token = user.user!.token;
        const success = await putGpsSessionApi(session, token);
        return success;
    };

    const deleteGpsSession = async (id: string) => {
        const token = user.user!.token;
        const success = await deleteGpsSessionApi(id, token);
        if (success && typeof window !== 'undefined') {
            const userName = `${user.user!.firstName} ${user.user!.lastName}`;
            const stored = localStorage.getItem(userName);
            if (stored) {
                let userSessions: string[] = JSON.parse(stored);
                userSessions = userSessions.filter(
                    (sessionId) => sessionId !== id
                );
                localStorage.setItem(userName, JSON.stringify(userSessions));
            }
            setGpsSessions((prev) =>
                prev.filter((session) => session.id !== id)
            );
            return true;
        }
        return false;
    };

    const getGpsLocations = async (): Promise<boolean> => {
        if (selectedSession) {
            const res = await getLocationsBySessionId(selectedSession.id);
            setGpsLocations(res);
            return true;
        }
        return false;
    };

    const filterGpsSessions = async (
        params: SessionSearchParams
    ): Promise<boolean> => {
        const sessions = await filterSessionsApi(params);
        if (sessions) {
            setGpsSessions(sessions);
            return true;
        }
        return false;
    };

    const getGpsLocationTypes = async () => {
        const sessionTypes: GpsLocationType[] = await getGpsSessionTypesApi();
        if (sessionTypes) {
            setGpsLocationTypes(sessionTypes);
        }
    };

    useEffect(() => {
        getGpsSessionTypes();
        getGpsLocationTypes();
        if (onlyUserSessions) {
            getGpsSessions();
        } else {
            getAllGpsSessions();
        }
        getGpsLocations();
    }, [selectedSession, onlyUserSessions]);

    const searchSessions = (name: string) => {
        const filteredSessions = gpsSessions.filter((session) =>
            session.name.toLowerCase().includes(name.toLowerCase())
        );
        setGpsSessions(filteredSessions);
    };

    const clearFilters = () => {
        getAllGpsSessions();
    };

    return (
        <GpsContext.Provider
            value={{
                onlyUserSessions,
                setOnlyUserSessions,
                gpsSessions,
                getAllGpsSessions,
                gpsSessionTypes,
                selectedSession,
                gpsLocationTypes,
                getGpsLocationTypes,
                filterGpsSessions,
                searchSessions,
                clearFilters,
                gpsLocations,
                getGpsLocations,
                setSelectedSession,
                getGpsSessionTypes,
                getGpsSessions,
                postGpsSession,
                putGpsSession,
                deleteGpsSession,
            }}
        >
            {children}
        </GpsContext.Provider>
    );
};

export const useGps = (): GpsContextType => {
    const context = useContext(GpsContext);
    if (!context) {
        throw new Error('useSession must be used within an SessionProvider');
    }
    return context;
};
