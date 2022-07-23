# Udacity Storefront

## Done By/ Abdelrahman Magdy 

#

## Scripts You may need 

### To install my dependencies and developer dependencies 

```
npm install
```
### To run The project using nodemon
```
npm start
```

### To Run Jasmine Tests
```
npm run test
```
### To Build Project
```
npm run build
```
### To run prettier
```
npm run prettify
```


### To run Eslint
```
npm run lint
```

### To fix Eslint
```
npm run lint:fix
```

### To run ts-watch
```
npm run watch
```

### To run migrations
```
npm run db:up
```

### To revoke last migration
```
npm run db:down
```
#
## Database Configuration 
- Default port  ``5432``
#
- ### Create 2 Databases 
```
CREATE DATABASE storefront;
```
```
CREATE DATABASE storefront_test;
```

- Configure .env to fit your environment (look at .env.example).

#
 ### If you faced problems in scripts running, Please make sure you've some packages globally installed in your Machine 
  (for windows) to make ENV in jasmine and test scripts working
  ```
  npm install -g win-node-env
  ```
  ```
  npm install -g @dotenv
  ```
-For jasmine scripts problems use these

```
  npm install -g jasmine-ts
  npm install -g jasmine
  npm install -g @types/jasmine
```
-If you faced problem in migration scripts use these

  ```
  npm install -g db-migrate

  npm install -g db-migrate-pg
  ```
  -If you faced problems for node js with typescript
  ```
  npm install -g ts-node
  ```