import * as k8s from "@pulumi/kubernetes";
import { cluster } from "./cluster";
import * as config from "./config";

console.log('Creating stack namespace')

export const namespace = new k8s.core.v1.Namespace(
    config.PROJECT_NAME,
    {
        metadata: {
            labels: {
                "environment": config.APP_ENV,
            },
            annotations: {},
        },
    },
    {
        provider: cluster.provider,
    },
);
