import * as k8s from "@pulumi/kubernetes";
import { cluster } from "./cluster";
import * as config from "./config";
import { appLabels } from "./labels";
import { namespace } from "./namespace";

console.log('Initializing EKS Service')

export const service = new k8s.core.v1.Service(
    `${config.PROJECT_NAME}-service`,
    {
        metadata: {
            namespace: namespace.metadata.name,
            labels: appLabels,
            annotations: {},
        },
        spec: {
            type: "LoadBalancer",
            ports: [
                {
                    port: 80,
                    targetPort: "http",
                },
            ],
            selector: {
                ...appLabels,
                "service": "application",
            },
        },
    },
    {
        provider: cluster.provider,
    },
);
