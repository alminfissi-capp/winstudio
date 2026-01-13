# Product Requirements Document (PRD)
## ALM RMI - Rilievo Misure Infissi Interattivo

**Versione:** 1.0
**Data:** 13 Gennaio 2026
**Autore:** Team di Sviluppo ALM RMI

---

## 1. Panoramica del Progetto

### 1.1 Contesto
**ALM** è un'azienda di Palermo specializzata nella produzione e installazione di serramenti e infissi.

- **Sito web:** https://alminfissi.it/
- **Sede:** Palermo, Italia
- **Settore:** Serramenti, infissi, porte e finestre

### 1.2 Problema
Attualmente, il processo di rilievo misure e configurazione serramenti richiede:
- Strumenti multipli (metro, carta, calcolatrice, cataloghi)
- Tempo elevato per calcoli manuali
- Rischio di errori nelle misure e preventivi
- Difficoltà nel comunicare visivamente al cliente il risultato finale

### 1.3 Soluzione
**RMI (Rilievo Misure Infissi Interattivo)** è una webapp mobile-first che permette a tecnici e venditori di:
- Configurare serramenti in modo visuale e intuitivo
- Prendere misure direttamente in cantiere o a casa del cliente
- Visualizzare in tempo reale il serramento con quote precise
- Generare preventivi automatici (fase successiva)

---

## 2. Obiettivi del Prodotto

### 2.1 Obiettivi di Business
- Ridurre i tempi di rilievo misure del 60%
- Minimizzare errori di misurazione e preventivazione
- Migliorare l'esperienza cliente con visualizzazione realistica
- Digitalizzare il processo di vendita

### 2.2 Obiettivi Utente
- Creare configurazioni di serramenti in <3 minuti
- Modificare misure con drag-and-drop intuitivo
- Scegliere rapidamente tra preset comuni (1/2/3 ante)
- Lavorare offline in cantiere (fase successiva)

---

## 3. Target Utenti

### 3.1 Profili Utente
1. **Tecnici in cantiere**
   - Età: 25-55 anni
   - Device: Smartphone/Tablet Android/iOS
   - Contesto: Cantieri, abitazioni clienti
   - Esigenza: Velocità, semplicità, funzionamento anche con connessione limitata

2. **Venditori in ufficio**
   - Età: 30-60 anni
   - Device: Desktop/Laptop
   - Contesto: Ufficio commerciale
   - Esigenza: Precisione, visualizzazione dettagliata, esportazione preventivi

3. **Amministratori**
   - Ruolo: Gestione catalogo, pricing, utenti
   - Device: Desktop
   - Contesto: Back-office

---

## 4. Funzionalità del Prodotto

### 4.1 MVP (Minimum Viable Product) - Fase 1

#### 4.1.1 Frame Builder - Canvas Interattivo
- **Visualizzazione SVG** realistica del serramento con:
  - Telai grigi/bianchi
  - Vetri azzurri/blu traslucidi
  - Simboli di apertura (croce, cerchio)
  - Quote dinamiche (larghezza x altezza)

- **Handles interattivi** per ridimensionamento:
  - Drag verticale/orizzontale per modificare misure
  - Snap a valori standard (es. 100mm, 50mm)
  - Vincoli min/max (es. larghezza minima 400mm)

- **Input numerico preciso**:
  - Tastierino numerico overlay (stile PVC Win Studio)
  - Validazione in tempo reale
  - Unità di misura: mm

#### 4.1.2 Gestione Preset
- **Preset predefiniti** (seedati in database):
  1. **1 Anta**: Finestra singola con apertura a battente
  2. **2 Ante**: Finestra doppia simmetrica
  3. **3 Ante**: Finestra tripla (porta-finestra con pannelli laterali)

- **Selezione rapida** dalla bottom navbar:
  - Badge numerici (1, 2, 3)
  - Click per applicare preset
  - Conferma visuale immediata

