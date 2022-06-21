function LeftPanel(props) {
    const { currentWeather, locationData } = props;
    return (
        <div className="col-lg-3 bg-dark text-white">
            <p>{locationData.city}</p>
            <p>{locationData.region}</p>
            <p>{locationData.country}</p>
        </div>
    )
};

export default LeftPanel;