# DueTomorrow
[duetomorrow.ca](http://duetomorrow.ca/)

A to-do list to track assignments, courses, and grades. Comes with a built-in GPA calculator! Excuse the backend developer UI, react rewrite is in the works (check out the rewrite-react branch!)

## Assignment list
![image](https://user-images.githubusercontent.com/35351784/225179616-779cc5ad-1f07-4fcd-ab48-36c7c2f519fd.png)

## GPA Calculator
![image](https://user-images.githubusercontent.com/35351784/225179880-5fe50844-8c4c-4cb2-b258-e286e91845cb.png)


### Getting Started
1. Clone the repository
    ```sh
    git clone https://github.com/JAWalmsley/DueTomorrow.git
    ```

2. Add env file to supply these variables
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
