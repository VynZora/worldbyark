"""
Views for the payment app - a direct port of the route handlers that
lived in the Flask app's worldline.py.

Business/payload-building logic lives in payment/worldline.py, the raw
HTTP call to Worldline/Paynimo lives in payment/services.py, and the
JSON-config persistence lives in payment/utils.py - views.py just wires
request handling + templates together, same responsibility split the
Flask blueprint had.
"""

import random
from datetime import date, datetime, timedelta

from django.contrib import messages
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

from .models import PaymentTransaction

from . import worldline

from .services import call_api
from .utils import check_config, read_config, string_to_bool, write_config


# ------------------------------------------------------------------------
# Admin / merchant configuration
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def admin_view(request):
    config_data = read_config()

    if request.method == 'POST':
        # Mirrors the Flask view: the posted form is written to the JSON
        # config file as-is, without server-side field validation.
        write_config(request.POST.dict())
        messages.success(request, 'Success: Information has been updated.')
        return redirect('payment:admin')

    form = AdminForm(config_data=config_data)
    return render(request, 'payment/admin.html', {'form': form, 'config_data': config_data})


# ------------------------------------------------------------------------
# Online transaction (checkout.js)
# ------------------------------------------------------------------------
from datetime import date, timedelta
import random
import json

from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from .utils import check_config, string_to_bool
from . import worldline
from datetime import date, timedelta
import json
import random

from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from .utils import check_config, string_to_bool
from . import worldline

@require_http_methods(["GET", "POST"])
def online_transaction(request):

    config_data = check_config()

    if not config_data:
        return render(
            request,
            "payment/mandatory_fields_page_error.html"
        )

    display_on_popup = string_to_bool[
        config_data["displayTransactionMessageOnPopup"]
    ]

    return_url = (
        ""
        if display_on_popup
        else request.build_absolute_uri(
            reverse("payment:response")
        )
    )

    si_details_at_merchant_end_cond = (
        "true"
        if (
            string_to_bool[config_data["enableSI"]]
            and string_to_bool[
                config_data.get(
                    "siDetailsAtMerchantEnd",
                    "false"
                )
            ]
        )
        else "false"
    )

    ##################################################
    # PAYMENT REQUEST
    ##################################################

    if request.method == "POST":

        form_data = {}

        # -----------------------------
        # Values coming from Bootstrap Modal
        # -----------------------------

        form_data["customerName"] = request.POST.get("customerName", "")
        form_data["mobNo"] = request.POST.get("mobNo", "")
        form_data["email"] = request.POST.get("email", "")
        form_data["amount"] = request.POST.get("amount", "")
        form_data["package"] = request.POST.get("package", "")

        # -----------------------------
        # Worldline Required Fields
        # -----------------------------

        form_data["merchantCode"] = config_data["merchantCode"]
        form_data["merchantSchemeCode"] = config_data["merchantSchemeCode"]
        form_data["currency"] = config_data["currency"]
        form_data["SALT"] = config_data["SALT"]
        form_data["returnUrl"] = return_url

        # Generate IDs
        form_data["txn_id"] = str(
            random.randint(100000000, 999999999)
        )

        form_data["custID"] = "CUS" + str(
            random.randint(100000, 999999)
        )

        PaymentTransaction.objects.create(
                 name=form_data["customerName"],
                 email=form_data["email"],
                 phone=form_data["mobNo"],
                 package=form_data["package"],
                 amount=form_data["amount"],
                 merchant_txn_id=form_data["txn_id"],
                 status="initiated",
                 )

        # TEST MODE
        if config_data["typeOfPayment"] == "TEST":
            form_data["amount"] = "1"

        # -----------------------------
        # Optional Fields
        # -----------------------------

        optional_fields = [
            "accNo",
            "accountHolderName",
            "accountType",
            "aadharNo",
            "ifscCode",
            "debitStartDate",
            "debitEndDate",
            "maxAmount",
            "amountType",
            "frequency",
            "cardNumber",
            "expMonth",
            "expYear",
            "cvvCode",
        ]

        for field in optional_fields:
            form_data[field] = ""

        form_data["siDetailsAtMerchantEndCond"] = (
            si_details_at_merchant_end_cond
        )

        # -----------------------------
        # Standing Instruction
        # -----------------------------

        if (
            string_to_bool[config_data["enableSI"]]
            and not string_to_bool[
                config_data.get(
                    "siDetailsAtMerchantEnd",
                    "false"
                )
            ]
        ):

            form_data["amountType"] = config_data["amountType"]

            form_data["frequency"] = config_data["frequency"]

            form_data["debitStartDate"] = date.today().strftime(
                "%Y-%m-%d"
            )

            form_data["debitEndDate"] = (
                date.today() + timedelta(days=30 * 365)
            ).strftime("%Y-%m-%d")

            form_data["maxAmount"] = str(
                int(form_data["amount"]) * 2
            )

        ##################################################

        # print("\n========== FORM DATA ==========")

        for key, value in form_data.items():
            print(f"{key} : {value}")

        data_string = worldline.get_datastring(form_data)

        # print("\n========== DATA STRING ==========")
        # print(data_string)

        hashed_data = worldline.hash_datastring(data_string)

        # print("\n========== HASH ==========")
        # print(hashed_data)

        data = worldline.get_hash_object(
            hashed_data,
            form_data,
            config_data,
        )

        # print("\n========== JSON SENT ==========")
        # print(json.dumps(data, indent=4))
        # print("================================")

        return JsonResponse(data)

    ##################################################
    # GET
    ##################################################

    return render(
        request,
        "payment/online_transaction.html"
    )
