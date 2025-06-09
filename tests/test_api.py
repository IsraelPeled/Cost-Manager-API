import requests

BASE_URL = "https://api-node-cost-manager.onrender.com"

line = "-------------------------------"

def test_about():
    """
     Test the /api/about/ endpoint by sending a GET request.
    """
    print("🧪 Testing /api/about/")
    url = f"{BASE_URL}/api/about/"
    try:
        res = requests.get(url)
        print("url =", url)
        print("status_code =", res.status_code)
        print("response JSON =", res.json())
    except Exception as e:
        print("❌ Failed:", e)
    print(line)


def test_report(user_id, year, month):
    """
    Test the /api/report/ endpoint for a specific user, year, and month.
    Args:
        user_id (int):    The ID of the user to fetch the report for.
        year (int):       The year of the report.
        month (int):      The month of the report.
    """
    print(f"🧪 Testing /api/report/?id={user_id}&year={year}&month={month}")
    url = f"{BASE_URL}/api/report/?id={user_id}&year={year}&month={month}"
    try:
        res = requests.get(url)
        print("url =", url)
        print("status_code =", res.status_code)
        print("response JSON =", res.json())
    except Exception as e:
        print("❌ Failed:", e)
    print(line)


def test_add_cost(user_id, description, category, amount):
    """
    Test the /api/add/ endpoint by sending a POST request to add a cost entry.
    Args:
        user_id (int):      The ID of the user.
        description (str):  A description of the cost.
        category (str):     The cost category (e.g., "food", "housing").
        amount (int|float): The amount for the cost entry.
    """
    print("🧪 Testing /api/add/ (POST)")
    url = f"{BASE_URL}/api/add/"
    payload = {
        "userid": user_id,
        "description": description,
        "category": category,
        "sum": amount
    }
    try:
        res = requests.post(url, json=payload)
        print("url =", url)
        print("status_code =", res.status_code)
        print("response =", res.text)
    except Exception as e:
        print("❌ Failed:", e)
    print(line)


if __name__ == "__main__":
    test_about()
    test_report(user_id=123123, year=2025, month=5)
    test_add_cost(user_id=123123, description="milk 9", category="food", amount=8)
    test_report(user_id=123123, year=2025, month=5)
