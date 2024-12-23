from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

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
    coordinates = db.Column(db.String(200))
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class TrainingModule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)

class UserProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    module_id = db.Column(db.Integer, db.ForeignKey('training_module.id'))
    progress = db.Column(db.Integer, default=0)
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)

@app.before_first_request
def create_tables():
    db.create_all()

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
    try:
        data = request.json
        new_emergency = Emergency(
            type=data.get('type'),
            description=data.get('description'),
            location=data.get('location'),
            coordinates=data.get('coordinates'),
            status='active'
        )
        db.session.add(new_emergency)
        db.session.commit()
        return jsonify({
            'status': 'success',
            'message': 'Emergency reported',
            'reference': str(new_emergency.id)
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/training/progress', methods=['POST'])
def update_training_progress():
    try:
        data = request.json
        progress = UserProgress.query.filter_by(
            user_id=data.get('user_id'),
            module_id=data.get('module_id')
        ).first()
        
        if not progress:
            progress = UserProgress(
                user_id=data.get('user_id'),
                module_id=data.get('module_id'),
                progress=data.get('progress', 0)
            )
            db.session.add(progress)
        else:
            progress.progress = data.get('progress')
            progress.last_accessed = datetime.utcnow()
        
        db.session.commit()
        return jsonify({'status': 'success'})
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
