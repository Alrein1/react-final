import { useGps } from '@/contexts/GpsContext';
import React, { useState } from 'react';
interface Props {
    clearSelection: () => void;
}

export const Filter: React.FC<Props> = ({ ...props }) => {
    const [minLocationsCount, setMinLocationsCount] = useState<number>(0);
    const [minDuration, setMinDuration] = useState<number>(0);
    const [minDistance, setMinDistance] = useState<number>(0);
    const [fromDateTime, setFromDateTime] = useState<string | undefined>('');
    const [toDateTime, setToDateTime] = useState<string | undefined>('');
    const gps = useGps();
    const handleSubmit = async () => {
        await gps.filterGpsSessions({
            minLocationsCount,
            minDuration,
            minDistance,
            fromDateTime,
            toDateTime,
        });
        props.clearSelection();
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <div className="flex flex-col p-1 m-1">
                <div className="flex flex-col">
                    <label>Minimum number of locations</label>
                    <input
                        type="number"
                        value={minLocationsCount}
                        onChange={(e) =>
                            setMinLocationsCount(parseInt(e.target.value))
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <label>Minimum duration</label>
                    <input
                        type="number"
                        value={minDuration}
                        onChange={(e) =>
                            setMinDuration(parseInt(e.target.value))
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <label>Minimum distance</label>
                    <input
                        type="number"
                        value={minDistance}
                        onChange={(e) =>
                            setMinDistance(parseInt(e.target.value))
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <label>From date</label>
                    <input
                        type="date"
                        value={fromDateTime}
                        onChange={(e) =>
                            setFromDateTime(e.target.valueAsDate?.toISOString())
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <label>To date</label>
                    <input
                        type="date"
                        value={toDateTime}
                        onChange={(e) =>
                            setToDateTime(e.target.valueAsDate?.toISOString())
                        }
                    />
                </div>
                <div className="flex flex-col mt-1">
                    <button className="text-start w-full border-2 rounded border-white hover:border-cyan-400">
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
};
