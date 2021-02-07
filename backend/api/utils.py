import requests, time
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def check_update_price():
    response = requests.get('http://localhost:6800/daemonstatus.json')
    # response = requests.get('http://scrapy:6800/daemonstatus.json')
    result = eval(response.text)
    while result.get('pending') != 0 or result.get('running') != 0:
        time.sleep(0.1)
        response = requests.get('http://scrapy:6800/daemonstatus.json')
        result = eval(response.text)

user_check_field = ["username", "password", "password1", "password2", "email"]

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)
    if response is not None:
        if response.status_code == 400:
            message = []
            for key in response.data:
                a = response.data.get(key)[0]
                if(key in user_check_field):
                    if (key == "password1" or key == "password2"):
                        message.append("Invalid Password Combination.")
                    else:
                        message.append(str(key).capitalize() + " is invalid.")
                else:
                    message.append(str(a))
            error = " ".join(message)
            message = {'messages': error}
            # Now add the HTTP status code to the response.

            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = {'messages': 'Bad request'}
            if response.status_code == 401 or 403:
                message = {'messages': response.data.get('detail')}
            
            return Response(message, status=response.status_code)
    else:
        message = {'messages': 'Server error, try again later'}
        return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # return response

# def custom_error_message(errors):
#     error = ""
#     for key in errors:
#         a = str(errors.get(key)[0])
#         error = error.join(a) + " "
#     error = error.strip()
#     message = {'messages': error}
#     return message
