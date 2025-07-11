# My Next.js App

## Running Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/<your-username>/<repository-name>.git
    cd <repository-name>
    ```

2. Build the Docker image:
    ```bash
    docker build -t my-nextjs-app .
    ```

3. Run the Docker container:
    ```bash
    docker run -p 3000:3000 my-nextjs-app
    ```

4. Visit `http://localhost:3000` in your browser to see the app.
