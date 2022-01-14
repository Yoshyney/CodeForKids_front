import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

data = [
        {'id': 0,
         'creationdate': '2022',
         'type': 'music'},
         {'id': 1,
          'creationdate': '1998',
          'type': 'video game'}
]

@app.route('/api/data', methods=['GET'])
def home():
    return jsonify(data)

app.run(host="0.0.0.0", port=4242)

