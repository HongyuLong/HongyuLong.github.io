from flask import Flask

# create Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return app.send_static_file('HW6_home.html')


if __name__ == '__main__':
    app.run()
