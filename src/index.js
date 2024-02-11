const express = require('express');
const cors = require('cors');
const fs = require('fs')

const app = express();
app.use(cors());
app.get('/paymentInfo', (req, res) => {
    const filePath = __dirname + "/payments.json"
    res.sendFile(filePath)
})
app.get('/netflixpayment', (req, res) => {
    try {
        const { cardNumber, expirationDate, cvv, firstName, lastName } = req.query
        if (!cardNumber) {
            res.status(500).json({ message: 'Please provide a Card Number' })

        } else if (!expirationDate) {
            res.status(500).json({ message: 'Please provide an expiration date' })

        } else if (!cvv) {
            res.status(500).json({ message: 'Please provide a CVV ' })

        } else if (!firstName) {
            res.status(500).json({ message: 'Please provide a fist name' })

        } else {
            const obj = {
                cardNumber: cardNumber,
                expirationDate: expirationDate,
                cvv: cvv,
                firstName: firstName,
                lastName: lastName
            }
            const filePath = __dirname + "/payments.json"
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({
                        message: 'A technical error has occurred',
                        error: err
                    })
                    return;
                }
                const paymentObject = JSON.parse(data);
                paymentObject.payments.push(obj)
                const updated = JSON.stringify(paymentObject, null, 2)
                fs.writeFile(filePath, updated, 'utf8', (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({
                            message: 'A technical error has occurred',
                            error: err
                        })
                        return;
                    }
                    res.status(200).json({
                        message: 'Added the info'
                    })
                })

            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'A technical error has occurred',
            error: error
        })
    }
})

app.listen(3001, () => {
    console.log('Api started on port 3001')
})