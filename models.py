from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    location = db.Column(db.String(200))
    training_level = db.Column(db.Integer, default=0)
    certifications = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    emergencies = db.relationship('Emergency', backref='reporter', lazy=True)

class Emergency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reporter_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    type = db.Column(db.String(50))
    description = db.Column(db.Text)
    location = db.Column(db.String(200))
    coordinates = db.Column(db.String(50))
    status = db.Column(db.String(20), default='active')
    responders = db.Column(db.JSON)  # List of responder IDs
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

class TrainingModule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    difficulty_level = db.Column(db.Integer)
    prerequisites = db.Column(db.JSON)
    content = db.Column(db.JSON)  # Stores module content structure
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    module_id = db.Column(db.Integer, db.ForeignKey('training_module.id'))
    progress = db.Column(db.Float, default=0.0)  # Percentage completed
    completed = db.Column(db.Boolean, default=False)
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)
