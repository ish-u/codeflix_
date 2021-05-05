# codeflix


* [Requirement](https://github.com/ish-u/codeflix_/blob/main/docs/RequirementElicitation.pdf)
* [SRS](https://github.com/ish-u/codeflix_/blob/main/docs/SoftwareRequirementSpecification-SRS.pdf)
* [Estimation](https://github.com/ish-u/codeflix_/blob/main/docs/ProjectEstimation-FP_COCOMO.pdf)
* [Design and Testing](https://github.com/ish-u/codeflix_/blob/main/docs/StrutureCharts_Testing.pdf)

### Demo : https://code-flix.netlify.app/
![demo](docs/demo.gif)

## Run Locally

### Clone the Repository

```
git clone https://github.com/ish-u/codeflix_.git
```

### Setup Server and API

- Install Packages

    ```
    cd server
    npm install
    ```

- Create a MongoDB Atlas account and obtain the URI for your Cluster:-

    - [Set Up Atlas](https://docs.atlas.mongodb.com/getting-started/?tck=docs_driver_nodejs)
    - [Create a Database in your Cluster and Connect to Cluser](https://docs.mongodb.com/drivers/node/quick-start/)
    - Generate YOUR SECRET KEY using `require('crypto).randomBytes(64).toString('hex')`
    - Set Up `.env` file with the following variables

    ```
    DB_CONNECTION = {YOUR CLUSTER URI}
    ACCESS_TOKEN_SECRET = {YOUR SECRET KEY}
    ```
- Run the Server using
    ```
    npm run dev
    ```
- Use [Postman](https://www.postman.com/) to make a `POST` request on `http://localhost:5000/codeflix/addChannel?url=https://www.youtube.com/user/cs50tv` to populate the database


### Setup Client
- Install Packages

    ```
    cd client
    npm install
    ```
- Set Up `.env` file as following:
    ```
    VUE_APP_CODEFLIX_API=http://localhost:5000/codeflix
    ```
- Run the Client using either
    ```
    yarn serve 
    ```
    ```
    npm run serve
    ```
### The Application will be live at `http://localhost:8080/`

###### _Just another Product of my Existential Crisis_
