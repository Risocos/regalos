import paypalrestsdk
from flask import Blueprint, jsonify, request, current_app as app
from paypalrestsdk import Payment, ResourceNotFound

paypal_api = Blueprint('PayPalApi', __name__, url_prefix='/paypal')


@paypal_api.before_request
def setup_paypal():
    # sets up paypal before the request is fired
    paypalrestsdk.configure({
        'mode': app.config['PAYPAL']['mode'],
        'client_id': app.config['PAYPAL']['client_id'],
        'client_secret': app.config['PAYPAL']['client_secret']
    })


@paypal_api.route('/create-payment', methods=['POST'])
def create_payment():
    data = request.json

    required_fields = [
        'amount'
    ]

    if not data:
        return jsonify({'message': 'No data given'}), 400

    # TODO: put these validation rules in a marshmallow schema
    for field in required_fields:
        if field not in data:
            return jsonify({'message': "Field '{field}' is not given".format(field=field)}), 422

    try:
        amount = float(data['amount'])
        if not (amount > 0.01):
            return jsonify({'message': "You need to donate more than 0.01"}), 422
    except ValueError:
        return jsonify({'message': "Invalid amount given"}), 422

    payment = Payment({
        'intent': 'sale',

        'payer': {
            'payment_method': 'paypal'
        },

        'redirect_urls': {
            'return_url': 'http://localhost:5000/paypal/success',
            'cancel_url': 'http://localhost:5000/paypal/cancel',
        },

        'transactions': [
            {
                'amount': {
                    'total': '%.2f' % amount,
                    'currency': 'EUR',
                },
                'description': "Regalos Project Donation.",
            }
        ]
    })

    if payment.create():
        for link in payment.links:
            if link.rel == 'approval_url':
                return jsonify({
                    'message': 'Paypal approval url created',
                    'approval_url': str(link.href)
                })
    else:
        return jsonify({
            'message': 'Could not create paypal payment',
            'error': payment.error
        }), 409


@paypal_api.route('/success')
def success():
    if 'paymentId' in request.args:
        try:
            payment = Payment.find(request.args['paymentId'])  # type: Payment
            payment.execute({'payer_id': request.args['PayerID']})
            msg = 'Payment found and executed'
        except ResourceNotFound as e:
            msg = 'Error finding payment details'
    else:
        msg = 'No paymentId received'
    return jsonify({
        'message': 'Your payment is successful!',
        'status': msg,
        'args': request.args
    })


@paypal_api.route('/cancel')
def cancel():
    return jsonify({
        'message': 'You cancelled your payment, whyyyyyyy? those people need it!',
        'args': request.args
    })
