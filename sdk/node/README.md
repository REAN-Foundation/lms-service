
# NODE SDK Package Creation and Installation Guide 

This guide walks you through creating, packaging, and installing a Node SDK.  

## Steps 

### Create project directory structure
```
sdk/node/
|-- docs/
|   |-- api_endpoint_1.md
|   |-- api_endpoint_2.md
|   
|-- src/
|   |-- api/
|   |   |-- api_endpoint_1/
|   |   |   |-- api_endpoint_1.model.ts
|   |   |   |-- api_endpoint_1.ts
|   |   |-- api_endpoint_2/
|   |   |   |-- api_endpoint_2.model.ts
|   |   |   |-- api_endpoint_2.ts
|   |   |-- authentication.ts
|   |   |-- client.ts
|   |   |-- sdk.ts
|   |-- common/
|   |   |-- cache_utils.ts
|   |   |-- exceptions.ts
|   |
|   |-- config.json
|   |-- index.ts
|
|-- package.json
|-- tsconfig.json
|-- README.md
```

Set up the project directory as shown below: 
### 1. Initialize Project
```
npm install
```
Create tsconfig.json with recommended settings
```
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### 2. Create the common Folder
  Create a folder named common/ in the project root.
  Inside common/, add the following files:
```
  cache_utils.ts
  exceptions.ts
 ```
 ### 3. Create the src Folder
 - Create a folder named lms service/src/ in the project root path (e.g. ).
 - Inside lms service/src/, create a subfolder (eg., api/) for the package.
 - Add the following files inside lms service/src/api/:
 ```
  api.client.ts
  authentication.service.ts
  sdk.ts
```

### 4. Create the tests Folder
- Create a folder named tests/ in the project root.
- Inside tests/, add the file sdk.test.ts for testing the package.

### 5. Update to path in Terminal
```
  /path/to/code/cd sdk
  /path/to/code/sdk cd node 
```

### 6. Compile TypeScript Code to JavaScript Code
- Run code using the following command:
```
  npm run build 
```
### 7. Create metadata files
- Add the following files to the project root.
    - `package.json`: Defines project metadata
    - `README.md`: Documentation for the package.
    - `tsconfig.json`: TypeScript compiler settings

### 8. Build the Package
- Run the following command to generate the package:
```
npm pack 
```
This will create the package files in the root folder

- Test the package in a new project
- Create a New Project Folder
- Create a new folder for testing the package.
- Install the Package
- Run the following commands:
```
 npm init -y
 npm install /path/to/lms service-0.1.0.tgz
```
```
 npm install lms service\lms service-0.1.0.tgz
```

### 9. Usage
-  Import the SDK
``` 
import { SDK } from "lms service"; 

or

import { SDK } from "lms service"/src/api/sdk
```

### 10. Uninstallation & Cleanup
-  Uninstall the SDK from a Project
```
npm uninstall lms service
```

## API Documentation
- [certificates](docs/certificates.md)
- [courses](docs/courses.md)
- [course_contents](docs/course_contents.md)
- [course_modules](docs/course_modules.md)
- [learning_paths](docs/learning_paths.md)
- [learning_path_courses](docs/learning_path_courses.md)
- [user_learnings](docs/user_learnings.md)
