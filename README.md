<div align="center">
  <br />
  <h1>🚀 Bun NestJS Template</h1>
  <p>
    Plantilla de backend lista para clonar y empezar a construir.<br />
    <b>NestJS · Fastify · Prisma 7 · Better Auth</b> — todo corriendo <b>100% sobre Bun</b>.
  </p>
</div>

<p align="center">
  <img alt="Bun" src="https://img.shields.io/badge/Bun-1.4-000000?style=for-the-badge&logo=bun&logoColor=white" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-12-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img alt="Fastify" src="https://img.shields.io/badge/Fastify-5-000000?style=for-the-badge&logo=fastify&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="libSQL" src="https://img.shields.io/badge/libSQL-SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img alt="Better Auth" src="https://img.shields.io/badge/Better_Auth-1.7-000000?style=for-the-badge&logo=betterauth&logoColor=white" />
</p>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-4-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
  <img alt="oxlint" src="https://img.shields.io/badge/oxlint-1-000000?style=for-the-badge&logo=oxc&logoColor=white" />
  <img alt="Google OAuth" src="https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</p>

<p align="center">
  <img alt="Template" src="https://img.shields.io/badge/Template_Repository-2ea44f?style=for-the-badge&logo=github&logoColor=white" />
  <img alt="Licencia" src="https://img.shields.io/badge/Licencia-UNLICENSED-red?style=for-the-badge" />
</p>

---

## ✨ Características

- **Autenticación completa sin escribirla**: email y contraseña funcionando desde el primer arranque, y Google OAuth listo para activar pegando tus credenciales. Sesiones firmadas con cookie `HttpOnly`.
- **Rutas protegidas por defecto**: un guard global cierra toda la API. Abres lo que quieras con un decorador, no al revés.
- **Base de datos tipada**: Prisma 7 con SQLite vía libSQL, migraciones versionadas y cliente con tipos generados.
- **Migración de auth incluida**: los modelos `User`, `Session`, `Account` y `Verification` ya están creados. Cero configuración manual.
- **100% Bun**: runtime, gestor de paquetes y ejecución de TypeScript. Sin Node, sin compilación previa, `.env` cargado automáticamente.
- **Calidad integrada**: `typecheck` con TypeScript, `lint` con oxlint consciente de tipos y formato con Prettier.
- **Tests listos para escribir**: Vitest configurado para unitarios y end-to-end, atacando la app real con `inject()` de Fastify.
- **Pensada para reutilizar**: conviértela en *template repository* de GitHub y arráncala en todos tus proyectos con el mismo comando.

---

## 🛠️ Stack de Tecnologías

