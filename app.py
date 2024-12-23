from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Configure database
database_url = os.getenv('DATABASE_URL')
if database_url and database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url or 'sqlite:///fase1.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    location = db.Column(db.String(200))
    training_level = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Emergency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reporter_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    type = db.Column(db.String(50))
    description = db.Column(db.Text)
    location = db.Column(db.String(200))
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/training')
def training():
    return render_template('training.html')

@app.route('/emergency')
def emergency():
    return render_template('emergency.html')

@app.route('/api/report-emergency', methods=['POST'])
def report_emergency():
    data = request.json
    new_emergency = Emergency(
        type=data.get('type'),
        description=data.get('description'),
        location=data.get('location')
    )
    db.session.add(new_emergency)
    db.session.commit()
    # Here we would add logic to notify nearby responders
    return jsonify({'status': 'success', 'message': 'Emergency reported'})

@app.route('/api/training/progress', methods=['POST'])
def update_training_progress():
    data = request.json
    user = User.query.get(data.get('user_id'))
    if user:
        user.training_level = data.get('level')
        db.session.commit()
        return jsonify({'status': 'success'})
    return jsonify({'status': 'error', 'message': 'User not found'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