# ------------------------------------------------------------------------
# checkout.js browser redirect response handler
# ------------------------------------------------------------------------


# from django.shortcuts import redirect
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_http_methods

# @csrf_exempt
# @require_http_methods(["POST"])
# def response_view(request):

#     # print("========== CALLBACK ==========")
#     # print("POST:", request.POST)
#     # print("MSG:", request.POST.get("msg"))
#     # print("==============================")

#     msg = request.POST.get("msg", "")

#     if not msg:
#         return redirect("/")

#     data = msg.split("|")
#     merchant_txn_id = data[3] if len(data) > 3 else ""

#     payment = PaymentTransaction.objects.filter(merchant_txn_id=merchant_txn_id ).first()


#     if payment:

#        payment.status = "Completed"

#        payment.txn_ref = data[3] if len(data) > 3 else ""

#        payment.bank_code = data[4] if len(data) > 4 else ""

#        payment.gateway_txn_id = data[5] if len(data) > 5 else ""

#        payment.payment_date = data[8] if len(data) > 8 else ""

#        payment.message = data[1] if len(data) > 1 else ""
 
#        payment.raw_response = msg

#        payment.save()
    
#     request.session["payment_result"] = {
#     "status": payment.status,
#     "message": payment.message,
#     "txn_ref": payment.txn_ref,
#     "bank_code": payment.bank_code,
#     "txn_id": payment.gateway_txn_id,
#     "amount": str(payment.amount),
#     "date": payment.payment_date,
#     "name": payment.name,
#     "email": payment.email,
#     "phone": payment.phone,
#     "package": payment.package,
# }

#     return redirect("/")


from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import PaymentTransaction


