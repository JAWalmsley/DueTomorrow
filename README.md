# DueTomorrow
[duetomorrow.ca](http://duetomorrow.ca/)

A to-do list to track assignments, courses, and grades. Comes with a built-in GPA calculator!

## Assignment list
<img width="1908" height="904" alt="image" src="https://github.com/user-attachments/assets/e0112d2a-2b33-4355-bcf4-8f8adf9d2578" />


## GPA Calculator
<img width="1919" height="914" alt="image" src="https://github.com/user-attachments/assets/36f409c2-31bf-4664-9580-3d574617dac6" />


## Manage Courselist
<img width="1908" height="904" alt="image" src="https://github.com/user-attachments/assets/fa920f64-734c-4d55-b40a-06860c379949" />


## Share Courses with Friends
<img width="1150" height="387" alt="image" src="https://github.com/user-attachments/assets/08464ee4-f289-4979-b7fb-e1e91a96a7d2" />



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
