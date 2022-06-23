function AboutModal(props) {
    const { updatedAt } = props;

    return (
        <div className="modal text-body" id="aboutModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">About</h4>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Data last updated at {new Date(updatedAt).toLocaleString('en-GB')}.
                        </p>
                        <p>
                            Geolocation data from <a target='_blank' rel='noreferrer' href='https://ipinfo.io/'>ipinfo.io</a>.
                        </p>
                        <p>
                            Weather data from <a target='_blank' rel='noreferrer' href='https://api.met.no/'>MET Norway</a>,
                            licensed under <a target='_blank' rel='noreferrer' href='https://creativecommons.org/licenses/by/4.0/'>CC BY 4.0</a>.
                        </p>
                        <p>
                            Weather icons from <a target='_blank' rel='noreferrer' href='https://api.met.no/'>MET Norway</a>,
                            licensed under the MIT License (MIT). Copyright {'\u00A9'} 2015-2017.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutModal;