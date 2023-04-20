
## Prerequistes

- node v19
- npm v9

## Installing the project

- the server
```
   $ npm i
   $ echo "SESSION_SECRET=<secrect-code>" > .env
```

- the website:

```
 $ cd src/fe/
 $ npm i
 $ echo "REACT_APP_API_URL=http://localhost:8000" > .env

```

optionaly create the `.env.production` and `.env.development` with the same structure as the `.env` above
the `.env.production` can have "REACT_APP_API_URL=''" if you plan to move the build to the `express` server


## Testing the project:
### 1. Frontend build
 - bulid is done with the `react` default config, after that the code is to be move to the main directory
```
 $ npm run build
 $ mv build ../../
```

### 2. Start Server

```
 $ npm run dev
```

it will serve the FE sorted in the `build` dir


