import unittest
import requests

BASE_URL = "https://api-node-cost-manager.onrender.com/api" 

line = "-------------------------------"

class TestCostManagerAPI(unittest.TestCase):
    def test_1_about_response(self):
        response = requests.get(f"{BASE_URL}/about/")
        self.assertEqual(response.status_code, 200)

        data = response.json()

        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 2)

        first_item = data[0]
        self.assertIn("first_name", first_item)
        self.assertIn("last_name", first_item)

        self.assertEqual(first_item["first_name"], "Israel")
        self.assertEqual(first_item["last_name"], "Peled")

        second_item = data[1]
        self.assertIn("first_name", second_item)
        self.assertIn("last_name", second_item)

        self.assertEqual(second_item["first_name"], "Shira")
        self.assertEqual(second_item["last_name"], "Shani")

        print(f"GET {BASE_URL}/about/")
        print("status_code =", response.status_code)
        print("response JSON =", response.json())
        print(line)

    def test_2_report(self):
        params = {
            "id": "123123",
            "year": 2025,
            "month": 5
        }
        response = requests.get(f"{BASE_URL}/report/", params=params)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), dict)
        print(f"GET {BASE_URL}/report/?id={params['id']}&year={params['year']}&month={params['month']}")
        print("status_code =", response.status_code)
        print("response JSON =", response.json())
        print(line)


    def test_3_add_cost(self):
        payload = {
            "userid": "123123",
            "description": "milk",
            "category": "food",
            "sum": 12,
            "year": 2025,
            "month": 5,
            "day": 4
        }
        response = requests.post(f"{BASE_URL}/add/", json=payload)
        print(f"POST {BASE_URL}/add/")
        print("status_code =", response.status_code)
        print("response JSON =", response.json())
        self.assertIn(response.status_code, [200, 201])
        print(line)

    def test_4_get_user(self):
        userid = 123123
        response = requests.get(f"{BASE_URL}/users/{userid}")
        
        print("status_code =", response.status_code)
        print("response JSON =", response.json())
        print(line)
        
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIn("first_name", data)
        self.assertIn("last_name", data)
        self.assertIn("id", data)
        self.assertIn("total", data)

        self.assertEqual(data["id"], userid)
        self.assertIsInstance(data["total"], (int, float))


if __name__ == "__main__":
    unittest.main()
