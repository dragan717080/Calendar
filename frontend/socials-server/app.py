from flask import Flask, request, jsonify, redirect
import requests
from dotenv import dotenv_values
import json
from urllib.parse import parse_qs
from flask_cors import CORS

config = dotenv_values('.env')

app = Flask(__name__)

BASE_GITHUB_URL = 'https://github.com/login/oauth'

# To do: move production frontend
CORS(app, origins='*')

@app.get('/')
def index():
    return 'Simple Flask Server since Github and Google OAuth block client side requests. Will add type hints'

@app.post('/get_access_token')
def get_access_token():
    ACCESS_TOKEN_URL = BASE_GITHUB_URL + '/access_token'
    data = request.get_data(as_text=True)
    form_data = json.loads(data)

    try:
        access_token = form_data['code']
    except KeyError:
        return jsonify(message="Access code wasn't given."), 400

    params = '?client_id=' + config['GITHUB_ID'] + '&client_secret=' + config['GITHUB_SECRET'] + '&code=' + access_token

    print(f"Posting to url {ACCESS_TOKEN_URL + params}")

    response = requests.post(ACCESS_TOKEN_URL + params)
    try:
        response_data = response.json()
        params_dict = parse_qs(response_data)
    except Exception:
        params_dict = parse_qs(response.text)
        try:
            print("at bottom user token", params_dict)
        except Exception:
            return jsonify(message=params_dict['error_description']), 400

    try:
        user_data = get_user_data(params_dict['access_token'][0])

        return login_user(user_data['login'], access_token)
    except Exception:
        # To do, remove print, add 'logging' module
        print('Failed')
    return jsonify(message='Failed to get user data.'), 400

def get_user_data(access_token):
    GITHUB_API_URL = 'https://api.github.com/user'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/vnd.github.v3+json'
    }

    response = requests.get(GITHUB_API_URL, headers=headers)
    if response.status_code == 200:
        response.json()
    else:
        return jsonify(message="Couldn't get user info from provider."), 400
    return response.json()

def login_user(username: str, access_token: str):
    response = requests.post(
        'http://127.0.0.1:8000/users/socials/sign-in', 
        ({
            "username": username,
            "authToken": access_token,
        })
    )

    return response.json()

@app.get('/auth/google')
def get_google_access_token():
    if request.args.get('code'):
        print("ASD")
        code = request.args.get('code')
        for (k, v) in request.args.items():
            print(f"Key: {k}, value: {v}")
        #get_google_user_data(code)
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        token_data = {
            'code': code,
            'client_id': config['GOOGLE_CLIENT_ID'],
            'client_secret': config['GOOGLE_CLIENT_SECRET'],
            'redirect_uri': 'http://localhost:5000/auth/google',
            'grant_type': 'authorization_code'
        }
        print("About to get user data")
        profile_url = "https://www.googleapis.com/userinfo/v2/me"
        token_url = 'https://www.googleapis.com/oauth2/v4/token'
        response = requests.post(token_url, data=token_data, headers=headers)
        access_token = response.json()['access_token']
        print("Access token:", access_token)

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        response = requests.get(profile_url, headers=headers)
        # Since Google doesn't give username, extract it from email
        username = response.json()['email'].split('@')[0]

        login_user(username, access_token)

        return redirect(f"http://localhost:5173?google_username={username}")
    else:
        print('Posted with args')
        for (k, v) in request.args.items():
            print(f"Key: {k}, value: {v}")
"""     response = requests.post(
        'http://127.0.0.1:8000/users/socials/sign-in', 
        ({
            "username": username,
            "authToken": access_token,
        })
    ) """


    #return response.json()

def get_google_user_data(code):
    print("Code:", code)
    token_data = {
        'code': code,
        'client_id': config['GOOGLE_CLIENT_ID'],
        'client_secret': config['GOOGLE_CLIENT_SECRET'],
        'redirect_uri': '/auth/google_info',
        'grant_type': 'authorization_code'
    }
    print("About to get user data")
    profile_url = "https://www.googleapis.com/userinfo/v2/me"
    token_url = 'https://oauth2.googleapis.com/token'
    response = requests.post(token_url, data=token_data)
    print(response.status_code)
    print("Response:", response)
    print("Response json:", response.json())

@app.get('/google_user_info')
def get_google_user_info():
    for k, v in request.args.items():
        print(f"Info key: {k}, info value: {v}")
    return "1"

@app.get('/auth/google_info')
def get_auth_google_user_info():
    for k, v in request.args.items():
        print(f"Info key: {k}, info value: {v}")
    return "1"

@app.post('/auth/google_info')
def get_auth_post_google_user_info():
    return "It's posted"

if __name__ == '__main__':
    app.run(debug=True)
