from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, GPT2Tokenizer
import requests
from requests.auth import HTTPBasicAuth
import os

# Initialize Flask app and allow cross-origin requests
app = Flask(__name__)
CORS(app)

# Load the Hugging Face model (using gpt2 as an example)
generator = pipeline('text-generation', model='gpt2')

# Load the GPT-2 tokenizer for padding
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

# Azure DevOps configuration
organization = 'JavaDevelopmentArea'
project = 'JavaProjectHandler'
repository_id = 'JavaProjectHandler'
pat_token = os.getenv('PAT_TOKEN')  # Your PAT token

# Define an array of file paths
file_paths = ['/stringClass.java', '/enumClass.java', '/hashMapClass.java', '/stringBufferDemo.java','/stringDemo.java','/vectorClass.java','/WrapperClass.java']  # Add your file paths here
file_code = ''  # Saving Code from Source Files
# Directory to store cached files
cache_dir = 'file_cache'

# Ensure the cache directory exists
os.makedirs(cache_dir, exist_ok=True)

# Function to retrieve file content with caching
def get_file_content(file_path):
    # Generate a cache file name based on the file path
    cache_file_path = os.path.join(cache_dir, file_path.replace('/', '_') + '.cache')

    # Check if the cached file exists
    if os.path.exists(cache_file_path):
        with open(cache_file_path, 'r') as cache_file:
            return cache_file.read()  # Return cached content

    # If not cached, make API call to retrieve content
    file_url = f'https://dev.azure.com/{organization}/{project}/_apis/git/repositories/{repository_id}/items?path={file_path}&api-version=6.0'
    file_response = requests.get(file_url, auth=HTTPBasicAuth('', pat_token))

    if file_response.status_code == 200:
        # Save the content to the cache
        with open(cache_file_path, 'w') as cache_file:
            cache_file.write(file_response.text)
        return file_response.text
    else:
        return f"Failed to retrieve {file_path}: {file_response.status_code} - {file_response.text}"
    
# Define a function to generate responses with improved parameters
def generate_response(query, max_length=500, temperature=0.8, top_k=30):
    try:
        response = generator(
            query,
            num_return_sequences=1,
            truncation=True,
            pad_token_id=tokenizer.eos_token_id,
            max_length=max_length,
            temperature=temperature,
            top_k=top_k
        )
        result = response[0]['generated_text']
        return result

    except Exception as e:
        return str(e)

# API endpoint to handle queries
@app.route('/api/query', methods=['POST'])
def handle_query():
    data = request.json
    user_query = data.get('query')

    if not user_query:
        return jsonify({'error': 'Query is required'}), 400

    # Loop through each file path to find relevant code
    for path in file_paths:
        file_content = get_file_content(path)
        
        if not file_content:
            continue  # Skip if the file content is empty or failed to retrieve

        # Define your custom query
        my_custom_query = "#Provide only code lines showing implementation of: "
        modified_query = file_content + " \n " + my_custom_query + user_query

        # Generate a response using the modified query
        response = generate_response(modified_query)

        # Check if the response contains a valid code snippet
        if "No code for" not in response:  # You can add more sophisticated checks here
            return jsonify({'response': response, 'file_path': path})  # Return the first valid response

    # If no valid code snippet is found in any file
    return jsonify({'error': 'No relevant code snippet found in any file'})

if __name__ == '__main__':
    app.run(debug=True)
