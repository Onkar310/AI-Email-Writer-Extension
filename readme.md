# AI Email Writer

AI Email Writer is a project that uses AI to generate professional email replies. It includes a Spring Boot backend service that provides an API for generating replies and a Gmail browser extension for user interaction.

## Features

- Generate AI-powered email replies
- Seamless integration with Gmail
- Easy-to-use API

## Getting Started

### Prerequisites

- Java 17
- Maven

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/AI-Email-Writer.git
   cd AI-Email-Writer
   ```

2. Build the backend service:

   ```sh
   cd backend
   mvn clean install
   ```

3. Run the backend service:

   ```sh
   mvn spring-boot:run
   ```

4. Install the Gmail extension:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `frontend` directory

## Usage

1. Open Gmail in your browser.
2. Click the AI Email Writer button to generate a reply for an email.

## Key Files

- `backend/src/main/java/com/example/aiemailwriter/AIEmailWriterService.java`: Contains the logic to generate email replies by interacting with the AI service.
- `backend/src/main/java/com/example/aiemailwriter/AIEmailWriterController.java`: Exposes the API endpoint to generate email replies.
- `frontend/content.js`: Contains the logic to add a button to the Gmail interface and handle the button click to generate email replies.
- `frontend/manifest.json`: Defines the extension's metadata and permissions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
