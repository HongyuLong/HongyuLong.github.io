from flask import Flask, jsonify, request

# create Flask's app
app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/style.css')
def upload_css():
    return app.send_static_file('style.css')

@app.route('/funcs.js')
def upload_js():
    return app.send_static_file('funcs.js')

@app.route('/')
def index():
    return app.send_static_file('HW6_home.html')

@app.route('/app/home')
def home():
    dict = {'name':'move1'}
    return jsonify(dict)

if __name__ == '__main__':
    app.run()
