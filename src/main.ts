import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // =======================
  // DIAGNÓSTICO .env
  // =======================
  const rutaArchivo = path.join(process.cwd(), '.env');
  console.log('\n==================================================');
  console.log('DIAGNÓSTICO DE INICIO:');
  console.log('Buscando archivo en:', rutaArchivo);

  if (fs.existsSync(rutaArchivo)) {
    console.log('✅ ¡EL ARCHIVO .env EXISTE!');
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    if (contenido.includes('DB_PASS')) {
      console.log('✅ El archivo contiene la variable DB_PASS.');
    } else {
      console.log('❌ El archivo existe pero NO tiene la variable DB_PASS.');
    }
  } else {
    console.log('❌ ERROR: No se encuentra el archivo .env');
    console.log('⚠️  Revisa que no sea ".env.txt"');
  }
  console.log('==================================================\n');

  // =======================
  // APP
  // =======================
  const app = await NestFactory.create(AppModule);

  // ✅ CORS (OBLIGATORIO PARA EL FRONTEND)
  app.enableCors({
    origin:[
      'http://localhost:5173'
    ],
     // Vite
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Backend corriendo en http://localhost:${process.env.PORT ?? 3000}`);
}

bootstrap();
