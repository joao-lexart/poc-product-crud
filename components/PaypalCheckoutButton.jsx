import React, { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'

export default function PaypalCheckoutButton({ products }) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = () => {
        setPaidFor(true)
    }

    if (paidFor) {
        alert("Thank your for buying!")
    }

    if (error) {
        alert(error)
    }
  return (
    <PayPalButtons
        style={{
            color: 'blue',
            layout: 'horizontal',
            height: 48,
            tagline: false,
            shape: "pill"
        }} 
        onClick={(data, actions) => {
            const hasAlreadyBoughtCourse = false;
            if (hasAlreadyBoughtCourse) {
                setError("Already bougth this item!");
                return actions.reject();
            } else {
                return actions.resolve();
            }
        }}
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        description: products.description,
                        amount: {
                            value: products.cartValue
                        }
                    }
                ]
            });
        }}
        onApprove={async(data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            handleApprove(data.orderID);
        }}
        onError={(err) => {
            setError(err);
            console.log(error)
        }}
        onCancel={() => {
            console.log("Canceled!")
        }}
    />
  )
}