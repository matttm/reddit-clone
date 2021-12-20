!bin/bash

# builds it
npm run dev &

sleep 10

# run migrations to create db structure
npx typeorm migration:run
