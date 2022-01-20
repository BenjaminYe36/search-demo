import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: "",
            selectVal: "name",
            isLoading: false,
            searchResult: null,
        };
    }

    getSearchResult = async () => {
        try {
            let url = "https://api.open5e.com/monsters/?search=" + this.state.inputVal +
                '&ordering=' + this.state.selectVal;

            this.setState({
                isLoading: true,
            });

            let responsePromise = fetch(url);
            let response = await responsePromise;

            this.setState({
                isLoading: false,
            });

            if (!response.ok) {
                alert("Error! response not ok " + response.status);
                return;
            }

            let parsedObject = await response.json();

            if (parsedObject === null) {
                alert("Error! response json should not be null");
                return;
            }

            console.log(parsedObject);
            this.setState({
                searchResult: parsedObject,
            });

        } catch (e) {
            alert("There was an error fetching from the api server.");
            console.log(e);
            this.setState({
                isLoading: false,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectVal !== this.state.selectVal) {
            await this.getSearchResult();
        }
    }

    handleInputChange = (event) => {
        this.setState({
            inputVal: event.target.value,
        });
    }

    handleSelectChange = async (event) => {
        this.setState({
            selectVal: event.target.value,
        });
    }

    handleClick = async () => {
        if (this.state.inputVal.trim() === "") {
            alert("Search keyword can't be empty!");
            return;
        }
        await this.getSearchResult();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-primary">
                    <span className="navbar-brand">Search Demo</span>
                </nav>
                <div className="input-group row p-2">
                    <input type="text" className="form-control"
                           placeholder="keyword for monster name"
                           value={this.state.isLoading ? "Loading..." : this.state.inputVal}
                           onChange={this.handleInputChange}/>
                    <select value={this.state.selectVal} onChange={this.handleSelectChange}>
                        <option value="name">Order By Name (ASC)</option>
                        <option value="-name">Order By Name (DESC)</option>
                    </select>
                    <button className="input-group-btn btn btn-primary " onClick={this.handleClick}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
                <div>
                    {this.state.searchResult === null ? null : (
                        <div>
                            {this.state.searchResult.count === 0 ? <span>Nothing found for this query</span> :
                                <div>
                                    <span>Showing {this.state.searchResult.count} result(s).</span>
                                    <table className="table table-light">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Type</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.searchResult.results.map((info, idx) =>
                                            <tr>
                                                <td>{idx + 1}</td>
                                                <td>{info.name}</td>
                                                <td>{info.size}</td>
                                                <td>{info.type}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
