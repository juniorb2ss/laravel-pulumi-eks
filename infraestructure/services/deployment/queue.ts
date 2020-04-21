import * as k8s from "@pulumi/kubernetes";
import * as fs from "fs";
import * as glob from "glob";
import * as yaml from "js-yaml";
import * as path from "path";
import { cluster } from "../../cluster";
import * as config from "../../config";
import { configMap } from "../../configMap";
import { appLabels } from "../../labels";
import { namespace } from "../../namespace";
import { phpImage } from "../../ecr";

const directoryPath = path.join(__dirname, "/queues/*.yaml");

const deployments: k8s.apps.v1.Deployment[] = [];

console.log('Initializing queue jobs')

glob(directoryPath, {}, function (err, files) {
    if (err) {
        return;
    }

    files.forEach(function (file) {
        const queue = yaml.safeLoad(
            fs.readFileSync(file, "utf8"),
        );

        const configurations = queue["queue"];
        const labels = {
            ...appLabels,
            "service": "queue",
            "queue": configurations["name"],
        };

        console.log('Creating queue job ' + configurations["name"])

        queues.push(
            new k8s.apps.v1.Deployment(
                `${config.PROJECT_NAME}-queue-` + configurations["name"],
                {
                    metadata: {
                        namespace: namespace.metadata.name,
                        labels: labels,
                    },
                    spec: {
                        strategy: {
                            type: "Recreate",
                        },
                        replicas: configurations["pod"]["replicas"],
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
                                        name: "queue-" + configurations["name"],
                                        image: phpImage,
                                        imagePullPolicy: "Always",
                                        command: configurations["command"],
                                        envFrom: [
                                            {
                                                configMapRef: {
                                                    name: configMap.metadata.name,
                                                },
                                            },
                                        ],
                                        resources: {
                                            requests: {
                                                cpu: configurations["pod"]["resources"]["request"]["cpu"],
                                                memory: configurations["pod"]["resources"]["request"]["memory"],
                                            },
                                            limits: {
                                                cpu: configurations["pod"]["resources"]["limit"]["cpu"],
                                                memory: configurations["pod"]["resources"]["limit"]["memory"],
                                            },
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
            ),
        );
    });
});

export const queues = deployments;
