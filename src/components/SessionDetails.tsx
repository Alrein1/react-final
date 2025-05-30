import { useGps } from '@/contexts/GpsContext';
import { GpsSession } from '@/types';
import React from 'react';
interface Props {
    session: GpsSession;
    hideDetails: () => void;
}
export const SessionDetails: React.FC<Props> = ({ ...props }) => {
    const gps = useGps();
    return (
        <div>
            <p>Name: {props.session.name}</p>
            <p>Description: {props.session.description}</p>
            <p>Session type: {JSON.parse(props.session.gpsSessionType).en}</p>
            <p>Min pace: {props.session.paceMin}</p>
            <p>Max pace: {props.session.paceMax}</p>
            <p>Time: {new Date(props.session.recordedAt).toLocaleString()}</p>
            {gps.onlyUserSessions ? (
                <button
                    onClick={() => {
                        gps.deleteGpsSession(props.session.id);
                        props.hideDetails();
                    }}
                    className="w-full border-2 p-2 rounded border-white hover:border-cyan-400"
                >
                    Delete
                </button>
            ) : (
                ''
            )}
        </div>
    );
};
