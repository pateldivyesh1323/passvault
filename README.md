# Passvault
  
Passvault redefines the way we handle passwords, bringing an innovative dual-layer encryption approach to the table for an unmatched level of security. By letting users provide their own encryption keys in client-side encryption, we ensure that passwords are shielded right from the start, well before they ever touch our servers. On top of that, server-side encryption adds an extra layer of protection. PassVault isn't your run-of-the-mill password manager; it's more like a dedicated guardian, offering users the confidence that their sensitive information is not just secured but doubly so. It goes beyond mere management, giving users a real sense of control and peace of mind in today's expansive digital landscape. 

  ![image](https://github.com/pateldivyesh1323/passvault/assets/109150688/b8b05ac5-4e59-4fdd-b4fd-1fb76ac4387d)

### Visit Passvault: [https://passvault.vercel.app](https://passvault.vercel.app)

Feel free to contribute to the project.

### Steps to setup passvault locally

- Clone the repository

  ```bash
  git clone https://github.com/pateldivyesh1323/passvault
  ```

- Open passvault in terminal

  ```bash
   cd passvault
   ```

- Open Client

  ```bash
   cd client
  ```

- Install dependencies of client

  ```bash
   npm install
  ```

- Create .env and copy contents of .env.sample. Make sure to fill all enviroment variables.

  ```bash
   cp .env.sample .env
  ```

- Run Client

  ```bash
   npm run dev
  ```

- ***Follow same steps for server which were followed for client***

Client will start running on 
  ```bash
    http://localhost:5173 
  ```

Server will start running on
  ```bash
    http://localhost:8000
  ```
