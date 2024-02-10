const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/netflixpayment', (req, res)=>{
    try {
        const {cardNumber, expirationDate, cvv, firstName, lastName} = req.query
        if(!cardNumber){
            res.status(500).json({message:'Please provide a Card Number'})

        }else if(!expirationDate){
            res.status(500).json({message:'Please provide an expiration date'})

        }else if(!cvv){
            res.status(500).json({message:'Please provide a CVV '})

        }else if(!firstName){
            res.status(500).json({message:'Please provide a fist name'})

        }else{
            const obj = {
                cardNumber:cardNumber,
                expirationDate:expirationDate,
                cvv:cvv,
                firstName:firstName,
                lastName:lastName
            }
            res.status(500).json(obj)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'A technical error has occurred'
        })
    }
})

app.listen(3001, ()=>{
    console.log('Api started on port 3001')
})