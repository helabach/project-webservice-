# Job Management System

A project for managing job offers and candidate applications using **NestJS** and **GraphQL**.

## Features

- User authentication (JWT)
- Manage job offers (CRUD)
- Manage candidate applications (CRUD)
- Role-based access control
- GraphQL API
- TypeOrm & Postrgres

## Project Structure

```
└── 📁src
  └── 📁auth
    └── auth.controller.ts
    └── auth.module.ts
    └── auth.service.ts
    └── 📁dto
      └── login.dto.ts
    └── 📁guard
      └── auth.guard.ts
    └── 📁strategy
      └── jwt.strategy.ts
  └── 📁candidature
    └── candidature.module.ts
    └── candidature.resolver.ts
    └── candidature.service.ts
    └── 📁dto
      └── create-candidature.input.ts
      └── update-candidature.input.ts
    └── 📁entities
      └── candidature.entity.ts
  └── 📁db
    └── data-source.ts
  └── 📁decorator
    └── logged-user.decorator.ts
  └── 📁enums
    └── candidature-status.enum.ts
    └── offer-type.enum.ts
  └── 📁offer
    └── 📁dto
      └── create-offer.input.ts
      └── update-offer.input.ts
    └── 📁entities
      └── offer.entity.ts
    └── offer.module.ts
    └── offer.resolver.ts
    └── offer.service.ts
  └── 📁users
    └── 📁dto
      └── create-user.input.ts
      └── update-user.input.ts
    └── 📁entities
      └── user.entity.ts
    └── users.module.ts
    └── users.resolver.ts
    └── users.service.ts
  └── app.module.ts
  └── main.ts
  └── schema.gql
```

## Project Structure Explanation

- **auth/**  
  Handles authentication logic.

  - `auth.controller.ts`, `auth.service.ts`, `auth.module.ts`: Main files for authentication features.
  - `dto/`: Data Transfer Objects for authentication (e.g., login data).
  - `guard/`: Contains guards like `auth.guard.ts` to protect routes.
  - `strategy/`: Authentication strategies, such as JWT.

- **candidature/**  
  Manages candidature-related features.

  - `candidature.module.ts`, `candidature.resolver.ts`, `candidature.service.ts`: Core candidature logic.
  - `dto/`: DTOs for creating/updating candidatures.
  - `entities/`: Entity definitions for candidature.

- **db/**  
  Database configuration and connection logic.

  - `data-source.ts`: Sets up the database source.

- **decorator/**  
  Custom decorators for the project.

  - `logged-user.decorator.ts`: Extracts the logged-in user from requests.

- **enums/**  
  Enum definitions for shared constants.

  - `candidature-status.enum.ts`, `offer-type.enum.ts`: Status and type enums.

- **offer/**  
  Handles offer-related features.

  - `offer.module.ts`, `offer.resolver.ts`, `offer.service.ts`: Core offer logic.
  - `dto/`: DTOs for creating/updating offers.
  - `entities/`: Entity definitions for offers.

- **users/**  
  Manages user-related features.

  - `users.module.ts`, `users.resolver.ts`, `users.service.ts`: Core user logic.
  - `dto/`: DTOs for creating/updating users.
  - `entities/`: Entity definitions for users.

- **app.module.ts**  
  Root module that imports all feature modules.

- **main.ts**  
  Application entry point.

- **schema.gql**  
  GraphQL schema definition.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start required services with Docker:**

   ```bash
   docker compose up --build --detach
   ```

3. **Run the development server:**
   ```bash
   npm run start:dev
   ```

## Technologies Used

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [Docker](https://www.docker.com/)

## License

This project is licensed under the MIT License.
