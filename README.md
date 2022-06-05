# Installation

1. npm i
2. Run this query in your db: <br>`SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`
3. npm run table
4. npm run start
