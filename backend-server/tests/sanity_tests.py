import unittest
import requests

class APITests(unittest.TestCase):
    BASE_URL = "http://your-api-url.com"  # Replace with your API's base URL

    def test_home_route(self):
        response = requests.get(f"{self.BASE_URL}/")
        self.assertEqual(response.status_code, 200)

    def test_another_route(self):
        response = requests.get(f"{self.BASE_URL}/another-endpoint")
        self.assertEqual(response.status_code, 200)

    # Add more tests as needed

if __name__ == "__main__":
    unittest.main()
