!bin/bash

# builds it
npm run dev

# run migrations to create db structure
npx typeorm migration:run
