import requests

BASE_URL = "http://localhost:3000"  # שנה כאן אם אתה משתמש בפורט אחר

line = "-------------------------------"

def test_about():
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
    test_report(user_id=123123, year=2025, month=2)
    test_add_cost(user_id=123123, description="milk 9", category="food", amount=8)
    test_report(user_id=123123, year=2025, month=2)
