from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

THRESHOLDS = {
    'NH3': 7.5,
    'H2S': 0.2,
    'TMA': 10.0,
    'DMS': 1.0
}

WARNING_THRESHOLD_MULTIPLIER = 0.7

def get_led_color(value, threshold):
    if value >= threshold:
        return 'Red'
    elif value >= threshold * WARNING_THRESHOLD_MULTIPLIER:
        return 'Yellow'
    else:
        return 'Green'

def analyze_spoilage(gas_readings):
    led_status = {}
    any_red = False

    for gas, value in gas_readings.items():
        if gas not in THRESHOLDS:
            continue

        threshold = THRESHOLDS[gas]
        color = get_led_color(value, threshold)
        led_status[f'{gas}_LED'] = color

        if color == 'Red':
            any_red = True

    led_status['Food_Status'] = 'Spoiled' if any_red else 'Fresh'

    return led_status

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        required_gases = ['NH3', 'H2S', 'TMA', 'DMS']
        for gas in required_gases:
            if gas not in data:
                return jsonify({'error': f'Missing {gas} reading'}), 400

        result = analyze_spoilage(data)

        print(f"Input: {data}")
        print(f"Output: {result}")

        return jsonify(result)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'OK',
        'service': 'Python Spoilage Analysis Service',
        'thresholds': THRESHOLDS
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
