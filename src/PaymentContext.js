import React, {createContext, useEffect, useState} from 'react';
import {Urls} from './Urls';
import axios from 'axios';

export const PaymentContext = createContext();

export const PaymentProvider = props => {
    const[tokenObject, setTokenObject] = useState({});
    const[isPaymentMade, setIsPaymentMade] = useState(false);
    const[transactionData, setTransactionData] = useState({});

    useEffect(()=> {
        getToken();
    }, []);

    const getToken = async ()=> {
       const result =  await axios.get(Urls.InitializeUrl).then(res => res.data).catch(err => console.log(err))
       setTokenObject(result.data);
    }

    const paymentTransaction = async (data) => {
        let result = await axios.post(Urls.ConfirmUrl,data).then(res => res).catch(err => console.log(err))
        setTransactionData(result.data.data);
        setIsPaymentMade(true);
    }

    return(
        <PaymentContext.Provider value={{tokenObject, paymentTransaction, isPaymentMade, setIsPaymentMade, transactionData, setTransactionData}}>
            {props.children}
        </PaymentContext.Provider>
    );
}