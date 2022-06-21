function LeftPanel(props) {
    const { currentWeather, datetime, locationData, weatherUnits } = props;
    return (
        <div className="col-lg-3 bg-dark text-white">
            <div className="mt-2">
                <h1 className="display-2 text-center">Weather</h1>
                <div className="card">
                    <div className="card-header text-body">
                        <div className="text-center">
                            {locationData.city}, {locationData.country}
                        </div>
                        <div className="w-100 clearfix">
                            <span className="float-start">
                                {datetime.toLocaleString('en-GB', {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <span className="float-end">
                                {datetime.toLocaleString('en-GB', {
                                    hour: "numeric",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LeftPanel;