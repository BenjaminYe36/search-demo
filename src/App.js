import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import './App.css'
import TableData from "./TableData";

const App = () => {
    // input box value
    const [inputVal, setInputVal] = useState("");
    // query that used for search
    const [query, setQuery] = useState(null);
    // ordering selection
    const [selectVal, setSelectVal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [needNewSearch, setNeedNewSearch] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    // message object has the format of {type: "success" or "error", msg?: "..."}
    const [message, setMessage] = useState(null);

    const getSearchResult = () => {
        const apiUrl = new URL("https://api.open5e.com/monsters");
        apiUrl.searchParams.append("search", inputVal);
        // only apply sorting if the user selects something other than default no sorting
        if (selectVal.length > 0) {
            apiUrl.searchParams.append("ordering", selectVal);
        }
        // fetch the api endpoint to get search results
        return fetch(apiUrl.href)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Response status is not ok, is ${response.status} instead`);
                }
                return response.json();
            });
    };

    // re-fetch api when the selected sorting order is changed
    useEffect(() => {
        // use boolean and clean up function to avoid potential (rare) race conditions
        let active = true;
        // exclude initial calls to useEffect, only fetch from API when later the query is set
        if (!query || !needNewSearch) {
            return;
        }
        console.log("effect runs");
        setMessage(null);
        setIsLoading(true);
        getSearchResult()
            .then((json) => {
                if (active) {
                    setSearchResult(json);
                    setMessage({type: "success"});
                    setIsLoading(false);
                }
            })
            .catch((e) => {
                if (active) {
                    console.log(e);
                    setMessage({type: "error", msg: e.message});
                }
            })
            .finally(() => {
                setNeedNewSearch(false);
            });
        // clean up function
        return () => {
            active = false;
        };
    }, [selectVal, query, needNewSearch]);

    const handleInputChange = (event) => {
        setInputVal(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectVal(event.target.value);
        setNeedNewSearch(true);
    };

    const handleSearchClick = () => {
        if (inputVal.trim() === "") {
            setMessage({type: "error", msg: "Query string can't be empty, please enter some and search again."});
            return;
        }
        // trigger useEffect that has clean up (cancel old requests),
        // instead of calling async fetch in onClick, which could lead to race condition issues
        setQuery(inputVal);
        setNeedNewSearch(true);
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-darker-blue">
                <span className="navbar-brand">Search Demo</span>
            </nav>
            <div className="inner-container">
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" className="form-control"
                               placeholder="search keyword for monster name"
                               value={inputVal}
                               autoFocus
                               onChange={handleInputChange}/>
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" value={selectVal} onChange={handleSelectChange}
                                aria-label="select ordering">
                            <option value="">No Specific Ordering</option>
                            <option value="name">Order By Name (ASC)</option>
                            <option value="-name">Order By Name (DESC)</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary search-btn bg-darker-blue" onClick={handleSearchClick}
                                type="button" aria-label="search button">
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <TableData isLoading={isLoading} searchResult={searchResult} message={message}/>
                </div>
            </div>
        </div>
    );
};

export default App;
