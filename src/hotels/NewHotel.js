import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { createHotel } from '../actions/hotel';
import {useSelector} from 'react-redux';
import HotelCreateForm from '../components/forms/HotelCreateForm';




const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: 'en',
  countries: ["in"]
}
const apiKey = "AIzaSyCiauuQCPEI2G8GuZtcaIh8tQnl2e2QkEw";


const NewHotel = () => {
  const {auth} = useSelector((state) => ({...state}))
  const {token} = auth;
  //state
  const [values, setValues] = useState({
    title: '',
    content: '',
    location: '',
    image: '',
    price: '',
    from: '',
    to: '',
    bed: ''
  });
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=PREVIEW'
  )

  //destructure variable frm state
  const { title, content, location, image, price, from, to, bed } = values;
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(values)
    let hotelData = new FormData()
    hotelData.append('title', title)
    hotelData.append('content', content)
    hotelData.append('location', location)
    hotelData.append('price', price)
    image && hotelData.append('image', image)  
    hotelData.append('from', from)
    hotelData.append('to', to)
    hotelData.append('bed', bed)

    console.log("Hotel DATA", [...hotelData])
    try {
      let res = await createHotel(token, hotelData)
    console.log("HOTEL CREATED RES", res)
    toast.success("New Hotel is Posted");
    setTimeout(() => {
      window.location.reload();
    }, 1000)

    }catch(err) {
      console.log(err);
      toast.error(err.response.data);
    }
  }

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
    setValues({ ...values, image: e.target.files[0] })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
 

  return <>
    <div className="container-fluid bg-secondary p-5 text-center">
      <h1>
        Post a new Hotel
      </h1>
    </div>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <br />
         <HotelCreateForm
         values={values}
         setValues={setValues}
         handleChange={handleChange}
         handleImageChange={handleImageChange}
         handleSubmit={handleSubmit}

          />
        </div>
        <div className="col-md-2">
          <img src={preview} alt="preview_image" className='img img-fluid m-2' />

          <pre>{JSON.stringify(values, null, 4)}</pre>
        </div>
      </div>
    </div>
  </>;
};

export default NewHotel;
