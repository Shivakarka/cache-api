# Cache API

A simple in-memory key-value cache API built with Express.js.

## Features

- Store key-value pairs with size limit
- Retrieve values by key
- Update existing values
- Delete entries
- View all cache entries
- CORS enabled
- Configurable max cache size

## API Endpoints

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| POST   | `/cache`      | Add or update a key-value pair |
| GET    | `/cache/:key` | Retrieve value by key          |
| GET    | `/cache`      | Get all cache entries          |
| DELETE | `/cache/:key` | Delete a key-value pair        |

## Installation

```bash
git clone https://github.com/ShivaKarka/cache-api.git
cd cache-api
npm install
```

## Configuration

Create a `.env` file

```
PORT=3000
MAX_SIZE=10
```

## Usage

Start the server:

```
npm run dev
```

### Example Requests

```
# Add entry
curl -X POST http://localhost:3000/cache \
  -H "Content-Type: application/json" \
  -d '{"key":"user1","value":"John Doe"}'

# Get entry
curl http://localhost:3000/cache/user1

# Delete entry
curl -X DELETE http://localhost:3000/cache/user1
```

### Response Codes

| Code | Description                       |
| ---- | --------------------------------- |
| 200  | Success                           |
| 201  | Created                           |
| 400  | Bad Request                       |
| 404  | Not Found                         |
| 507  | Insufficient Storage (Cache Full) |

## Tech Stack

- Node.js
- Express.js
- Dotenv
- Cors

## License

`ISC`
