import * as k8s from "@pulumi/kubernetes";
import { cluster } from "../../cluster";
import * as config from "../../config";
import { configMap } from "../../configMap";
import { appLabels } from "../../labels";
import { namespace } from "../../namespace";
import { phpImage } from "../../ecr";

console.log('Creating schedule cron job')

export const schedule = new k8s.batch.v1beta1.CronJob(
    `${config.PROJECT_NAME}-schedule`,
    {
        metadata: {
            namespace: namespace.metadata.name,
            labels: {
                ...appLabels,
                "service": "schedule-cron",
            },
        },
        spec: {
            schedule: "* * * * *",
            concurrencyPolicy: "Forbid",
            jobTemplate: {
                spec: {
                    backoffLimit: 2,
                    template: {
                        metadata: {
                            labels: {
                                ...appLabels,
                                "service": "schedule-cron",
                            },
                        },
                        spec: {
                            restartPolicy: "OnFailure",
                            containers: [
                                {
                                    name: "schedule",
                                    image: phpImage,
                                    imagePullPolicy: "Always",
                                    command: ["php", "artisan", "schedule:run"],
                                    envFrom: [
                                        {
                                            configMapRef: {
                                                name: configMap.metadata.name,
                                            },
                                        },
                                    ],
                                    resources: {
                                        requests: {
                                            cpu: "500m",
                                            memory: "500Mi",
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
    },
    {
        provider: cluster.provider,
    },
);
