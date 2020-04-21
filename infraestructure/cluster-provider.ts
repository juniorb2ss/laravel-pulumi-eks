import * as aws from "@pulumi/aws";

const AWS_REGION = 'us-east-2';

console.log(
    'Initializing AWS provider in the region',
    AWS_REGION
)

export const clusterProvider = new aws.Provider(
    "aws-provider",
    {
        // @ts-ignore
        region: AWS_REGION,
    },
);
