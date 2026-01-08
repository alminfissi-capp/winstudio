# Deploy su Railway.app

Questa guida spiega come fare il deploy dell'applicazione ALM-RMI su Railway.

## Prerequisiti

- Account Railway.app (gratis, $5 di credito mensile inclusi)
- Repository GitHub pushato
- Progetto Laravel funzionante localmente

## Setup Passo per Passo

### 1. Crea il Progetto su Railway

1. Vai su [railway.app](https://railway.app)
2. Fai login con GitHub
3. Clicca su "New Project"
4. Seleziona "Deploy from GitHub repo"
5. Autorizza Railway ad accedere al tuo repository
6. Seleziona il repository `winstudio`

### 2. Aggiungi PostgreSQL

1. Nel progetto Railway, clicca su "+ New"
2. Seleziona "Database" → "Add PostgreSQL"
3. Railway creerà automaticamente il database e le variabili d'ambiente

### 3. Configura le Variabili d'Ambiente

Nel servizio Laravel (non nel database), vai su "Variables" e aggiungi:

```bash
APP_NAME=ALM RMI
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:GENERA_UNA_NUOVA_KEY

APP_LOCALE=it
APP_FALLBACK_LOCALE=it
APP_FAKER_LOCALE=it_IT

LOG_CHANNEL=stack
LOG_LEVEL=info

# Railway collega automaticamente PostgreSQL, queste sono già impostate:
# DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

BROADCAST_CONNECTION=log
CACHE_STORE=database
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

SESSION_DRIVER=database
SESSION_LIFETIME=120

MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME=${APP_NAME}

BCRYPT_ROUNDS=12
```

**IMPORTANTE:** Genera una nuova APP_KEY con:
```bash
php artisan key:generate --show
```

### 4. Genera il Dominio Pubblico

1. Nel servizio Laravel, vai su "Settings"
2. Clicca su "Generate Domain" nella sezione "Networking"
3. Railway genererà un dominio tipo: `alm-rmi-production.up.railway.app`
4. Aggiungi la variabile d'ambiente:
   ```
   APP_URL=https://alm-rmi-production.up.railway.app
   ```
   (sostituisci con il tuo dominio effettivo)

### 5. Deploy Automatico

Railway farà automaticamente il deploy:
- Installa le dipendenze (Composer + Bun)
- Esegue il build del frontend (Vite)
- Esegue le migrazioni (`php artisan migrate --force`)
- Avvia il server

Guarda i log in tempo reale nella sezione "Deployments".

### 6. (Opzionale) Aggiungi Queue Worker

Se usi le code:

1. Clicca su "+ New" nel progetto
2. Seleziona "Empty Service"
3. Collega lo stesso repository GitHub
4. In "Settings" → "Deploy" → "Custom Start Command", inserisci:
   ```
   php artisan queue:work --tries=3 --timeout=90
   ```
5. Assicurati che usi le stesse variabili d'ambiente del servizio web

### 7. Dominio Personalizzato (Opzionale)

Se vuoi usare un dominio personalizzato:

1. Vai su "Settings" del servizio Laravel
2. Nella sezione "Networking" → "Custom Domain"
3. Aggiungi il tuo dominio (es: `app.tuodominio.it`)
4. Configura i DNS secondo le istruzioni di Railway
5. Aggiorna `APP_URL` con il nuovo dominio

## Comandi Utili

### Eseguire Comandi sul Server

Railway non ha SSH, ma puoi usare i "One-off Commands":

1. Vai sul servizio
2. Clicca sui tre puntini → "Run Command"
3. Esempi:
   ```bash
   php artisan tinker
   php artisan migrate:status
   php artisan cache:clear
   php artisan config:clear
   ```

### Vedere i Log

- Clicca su "Deployments" → seleziona l'ultimo deploy → "View Logs"
- Log in tempo reale disponibili

### Rollback

Se un deploy ha problemi:
1. Vai su "Deployments"
2. Seleziona un deploy precedente funzionante
3. Clicca sui tre puntini → "Redeploy"

## Struttura dei File

- `nixpacks.toml` - Configurazione build per Railway (PHP 8.4, Node.js 20, PostgreSQL)
- `Procfile` - Definisce i processi (web + worker opzionale)
- `.env.example.railway` - Template variabili d'ambiente per Railway

## Monitoraggio Costi

Railway offre:
- **$5 di credito gratuito al mese**
- **Pricing:** ~$0.000463/GB-hour RAM, ~$0.000231/vCPU-hour

Un'app piccola/media consuma ~$5-15/mese.

Controlla l'uso in "Usage" nel progetto.

## Troubleshooting

### Build Fallisce

- Controlla i log del build
- Verifica che `composer.json` e `package.json` siano validi
- Controlla che Bun sia configurato correttamente in `nixpacks.toml`

### Migrazioni Non Partono

- Verifica che PostgreSQL sia collegato
- Controlla le variabili d'ambiente del database
- Verifica che `APP_KEY` sia impostata

### Frontend Non Si Vede

- Verifica che `bun run build` sia eseguito durante il build
- Controlla che i file siano in `public/build`
- Verifica che `APP_URL` sia corretto

### 500 Internal Server Error

- Controlla i log in "Deployments"
- Verifica `APP_KEY` sia impostata
- Esegui `php artisan config:clear` tramite "Run Command"

## Backup Database

Railway non fa backup automatici nel piano gratuito. Per backup:

1. Usa "Run Command" per esportare:
   ```bash
   php artisan backup:run
   ```
2. Oppure connettiti al database PostgreSQL con le credenziali in "Variables"
3. Usa `pg_dump` localmente:
   ```bash
   pg_dump -h [PGHOST] -U [PGUSER] -d [PGDATABASE] > backup.sql
   ```

## Link Utili

- [Railway Docs](https://docs.railway.app/)
- [Railway Laravel Template](https://railway.app/template/laravel)
- [Railway Discord](https://discord.gg/railway) - Supporto community

## Deploy da CLI (Opzionale)

Installa Railway CLI:
```bash
npm i -g @railway/cli
railway login
railway link
railway up
```