@csrf_exempt
@require_http_methods(["POST"])
def response_view(request):

    print("\n========== WORLDLINE CALLBACK ==========")

    msg = request.POST.get("msg", "").strip()

    print("RAW MSG:", msg)

    if not msg:
        print("ERROR: Empty callback message")
        return redirect("/")

    data = msg.split("|")

    for index, value in enumerate(data):
        print(f"data[{index}] = {value}")

    print("========================================\n")

    merchant_txn_id = (
        data[3].strip()
        if len(data) > 3
        else ""
    )

    if not merchant_txn_id:
        print("ERROR: Merchant transaction ID missing")
        return redirect("/")

    payment = PaymentTransaction.objects.filter(
        merchant_txn_id=merchant_txn_id
    ).first()

    if not payment:
        print(
            "ERROR: Payment transaction not found:",
            merchant_txn_id,
        )
        return redirect("/")

    gateway_message = (
        data[1].strip()
        if len(data) > 1
        else ""
    )

    message_lower = gateway_message.lower()

    # Default status when gateway message is unknown
    payment_status = "Pending"

    if any(
        word in message_lower
        for word in [
            "success",
            "successful",
            "approved",
            "captured",
        ]
    ):
        payment_status = "Completed"

    elif any(
        word in message_lower
        for word in [
            "cancel",
            "cancelled",
            "canceled",
            "abort",
            "aborted",
            "user closed",
        ]
    ):
        payment_status = "Failed"

    elif any(
        word in message_lower
        for word in [
            "failed",
            "failure",
            "declined",
            "rejected",
            "error",
        ]
    ):
        payment_status = "Failed"

    elif any(
        word in message_lower
        for word in [
            "pending",
            "initiated",
            "processing",
            "timeout",
        ]
    ):
        payment_status = "Pending"

    payment.status = payment_status

    payment.txn_ref = (
        data[3].strip()
        if len(data) > 3
        else ""
    )

    payment.bank_code = (
        data[4].strip()
        if len(data) > 4
        else ""
    )

    payment.gateway_txn_id = (
        data[5].strip()
        if len(data) > 5
        else ""
    )

    payment.payment_date = (
        data[8].strip()
        if len(data) > 8
        else ""
    )

    payment.message = gateway_message
    payment.raw_response = msg
    payment.save()

    print("SAVED PAYMENT STATUS:", payment.status)
    print("GATEWAY MESSAGE:", gateway_message)

    request.session["payment_result"] = {
        "status": payment.status,
        "message": payment.message,
        "txn_ref": payment.txn_ref,
        "bank_code": payment.bank_code,
        "txn_id": payment.gateway_txn_id,
        "amount": str(payment.amount),
        "date": payment.payment_date,
        "name": payment.name,
        "email": payment.email,
        "phone": payment.phone,
        "package": payment.package,
    }

    # Always return to the home page
    return redirect("/")



# ------------------------------------------------------------------------
# Offline verification
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def offline_verification(request):
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    response = {}
    if request.method == 'POST':
        form = OfflineVerificationForm(request.POST)
        if form.is_valid():
            data = worldline.build_offline_verification_payload(
                config_data,
                merchant_txn_id=request.POST['merchantTxnId'],
                date_str=request.POST['date'],
            )
            response = call_api(data)
    else:
        form = OfflineVerificationForm()

    return render(request, 'payment/offline_verification.html', {'form': form, 'response': response})


# ------------------------------------------------------------------------
# Refund
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def refund(request):
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    response = {}
    if request.method == 'POST':
        form = RefundForm(request.POST)
        if form.is_valid():
            data = worldline.build_refund_payload(
                config_data,
                token=request.POST['token'],
                amount=request.POST['amount'],
                date_str=request.POST['date'],
            )
            response = call_api(data)
    else:
        form = RefundForm()

    return render(request, 'payment/refund.html', {'form': form, 'response': response})


# ------------------------------------------------------------------------
# Reconciliation
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def reconciliation(request):
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    last_response = []
    if request.method == 'POST':
        form = ReconciliationForm(request.POST)
        if form.is_valid():
            transaction_ids = request.POST['merchantTxnId'].strip(', ')
            transaction_ids = ''.join(transaction_ids.split())
            start_date = datetime.strptime(request.POST['startDate'], '%Y-%m-%d').date()
            end_date = datetime.strptime(request.POST['endDate'], '%Y-%m-%d').date()
            delta = end_date - start_date

            for transaction_id in transaction_ids.split(','):
                found = False
                response = {}
                for i in range(delta.days + 1):
                    day = start_date + timedelta(days=i)
                    day_str = day.strftime('%d-%m-%Y')
                    data = worldline.build_offline_verification_payload(
                        config_data, merchant_txn_id=transaction_id, date_str=day_str,
                    )
                    response = call_api(data)
                    status_code = response['paymentMethod']['paymentTransaction']['statusCode']
                    error_message = response['paymentMethod']['paymentTransaction']['errorMessage']
                    if status_code != 9999 and error_message != 'Transactionn Not Found':
                        found = True
                        last_response.append(response)
                        break
                if not found:
                    last_response.append(response)
    else:
        form = ReconciliationForm()

    return render(request, 'payment/reconciliation.html', {'form': form, 'last_response': last_response})


