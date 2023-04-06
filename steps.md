# Create a Movie API With Prisma/Express

## I. Project Setup

### 1.1 Create a new directory for your project and navigate into it:

```bash
mkdir prisma-movie-api
cd prisma-movie-api
```

### 1.2 Initialize a new Node.js project:

```bash
npm init -y
```

## 1.3 Install the necessary dependencies:

```bash
npm install express prisma @prisma/client
```

```bash
npm install typescript morgan ts-node ts-watch --save-dev
```

> @prisma/client is the Prisma client library that we'll use to interact with our database.

### 1.4 create a tsconfig.json file in your project root directory.

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

### 1.5 Create a new src directory for your TypeScript source code.

```bash
mkdir src
```

### 1.6 Modify the `scripts` section of package.json.

```json
 "scripts": {
    "start": "node dist/src/index.js",
    "dev": "npx tsc-watch --onSuccess \"node ./dist/src/server.js\"",
    "seed": "ts-node prisma/seed.ts",
    "class": "ts-node prisma/seeds/class_schedules.ts",
    "build": "tsc"
  },
```

### 1.7 Inside the src directory, create a new server.ts file. This will be the entry point for your Express.js server.

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

### 1.8 Run the server.

```bash
npm run dev
```

### 1.9 Initialize Prisma.

```bash
 npx prisma init
 ```

### 1.10 Configure the Prisma client

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

### 1.11 Create the router for movies.

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

### 1.12 Add the router to the server.

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

### 2.1 Create the database

```bash
createdb movie_db -O <user>
```

### 2.2 Update the database string in .env

 `DATABASE_URL="postgresql://<username>:<password>@localhost:5432/movie_db?schema=public"`

### 2.3 Create the schema

### 2.4 Create the movies model in prisma/schema.prisma

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

### 2.5 Run the migration

```bash
npx prisma migrate dev --name=<migration_name>
```

### 2.6 Seed the Database

#### 2.6.1 Create the seed files

```bash
mkdir prisma/seeds
touch prisma/seeds/movies.ts
touch prisma/seeds/actors.ts
touch prisma/seeds/casting.ts
touch prisma/seed.ts
```

#### 2.6.2 Create the template in prisma/seeds.ts

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

#### 2.6.3 Seed the movies

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

#### 2.6.4 Run Prisma Studio

 `npx prisma studio`

## III. Create the Handlers

### 3.1 Create the folder

```bash
mkdir src/handlers
```

### 3.2 Create the Movies Handler

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

### 3.3 Modify the movieRouter

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

### 3.4 Add the getMovieById Handler

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

### 3.5 Add the route in movieRouter

 `router.get('/:id', getMovieById);`

### 3.6 Create the updateMovie handler

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

### 3.7 Add the route in movieRouter

`router.put('/:id', updateMovie);`

### 3.8 Add the deleteMovie Handler

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

### 3.9 Add the route in movieRouter

 `router.delete('/:id', deleteMovie);`

## IV. Create the Actor Data Model

### 4.1 Update the schema

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

### 4.2 Run the migration

 `npx prisma migrate dev --name=adding_actor`

### 4.3 Add the actors to the seed file

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

### 4.4 Run the seed

* `npx prisma migrate reset`
* `npm run seed`
* `npx prisma studio` to see the result in the browser

## V. Add the CRUD handlers for actors

### 5.1 Create the getAllActors handler

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

### 5.2 Create the actorRouter

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

### 5.3 Add the router to the server

 `app.use('/api/v1/actors/', actorRouter);`

### 5.4 Create all the other CRUD handlers for actors

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

### 5.5 Update the actorRouter

```javascript
router.get('/', getAllActors);
router.get('/:id', getActorById);
router.put('/:id', getActorById);
router.delete('/:id', deleteActor);
```

## VI. Create the casting model and add the relationships

### 6.1 Add the casting data model and the relationships

```prisma
model Movie {
  id                 Int       @id @default(autoincrement())
  title              String
  release_date       DateTime
  casting            Casting[]
  runtime_in_minutes Int
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
}

model Actor {
  id            Int       @id @default(autoincrement())
  first_name    String
  last_name     String
  date_of_birth DateTime
  casting       Casting[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Casting {
  id       Int    @id @default(autoincrement())
  movie_id Int
  actor_id Int
  movie    Movie? @relation(fields: [movie_id], references: [id])
  actor    Actor? @relation(fields: [actor_id], references: [id])
}
```

### 6.2 Run the migration

 `npx prisma migrate dev --name=adding_casting`

### 6.3 Add the seed for casting

```javascript
async function main() {
    await prisma.movie.createMany({
        data: movies,
    });

    await prisma.actor.createMany({
        data: actors,
    });

    await prisma.casting.createMany({
        data: casting,
    });
}
```

Execute:
* `npx prisma migrate reset`
* `npm run seed`
* `npx prisma studio`

## VII. Update the movie and actor handlers

### 7.1 Update the actor handler

```javascript
export const getAllActors = async (req, res) => {
  const actors = await prisma.actor.findMany({
    include: {
      casting: {
        select: {
          movie: true,
        },
      },
    },
  });
  ```
### 7.2 Update the movie handler

```javascript
export const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      casting: {
        select: {
          actor: true,
        },
      },
    },
  });

```
