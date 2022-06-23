import InfoBox from './InfoBox';
import AboutModal from './AboutModal';

function LeftPanel(props) {
    const { currentWeather, datetime, locationData, units, updatedAt } = props;
    return (
        <div className="col-lg-3 bg-dark text-white">
            <InfoBox
                locationData={locationData}
                datetime={datetime}
                currentWeather={currentWeather}
                units={units}
            />
            <div className='text-center'>
                <button className='btn btn-info m-2' data-bs-toggle="modal" data-bs-target="#aboutModal">About</button>
            </div>
            <AboutModal
                updatedAt={updatedAt}
            />
        </div>
    )
};

export default LeftPanel;