import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const rutaArchivo = path.join(process.cwd(), '.env');
  console.log('\n==================================================');
  console.log('DIAGNÓSTICO DE INICIO:');
  console.log('Buscando archivo en:', rutaArchivo);

  if (fs.existsSync(rutaArchivo)) {
    console.log('✅ ¡EL ARCHIVO .env EXISTE!');
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    if (contenido.includes('DB_PASS')) {
      console.log('✅ El archivo parece contener la configuración DB_PASS.');
    } else {
      console.log('❌ El archivo existe pero NO TIENE la variable DB_PASS dentro.');
    }
  } else {
    console.log('❌ ERROR CRÍTICO: No se encuentra el archivo .env');
    console.log('⚠️  Es muy probable que se llame ".env.txt"');
  }
  console.log('==================================================\n');

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();