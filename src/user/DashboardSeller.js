import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ConnectNav from '../components/ConnectNav';
import DashboardNav from '../components/DashboardNav';
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons'
import { sellerHotels } from '../actions/hotel';
import SmallCard from '../components/cards/SmallCard';
import { deleteHotel } from '../actions/hotel';


import { toast } from 'react-toastify';


const DashboardSeller = () => {
    const [hotels, setHotels] = useState([])
    const { auth } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadSellerHotels()
    }, [])

    const loadSellerHotels = async() => {
        let {data} = await sellerHotels(auth.token)
        setHotels(data)
    }
    
    const handleHotelDelete = async( hotelId) => {
        if(!window.confirm('Are you sure ?')) return;
        deleteHotel(auth.token, hotelId).then(res => {
            toast.success("Hotel Deleted");
            loadSellerHotels()
        })
    }


    const connected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your Hotels</h2>
                </div>
                <div className="col-md-2">
                    <Link className='btn btn-primary' to="/hotels/new"> + Add New</Link>
                </div>
            </div>
            <div className="row">
    
            {
                hotels.map((h) =>(
                    <SmallCard key={h._id} h={h}
                    showViewMoreButton={false}
                    owner={true}
                    handleHotelDelete={handleHotelDelete}
                     />
                ))
            }
              
            </div>
        </div>
    )
    
    return <>
        <div className="container-fluid bg-secondary p-5">
            <ConnectNav />
        </div>

        <div className="container-fluid p-4">
            <DashboardNav />
        </div> 
        {
            connected()
        }


    </>;
};

export default DashboardSeller;
