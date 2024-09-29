import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import swal from 'sweetalert';

const Payment = () => {
  return (
    <PayPalButton
      amount="0.01"
      onSuccess={(details, data) => {
        swal(
          'Success!',
          'Transaction completed by ' + details.payer.name.given_name,
          'success'
        );

        return fetch('/paypal-transaction-complete', {
          method: 'post',
          body: JSON.stringify({
            orderID: data.orderID
          })
        });
      }}
    />
  );
};

export default Payment;
