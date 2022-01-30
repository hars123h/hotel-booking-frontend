import React, {useState, useEffect} from 'react';
import queryString from 'query-string'
import { Link } from 'react-router-dom';
import Search from '../components/forms/Search';
import { searchListing } from '../actions/hotel';
import SmallCard from '../components/cards/SmallCard'


const SearchResult = () => {
    // state
    const [searchLocation, setSearchLocation] = useState("");
    const [searchBed, setSearchBed] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [hotels, setHotels] = useState([]);

    //

    useEffect(() => {
        const {location, date, bed} = queryString.parse(window.location.search);
        // console.table({location, date, bed})
        searchListing({location, date, bed}).then((res) => {
            console.log("SEARCH RESULT", res.data);
            setHotels(res.data)
        })

    }, [window.location.search])



  return <>
  <div className="container-fluid">
      <div className="col">
          <Search />
      </div>
  </div>
  <div className="container">
      <div className="row">
       {
           hotels.map((h) => (
               <SmallCard key={h._id} h={h} />
           ))
       }
      </div>
  </div>
  </>;
};

export default SearchResult;
