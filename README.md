# Sistema de Gestión - Concesionaria de Vehículos

Este proyecto es una API REST robusta desarrollada con **NestJS** para la gestión integral de una concesionaria, permitiendo el control de inventario de vehículos, autenticación de usuarios y gestión de ventas.

---

## 1. Instalación y Configuración

Sigue estos pasos para configurar el entorno de desarrollo local:

### Requisitos previos
* **Node.js** (v18 o superior recomendado)
* **NPM** o **Yarn**
* Bases de datos instalada PGSQL y MONGODB

### Pasos de Instalación
1. **Clonar el repositorio:**
   ```bash
   git clone <https://github.com/edtanqueno420/proyecto_consecionario.git>
   cd nombre-de-tu-proyecto
2. **Instalar dependencias:**
npm install

3. Configurar variables de entorno: Crea un archivo llamado .env en la raíz del proyecto y completa los siguientes campos:
PORT=3000
DATABASE_URL="mysql://root:password@localhost:3306/concesionaria_db"
JWT_SECRET="mi_clave_secreta_super_segura"

4. Sincronizar base de datos: Si usas TypeORM o Prisma, ejecuta las migraciones correspondientes:

    npm run migration:run

5. Ejecución del Backend

Para iniciar el servidor, utiliza uno de los siguientes comandos:
Bash

# Modo desarrollo (con recarga automática al guardar cambios)
npm run start:dev

# Modo producción
npm run start:prod