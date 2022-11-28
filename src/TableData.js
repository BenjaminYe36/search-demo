import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";


const TableData = (props) => {
    // First check error
    if (props.message?.type === "error") {
        return (
            <span className="error-msg">
                        <FontAwesomeIcon style={{"paddingRight": 5}} icon={faExclamationTriangle}/>
                        ERROR! {props.message.msg}
            </span>
        );
    }
    // Then check loading status
    if (props.isLoading) {
        return (<h3>Loading...</h3>);
    }
    // Then check whether we have valid search result
    if (!props.searchResult) {
        return null;
    }
    // Finally, split on the results count we get
    if (props.searchResult.count === 0) {
        return (<span>Nothing found for this query</span>);
    } else { // has results to render in a table
        return (
            <div>
                <div className="results-line">
                    <span>
                        <FontAwesomeIcon style={{"paddingRight": 5}} icon={faCheckCircle}/>
                        Showing {props.searchResult.count} result(s).
                    </span>
                </div>
                <table className="table table-light table-bordered table-striped data-table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Size</th>
                        <th scope="col">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.searchResult.results.map((info, idx) =>
                        <tr key={info.name}>
                            <td>{idx + 1}</td>
                            <td>{info.name}</td>
                            <td>{info.size}</td>
                            <td>{info.type}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default TableData;