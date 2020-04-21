import * as config from "./config";

console.log('Exporting applications labels')

export const appLabels = {
    "appName": config.PROJECT_NAME,
    "environment": config.APP_ENV,
};
