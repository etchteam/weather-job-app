function TableRowCollapsible(props) {
    const { units, weatherData: { time, data } } = props;

    function formatWeatherKey(key) {
        return key.split('_').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');
    }

    return (
        <div id={`collapse${time.replace(/\W/g, '')}`} className="collapse" data-bs-parent="#weatherAccordion">
            <div className="card-body">
                <div className="row">
                    {
                        Object.entries(data.instant.details)
                            .map(([key,value]) => {
                                return (
                                    <div className="col-lg-6 col-sm-12 text-center" key={key}>
                                        {formatWeatherKey(key)}: <b>{value.toString()} {units[key]}</b>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default TableRowCollapsible;