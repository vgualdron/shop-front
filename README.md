# Quasar App (quasar-project)

A Quasar Project

Este proyecto tiene integración continua y despliegue continuo.
Cuando se lanza cambios a la rama master, se suben los cambios al repo en github, y en github 
se ejecuta un pipeline para que cuando se tomen los cambios, se compile y se cree la nueva 
version de la app y se suba al servidor de micomercio.com.co en hostinger.

La api tambien está montado en ese mismo servidor.


Para que se apliquen los cambios en la PWA se debe modificar el register-service-worker.js dentro de /src-pwa
y modificar el quasar.conf.js

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
