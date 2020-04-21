import * as k8s from "@pulumi/kubernetes";
import { cluster } from "../../cluster";
import * as config from "../../config";
import { configMap } from "../../configMap";
import { appLabels } from "../../labels";
import { namespace } from "../../namespace";
import { phpImage, nginxImage } from "../../ecr";

const labels = {
    ...appLabels,
    "service": "application",
};

console.log('Deploying application on cluster')

export const application = new k8s.apps.v1.Deployment(
    `${config.PROJECT_NAME}-application`,
    {
        metadata: {
            namespace: namespace.metadata.name,
            labels: labels,
        },
        spec: {
            strategy: {
                type: "Recreate",
            },
            minReadySeconds: 20,
            replicas: 1,
            selector: {
                matchLabels: labels,
            },
            template: {
                metadata: {
                    annotations: {},
                    labels: labels,
                },
                spec: {
                    containers: [
                        {
                            name: "app",
                            image: phpImage,
                            imagePullPolicy: "Always",
                            ports: [
                                {
                                    name: "application",
                                    containerPort: 9000,
                                },
                            ],
                            command: ["entrypoint", "php-fpm"],
                            envFrom: [
                                {
                                    configMapRef: {
                                        name: configMap.metadata.name,
                                    },
                                },
                            ],
                            resources: {
                                requests: {
                                    cpu: "300m",
                                    memory: "300Mi",
                                },
                                limits: {
                                    cpu: "500m",
                                    memory: "500Mi",
                                }
                            },
                            readinessProbe: {
                                tcpSocket: {
                                    port: 9000,
                                },
                                initialDelaySeconds: 2,
                                timeoutSeconds: 10,
                                periodSeconds: 10,
                            },
                            livenessProbe: {
                                tcpSocket: {
                                    port: 9000,
                                },
                                initialDelaySeconds: 2,
                                timeoutSeconds: 2,
                                periodSeconds: 10,
                            },
                        },
                        {
                            name: "nginx",
                            image: nginxImage,
                            imagePullPolicy: "Always",
                            command: ["entrypoint", "nginx", "-g", "daemon off;"],
                            ports: [
                                {
                                    name: "http",
                                    containerPort: 80,
                                },
                            ],
                            envFrom: [
                                {
                                    configMapRef: {
                                        name: configMap.metadata.name,
                                    },
                                },
                            ],
                            resources: {
                                requests: {
                                    cpu: "300m",
                                    memory: "300Mi",
                                },
                                limits: {
                                    cpu: "500m",
                                    memory: "500Mi",
                                }
                            },
                            readinessProbe: {
                                tcpSocket: {
                                    port: 80,
                                },
                                initialDelaySeconds: 2,
                                timeoutSeconds: 2,
                                periodSeconds: 10,
                                failureThreshold: 3,
                            },
                            livenessProbe: {
                                tcpSocket: {
                                    port: 80,
                                },
                                initialDelaySeconds: 2,
                                timeoutSeconds: 2,
                                periodSeconds: 10,
                                failureThreshold: 3,
                            },
                        },
                    ],
                },
            },
        },
    },
    {
        provider: cluster.provider,
    },
);