# ------------------------------------------------------------------------
# Server-to-server (S2S) callback
# ------------------------------------------------------------------------
@csrf_exempt
@require_http_methods(['GET'])
def s2s(request):
    data = request.GET.get('msg', '').split('|')
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    clnt_txn_ref = data[3]
    pg_txn_id = data[5]
    status = 1 if worldline.verify_s2s_hash(data, config_data['SALT']) else 0

    return render(request, 'payment/s2s.html', {
        'clnt_txn_ref': clnt_txn_ref,
        'pg_txn_id': pg_txn_id,
        'status': status,
    })


# ------------------------------------------------------------------------
# eMandate / SI: Mandate verification
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def mandate_verification(request):
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    response = {}
    if request.method == 'POST':
        form = MandateVerificationForm(request.POST)
        if form.is_valid():
            data = worldline.build_mandate_verification_payload(
                config_data,
                type_of_transaction=request.POST['typeOfTransaction'],
                merchant_txn_id=request.POST['merchantTxnId'],
                customer_id=request.POST['customerId'],
                date_str=request.POST['date'],
            )
            response = call_api(data)
    else:
        form = MandateVerificationForm()

    return render(request, 'payment/mandate_verification.html', {'form': form, 'response': response})


# ------------------------------------------------------------------------
# eMandate / SI: Transaction scheduling
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def transaction_scheduling(request):
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    response = {}
    if request.method == 'POST':
        form = TransactionSchedulingForm(request.POST)
        if form.is_valid():
            transaction_id = str(random.randint(100, 9999999999))
            end_date = datetime.strptime(request.POST['date'], '%Y-%m-%d').date()
            end_date_ddmmyyyy = end_date.strftime('%d%m%Y')
            data = worldline.build_transaction_scheduling_payload(
                config_data,
                transaction_id=transaction_id,
                type_of_transaction=request.POST['typeOfTransaction'],
                amount=request.POST['amount'],
                end_date_ddmmyyyy=end_date_ddmmyyyy,
                mandate_reg_id=request.POST['mandateRegId'],
            )
            response = call_api(data)
    else:
        form = TransactionSchedulingForm()

    return render(request, 'payment/transaction_scheduling.html', {'form': form, 'response': response})


# ------------------------------------------------------------------------
# eMandate / SI: Transaction verification
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def transaction_verification(request):
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    response = {}
    if request.method == 'POST':
        form = TransactionVerificationForm(request.POST)
        if form.is_valid():
            data = worldline.build_transaction_verification_payload(
                config_data,
                type_of_transaction=request.POST['typeOfTransaction'],
                merchant_txn_id=request.POST['merchantTxnId'],
                date_str=request.POST['date'],
            )
            response = call_api(data)
            response = worldline.normalize_transaction_verification_status(response)
    else:
        form = TransactionVerificationForm()

    return render(request, 'payment/transaction_verification.html', {'form': form, 'response': response})


# ------------------------------------------------------------------------
# eMandate / SI: Stop payment
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def stop_payment(request):
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    response = {}
    if request.method == 'POST':
        form = StopPaymentForm(request.POST)
        if form.is_valid():
            transaction_id = str(random.randint(100, 9999999999))
            data = worldline.build_stop_payment_payload(
                config_data,
                transaction_id=transaction_id,
                tpsl_transaction_id=request.POST['tpslTransactionId'],
            )
            response = call_api(data)
    else:
        form = StopPaymentForm()

    return render(request, 'payment/stop_payment.html', {'form': form, 'response': response})


# ------------------------------------------------------------------------
# eMandate / SI: Mandate deactivation
# ------------------------------------------------------------------------
@require_http_methods(['GET', 'POST'])
def mandate_deactivation(request):
    config_data = check_config()
    if not config_data:
        return render(request, 'payment/mandatory_fields_page_error.html')

    response = {}
    if request.method == 'POST':
        form = MandateDeactivationForm(request.POST)
        if form.is_valid():
            transaction_id = str(random.randint(100, 9999999999))
            data = worldline.build_mandate_deactivation_payload(
                config_data,
                transaction_id=transaction_id,
                type_of_transaction=request.POST['typeOfTransaction'],
                mandate_reg_id=request.POST['mandateRegId'],
            )
            response = call_api(data)
            response = worldline.normalize_mandate_deactivation_response(response)
    else:
        form = MandateDeactivationForm()

    return render(request, 'payment/mandate_deactivation.html', {'form': form, 'response': response})
