import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablasIniciales1768057758339 implements MigrationInterface {
    name = 'CrearTablasIniciales1768057758339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "marcas" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "activa" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_29f5713899c32a96a8900143c6f" UNIQUE ("nombre"), CONSTRAINT "PK_0dabf9ed9a15bfb634cb675f7d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modelos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "marcaId" integer, CONSTRAINT "PK_e9df275f890167381d41c793603" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "versiones" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "anio" integer NOT NULL, "motor" character varying NOT NULL, "transmision" character varying NOT NULL, "combustible" character varying NOT NULL, "precio" numeric NOT NULL, "activa" boolean NOT NULL DEFAULT true, "modeloId" integer, CONSTRAINT "PK_e1863a9b0fc1dfbc97180a103f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vehiculos_estado_enum" AS ENUM('disponible', 'reservado', 'vendido')`);
        await queryRunner.query(`CREATE TABLE "vehiculos" ("id" SERIAL NOT NULL, "vin" character varying NOT NULL, "color" character varying NOT NULL, "estado" "public"."vehiculos_estado_enum" NOT NULL DEFAULT 'disponible', "precio_final" numeric NOT NULL, "versionId" integer, CONSTRAINT "UQ_32c92fa0f6dd36f1dde1cc6a47b" UNIQUE ("vin"), CONSTRAINT "PK_bc0b75baae377e599cd46b502e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comparacion_vehiculos" ("id" SERIAL NOT NULL, "comparacionId" integer, "vehiculoId" integer, CONSTRAINT "PK_03a9d861b513d759895ce5c94bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comparaciones" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "usuario_id" integer NOT NULL, CONSTRAINT "PK_d3ba81a45014526e1d1479e5e66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_rol_enum" AS ENUM('admin', 'vendedor', 'cliente')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "password" character varying NOT NULL, "rol" "public"."usuarios_rol_enum" NOT NULL DEFAULT 'cliente', CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ventas" ("id" SERIAL NOT NULL, "precioFinal" numeric NOT NULL, "tipoCompra" character varying NOT NULL, "estadoVenta" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "usuarioId" integer, "vehiculoId" integer, CONSTRAINT "PK_b8b73abe8561829c019531d9a2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tramites" ("id" SERIAL NOT NULL, "tipoTramite" character varying NOT NULL, "estado" character varying NOT NULL, "ventaId" integer, CONSTRAINT "PK_163627d5c5cf7c25be3877451fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tramites_progreso" ("id" SERIAL NOT NULL, "descripcion" character varying NOT NULL, "estado" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "tramiteId" integer, CONSTRAINT "PK_2d1e53e2563a4e0dc4f453a8b5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."test_drive_estado_enum" AS ENUM('PENDIENTE', 'CONFIRMADO', 'CANCELADO')`);
        await queryRunner.query(`CREATE TABLE "test_drive" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "estado" "public"."test_drive_estado_enum" NOT NULL DEFAULT 'PENDIENTE', "usuarioId" integer, "vehiculoId" integer, CONSTRAINT "PK_f7f71908f29bb075811526c442e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mantenimientos" ("id" SERIAL NOT NULL, "fecha_estimada" date NOT NULL, "kilometraje_estimado" integer NOT NULL, "tipo_servicio" character varying(100) NOT NULL, "estado" character varying(20) NOT NULL, "venta_id" integer, CONSTRAINT "PK_610cd7f1e420b18c3d090ade2b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bancos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "tasa_interes_anual" numeric(5,2) NOT NULL, "plazo_maximo_meses" integer NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_00e3eb04f1e3597e19fd421b88f" UNIQUE ("nombre"), CONSTRAINT "PK_396683a88a4f8dd5483ce703c89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "financiamientos" ("id" SERIAL NOT NULL, "monto" numeric NOT NULL, "plazoMeses" integer NOT NULL, "cuotaMensual" numeric NOT NULL, "estado" character varying NOT NULL, "ventaId" integer, "bancoId" integer, CONSTRAINT "PK_a2606b7de90ba6a27c5d1d27bea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accesorios" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "precio" numeric(10,2) NOT NULL, "categoria" character varying(50) NOT NULL, "descripcion" text, CONSTRAINT "PK_3d94b855993a620df62178e2809" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "modelos" ADD CONSTRAINT "FK_9fad062a5dedf47ce2b173d9e16" FOREIGN KEY ("marcaId") REFERENCES "marcas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "versiones" ADD CONSTRAINT "FK_6794875005e2e05f13be205510b" FOREIGN KEY ("modeloId") REFERENCES "modelos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehiculos" ADD CONSTRAINT "FK_2c674ae6977981ed8157b1d07f4" FOREIGN KEY ("versionId") REFERENCES "versiones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comparacion_vehiculos" ADD CONSTRAINT "FK_b2c3ac42cf89dfa59b567ed6fef" FOREIGN KEY ("comparacionId") REFERENCES "comparaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comparacion_vehiculos" ADD CONSTRAINT "FK_48dabd0ed458812ed2e0f1d506a" FOREIGN KEY ("vehiculoId") REFERENCES "vehiculos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comparaciones" ADD CONSTRAINT "FK_5288c30bf72d18b4c9ceaf4e9a4" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_1754c58fc859f08df6854d52d44" FOREIGN KEY ("vehiculoId") REFERENCES "vehiculos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tramites" ADD CONSTRAINT "FK_4ebd3f85a8fab1f87667adc403f" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tramites_progreso" ADD CONSTRAINT "FK_c0e0a185ddb6f61e0f909fa5962" FOREIGN KEY ("tramiteId") REFERENCES "tramites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_drive" ADD CONSTRAINT "FK_80ef64c5ee7168a26735205be47" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_drive" ADD CONSTRAINT "FK_ccba434edb2c545614ebedef5a6" FOREIGN KEY ("vehiculoId") REFERENCES "vehiculos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mantenimientos" ADD CONSTRAINT "FK_cd4d58c1cc312549cbdca018c8f" FOREIGN KEY ("venta_id") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "financiamientos" ADD CONSTRAINT "FK_01ead77f252b9f4dfb5e3723277" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "financiamientos" ADD CONSTRAINT "FK_2e64a4cd3966fcddcc723460f54" FOREIGN KEY ("bancoId") REFERENCES "bancos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financiamientos" DROP CONSTRAINT "FK_2e64a4cd3966fcddcc723460f54"`);
        await queryRunner.query(`ALTER TABLE "financiamientos" DROP CONSTRAINT "FK_01ead77f252b9f4dfb5e3723277"`);
        await queryRunner.query(`ALTER TABLE "mantenimientos" DROP CONSTRAINT "FK_cd4d58c1cc312549cbdca018c8f"`);
        await queryRunner.query(`ALTER TABLE "test_drive" DROP CONSTRAINT "FK_ccba434edb2c545614ebedef5a6"`);
        await queryRunner.query(`ALTER TABLE "test_drive" DROP CONSTRAINT "FK_80ef64c5ee7168a26735205be47"`);
        await queryRunner.query(`ALTER TABLE "tramites_progreso" DROP CONSTRAINT "FK_c0e0a185ddb6f61e0f909fa5962"`);
        await queryRunner.query(`ALTER TABLE "tramites" DROP CONSTRAINT "FK_4ebd3f85a8fab1f87667adc403f"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_1754c58fc859f08df6854d52d44"`);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_ffe890346eb72924c06ff4df0a7"`);
        await queryRunner.query(`ALTER TABLE "comparaciones" DROP CONSTRAINT "FK_5288c30bf72d18b4c9ceaf4e9a4"`);
        await queryRunner.query(`ALTER TABLE "comparacion_vehiculos" DROP CONSTRAINT "FK_48dabd0ed458812ed2e0f1d506a"`);
        await queryRunner.query(`ALTER TABLE "comparacion_vehiculos" DROP CONSTRAINT "FK_b2c3ac42cf89dfa59b567ed6fef"`);
        await queryRunner.query(`ALTER TABLE "vehiculos" DROP CONSTRAINT "FK_2c674ae6977981ed8157b1d07f4"`);
        await queryRunner.query(`ALTER TABLE "versiones" DROP CONSTRAINT "FK_6794875005e2e05f13be205510b"`);
        await queryRunner.query(`ALTER TABLE "modelos" DROP CONSTRAINT "FK_9fad062a5dedf47ce2b173d9e16"`);
        await queryRunner.query(`DROP TABLE "accesorios"`);
        await queryRunner.query(`DROP TABLE "financiamientos"`);
        await queryRunner.query(`DROP TABLE "bancos"`);
        await queryRunner.query(`DROP TABLE "mantenimientos"`);
        await queryRunner.query(`DROP TABLE "test_drive"`);
        await queryRunner.query(`DROP TYPE "public"."test_drive_estado_enum"`);
        await queryRunner.query(`DROP TABLE "tramites_progreso"`);
        await queryRunner.query(`DROP TABLE "tramites"`);
        await queryRunner.query(`DROP TABLE "ventas"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_rol_enum"`);
        await queryRunner.query(`DROP TABLE "comparaciones"`);
        await queryRunner.query(`DROP TABLE "comparacion_vehiculos"`);
        await queryRunner.query(`DROP TABLE "vehiculos"`);
        await queryRunner.query(`DROP TYPE "public"."vehiculos_estado_enum"`);
        await queryRunner.query(`DROP TABLE "versiones"`);
        await queryRunner.query(`DROP TABLE "modelos"`);
        await queryRunner.query(`DROP TABLE "marcas"`);
    }

}
