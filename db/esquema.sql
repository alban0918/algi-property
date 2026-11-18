-- Base de datos de interesados de ALGI Property (Postgres en Neon).
-- Crear o actualizar con: npm run db:esquema   (o pegarlo en el editor SQL de Neon).
-- Es idempotente: se puede ejecutar varias veces sin perder datos.

-- Personas que descargaron una ficha técnica y autorizaron el contacto.
CREATE TABLE IF NOT EXISTS interesados (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  creado        timestamptz NOT NULL DEFAULT now(),
  nombre        text NOT NULL CHECK (char_length(nombre) BETWEEN 2 AND 80),
  telefono      text NOT NULL CHECK (telefono ~ '^\+[0-9]{8,15}$'),
  correo        text CHECK (correo IS NULL OR char_length(correo) <= 120),
  propiedad     text NOT NULL,
  idioma        text NOT NULL CHECK (idioma IN ('es', 'en')),
  -- Versión de la política de datos que aceptó (src/content/privacidad.ts).
  politica      text NOT NULL,
  aviso_enviado boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS interesados_creado_idx ON interesados (creado DESC);
CREATE INDEX IF NOT EXISTS interesados_telefono_idx ON interesados (telefono);

-- Huellas cifradas de IP para limitar envíos automáticos. Se borran solas al día.
CREATE TABLE IF NOT EXISTS intentos (
  ip_hash text NOT NULL,
  creado  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS intentos_ip_creado_idx ON intentos (ip_hash, creado);
