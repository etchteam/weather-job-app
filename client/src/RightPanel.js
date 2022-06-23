import React, {useState, useEffect } from 'react';
import Header from './Header';
import Table from './Table';

const viewOptions = {
    today: 'Today',
    tomorrow: 'Tomorrow',
    next10: 'Next 10 Days',
};

function RightPanel(props) {
    const { weatherData, units, datetime } = props;

    const [selectedView, setSelectedView ] = useState('today');
    const [timeseries, setTimeseries ] = useState({today: [], tomorrow: [], next10: []});


    useEffect(() => {
        const today = datetime.toISOString().slice(0, 10);
        const tomorrowDate = new Date(datetime)
        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const tomorrow = tomorrowDate.toISOString().slice(0, 10);

        const formattedTimeseries = {today: [], tomorrow: [], next10: []}
        for (const item of weatherData.timeseries) {
            const date = item.time.slice(0, 10);
            if (date === today) {
                formattedTimeseries.today.push(item);
            } else if (date === tomorrow) {
                formattedTimeseries.tomorrow.push(item);
            } else {
                formattedTimeseries.next10.push(item);
            }
        }
        setTimeseries(formattedTimeseries)
    }, [datetime, weatherData])

    return (
        <div className="col-lg-9 bg-info px-0">
            <Header
                viewOptions={viewOptions}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
            />
            <Table 
                selectedView={selectedView}
                weatherData={timeseries[selectedView]}
                units={units}
            />
        </div>
    )
};

export default RightPanel;