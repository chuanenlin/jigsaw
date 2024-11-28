import os

# API Keys
REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN", "your-replicate-token")
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID", "your-aws-access-key")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY", "your-aws-secret")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "your-openai-key")

# AWS Settings
S3_BUCKET_NAME = 'jigsaw-user-files'
MAX_FILE_SIZE = 200 * 1024 * 1024  # 200MB

# CORS Settings
CORS_ORIGINS = ['*']

# App Settings
APP_TITLE = "Jigsaw"
APP_DESCRIPTION = "Backend"
APP_VERSION = "1.0"

# Model Settings
LOG_SIZE = 4 
