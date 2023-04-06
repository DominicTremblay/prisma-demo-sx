# Create a Movie API With Prisma/Express

## I. Project Setup

01. Create a new directory for your project and navigate into it:

```bash
mkdir prisma-movie-api
cd prisma-movie-api
```

02. Initialize a new Node.js project:

```bash
npm init -y
```

03. Install the necessary dependencies:

```bash
npm install express prisma @prisma/client
```

```bash
npm install typescript morgan ts-node ts-watch --save-dev
```

> @prisma/client is the Prisma client library that we'll use to interact with our database.

04. create a tsconfig.json file in your project root directory.

```bash
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "./dist",
    "strict": false,
    "moduleResolution": "node",
    "lib": [
      "ESNext"
    ],
    "esModuleInterop": true
  }
}
```

05. Create a new src directory for your TypeScript source code.

```bash
mkdir src
```

06. Modify the `scripts` section of package.json.

```json
 "scripts": {
    "start": "node dist/src/index.js",
    "dev": "npx tsc-watch --onSuccess \"node ./dist/src/server.js\"",
    "seed": "ts-node prisma/seed.ts",
    "class": "ts-node prisma/seeds/class_schedules.ts",
    "build": "tsc"
  },
```

07. Inside the src directory, create a new server.ts file. This will be the entry point for your Express.js server.

```bash
touch src/server.ts
```

```javascript
const PORT = process.env.PORT || 3001;
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.json({
        msg: 'API Home'
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
```

08. Run the server.

```bash
npm run dev
```

09. Initialize Prisma.

```bash
 npx prisma init
 ```

10. Configure the Prisma client

```bash
mkdir db
touch db/index.ts
```

```javascript
import {
    PrismaClient
} from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

11. Create the router for movies.

```bash
mkdir src/routers
touch src/routers/movieRouter.ts
```

```javascript
import {
    Router
} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'getting the list of movies'
    });
});

export default router;
```

12. Add the router to the server.

```javascript
import express from 'express';
import morgan from 'morgan';
import movieRouter from './routers/movieRouter';

const PORT = process.env.PORT || 3001;
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/v1/movies/', movieRouter);

app.get('/', (req, res) => {
    res.json({
        msg: 'API Home'
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
```

## II. Database Setup

01. Create the database

```bash
createdb movie_db -O labber
```

02. Update the database string in .env

 `DATABASE_URL="postgresql://<username>:<password>@localhost:5432/movie_db?schema=public"`

03. Create the schema

3.1 Create the movies model in prisma/schema.prisma

```prisma
model Movie {
  id                 Int      @id @default(autoincrement())
  title              String
  release_date       DateTime
  runtime_in_minutes Int
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}
```

3.2 Run the migration

```bash
npx prisma migrate dev --name=<migration_name>
```

04. Seed the Database

4.1 Create the seed files

```bash
mkdir prisma/seeds
touch prisma/seeds/movies.ts
touch prisma/seeds/actors.ts
touch prisma/seeds/casting.ts
touch prisma/seed.ts
```

4.2 Create the template in prisma/seeds.ts

```javascript
import {
    PrismaClient
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
```

  4.3 Seed the movies

  + Modify seed.ts with the code below and run `npx run seed`

```javascript
...

async function main() {
    await prisma.movie.createMany({
        data: movies,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
```

4.4 Run Prisma Studio

 `npx prisma studio`

## III. Create the Handlers

01. Create the folder

```bash
mkdir src/handlers
```

02. Create the Movies Handler

```bash
touch src/handlers/movies.ts
```

```javascript
import prisma from '../../db';

export const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany({});

    res.json({
        data: movies
    });
};
```

03. Modify the movieRouter

```javascript
import {
    Router
} from 'express';
import {
    getAllMovies
} from '../handlers/movies';

const router = Router();

router.get('/', getAllMovies);

export default router;
```

04. Add the getMovieById Handler

```Javascript
export const getMovieById = async (req, res) => {
    const id = Number(req.params.id);

    const movie = await prisma.movie.findUnique({
        where: {
            id,
        },
    });
    res.json({
        data: movie
    });

};
```

05. Add the route in movieRouter

 `router.get('/:id', getMovieById);`

06. Create the updateMovie handler

```javascript 
export const updateMovie = async (req, res) => {
  const id = Number(req.params.id); 

  const movie = await prisma.movie.update({

    where: {
      id,
    },
    data: req.body, 

  }); 

  res.json({ data: movie }); 
}; 

```

07. Add the route in movieRouter

`router.put('/:id', updateMovie);`

08. Add the deleteMovie Handler

```javascript
export const deleteMovie = async (req, res) => {
  const id = Number(req.params.id);

  const movie = await prisma.movie.delete({
    where: {
      id,
    },
  });

  res.json({ data: movie });
};
```

09. Add the route in movieRouter

 `router.delete('/:id', deleteMovie);`

## IV. Create the Actor Data Model

4.1 Update the schema

```prisma
model Actor {
  id            Int      @id @default(autoincrement())
  first_name    String
  last_name     String
  date_of_birth DateTime
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

4.1 Run the migration

 `npx prisma migrate dev --name=adding_actor`

4.2 Add the actors to the seed file

```javascript
async function main() {
    await prisma.movie.createMany({
        data: movies,
    });

    await prisma.actor.createMany({
        data: actors,
    });
}
```

4.3 Run the seed

* `npx prisma migrate reset`
* `npm run seed`
* `npx prisma studio` to see the result in the browser

## V. Add the CRUD handlers for actors

5.1 Create the getAllActors handler

```bash
touch src/handlers/actors.ts
```

```javascript
import prisma from '../../db';

export const getAllActors = async (req, res) => {
    const actors = await prisma.actor.findMany();

    res.json({
        data: actors
    });
};
```

5.3 Create the actorRouter

```bash
touch src/routers/actorRouter.ts
```

```javascript
import {
    Router
} from 'express';
import {
    getAllActors
} from '../handlers/actors';

const router = Router();

router.get('/', getAllActors);

export default router;
```

5.4 Add the router to the server

 `app.use('/api/v1/actors/', actorRouter);`

5.5 Create all the other CRUD handlers for actors

```javascript
export const getActorById = async (req, res) => {
    const id = Number(req.params.id);

    const actor = await prisma.actor.findUnique({
        where: {
            id,
        },
    });
    res.json({
        data: actor
    });
};

export const updateActor = async (req, res) => {
    const id = Number(req.params.id);

    const actor = await prisma.actor.update({
        where: {
            id,
        },
        data: req.body,
    });

    res.json({
        data: actor
    });
};

export const deleteActor = async (req, res) => {
    const id = Number(req.params.id);

    const actor = await prisma.actor.delete({
        where: {
            id,
        },
    });

    res.json({
        data: actor
    });
};
```

5.6 Update the actorRouter

```javascript
router.get('/', getAllActors);
router.get('/:id', getActorById);
router.put('/:id', getActorById);
router.delete('/:id', deleteActor);
```