- **Runtime**: [Bun](https://bun.sh/) — ejecuta TypeScript directamente y carga `.env` sin librerías
- **Framework**: [NestJS](https://nestjs.com/) 12 — estructura, inyección de dependencias y guards
- **Servidor HTTP**: [Fastify](https://fastify.dev/) 5 — el adaptador de mayor rendimiento de Nest
- **ORM**: [Prisma](https://www.prisma.io/) 7 — tipado fuerte y migraciones versionadas
- **Base de datos**: SQLite vía [libSQL](https://turso.tech/libsql) — sin bindings nativos rotos y migrable a Turso con una URL
- **Autenticación**: [Better Auth](https://better-auth.com/) — login social y por email sin implementar OAuth a mano
- **Tests**: [Vitest](https://vitest.dev/) 4 — compatible con la API de Jest y muy rápido
- **Lint**: [oxlint](https://oxc.rs/) — escrito en Rust, con análisis consciente de tipos

---

## 📋 Requisitos Previos

- [Bun](https://bun.sh/) **≥ 1.4** — es el único requisito real
- Una cuenta de Google, **solo** si vas a activar el login social

> No necesitas Node.js, ni Docker, ni una base de datos externa: SQLite es un fichero local.

---

## 🚀 Cómo Empezar

### 1. Crea tu proyecto

Desde GitHub, con el botón **"Use this template" → "Create a new repository"**. O desde la terminal:

```bash
gh repo create mi-nuevo-proyecto --template tu-usuario/tu-template --private --clone
cd mi-nuevo-proyecto
```

### 2. Instala las dependencias

```bash
bun install
```

### 3. Configura las variables de entorno

Copia la plantilla y rellena los valores vacíos:

```bash
cp .env.example .env
```

Después genera el secreto que firma las sesiones y pégalo en `BETTER_AUTH_SECRET`:

```bash
openssl rand -base64 32
```

Este es el contenido del archivo, con lo que hace cada variable:

```env
# ─── Base de datos (SQLite vía libSQL) ──────────────────────────────
DATABASE_URL="file:./prisma/dev.db"

# ─── Better Auth ────────────────────────────────────────────────────
# Genera uno NUEVO en cada proyecto:  openssl rand -base64 32
BETTER_AUTH_SECRET=""
# URL pública de esta API (debe coincidir con el redirect URI de Google)
BETTER_AUTH_URL="http://localhost:3000"

# ─── Frontend (CORS + trustedOrigins) ───────────────────────────────
FRONTEND_URL="http://localhost:3000"

# ─── Google OAuth → https://console.cloud.google.com/auth/clients ───
# Redirect URI autorizado:  <BETTER_AUTH_URL>/api/auth/callback/google
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

| Variable | Para qué sirve |
| :--- | :--- |
| `DATABASE_URL` | Ruta del fichero SQLite. Por defecto `file:./prisma/dev.db` |
| `BETTER_AUTH_SECRET` | Firma las sesiones. **Nunca lo compartas entre proyectos** |
| `BETTER_AUTH_URL` | URL pública de la API. Debe coincidir con el redirect URI de Google |
| `FRONTEND_URL` | Origen del frontend: se usa para CORS y `trustedOrigins` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Credenciales del login social |

> `FRONTEND_URL` viene apuntando al mismo puerto que la API para que las pruebas con `curl` de este README funcionen sin tocar nada. Cámbialo al origen real de tu frontend cuando lo tengas.

### 4. Crea las tablas y genera el cliente

```bash
bunx prisma migrate dev
bunx prisma generate
```

> La migración de Better Auth ya viene incluida, así que `migrate dev` crea `user`, `session`, `account` y `verification` sin que tengas que escribir el esquema de auth.
>
> ⚠️ En Prisma 7, `migrate dev` **ya no ejecuta `generate` automáticamente**. Si te saltas el segundo comando, al arrancar verás `Cannot find module '.../prisma/generated/client.js'`.

### 5. ¡Inicia la aplicación!

```bash
bun run start:dev
```

¡Listo! La API estará en `http://localhost:3000` y podrás comprobar que responde:

```bash
curl http://localhost:3000/api/auth/ok
# {"ok":true}
```

> El puerto está fijado en `src/main.ts` (`app.listen(3000, '0.0.0.0')`). Cámbialo ahí si necesitas otro.

---

## 🔑 Activar el Login con Google

Si solo vas a usar email y contraseña, **sáltate este paso**: funciona sin configurar nada.

1. Entra en [Google Cloud Console → Clients](https://console.cloud.google.com/auth/clients)
2. Crea un proyecto y configura la pantalla de consentimiento (*Branding* + *Audience: External*)
3. Mientras esté en modo **Testing**, añade tu cuenta en **Test users** (si no, Google bloqueará el acceso)
4. **Create client → Web application** y añade este *Authorized redirect URI*:

   ```
   http://localhost:3000/api/auth/callback/google
   ```

   > ⚠️ Es la URL de **tu API**, no la del frontend. `localhost` y `127.0.0.1` son distintos para Google.
5. Copia el **Client ID** y el **Client Secret** a tu `.env`

> El *secret* de Google se muestra **una sola vez**. Guárdalo en ese momento o tendrás que generar otro.

---

## ⚙️ Uso de la API

- **URL Base**: `http://localhost:3000/api/auth`
- **Autenticación**: cookie `HttpOnly` que Better Auth establece en el login y elimina en el logout. Las peticiones protegidas solo necesitan enviar la cookie.

### Resumen de Endpoints

| Método | Ruta | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/auth/ok` | Comprueba que el servicio está vivo. | ❌ |
| `POST` | `/api/auth/sign-up/email` | Registra un nuevo usuario. | ❌ |
| `POST` | `/api/auth/sign-in/email` | Inicia sesión y devuelve la cookie. | ❌ |
| `POST` | `/api/auth/sign-in/social` | Inicia sesión con Google. | ❌ |
| `GET` | `/api/auth/callback/google` | Retorno desde Google (lo usa el flujo). | ❌ |
| `GET` | `/api/auth/get-session` | Devuelve la sesión actual (`null` si no hay). | ❌ |
| `POST` | `/api/auth/sign-out` | Cierra la sesión del usuario. | ➖ |

> ➖ = responde `200` siempre; si envías la cookie, además revoca la sesión.
>
> Estos endpoints son **públicos por naturaleza** (tienen que serlo para poder iniciar sesión). El guard global protege **tus** rutas, no estas.

**Prueba rápida** sin necesidad de frontend:

```bash
# Ver la URL de autorización que se genera para Google
curl -s -X POST http://localhost:3000/api/auth/sign-in/social \
  -H 'content-type: application/json' \
  -H 'Origin: http://localhost:3000' \
  -d '{"provider":"google","callbackURL":"/"}'
```

---

## 🔄 Cómo Funciona el Login

```
  Navegador               Tu API (/api/auth/*)              Google
      │                            │                          │
      │  1. signIn.social          │                          │
      │───────────────────────────>│                          │
      │                            │  2. redirige             │
      │<───────────────────────────│                          │
      │  3. el usuario elige cuenta y acepta ────────────────>│
      │                            │<── 4. ?code=... ─────────│
      │                            │  5. canjea el código     │
      │                            │─────────────────────────>│
      │                            │<── id_token + perfil ────│
      │                            │  6. guarda User + Account│
      │                            │     y crea una Session   │
      │<── 7. cookie de sesión ────│                          │
```

A partir de ahí el navegador solo manda la cookie, y `get-session` devuelve el usuario.

---

## 🗂️ Estructura del Proyecto

```
.
├── src
│   ├── main.ts                 # Arranque: Fastify, prefijo /api y CORS
│   ├── app.module.ts           # Módulo raíz: engancha auth + base de datos
│   ├── auth
│   │   └── auth.ts             # Configuración de Better Auth (Google, email, sesiones)
│   └── database
│       ├── prisma.module.ts    # Módulo global de Prisma (inyectable en cualquier sitio)
│       └── prisma.service.ts   # Cliente Prisma + adaptador libSQL
├── prisma
│   ├── schema.prisma           # Modelos (User, Session, Account, Verification)
│   ├── migrations/             # Historial de migraciones (versionado en git)
│   └── generated/              # Cliente generado (ignorado por git)
├── prisma7.config.ts           # Configuración de la CLI de Prisma
├── vitest.config.ts            # Tests unitarios
├── vitest.config.e2e.ts        # Tests de extremo a extremo
└── .oxlintrc.json              # Reglas de lint
```

---

## 🛡️ Proteger Rutas

El guard es **global**: por defecto **toda la API está protegida**. Abre solo lo que necesites.

```ts
import { Controller, Get } from '@nestjs/common';
import { Session, UserSession, AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('tasks')
export class TasksController {
  // Solo usuarios con sesión válida
  @Get()
  list(@Session() session: UserSession) {
    return { userId: session.user.id, tasks: [] };
  }

  // Pública
  @AllowAnonymous()
  @Get('health')
  health() {
    return { ok: true };
  }
}
```

| Decorador | Efecto |
| :--- | :--- |
| *(ninguno)* | Requiere una sesión válida |
| `@AllowAnonymous()` | No requiere autenticación |
| `@OptionalAuth()` | Funciona con o sin sesión |
| `@Roles(['admin'])` | Requiere `user.role`. **Necesita el plugin admin de Better Auth**, que no viene instalado |

---

## 🧠 Decisiones Técnicas

Esta sección es el motivo por el que existe esta plantilla: son las trampas que ya están resueltas.

| Decisión | Por qué |
| :--- | :--- |
| **libSQL en vez de `better-sqlite3`** | El binding nativo de `better-sqlite3` **no funciona en Bun** (`ERR_DLOPEN_FAILED`). El adaptador de libSQL sí, y además te permite saltar a Turso cambiando solo la URL. |
| **`runtime = "bun"` en el generator** | El cliente de Prisma se genera para el runtime de Bun: más rápido y coherente, pero implica que **la API debe ejecutarse con Bun**, no con Node. |
| **`bun src/main.ts` en vez de `nest start`** | Bun transpila el TypeScript al vuelo. Al no haber compilación previa, desaparece de raíz el error `TS6059` que aparece cuando el cliente generado vive fuera de `src`. |
| **`bodyParser: false`** | Better Auth necesita controlar el parseo del cuerpo de las peticiones. La librería vuelve a registrar los parsers para el resto de rutas. |
| **CORS de auth desde `trustedOrigins`** | En Fastify las rutas de auth se montan como middleware, así que **`@fastify/cors` no las cubre**. Better Auth aplica el CORS a esas rutas a partir de `trustedOrigins`. |
| **`dotenv` solo para la CLI** | La app **no** lo necesita: Bun carga `.env` automáticamente. La CLI de Prisma sí, porque su archivo de configuración lo importa. |
| **`prisma/generated` fuera de git** | Es un artefacto: se regenera con `bunx prisma generate`. Igual que `dev.db`, que es tu base de datos local. |
| **`trustProxy` activado** | Detrás de un proxy o balanceador, sin esto la cookie no se marca como `Secure` y la sesión no persiste en producción. |

---

## 🧩 Añadir tu Primer Modelo

```bash
# 1. Edita prisma/schema.prisma y añade tu modelo, por ejemplo Task
# 2. Crea y aplica la migración
bunx prisma migrate dev --name add_tasks

# 3. Regenera el cliente tipado
bunx prisma generate
```

Y ya puedes inyectar `PrismaService` en cualquier servicio:

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // `task` existe a partir del modelo que acabas de añadir
    return this.prisma.task.findMany();
  }
}
```

---

## 🧪 Tests

```bash
bun run test        # unitarios  (*.spec.ts)
bun run test:e2e    # end-to-end (*.e2e-spec.ts)
bun run test:cov    # con cobertura
```

Con Fastify se usa `app.inject()`, no `supertest`:

```ts
const res = await app.inject({ method: 'GET', url: '/api/auth/ok' });
expect(res.statusCode).toBe(200);
```

> Recuerda repetir `app.setGlobalPrefix('api')` en los tests: vive en `main.ts`, no en el módulo.

---

## 📜 Scripts Útiles

| Script | Descripción |
| :--- | :--- |
| `bun run start:dev` | Inicia la app en desarrollo con recarga automática. |
| `bun run start` | Inicia la app sin vigilancia de ficheros. |
| `bun run start:debug` | Inicia la app con el inspector de Bun activado. |
| `bun run start:prod` | Inicia la app en modo producción. |
| `bun run build` | Empaqueta la aplicación en `dist/` con `bun build`. |
| `bun run typecheck` | Comprueba los tipos sin generar nada (`tsc --noEmit`). |
| `bun run lint` | Analiza el código con oxlint (consciente de tipos). |
| `bun run format` | Formatea el código con Prettier. |
| `bun run test` | Ejecuta las pruebas unitarias. |
| `bun run test:watch` | Ejecuta las pruebas en modo vigilancia. |
| `bun run test:cov` | Ejecuta las pruebas con cobertura. |
| `bun run test:e2e` | Ejecuta las pruebas end-to-end. |
| `bun run test:debug` | Ejecuta las pruebas con el depurador de Node. |

> `build` genera un bundle en `dist/`, pero **`start:prod` no lo usa**: ejecuta `bun src/main.ts`. Si quieres servir el bundle, arranca con `bun dist/main.js`.

---

## 📦 Usar esta Plantilla

### Conviértela en plantilla (una sola vez)

En GitHub: **Settings → General →** marca **"Template repository"**.

### Checklist en cada proyecto nuevo

1. 🔐 **Genera un `BETTER_AUTH_SECRET` nuevo** (`openssl rand -base64 32`). No reutilices el de otro proyecto: ese secreto firma las sesiones.
2. 🔑 **Credenciales de Google propias** y registra el nuevo redirect URI.
3. 📝 Renombra `name` en `package.json` y ajusta `BETTER_AUTH_URL` y `FRONTEND_URL`.
4. 🗄️ Ejecuta `bunx prisma migrate dev` y luego `bunx prisma generate`.

---

## 🚑 Problemas Comunes

| Error | Causa y solución |
| :--- | :--- |
| `Cannot find module '.../prisma/generated/client.js'` | Falta el cliente generado. Ejecuta `bunx prisma generate`. |
| `Prisma schema mismatch: Missing tables` al arrancar | El cliente está desactualizado respecto al esquema. `bunx prisma generate` y reinicia. |
| `Error: The datasource.url property is required` | La CLI de Prisma no encontró el `.env`. Comprueba que existe y que `prisma7.config.ts` conserva el `import "dotenv/config"`. |
| `redirect_uri_mismatch` (lo dice Google) | El *Authorized redirect URI* no coincide **exactamente** con `<BETTER_AUTH_URL>/api/auth/callback/google`. Ojo: `localhost` y `127.0.0.1` son distintos, y sobra cualquier barra final. |
| El login falla en el navegador pero funciona con `curl` | `FRONTEND_URL` no coincide con el origen real del frontend, y Better Auth bloquea los orígenes que no están en `trustedOrigins`. |
| `Acceso bloqueado: esta app no ha completado el proceso de verificación` | La pantalla de consentimiento sigue en modo **Testing** y tu cuenta no está en **Test users**. |
| Todas mis rutas responden `401` | Es el guard global. Marca como públicas las que deban serlo con `@AllowAnonymous()`. |

---

## 🔐 Seguridad

- **Nunca subas tu `.env`.** Ya está en `.gitignore`, pero tenlo presente al copiar ficheros entre proyectos.
- **Un `BETTER_AUTH_SECRET` por proyecto.** Si se filtra uno, no deben caer todos.
- **Revisa `trustedOrigins`** antes de producción: es la lista de orígenes autorizados a hablar con tu auth.
- **`FRONTEND_URL` y `BETTER_AUTH_URL`** deben apuntar a URLs reales en producción, o Google rechazará el login con `redirect_uri_mismatch`.

---

## 📄 Licencia

**UNLICENSED** — el repositorio es público, pero no tiene una licencia de código abierto que conceda permisos explícitos de uso, copia o modificación.

Si quieres que otras personas puedan reutilizar la plantilla libremente, añade un archivo `LICENSE` con MIT.

<div align="center">
  <br />
  <sub>Hecho para no volver a configurar lo mismo dos veces.</sub>
  <br />
  <br />
</div>
