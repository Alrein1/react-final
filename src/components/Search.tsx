import { useGps } from '@/contexts/GpsContext';
import React, { useState } from 'react';
interface Props {
    clearSelection: () => void;
}
export const Search: React.FC<Props> = ({ ...props }) => {
    const [name, setName] = useState<string>('');
    const gps = useGps();
    return (
        <div className="flex flex-col p-1 m-1">
            <label>Name</label>
            <input
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <button
                className="mt-1 border-2 p-1 rounded hover:border-cyan-400"
                onClick={() => {
                    gps.searchSessions(name);
                    props.clearSelection();
                }}
            >
                Search
            </button>
        </div>
    );
};
