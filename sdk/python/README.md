
# Python SDK Package Creation and Installation Guide  

This guide walks you through creating, packaging, and installing a Python SDK.  

## Steps  

### 1. Create project directory structure  

Set up the project directory as shown below:  

```plaintext
sdk-latest/
│
├── src/
│   └── lmsservice_db/  # Folder name must match the package name
│       ├── api/
│       │   ├── user/
│       │   │   ├── __init__.py
│       │   │   ├── users.py       # All crud data
│       │   │   ├── user_model.py  # Parameters
│       │
│       ├── __init__.py
│       ├── authentication.py
│       ├── client.py
│
├── common/
│   ├── __init__.py
│   ├── cache_utils.py
│   ├── exceptions.py
│
├── tests/
│   ├── test_sdk.py
│
├── setup.py       # Setup file for package metadata
├── MANIFEST.in    # File for packaging instructions
├── README.md      # Project documentation

```

### 2. Create the common Folder
  Create a folder named common/ in the project root.
  Inside common/, add the following files:
```
  __init__.py
  cache_utils.py
  exceptions.py
```
3. Create the src Folder
- Create a folder named src/ in the project root.
- Inside src/, create a subfolder (e.g., lmsservice_db/) for the package.
- Add the following files inside src/lmsservice_db/:
  ```
  __init__.py
  authentication.py
  client.py
  users.py
  ```

4. Create the tests Folder
- Create a folder named tests/ in the project root.
- Inside tests/, add the file test_sdk.py for testing the package.

5. Set the PYTHONPATH Environment Variable
- Run the following command in your terminal:

  ```
  $env:PYTHONPATH="<your-package-source-directory>"
  ```

6. Run the Test Code
  - Run the test code using the following command:
    ```
    python src/tests/test_sdk.py
    ```

7. Create metadata files
- Add the following files to the project root.
  - `setup.py`: Contains metadata about the package.
  - `README.md`: Documentation for the package.
  - `MANIFEST.in`: Specifies additional files to include in the package.

8. Install required tools
- Install `setuptools` and wheel by running:

  ```
  pip install setuptools wheel
  ```

9. Build the Package
- Run the following command to generate the package:

  ```
  python setup.py sdist bdist_wheel
  ```

This will create the package files in the dist/ directory.

- Test the package in a new project
- Create a New Project Folder

- Create a new folder for testing the package.
- Set Up a Virtual Environment

- Run the following commands:

  ```
  python -m venv env
  
  env\Scripts\activate
  ```

- If above cmd not works then follow below steps 
  ```
  Get-ExecutionPolicy

  Set-ExecutionPolicy Unrestricted -Scope Process

  env\Scripts\activate
  ```

- Install the Package

- Install the generated .whl file:

  ```
  pip install D:\Work Projects\deft-source-latest\generators\node-generator\node.generator.test\bin\Debug\net8.0\templates\NodeTypescript\sdk\python\dist\lmsservice_db-0.1.0-py3-none-any.whl
  ```

- Install faker:

  ```
  pip install faker
  ```

- Add a Test File

- Create a file named tests.py in the new project folder.
- Run the Test File

- Execute the tests using:

  ```
  python tests.py
  ```

11. Uninstall the Package
- If you need to remove the package, run:

  ```
  pip uninstall lmsservice_db
  ```



## API Documentation
- [certificates](docs/certificates.md)
- [courses](docs/courses.md)
- [course_contents](docs/course_contents.md)
- [course_modules](docs/course_modules.md)
- [learning_paths](docs/learning_paths.md)
- [learning_path_courses](docs/learning_path_courses.md)
- [user_learnings](docs/user_learnings.md)
