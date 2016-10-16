from flask import Flask, url_for, request, jsonify
app = Flask(__name__)

# Python boolean and JS boolean not the same, here I use a string
true = 'true';
false = 'false';

components = {
    'switch': true
}

def poll_components():
    # TODO
    pass

@app.route("/")
def index():
    return app.send_static_file('switch.html')

@app.route("/switch", methods=['GET', 'PUT'])
def switch():
    if request.method == 'PUT':
        print('put request called')
        # TODO: this is the backend. Change the status of the switch
        # Needs error handling if switch does not respond, for example
        content = request.get_json()
        print(content)
        # Toggle the switch here... then return
        components['switch'] = content['switch']
        success = True
        if (success):
            return jsonify(success=true, status=components['switch'])
        else:
            return jsonify(success=false, status='false')
    elif request.method == 'GET':
        global components
        # TODO: this is the backend. Get the status of the switch
        # This needs to be long polling and only return when there is a
        # change in the switch
        status = request.args.get('status')
        print(status)
        return jsonify(success=true, status=components['switch'])

if __name__ == "__main__":
    app.run(debug=True, threaded=True)
