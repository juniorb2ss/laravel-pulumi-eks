import * as pulumi from "@pulumi/pulumi";

const envConfig = new pulumi.Config();

// stack environment
export const PROJECT_ENV = envConfig.get("APP_ENV")
                            || pulumi.getStack()
                            || "production";
export const PROJECT_NAME = pulumi.getProject() + '-' + PROJECT_ENV;

// application configurations
export const APP_NAME = envConfig.get("APP_NAME") || "Laravel";
export const CURRENT_VERSION = envConfig.get("CURRENT_VERSION") || "latest";
export const APP_KEY = envConfig.require("APP_KEY");
export const APP_ENV = PROJECT_ENV;
export const APP_URL = envConfig.get("APP_URL") || 'my-laravel.domain.com';
export const APP_DEBUG_ENABLED = envConfig.get("APP_DEBUG") || "0";
export const APP_LOG_CHANNEL = envConfig.get("LOG_CHANNEL") || "stderr";
export const APP_TELESCOPE_ENABLED = envConfig.get("TELESCOPE_ENABLED") || "0";
