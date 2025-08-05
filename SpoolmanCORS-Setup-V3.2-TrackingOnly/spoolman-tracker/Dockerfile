FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY spoolman_tracker.py .

# Create data directory
RUN mkdir -p /data

# Set permissions
RUN chmod +x spoolman_tracker.py

# Health check
HEALTHCHECK --interval=60s --timeout=10s --start-period=30s --retries=3 \
    CMD python -c "import json, os; print('OK' if os.path.exists('/data/tracker_state.json') else exit(1))"

# Run the application
CMD ["python", "spoolman_tracker.py"]