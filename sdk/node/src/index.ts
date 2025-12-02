
import {SDK} from './api/sdk';
import {BASE_URL} from './api/client';;

interface Config {
    API_KEY?: string;
}

function loadConfig(): Config | undefined {
    try {
        const configPath = require('path').resolve(__dirname, '../config.json');
        console.log(`Looking for config file at: ${configPath}`);
        return require(configPath) as Config;
    } catch (error) {
        console.error('Config file not found or invalid.', error);
        return undefined;
    }
}

function needsApiKey(): boolean {
    return true;
}

async function main() {
    const config = loadConfig();
    const apiKey = config?.API_KEY;

    if (!BASE_URL) {
        console.error('BASE_URL is not defined in client.ts.');
        return;
    }

    if (needsApiKey() && !apiKey) {
        console.error('API_KEY is required for this operation, but it is missing.');
        return;
    }

    console.log(apiKey ? 'API_KEY found, initializing SDK...' : 'No API_KEY found, initializing SDK without API_KEY...');
    const sdk = new SDK();

    // Perform operations with the SDK
    // await sdk.course-modules.courseModuleOperations();
    // await sdk.course-contents.courseContentOperations();
    // await sdk.courses.courseOperations();
    // await sdk.learning-path-courses.learningPathCoursesOperations();
    // await sdk.learning-paths.learningPathOperations();
    // await sdk.user-learnings.userLearningOperations();
    // await sdk.certificates.certificatesOperations();

}

main().catch((error) => {
    console.error('An error occurred:', error);
});
