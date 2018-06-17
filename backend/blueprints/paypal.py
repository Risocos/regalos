import paypalrestsdk
from flask import Blueprint, jsonify, request, current_app as app, redirect, url_for
from paypalrestsdk import Payment, ResourceNotFound

from backend.auth import with_user
from backend.blueprints.project import find_project_or_404
from backend.models import Donation
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
@with_user
def create_payment(current_user):
    data = request.json

    if not data:
        return jsonify({'message': 'No data given'}), 400

    if current_user is not None:  # if it is None then it's an anonymous donation
        data['donator_id'] = str(current_user.id)
    else:
        data['donator_id'] = None  # make sure it's set to None, otherwise user can manipulate which user donated

    # load and validate
    result = donation_schema.load(data, partial=True)

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    project = find_project_or_404(result.data['project_id'])

    payment = Payment({
        'intent': 'sale',

        'payer': {
            'payment_method': 'paypal'
        },

        'redirect_urls': {
            'return_url': url_for('.success', _external=True),  # result.data['return_url'],
            'cancel_url': url_for('.cancel', _external=True),  # result.data['cancel_url'],
        },

        'transactions': [
            {
                'amount': {
                    'total': '%.2f' % result.data['amount'],
                    'currency': 'EUR',
                },
                'description': "Regalos Project Donation.",
                'item_list': {
                    'items': [
                        {
                            'name': 'Project Donation',
                            'description': 'Donation to {project_title}'.format(
                                project_title=project.title),
                            'price': '%.2f' % result.data['amount'],
                            'currency': 'EUR',
                            'quantity': '1',
                        }
                    ]
                }
            }
        ]
    })

    if payment.create():
        result.data['paypal_payment_id'] = payment.id
        donation_schema.load(result.data)
        if len(result.errors) > 0:
            return jsonify({'errors': result.errors}), 422
        del result.data['project_id']
        del result.data['donator_id']
        new_donation = Donation(**result.data)
        new_donation.save()
        for link in payment.links:
            if link.rel == 'approval_url':
                return jsonify({
                    'message': 'Donation created!',
                    'approval_url': str(link.href),
                    'donation': donation_schema.dump(new_donation).data
                })
    else:
        return jsonify({
            'message': 'Could not create paypal payment',
            'error': payment.error
        }), 409


@paypal_api.route('/success')  # callback from PayPal API
def success():
    # TODO: set donation to success
    if 'paymentId' in request.args and 'PayerID' in request.args:
        try:
            payment = Payment.find(request.args['paymentId'])  # type: Payment
            payment.execute({'payer_id': request.args['PayerID']})
            donation = Donation.objects(paypal_payment_id=request.args['paymentId']).first()  # type: Donation
            if donation is not None:
                donation.project.current_budget += donation.amount
                donation.status = str(Donation.Status.SUCCESS)
                donation.project.save()
                donation.save()
            # redirected to frontend again
            return redirect('http://localhost:3000/donation/success')
        except ResourceNotFound:
            return redirect('http://localhost:3000/donation/failed')
    else:
        return jsonify({'message': 'No payment details given'}), 422


@paypal_api.route('/cancel')  # callback from PayPal API
def cancel():
    # TODO: paymentId is not given for cancel requests, find another way to set the donation to CANCELLED
    if 'paymentId' in request.args:
        donation = Donation.objects(paypal_payment_id=request.args['paymentId'])
        if donation is not None:
            donation.status = str(Donation.Status.CANCELLED)
            donation.save()
    return redirect('http://localhost:3000/donation/cancel')
