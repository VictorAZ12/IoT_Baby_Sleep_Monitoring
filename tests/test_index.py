from app import app
import unittest

class TestIndex(unittest.TestCase):

    def test_status(self):
        """
        Check the http response status code is 200 OK. 
        """
        client = app.test_client(self)
        response = client.get('/index', content_type='html/text')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()