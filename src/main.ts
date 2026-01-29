import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173', // Front local (Vite)
      'http://127.0.0.1:5173',
      'https://yec-concesionario.desarrollo-software.xyz', // dominio backend (por seguridad)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('🚀 Backend levantado correctamente');
}

bootstrap();















