import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

// 1. CARGAR EL ARCHIVO .ENV MANUALMENTE
// Esto es obligatorio porque la CLI corre fuera de NestJS
dotenv.config();

// 2. DIAGNÓSTICO (Para ver si lee la contraseña)
console.log('------------------------------------------------');
console.log('DEBUG DATA-SOURCE:');
console.log('DB_USER:', process.env.DB_USER);
// Si sale UNDEFINED aquí, es que no está leyendo el .env
console.log('DB_PASS:', process.env.DB_PASS ? '****** (Detectado)' : 'UNDEFINED (Error)');
console.log('------------------------------------------------');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  // Forzamos a string para evitar el crash, pero si está vacío fallará la autenticación
  password: String(process.env.DB_PASS || ''), 
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