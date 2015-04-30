# Readme

## Translate
Neue Texte finden und in den Sprachen einsetzten (ggf. * mit Sprache ersetzen):
```bash
msgmerge -U client/po/*.po client/po/template.po
```

ggf. Exportieren mit:
```bash
grunt nggettext_extract
grunt nggettext_compile
```

## Install für Passenger
Anlegen einer app.js im Root-Verzeichnis

```javascript
/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = require('./server/app');

// Expose app
exports = module.exports = app;
```

Anhängigkeiten installieren:
```bash
npm install --production
```
bzw.
```bash
sudo -u USER -H npm install --production
```

Apache neustarten/aktualisieren:
```bash
systemctl reload httpd
```
