# smx-playwright


## Please Note:
    1. This Framework is designed with basic functionalities just for demo and POC purpose
    2. Tests suites needs to be revisited and E2E Workflows needs to be designed as per requirements
    3. Standardized naming convention, data parameterization changes will be needed
    4. Extra Utility Files (APIActions.ts, WebActions.ts and Wrapper.ts) are added just for future reference. In basic POC, these files are not used.

## Setup:
### playwright/test and playwright installation:
    npm install @playwright/test & npm install playwright
### dotenv installation:
    npm install dotenv --save
### cross-env installation:
    npm install --save-dev cross-env

## Steps to Execute:
    1. Create script in package.json file with required test configurations
    2. Execute the test script using command : npm run <script name>    [For example: npm run test:chrome]