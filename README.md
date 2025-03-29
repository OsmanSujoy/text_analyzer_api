
# Text Analyzer API

This project is a **Text Analyzer API** built using **Node.js**, **Express**, **Prisma**, and **Swagger**. The API allows you to perform various text analysis operations like word count, character count, sentence count, paragraph count, and fetching the longest words in a paragraph. The API interacts with a **PostgreSQL database**.

## Setup Instructions

### 1. Install Dependencies

Clone the repository and install all dependencies:

```bash
npm install
```


### 2. Configure Database

In the `.env` file, update the `DATABASE_URL` to point to your PostgreSQL database:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname?schema=public
```

Make sure to replace `username`, `password`, and `dbname` with your actual PostgreSQL database credentials.

### 3. Deploy the Database Schema

Once the database URL is set, deploy the schema using Prisma:

```bash
npx prisma migrate deploy
```

### 4. Start the Server

After the database setup is complete, you can start the server using:

```bash
npm start
```

### 5. Access the API

- The API will be running on `http://localhost:5000`.
- The Swagger documentation for the API will be available at `http://localhost:5000/api-docs`.

## API Endpoints

### 1. **Create Text**

**POST** `/api/text`

- **Description:** Create a new text entry for analysis.
- **Request Body:**
  ```json
  {
    "content": "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun."
  }
  ```
- **Response:**
  ```json
  {
    "id": "random-generated-id",
    "content": "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.",
    "createdAt": "2023-03-29T10:00:00Z"
  }
  ```
### 2. **Update Text**

**PUT** `/api/text/:id`

- **Description:** Update the content of the existing text entry.
- **Request Body:**
  ```json
  {
    "content": "Updated content of the text."
  }
  ```
- **Response:**
  ```json
  {
    "id": "random-generated-id",
    "content": "Updated content of the text.",
    "createdAt": "2023-03-29T10:00:00Z"
  }
  ```

### 3. **Delete Text**

**DELETE** `/api/text/:id`

- **Description:** Delete an existing text entry.
- **Response:**
  ```json
  {
    "message": "Text entry deleted successfully."
  }
  ```

### 4. **Find Text by ID**

**GET** `/api/text/:id`

- **Description:** Get a text entry by its ID.
- **Response:**
  ```json
  {
    "id": "random-generated-id",
    "content": "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.",
    "createdAt": "2023-03-29T10:00:00Z"
  }
  ```

### 5. **Get Word Count**

**GET** `/api/text/:id/word-count`

- **Description:** Get the word count of the text entry.
- **Response:**
  ```json
  {
    "wordCount": 16
  }
  ```

### 6. **Get Character Count**

**GET** `/api/text/:id/character-count`

- **Description:** Get the character count of the text entry.
- **Response:**
  ```json
  {
    "characterCount": 70
  }
  ```

### 7. **Get Sentence Count**

**GET** `/api/text/:id/sentence-count`

- **Description:** Get the sentence count of the text entry.
- **Response:**
  ```json
  {
    "sentenceCount": 2
  }
  ```

### 8. **Get Paragraph Count**

**GET** `/api/text/:id/paragraph-count`

- **Description:** Get the paragraph count of the text entry.
- **Response:**
  ```json
  {
    "paragraphCount": 1
  }
  ```

### 9. **Get Longest Word in Paragraph**

**GET** `/api/text/:id/longest-word`

- **Description:** Get the longest word(s) in the text's paragraph.
- **Response:**
  ```json
  {
    "longestWords": ["quick", "jumps"]
  }
  ```

## Additional Features

- **Rate Limiting:** The API has rate limiting set to 100 requests per IP within 15 minutes.
- **Swagger Documentation:** The API documentation is available at `/api-docs`.

## Testing

To run tests:

```bash
npm test
```

## Logs

The application logs all requests and errors using **Winston**. You can find the logs in the terminal/console where the application is running.

```