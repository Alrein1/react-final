/** @format */
export interface SessionPostFormat {
    name: string;
    description: string;
    gpsSessionTypeId: string;
    recordedAt: string;
    paceMin: number;
    paceMax: number;
}

export interface SessionPutFormat extends SessionPostFormat {
    id: string;
}

export interface SessionSearchParams {
    minLocationsCount: number | undefined;
    minDuration: number | undefined;
    minDistance: number | undefined;
    fromDateTime: string | undefined;
    toDateTime: string | undefined;
}

export interface GpsSession {
    id: string;
    name: string;
    description: string;
    recordedAt: string;
    duration: number;
    speed: number;
    distance: number;
    climb: number;
    descent: number;
    paceMin: number;
    paceMax: number;
    gpsSessionTypeId: string;
    gpsSessionType: string;
    gpsLocationsCount: 0;
    userFirstLastName: string;
}

export interface GpsSessionType {
    name: string;
    description: string;
    paceMin: number;
    paceMax: number;
    id: string;
}

export interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface GpsLocation {
    id: string;
    recordedAt: string;
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number;
    verticalAccuracy: number;
    appUserId: number;
    gpsSessionId: string;
    gpsLocationTypeId: string;
}

export interface GpsLocationType {
    name: string;
    description: string;
    id: string;
}