#### 4.1.3 Gestione Progetti
- **Creazione progetto**:
  - Nome progetto (es. "Casa Rossi - Soggiorno")
  - Cliente (opzionale in MVP)
  - Note (opzionale)

- **Lista progetti**:
  - Vista elenco con anteprima
  - Ricerca e filtri base
  - Ultima modifica

#### 4.1.4 UI/UX Mobile-First
- **Layout**:
  - Header: Logo + nome progetto + menu hamburger
  - Canvas centrale: Disegno serramento a schermo intero
  - Bottom navbar:
    - Pulsante `+` (blu): Aggiungi frame al progetto
    - Preset configurati: Badge con icone (1/2/3 ante)
    - Icona strumenti (verde): Funzioni avanzate (fase successiva)

- **Tema**:
  - Sfondo grigio chiaro (#E5E5E5)
  - Accenti blu (#4A90E2) per azioni primarie
  - Verde (#7ED321) per strumenti
  - Rosso/Rosa (#FF5A5F) per selezione attiva

### 4.2 Funzionalità Future (Post-MVP)

#### Fase 2 - Calcolo Prezzi
- Listino materiali (PVC, Alluminio, Legno)
- Calcolo automatico al mq/ml
- Sconti e margini
- Esportazione preventivo PDF

#### Fase 3 - Funzionalità Avanzate
- Sopraluce e sottoluce
- Tipi di apertura (scorrevole, vasistas, bilico)
- Materiali e colori personalizzabili
- Accessori (tapparelle, zanzariere, scuri)

#### Fase 4 - Collaborazione
- Condivisione progetti
- Approvazione cliente via link
- Firma digitale preventivi

---

## 5. Specifiche Tecniche

### 5.1 Stack Tecnologico

**Backend:**
- Laravel 12.46.0
- PHP 8.4.11
- PostgreSQL (produzione)
- SQLite (sviluppo locale)

**Frontend:**
- React 19
- TypeScript 5.9.3
- Inertia.js 2.0.18
- Tailwind CSS 4
- shadcn/ui (Radix UI)

**Build & Deploy:**
- Vite 7.3.1
- Bun (package manager)
- Railway (hosting)

**Rendering Canvas:**
- **SVG** per il disegno dei serramenti (scalabile, interattivo, React-friendly)

### 5.2 Modelli Database

#### `projects`
```php
- id: bigint
- user_id: bigint (FK)
- name: string
- description: text (nullable)
- created_at, updated_at: timestamp
```

#### `frames`
```php
- id: bigint
- project_id: bigint (FK)
- frame_preset_id: bigint (FK, nullable)
- width: integer (mm)
- height: integer (mm)
- config: json (configurazione dettagliata)
- created_at, updated_at: timestamp
```

#### `frame_presets`
```php
- id: bigint
- name: string (es. "1 Anta", "2 Ante")
- description: text
- num_panels: integer (1, 2, 3)
- default_width: integer (mm)
- default_height: integer (mm)
- svg_template: text (template SVG)
- created_at, updated_at: timestamp
```

### 5.3 API Endpoints (Inertia.js)

**Routes Web:**
```php
// Progetti
GET  /projects              -> ProjectController@index
GET  /projects/create       -> ProjectController@create
POST /projects              -> ProjectController@store
GET  /projects/{id}         -> ProjectController@show
GET  /projects/{id}/edit    -> ProjectController@edit
PUT  /projects/{id}         -> ProjectController@update
DELETE /projects/{id}       -> ProjectController@destroy

// Frame Builder
GET  /projects/{id}/builder -> FrameBuilderController@show
POST /frames                -> FrameController@store
PUT  /frames/{id}           -> FrameController@update
DELETE /frames/{id}         -> FrameController@destroy
```

---

## 6. Design di Riferimento

### 6.1 Ispirazione
**PVC Win Studio** (Android App)
Link: https://play.google.com/store/apps/details?id=com.blogspot.turbocolor.winstudio&hl=it

**Screenshot forniti mostrano:**
- Canvas centrale con serramento realistico
- Quote interattive con handles
- Bottom navbar con preset
- Tastierino numerico overlay
- Calcoli in tempo reale (area, perimetro, costo)

### 6.2 Linee Guida UI
- **Mobile-first**: Ottimizzato per smartphone (320px-428px)
- **Responsive**: Adattabile a tablet e desktop
- **Pulito e minimale**: Focus sul canvas, UI non invasiva
- **Feedback immediato**: Ogni azione deve avere riscontro visivo
- **Accessibilità**: Contrasti WCAG AA, touch target >44px

---

## 7. Metriche di Successo

### 7.1 KPI di Adozione
- Numero progetti creati/settimana
- Tempo medio per configurazione (target: <3min)
- Tasso di completamento configurazioni (target: >80%)

### 7.2 KPI di Qualità
- Errori di misurazione riportati (target: <5%)
- Crash rate (target: <1%)
- Tempo di caricamento canvas (target: <1s)

### 7.3 KPI di Business
- Tempo rilievo misure vs. metodo tradizionale (target: -60%)
- Soddisfazione utente (NPS target: >8/10)
- Conversione preventivo -> ordine (monitoraggio post-fase 2)

---

## 8. Roadmap

### Q1 2026 - MVP
- ✅ Setup progetto Laravel + React
- ✅ Modelli database (Project, Frame, FramePreset)
- ⏳ Frame Builder UI (canvas SVG + interattività)
- ⏳ Gestione preset (1/2/3 ante)
- ⏳ CRUD progetti

### Q2 2026 - Fase 2
- Calcolo prezzi e preventivi
- Esportazione PDF
- Gestione materiali

### Q3 2026 - Fase 3
- Funzionalità avanzate (sopraluce, tipi apertura)
- Personalizzazione materiali/colori
- Accessori (tapparelle, zanzariere)

### Q4 2026 - Fase 4
- Modalità offline
- Condivisione e approvazione clienti
- Firma digitale

---

## 9. Rischi e Mitigazioni

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Performance SVG su dispositivi entry-level | Media | Alto | Ottimizzazione rendering, lazy loading |
| Complessità UX per utenti non tech-savvy | Alta | Alto | User testing continuo, tutorial interattivi |
| Precisione misure su touch screen | Media | Medio | Implementare input numerico + snap grid |
| Connettività limitata in cantiere | Alta | Medio | Modalità offline (Q4 2026) |

---

## 10. Stakeholder

**Cliente/Product Owner:**
- ALM Infissi (Palermo)

**Team di Sviluppo:**
- Full-stack Developer
- Designer UI/UX (consulenza)

**Utenti Finali:**
- Tecnici ALM (5-10 persone)
- Venditori ALM (3-5 persone)
- Admin (1-2 persone)

---

## 11. Criteri di Accettazione MVP

- [ ] Utente può creare un nuovo progetto
- [ ] Utente può selezionare preset (1/2/3 ante)
- [ ] Canvas mostra disegno realistico del serramento
- [ ] Utente può modificare larghezza/altezza tramite handles drag
- [ ] Utente può inserire misure precise tramite tastierino numerico
- [ ] Misure si aggiornano in tempo reale sul canvas
- [ ] Progetto viene salvato in database
- [ ] UI è responsive e funzionante su mobile (iOS/Android)
- [ ] App è deployata su Railway e accessibile via HTTPS

---

## 12. Riferimenti

- **ALM Infissi:** https://alminfissi.it/
- **PVC Win Studio:** https://play.google.com/store/apps/details?id=com.blogspot.turbocolor.winstudio&hl=it
- **Laravel 12 Docs:** https://laravel.com/docs/12.x
- **React 19 Docs:** https://react.dev
- **Inertia.js:** https://inertiajs.com
- **Tailwind CSS 4:** https://tailwindcss.com

---

**Fine del documento**
