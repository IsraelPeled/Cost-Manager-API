import unittest
import requests

BASE_URL = "http://localhost:3000/api" 

class TestCostManagerAPI(unittest.TestCase):
    def test_about_response(self):
        response = requests.get(f"{BASE_URL}/about/")
        self.assertEqual(response.status_code, 200)

        data = response.json()

        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 1)

        first_item = data[0]
        self.assertIn("first_name", first_item)
        self.assertIn("last_name", first_item)

        self.assertEqual(first_item["first_name"], "Israel")
        self.assertEqual(first_item["last_name"], "Peled")

    def test_add_cost(self):
        payload = {
            "userid": "123123",
            "description": "milk",
            "category": "food",
            "sum": 12,
            "year": 2025,
            "month": 2,
            "day": 4
        }
        response = requests.post(f"{BASE_URL}/add/", json=payload)
        self.assertIn(response.status_code, [200, 201])

    def test_report(self):
        params = {
            "id": "123123",
            "year": 2025,
            "month": 2
        }
        response = requests.get(f"{BASE_URL}/report/", params=params)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), dict)

if __name__ == "__main__":
    unittest.main()
