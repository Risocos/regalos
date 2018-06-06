from pprint import pprint

import paypalrestsdk
from paypalrestsdk import Payment

from backend.localconfig import PAYPAL

paypalrestsdk.configure({
    'mode': PAYPAL['mode'],
    'client_id': PAYPAL['client_id'],
    'client_secret': PAYPAL['client_secret']
})


def create_payment():
    payment = Payment({
        'intent': 'sale',

        'payer': {
            'payment_method': 'paypal'
        },

        'redirect_urls': {
            'return_url': 'http://localhost:5000/paypal/success',
            'cancel_url': 'http://localhost:5000/paypal/cancel',
        },

        "transactions": [
            {
                "amount": {
                    "total": "31.07",
                    "currency": "USD",
                    "details": {
                        "subtotal": "30.00",
                        "tax": "0.07",
                        "shipping": "1.00",
                    }
                },
                "description": "Regalos Project Donation.",
                "soft_descriptor": "ECHI5786786",
                "item_list": {
                    "items": [
                        {
                            "name": "Bowling",
                            "description": "Bowling Team Shirt",
                            "quantity": "5",
                            "price": "3",
                            "tax": "0.01",
                            "sku": "1",
                            "currency": "USD"
                        },
                        {
                            "name": "Mesh",
                            "description": "80s Mesh Sleeveless Shirt",
                            "quantity": "1",
                            "price": "17",
                            "tax": "0.02",
                            "sku": "product34",
                            "currency": "USD"
                        },
                        {
                            "name": "Discount",
                            "quantity": "1",
                            "price": "-2.00",
                            "sku": "product",
                            "currency": "USD"
                        }
                    ]
                }
            }
        ]
    })

    if payment.create():
        print("Payment created successfully")
        for link in payment.links:
            if link.rel == 'approval_url':
                approval_url = str(link.href)
                print('Redirect for approval: {url}'.format(url=approval_url))
    else:
        pprint(payment.error)


def find_all_payments():
    payment_history = Payment.all({'count': 10})
    # List Payments
    print("List Payment:")
    for payment in payment_history.payments:
        print("  -> Payment[%s]" % payment.id)
        p = Payment.find(payment.id)



if __name__ == '__main__':
    find_all_payments()
