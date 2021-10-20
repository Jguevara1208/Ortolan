"""added date

Revision ID: 4608fe4af2fb
Revises: a21894ae1bc6
Create Date: 2021-10-19 16:58:24.990039

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4608fe4af2fb'
down_revision = 'a21894ae1bc6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('recipes', sa.Column('created_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('recipes', 'created_at')
    # ### end Alembic commands ###