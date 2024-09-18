import path from 'path';
import { config } from 'dotenv';

// Cargar el archivo `.env` usando `dotenv`
config({ path: path.join(new URL('.', import.meta.url).pathname, '../../.env') });
