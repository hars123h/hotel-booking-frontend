import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker;
const { Option } = Select;

const Search = () => {
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [bed, setBed] = useState("")
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    }

    return <>

        <div className="d-flex pb-4">
            <div className="w-100">
                <input
                    type="text"
                    name="location"
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder='location'
                    className='form-control'
                    value={location}
                    style={{ height: '50px' }}
                />
            </div>

            <RangePicker
                onChange={(date, dateString) => setDate(dateString)}
                disabledDate={(current) =>
                    current && current.valueOf() < moment().subtract(1, 'days')
                }
                className="w-100"
                style={{width: '50px', height: "50px"}}
            />

            <Select
                onChange={(value) => setBed(value)}
                className='w-100'
                size='large'
                placeholder="Number of beds"
            >
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>

            </Select>

            <SearchOutlined
                onClick={handleSubmit}
                className='btn btn-primary p-3 btn-square'

            />

        </div>


    </>;
};

export default Search;
