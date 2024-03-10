### Install dependencies
#### composer
```shell
composer install --prefer-dist
```

####npm
```shell
npm install
```

### Create initial database
Here we are using MySQL, you need to create schema, run this file
`database/migrations/init_database.sql`
<br>
OR run this direct on your MySQL server
```sql
CREATE DATABASE posts_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Run migrations
```shell
php artisan migrate
```
create user and posts table

### Users and posts seeders
```shell
php artisan db:seed
```
this will persist 2 Users and 100 posts randomly set to users <br>
You can login using these fixed credentials
```json
{
    "email": "hamza@gmail.com",
    "password": 12345678
}
```

```json
{
    "email": "john@gmail.com",
    "password": 12345678
}
```

### Run application
App will run on localhost:8000
#### Run Laravel
open new terminal
```shell
php artisan serve
```

#### Run Vite with React
open new terminal
```shell
npm run dev
```

