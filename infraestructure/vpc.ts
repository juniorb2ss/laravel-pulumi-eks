// Create VPC.
import * as awsx from "@pulumi/awsx";
import * as config from "./config";
import {clusterProvider} from "./cluster-provider";

console.log('Initializing VPC')

export const vpc = new awsx.ec2.Vpc(
    config.PROJECT_NAME,
    {
        numberOfAvailabilityZones: 2,
    },
    {
        provider: clusterProvider
    }
);
