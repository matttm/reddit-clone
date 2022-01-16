!bin/bash

# builds it
npm run dev &
server=$!

sleep 10

# run migrations to create db structure
# npx typeorm migration:run

read  -n 1 -p "Press any key to kill server:" mainmenuinput
kill -9 $server
