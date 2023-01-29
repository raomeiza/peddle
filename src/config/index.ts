import path from 'path';

require('dotenv').config();
// use the port query to configure the platform dependent env configs
// lastly set the port
export const PORT = process.env.PORT ? process.env.PORT : 5001;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DATABASE_URL = process.env.PORT
  ? process.env.DATABASE_URL : 'mongodb://127.0.0.1:27017/peddle';
export const BASE_URL = process.env.PORT ? process.env.BASE_URL : `http://localhost:${PORT}/`;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
  || 'iaowuebpiqupiwr8qb4pq39yrvwyveiwqpbrpiqy8y34yq377v5q45yy5';

export const GOOGLE_CONFIG_REDIRECT_URI = process.env.PORT
  ? process.env.GOOGLE_CONFIG_REDIRECT_URI : 'http://localhost:5000/auth/google/callback';

export const BASE_DIR = path.join(__dirname, '..', '..');
export const PUBLIC_DIR = path.join(BASE_DIR, 'public');
export const UPLOAD_DIR = path.join(PUBLIC_DIR, 'static', 'uploads');
export const FRONTEND_URL = `${process.env.BASE_URL}/app`;
export const FRONT_END_PATH = path.join(BASE_DIR, 'public', 'app');
