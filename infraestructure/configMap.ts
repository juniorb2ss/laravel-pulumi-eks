import * as k8s from "@pulumi/kubernetes";
import { cluster } from "./cluster";
import * as config from "./config";
import { appLabels } from "./labels";
import { namespace } from "./namespace";

console.log('Creating stack configMap')

export const configMap = new k8s.core.v1.ConfigMap(
    `${config.PROJECT_NAME}`,
    {
        metadata: {
            namespace: namespace.metadata.name,
            labels: appLabels,
        },
        data: {
            PHP_FPM_HOST: "localhost",
            APP_VERSION: config.CURRENT_VERSION,
            APP_NAME: config.APP_NAME,
            APP_ENV: config.APP_ENV,
            APP_KEY: config.APP_KEY,
            APP_DEBUG: config.APP_DEBUG_ENABLED,
            APP_URL: config.APP_URL,
            LOG_CHANNEL: config.APP_LOG_CHANNEL,
            TELESCOPE_ENABLED: config.APP_TELESCOPE_ENABLED,
        },
    },
    {
        provider: cluster.provider,
    },
);
