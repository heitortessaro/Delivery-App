import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const axios = require('axios');

export default function SaleDetail() {
    const [sale, setSale] = useState({});

    const getSale = () => {
        const URL = "http://localhost:3001/sales/1";
        const sale = await axios.get(URL);
        console.log(sale);
        setSale(sale);
    };

    useEffect(() => {
        getSale();
    })

    return (
        <div>
            teste
        </div>
    )
}