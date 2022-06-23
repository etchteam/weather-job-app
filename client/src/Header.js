function Header(props) {
    const { viewOptions, selectedView, setSelectedView } = props;

    return (
        <ul className='nav justify-content-center nav-tabs mb-0 bg-dark'>
            {Object.entries(viewOptions)
                .map(([key,value]) => {
                    return (
                        <li key={key} className='nav-item'>
                            <button
                                className={`nav-link text-info ${key === selectedView ? 'active' : ''}`}
                                onClick={() => setSelectedView(key)}
                                style={{cursor: "pointer"}}
                            >
                                {value}
                            </button>
                        </li>
                    );
                })
            }
        </ul>
    )
}

export default Header;