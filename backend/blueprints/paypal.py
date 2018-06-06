import paypalrestsdk
from flask import Blueprint, jsonify, request, current_app as app
from paypalrestsdk import Payment, ResourceNotFound

from backend.schemas import donation_schema

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

    if not data:
        return jsonify({'message': 'No data given'}), 400

    # load and validate
    result = donation_schema.load(data)

    try:
        amount = float(data['amount'])
        if not (amount > 0.01):
            return jsonify({'message': "You need to donate more than 0.01"}), 422
    except ValueError:
        return jsonify({'message': "Invalid amount given"}), 422

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    new_donation = result.data

    return jsonify({
        'message': "Payment created!",
        'project': donation_schema.dump(new_donation).data
    })

    payment = Payment({
        'intent': 'sale',

        'payer': {
            'payment_method': 'paypal'
        },

        'redirect_urls': {
            'return_url': data['return_url'],
            'cancel_url': data['cancel_url'],
        },

        'transactions': [
            {
                'amount': {
                    'total': '%.2f' % amount,
                    'currency': 'EUR',
                },
                'description': "Regalos Project Donation.",
                'item_list': {
                    'items': [
                        {
                            'name': 'Project Donation',
                            'description': 'Donation to <project_name>',
                            'price': '%.2f' % amount,
                            'currency': 'EUR',
                            'quantity': '1',
                        }
                    ]
                }
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
    # TODO: set donation to success
    if 'paymentId' in request.args:
        try:
            payment = Payment.find(request.args['paymentId'])  # type: Payment
            payment.execute({'payer_id': request.args['PayerID']})
            msg = 'Payment found and executed'
        except ResourceNotFound as e:
            msg = 'Error finding payment details'
    else:
        msg = 'No paymentId received'

    # TODO: redirect user to actual redirect url
    return jsonify({
        'message': 'Your payment is successful!',
        'status': msg,
        'args': request.args
    })


@paypal_api.route('/cancel')
def cancel():
    # TODO: set donation to cancelled
    # TODO: redirect to cancel page
    return jsonify({
        'message': 'You cancelled your payment, whyyyyyyy? those people need it!',
        'args': request.args
    })
