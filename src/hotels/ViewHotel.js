import React, { useState, useEffect } from 'react';
import { diffDays, read } from '../actions/hotel';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { getSessionId } from '../actions/stripe.action';



const ViewHotel = () => {
  const [hotel, setHotel] = useState({})
  const [image, setImage] = useState("")
  let { hotelId } = useParams();
  const navigate = useNavigate();
  const {auth} = useSelector((state) => ({...state}))

  useEffect(() => {
    loadSellerHotel()
  }, [])

  const loadSellerHotel = async () => {
    let res = await read(hotelId)
    // console.log("Data", res);

    setHotel(res.data)
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
  }


  const handleClick = async(e)  => {
    e.preventDefault();
    if(!auth) navigate('/login')
    console.log(auth.token, hotelId);
    let res = await getSessionId(auth.token, hotelId);
    console.log("Get Session Id Response", res.data.sessionId);

  }

  return <>
    <div className="container-fluid bg-secondary p-5 text-center">
      <h1>
        {hotel.title}
      </h1>
    </div>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <br />
          <img src={image} alt={hotel.title}
            className='img img-fluid m-2'
          />
        </div>
        <div className="col-md-6">
          <br />
          <b>{hotel.content}</b>
          <p className="alert alert-info mt-3">
            $ {hotel.price}
          </p>

          <p className="card-text">
            <span className="float-right text-primary">
              for {diffDays(hotel.from, hotel.to)}
              {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
            </span>
          </p>

          <p>From <br />
            {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a ")}
          </p>

          <p>To <br />
            {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a ")}
          </p>

          <i> Posted By {hotel.postedBy && hotel.postedBy.name}</i>
          <br />
          <button
          onClick={handleClick}
           className="btn btn-block btn-large btn-primary mt-3"
           >
           {auth && auth.token ? 'Book Now' : "Login to Book"}
          </button>

         
        </div>
      </div>
    </div>
  </>;
};

export default ViewHotel;
