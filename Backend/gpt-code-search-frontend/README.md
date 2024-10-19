# GPT Code Search

## Overview

GPT Code Search is a web application designed to search and display code snippets from files stored in an Azure DevOps repository. The application utilizes a Flask backend to communicate with Azure DevOps and a React frontend for user interaction. It leverages Natural Language Processing (NLP) through the Hugging Face Transformers library to enhance code searching capabilities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend Functionality](#frontend-functionality)
- [NLP Integration with Hugging Face](#nlp-integration-with-hugging-face)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for specific files or code snippets using natural language queries.
- Display code content dynamically on the frontend.
- Easy integration with Azure DevOps for real-time file retrieval.
- CORS-enabled Flask backend to handle requests from the React frontend.

## Technologies Used

- **Frontend**: React
- **Backend**: Flask
- **NLP**: Hugging Face Transformers
- **Cloud Services**: Azure DevOps
- **Database**: None (files are retrieved directly from Azure DevOps)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Set up the backend:
   - Navigate to the backend directory and install dependencies:
     ```bash
     cd backend
     pip install -r requirements.txt
     ```
   - Configure your Azure DevOps credentials in environment variables:
     ```bash
     export AZURE_DEVOPS_URL='<your-devops-url>'
     export AZURE_DEVOPS_PAT='<your-personal-access-token>'
     export AZURE_DEVOPS_PROJECT='<your-project-name>'
     export AZURE_DEVOPS_REPO='<your-repo-name>'
     ```

3. Set up the frontend:
   - Navigate to the frontend directory and install dependencies:
     ```bash
     cd frontend
     npm install
     ```

## Usage

1. **Start the Backend Server**:
   ```bash
   cd backend
   python app.py
   ```

2. **Start the Frontend Development Server**:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints

### Backend API Endpoints

- **Get File List**: 
  - `GET /devops/files`
  - Returns a list of all files in the Azure DevOps repository.

- **Get File Content**: 
  - `GET /devops/file/<filename>`
  - Returns the content of the specified file.

## Frontend Functionality

The frontend consists of a simple form where users can input the filename or a specific query related to the code. Upon submission, it retrieves the corresponding file content and displays it on the page.

### User Input

- Users can enter the name of the file they wish to search for.
- On submitting the form, the app makes a request to the backend to fetch the file content.

### Display

- The retrieved file content is displayed in a styled box below the input field.
- Any errors encountered during the request are shown to the user.

## NLP Integration with Hugging Face

The application utilizes the Hugging Face Transformers library to enhance the search functionality. The NLP capabilities allow for more nuanced searches, making it easier to find relevant code snippets based on user queries.

### Key Components

- **Model**: The application uses a pre-trained GPT-2 model from Hugging Face for text generation.
- **Tokenization**: The GPT-2 tokenizer is utilized for padding and processing the input queries.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.