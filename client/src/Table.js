import TableRow from './TableRow';
import TableRowCollapsible from './TableRowCollapsible';

function Table(props) {
    const { selectedView, weatherData, units } = props;

    return (
        <div id="weatherAccordion" className='w-75 mx-auto'>
            {weatherData.map(i => {
                return (
                    <div className='card' key={i.time}>
                        <TableRow weatherData={i} selectedView={selectedView} units={units} />
                        <TableRowCollapsible weatherData={i} units={units} />
                    </div>
                )
            })}
        </div>
    )
};

export default Table;