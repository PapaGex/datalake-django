# Use the official Python image as the base
FROM python:3.11

# Set the working directory
WORKDIR /app

# Copy dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files into the working directory
COPY . .

# Collect static files
# RUN python manage.py collectstatic

# Command to run the Django application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "datalake.wsgi:application"]
