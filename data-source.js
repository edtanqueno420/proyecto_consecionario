import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS || ''), // Forzamos a string para evitar errores
  database: process.env.DB_NAME,
  synchronize: false, 
  logging: true,
  entities: [
    join(__dirname, '**', '*.entity.{ts,js}')
  ],
  migrations: [
    join(__dirname, 'migrations', '*.{ts,js}')
  ],
});