# Mint

A web-based budgeting application

## Developer notes

To test all functionality of this application, you will need to run builds of both the front end and back end. If you are missing `./frontend/src/config/config.json` or `./backend/src/config/config.json`, the application will not run correctly. Contact me if you run into any issues.

### Running a front end build

Navigate to `./frontend` and install all required npm packages:

```bash
npm i
```

Then start a development build:

```bash
npm run dev
```

### Running a back end build

In another terminal, navigate to `./backend` and install all required dependencies:

```bash
npm i
```

Next, execute this command to compile the TypeScript and copy the config files:

```bash
npm run build
```

Finally, start the Node application:

```bash
npm run start
```

If all goes well, the back end console should read:

```
Server is running on http://localhost:8080
Connected to database
```
