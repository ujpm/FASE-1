import unittest
from app import app, db
from models import User, Emergency, TrainingModule, UserProgress

class TestFASE1(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_homepage(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_emergency_reporting(self):
        # Test emergency reporting endpoint
        test_data = {
            'type': 'medical',
            'description': 'Test emergency',
            'location': 'Test location'
        }
        response = self.app.post('/api/report-emergency', 
                               json=test_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['status'], 'success')

    def test_training_progress(self):
        # Test training progress tracking
        test_data = {
            'user_id': 1,
            'module_id': 1,
            'progress': 50.0
        }
        response = self.app.post('/api/training/progress', 
                               json=test_data)
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
