import { useGps } from '@/contexts/GpsContext';
import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { Search } from './Search';
import { GpsSession } from '@/types';
import { SessionDetails } from './SessionDetails';

export const Sidebar = () => {
    const [selection, setSelection] = useState('');
    const [showDetailsFor, setShowDetailsFor] = useState<GpsSession | null>(
        null
    );
    const gps = useGps();

    const clearSelection = () => setSelection('');
    const hideDetails = () => setShowDetailsFor(null);

    return (
        <div className="w-1/4 p-2">
            {selection || showDetailsFor ? (
                <button
                    className="w-full border-2 p-2 rounded text-center hover:border-cyan-400"
                    onClick={() => {
                        setSelection('');
                        hideDetails();
                    }}
                >
                    Back
                </button>
            ) : (
                <div className="flex justify-between gap-2">
                    <div className="flex flex-1 gap-2">
                        <button
                            className="flex-1 border-2 p-2 rounded text-center hover:border-cyan-400"
                            onClick={() => setSelection('filter')}
                        >
                            Filter
                        </button>
                        <button
                            className="flex-1 border-2 p-2 rounded text-center hover:border-cyan-400"
                            onClick={() => setSelection('search')}
                        >
                            Search
                        </button>
                    </div>
                    <button
                        onClick={() => gps.clearFilters()}
                        className="flex-1 border-2 p-2 rounded text-center hover:border-cyan-400"
                    >
                        Clear
                    </button>
                </div>
            )}

            {selection === 'filter' && (
                <Filter clearSelection={clearSelection} />
            )}
            {selection === 'search' && (
                <Search clearSelection={clearSelection} />
            )}

            <div className="flex flex-col items-start max-h-full overflow-y-auto mt-2 space-y-2">
                {!showDetailsFor ? (
                    gps.gpsSessions.map((session) => (
                        <div key={session.id} className="flex gap-2 w-full">
                            <button
                                className="flex-1 border-2 p-2 rounded text-left hover:border-cyan-400"
                                onClick={() => {
                                    gps.setSelectedSession(session);
                                }}
                            >
                                {session.name},{' '}
                                {new Date(session.recordedAt).toLocaleString()}
                            </button>
                            <button
                                className="flex-shrink-0 border-2 p-2 rounded hover:border-cyan-400"
                                onClick={() => setShowDetailsFor(session)}
                            >
                                Details
                            </button>
                        </div>
                    ))
                ) : (
                    <SessionDetails
                        hideDetails={hideDetails}
                        session={showDetailsFor}
                    />
                )}
            </div>
        </div>
    );
};
