export const BoilerPlates = () => {
  return [
    `import dotenv from 'dotenv'`,
    `dotenv.config()\n`,
    `import mongoose from 'mongoose'`,
    `mongoose.connect(process.env.DB!)`,
    `.then(() => console.log("DB Connected Successfully!"))`,
    `.catch(() => console.log("DB Disconnected!"))\n`,
    `import express, { Request, Response } from 'express'`,
    `import cookieParser from 'cookie-parser'`,
    `import cors from 'cors'\n`,
    `const app = express()\n`,
    `app.use(express.json())`,
    `app.use(express.urlencoded({ extended: false }))`,
    `app.use(cookieParser())`,
    `app.use(cors({`,
    `  origin: process.env.CLIENT_URL,`,
    `  credentials: true`,
    `}))\n`,
    `app.get("/", (req: Request, res: Response) => {
  res.send(\`<!DOCTYPE html>
  <html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Rnode</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  background:linear-gradient(135deg,#0f172a,#1e293b);
  font-family:Arial,sans-serif;
  color:white;
}

h1{
  font-size:70px;
  color:#38bdf8;
  margin-bottom:15px;
  text-shadow:0 0 20px rgba(56,189,248,0.7);
}

a{
  font-size:24px;
  color:#facc15;
  text-decoration:none;
  padding:10px 20px;
  border:2px solid #facc15;
  border-radius:10px;
  transition:0.3s;
}

a:hover{
  background:#facc15;
  color:#000;
}
</style>
</head>

<body>
  <h1>🚀 Rnode</h1>
  <a>Developed By : Er Ravi</a>
</body>
</html>
\`)
})\n`,

    `app.listen(process.env.PORT, () => {
  console.log(\`Server is Running on Port \${process.env.PORT}\`)
})`
  ].join('\n');
};


export const boilerEnv = () => {
  return [
    `NODE_ENV=dev`,
    `DB=mongodb://localhost:27017/rnode`,
    `PORT=4000`,
    `CLIENT_URL=http://localhost:3000`,
    `CLIENT_DOMAIN=localhost`,
    `SERVER_URL=http://localhost:4000`
  ].join(`\n`)
}

export const packageBoiler = () => {
  const data = {
    "name": "rnode",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "dev": "ts-node-dev --transpile-only src/main.ts",
      "build": "tsc",
      "start": "node dist/main.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": "commonjs",
    "dependencies": {
      "cookie-parser": "^1.4.7",
      "cors": "^2.8.6",
      "dotenv": "^17.4.2",
      "express": "^5.2.1",
      "mongoose": "^9.6.2",
      "typescript": "^6.0.3"
    },
    "devDependencies": {
      "@types/cookie-parser": "^1.4.10",
      "@types/cors": "^2.8.19",
      "@types/express": "^5.0.6",
      "ts-node": "^10.9.2",
      "ts-node-dev": "^2.0.0"
    }
  }
  return JSON.stringify(data, null, 2)
}

export const tsconfigBoiler = () => {
  const data = {
    "compilerOptions": {
      "target": "ES2020",
      "module": "NodeNext",
      "moduleResolution": "NodeNext",
      "rootDir": "./src",
      "outDir": "./dist",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "ignoreDeprecations": "6.0"
    },

    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
  }
  return JSON.stringify(data, null, 2)
}