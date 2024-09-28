Ecco la versione aggiornata del README con l'aggiunta della configurazione del database, ma senza dettagli tecnici:

# 📸 SELFIE - Progetto Tech Web

## 👥 Membri del gruppo
- **Bernardo Macchioni Montini** - `0001020402`
- **Filippo Nardon** - `0001020635`

---

## 🛠️ Tecnologie utilizzate
Il progetto è stato sviluppato utilizzando **Next.js**, insieme a **React** e **TypeScript**. Per lo stile abbiamo scelto **Tailwind CSS**.

---

## 📂 Struttura del progetto
- **`public/`**: contiene alcune immagini e la logica per il login e la registrazione (_scritta in JavaScript_).
- **`models/`**: definisce gli schemi del database.
- **`app/`**: include il layout e le varie sezioni del sito:
  - `auth/login-register/`: gestione della registrazione e dell'accesso.
  - `homepage/`: pagina principale del sito.
  - `note/`: gestione delle note.
  - `pomodoro/`: timer Pomodoro.
  - `calendario/`: gestione degli eventi e del calendario.

---

## ⚙️ Configurazione del Database
> Gli utenti e i relativi eventi e attività vengono inseriti nel database in fase di configurazione iniziale per testare la funzionalità dell'applicazione.


### 👤 Utenti e i loro eventi/attività

#### 🧑‍💻 **Utente 1** (`fv1`)
- **Username**: `fv1`
- **Password**: `12345678`
  
##### 📅 Eventi:
- **Titolo**: Evento Utente 1
  - **Data inizio**: 27 settembre 2024, 16:11
  - **Data fine**: 28 settembre 2024, 16:11
  - **All-day**: No
  - **Ripetizione**: No

##### 📋 Attività:
- **Titolo**: Attività Utente 1
  - **Data inizio**: 29 settembre 2024, 16:11
  - **Data fine**: 30 settembre 2024, 16:11
  - **Completato**: No

---

#### 🧑‍💻 **Utente 2** (`fv2`)
- **Username**: `fv2`
- **Password**: `12345678`
  
##### 📅 Eventi:
- **Titolo**: Evento Utente 2
  - **Data inizio**: 27 ottobre 2024, 16:11
  - **Data fine**: 28 ottobre 2024, 16:11
  - **All-day**: No
  - **Ripetizione**: No

##### 📋 Attività:
- **Titolo**: Attività Utente 2
  - **Data inizio**: 29 ottobre 2024, 16:11
  - **Data fine**: 30 ottobre 2024, 16:11
  - **Completato**: No

---

#### 🧑‍💻 **Utente 3 - 7** (`fv3`, `fv4`, `fv5`, `fv6`, `fv7`)
- **Username**: `fv3`, `fv4`, `fv5`, `fv6`, `fv7`
- **Password**: `12345678`
  
> Gli utenti da `fv3` a `fv7` sono stati creati nel database, ma attualmente non hanno eventi o attività associati.

---

## 🔄 Contributi individuali

### 🖥️ Bernardo Macchioni Montini
- Sviluppo della **homepage** e **anteprima delle note**.
- Implementazione delle **notifiche** e delle **notifiche push**.
- Gestione del **calendario**, **attività** e **lista attività**.
- Creazione delle **note** (supporto markdown).
- Implementazione del **Pomodoro**.
- Contributi in alcune parti dei **models** del database.
- Implementazione di **login** e **registrazione**.
- Sviluppo delle **API per le attività**.

### 🖥️ Filippo Nardon
- Sviluppo dell'**anteprima degli eventi** e **Pomodoro** nella homepage.
- Implementazione delle **notifiche**.
- Aggiunta di "**eventi Pomodoro**" nel calendario e nella lista eventi.
- Creazione delle **note** (supporto markdown).
- Integrazione del **Pomodoro** con gli "**eventi Pomodoro**".
- Contributo nei **models** del database.
- Implementazione di **login** e **registrazione**.
- Sviluppo delle **API**.

---

## 🧰 Tecnologie scelte
- **Next.js**: framework principale per lo sviluppo del sito.
- **React**: libreria per la costruzione delle interfacce utente.
- **TypeScript**: per una tipizzazione più sicura del codice.
- **Tailwind CSS**: framework per la gestione degli stili.

---

🎉 Grazie per aver consultato il nostro progetto!

---