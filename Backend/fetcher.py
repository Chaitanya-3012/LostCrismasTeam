import os
import requests
from requests.auth import HTTPBasicAuth

# Azure DevOps configuration
organization = 'JavaDevelopmentArea'
project = 'JavaProjectHandler'
repository_id = 'JavaProjectHandler'
pat_token = '5te33d2vza445x3tm5tnnabhcaalfpapgw5qr4dfwy6jhldxoo2q'  # Your Personal Access Token

file_paths = ['/stringClass.java', '/enumClass.java', '/hashMapClass.java', '/stringBufferDemo.java','/stringDemo.java','/vectorClass.java','/WrapperClass.java'] 

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

# Loop through each file path and retrieve its content
for path in file_paths:
    content = get_file_content(path)
    print(f"Content of {path}:")
    print(content)
    print("\n" + "-"*40 + "\n")  