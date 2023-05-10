# DueTomorrow
[duetomorrow.ca](http://duetomorrow.ca/)

A to-do list to track assignments, courses, and grades. Comes with a built-in GPA calculator!

## Assignment list
![image](https://github.com/JAWalmsley/DueTomorrow/assets/35351784/53d748c9-b6a0-4434-842e-1650f0d359ed)

## GPA Calculator
![image](https://github.com/JAWalmsley/DueTomorrow/assets/35351784/e667bb65-00b3-4502-aef7-7da5cb476ddc)

## Manage Courselist
![image](https://github.com/JAWalmsley/DueTomorrow/assets/35351784/52d302eb-e787-44ff-96b5-aac6e81cb75f)

### Getting Started
1. Clone the repository
    ```sh
    git clone https://github.com/JAWalmsley/DueTomorrow.git
    ```

2. Add `.env` file to supply these variables
```sh
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
JWT_SECRET=
```

3. Build UI
    ```sh
    cd apps/ui
    npm install
    npm run build
    ```

4. Run container (from root directory)
    ```sh
    sudo docker-compose up -d
    ```
