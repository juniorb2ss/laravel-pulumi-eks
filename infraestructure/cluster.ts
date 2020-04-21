import * as eks from "@pulumi/eks";
import * as config from "./config";
import { vpc } from "./vpc";
import {clusterProvider} from "./cluster-provider";

console.log('Initializing EKS cluster')

export const cluster = new eks.Cluster(
    config.PROJECT_NAME,
    {
        vpcId: vpc.id,
        subnetIds: vpc.publicSubnetIds,
        instanceType: "t3.medium",
        desiredCapacity: 2,
        minSize: 2,
        maxSize: 4,
        storageClasses: "gp2",
        deployDashboard: false,
    },
    {
        provider: clusterProvider,
    },
);
