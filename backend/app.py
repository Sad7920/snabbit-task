from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/get-price": {"origins": "http://localhost:3000"}})

# Unified overrides for all sports
common_overrides = [
    # Any day 12 PM to 4 PM increase by Rs. 5
    {"time_range": (12, 16), "adjustment": 5},
]

# Mock data for sports and pricing (using the same overrides for all sports)
sports_pricing = {
    "badminton": {
        # Default prices for each sport and duration
        "default": {60: 200, 90: 300, 120: 400},
        "overrides": common_overrides,
    },
    "cricket": {
        "default": {60: 1500, 90: 2200, 120: 2800},
        "overrides": common_overrides,
    },
    "football": {
        "default": {60: 1000, 90: 1500, 120: 1950},
        "overrides": common_overrides,
    },
    "tennis": {
        "default": {60: 300, 90: 450, 120: 600},
        "overrides": common_overrides,
    },
    "basketball": {
        "default": {60: 500, 90: 750, 120: 1000},
        "overrides": common_overrides,
    },
}

specific_date_overrides = {
    "05-01-2024": [
        # 12 PM - 4 PM, decrease by Rs. 10
        {"time_range": (12, 16), "duration": 60, "adjustment": -10},
        # 4 PM - 8 PM, increase by Rs. 20
        {"time_range": (16, 20), "duration": 60, "adjustment": 20},
    ]
}


def get_price(sport, duration, date_time):
    sport_data = sports_pricing.get(sport, {})
    if not sport_data:
        return None

    default_prices = sport_data["default"]
    overrides = sport_data.get("overrides", [])

    price = default_prices.get(duration)
    if price is None:
        return None

    time = date_time.hour
    weekday = date_time.isoweekday()
    date_str = date_time.strftime("%d-%m-%Y")

    # Apply specific date overrides (e.g., 05-01-2024)
    if date_str in specific_date_overrides:
        for override in specific_date_overrides[date_str]:
            if override["duration"] == duration and override["time_range"][0] <= time < override["time_range"][1]:
                price += override["adjustment"]
                return price  # Specific date override takes precedence

    # Weekend override: Apply only if it's Saturday or Sunday and within 12 PM to 4 PM
    if weekday in [6, 7] and 12 <= time < 16:
        price += 10  # Apply weekend price increase

    # Apply time-based override (every day 12 PM - 4 PM) only if weekend override doesn't apply
    if not (weekday in [6, 7] and 12 <= time < 16) and 12 <= time < 16:
        price += 5  # Apply time-based price increase

    return price  # Return the final adjusted price


@app.route("/get-price", methods=["POST"])
def get_price_route():
    data = request.json
    sport = data.get("sport")
    duration = data.get("duration")
    date_time = datetime.fromisoformat(data.get("date_time"))

    price = get_price(sport, duration, date_time)
    if price is None:
        return jsonify({"error": "Invalid request or no price found"}), 400

    return jsonify({"price": price})


if __name__ == "__main__":
    app.run(debug=True)
