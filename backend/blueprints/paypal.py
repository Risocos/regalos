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
