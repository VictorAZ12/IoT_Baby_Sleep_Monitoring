from app import app
import unittest

class TestUpdate(unittest.TestCase):

    def test_status(self):
        """
        Check the http response status code is 302 Found.
        """
        client = app.test_client(self)
        response = client.get('/update/50/1/80/20/1', content_type='html/text')
        self.assertEqual(response.status_code, 302)

if __name__ == '__main__':
    unittest.main()