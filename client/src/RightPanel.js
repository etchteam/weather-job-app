import React, { useState } from 'react';
import Header from './Header';

const viewOptions = {
    today: 'Today',
    tomorrow: 'Tomorrow',
    next10: 'Next 10 Days',
};

function RightPanel(props) {
    const { weatherData } = props;

    const [selectedView, setSelectedView ] = useState('today');

    return (
        <div className="col-lg-9 bg-info px-0">
            <Header
                viewOptions={viewOptions}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
            />
        </div>
    )
};

export default RightPanel;