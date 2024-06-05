import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import './Search.css';

// Component for searching happiness ranks and scores by country
const Search = () => {
    // State variables for country query, row data, and countries list
    const [countryQuery, setCountryQuery] = useState("Afghanistan");
    const [rowData, setRowData] = useState([]);
    const [countries, setCountries] = useState([]);

    // Effect hook to load countries list from JSON
    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await import(`../../data/json/2015.json`);
                const countryData = data.default.map(item => item.Country)
                countryData.sort()
                setCountries(countryData);
            }
            catch (error) {
                console.log("Error loading countries data:", error);
            }
        };
        loadCountries();
    }, []);

    // Effect hook to load data based on selected country
    useEffect(() => {
        const loadData = async () => {
            try {
                const years = ["2019", "2018", "2017", "2016", "2015"];
                const aggregatedData = [];
                
                for (const year of years) {
                    const data = await import(`../../data/json/${year}.json`);
                    const standardizedData = standardiseData(data.default);
                    const filteredData = standardizedData.filter(item => item.country === countryQuery);
                    
                    // Add year to each item and push to aggregatedData
                    filteredData.forEach(item => {
                        item.year = year;
                        aggregatedData.push(item);
                    });
                }
                setRowData(aggregatedData);
            } catch (error) {
                console.log("Error loading JSON data:", error);
                setRowData([]);
            }
        };
        loadData();
    }, [countryQuery]);

    // Function to standardize the data format
    const standardiseData = (data) => {
        return data.map(item => {
            if (item["Overall rank"] !== undefined) {
                return {rank: item["Overall rank"], score: item.Score, country: item["Country or region"]}
            }
            else if (item["Happiness Rank"] !== undefined) {
                return {rank: item["Happiness Rank"], score: item["Happiness Score"], country: item.Country}
            }
            else if (item.Happiness.Rank !== undefined) {
                return {rank: item.Happiness.Rank, score: parseFloat(item.Happiness.Score).toFixed(3), country: item.Country}
            }
            else {
                return item;
            }
        });
    };

    // Column definitions for the AgGridReact component
    const columnDefs = [
        { headerName: 'Year', field: 'year', sortable: true, filter: "agNumberColumnFilter" },
        { headerName: 'Rank', field: 'rank', sortable: true, filter: "agNumberColumnFilter" },
        { headerName: 'Score', field: 'score', sortable: true, filter: "agNumberColumnFilter" }
    ];

    // Function to handle country selection change
    const changeCountry = (event) => {
        setCountryQuery(event.target.value);
    };

    // Render the component
    return (
        <div className="search-container">
          <h1>Happiness Search By Country</h1>
          <p>Happiness Ranks and Scores Over {rowData.length} Years</p>
          <div className="country-selector-container">
            {/* Country selection dropdown */}
            <div className="country-selector">
              <label htmlFor="country">Select Country: </label>
              <select id="country" value={countryQuery} onChange={changeCountry}>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
          {/* AgGridReact component for displaying data */}
          <div className="ag-theme-balham" style={{ height: '350px' }}>
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

export default Search;
