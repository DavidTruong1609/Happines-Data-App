import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import './Rankings.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Badge } from "reactstrap";

// Component for displaying Happiness Rankings
const Rankings = () => {
    // State for storing the selected year and row data
    const [yearQuery, setYearQuery] = useState("2019");
    const [rowData, setRowData] = useState([]);

    // Effect hook to load data based on the selected year
    useEffect(() => {
        const loadData = async () => {
            try {
                // Dynamically import JSON data based on the selected year
                const data = await import(`../../data/json/${yearQuery}.json`);
                // Standardize the data format
                const standardisedData = standardiseData(data.default);
                // Set the row data in the state
                setRowData(standardisedData);
            }
            catch (error) {
                // Log any errors that occur during data loading
                console.log("Error loading JSON data:", error);
                // Reset row data in case of error
                setRowData([]);
            }
        };
        // Call the loadData function
        loadData();
    }, [yearQuery]);

    // Function to standardize the data format
    const standardiseData = (data) => {
        return data.map(item => {
            if (item["Overall rank"] !== undefined) {
                return {...item, rank: item["Overall rank"], score: item.Score, country: item["Country or region"]}
            }
            else if (item["Happiness Rank"] !== undefined) {
                return {...item, rank: item["Happiness Rank"], score: item["Happiness Score"], country: item.Country}
            }
            else if (item.Happiness.Rank !== undefined) {
                return {...item, rank: item.Happiness.Rank, score: item.Happiness.Score, country: item.Country}
            }
            else {
                return item;
            }
        });
    };

    // Column definitions for the AgGridReact component
    const columnDefs = [
        { headerName: 'Rank', field: 'rank', sortable: true, filter: "agNumberColumnFilter" },
        { headerName: 'Country', field: 'country', sortable: true, filter: "agNumberColumnFilter" },
        { headerName: 'Score', field: 'score', sortable: true, filter: "agNumberColumnFilter" }
    ];

    // Function to handle year selection change
    const changeYear = (event) => {
        setYearQuery(event.target.value);
    };

    // Render the component
    return (
        <div className="rankings-container">
            <h1>Happiness Rankings</h1>
            <div className="year-selector-container">
                <div className="badge-container">
                    {/* Display the number of values found */}
                    <Badge color="success">{rowData.length}</Badge> Values Found
                </div>
                {/* Year selection dropdown */}
                <div className="year-selector">
                    <label htmlFor="year">Select Year: </label>
                    <select id="year" value={yearQuery} onChange={changeYear}>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                    </select>
                </div>
            </div>
            {/* AgGridReact component for displaying data */}
            <div className="ag-theme-balham" style={{ height: '650px' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={20}
                />
            </div>
        </div>
    );
};

export default Rankings;
