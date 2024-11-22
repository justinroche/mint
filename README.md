# Mint

A web-based budgeting application

## Developer notes

To test all functionality of this application, you will need to run builds of both the front end and back end. If you are missing `./frontend/src/config/config.json` or `./backend/src/config/config.json`, the application will not run correctly. Feel free to contact me if you run into any issues.

### Running a back end build

Navigate to `./backend` and install all required dependencies:

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

### Running a front end build

In another terminal, navigate to `./frontend` and install all required npm packages:

```bash
npm i
```

Then start a development build:

```bash
npm run dev
```

The console will display the URL of the local server. Navigate to this address in a browser to access the application.
