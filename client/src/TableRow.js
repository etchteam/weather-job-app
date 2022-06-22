import WeatherIcon from './WeatherIcon';

function TableRow(props) {
    const { selectedView, units, weatherData: { time, data } } = props;
    const timeObj = new Date(time);

    return (
        <div className='card-header p-0'>
            <a className="btn w-100 collapsed" data-bs-toggle="collapse" href={`#collapse${time.replace(/\W/g, '')}`}>
                <div className='row'>
                    <div className='col'>
                        {selectedView === 'next10' ? `${timeObj.toLocaleString('en-GB', {
                            weekday: "short",
                            day: "numeric",
                        })} - ` : ''}
                        {timeObj.toLocaleString('en-GB', {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </div>
                    <div className='col'>
                        <WeatherIcon 
                        width={30}
                        weatherData={data}
                        />
                    </div>
                    <div className='col'>
                        {Math.round(data.instant.details.air_temperature)}{units.air_temperature}
                    </div>
                </div>         
            </a>
        </div>
    )
}

export default TableRow;