from .db import db


class ProjectTask(db.Model):
    __tablename__ = 'project_tasks'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    project = db.relationship('Project', back_populates='tasks')

    def to_dict(self):
        return {
            "id": self.id,
            "projectId": self.project_id,
            "description": self.description,
            "completed": self.completed
        }