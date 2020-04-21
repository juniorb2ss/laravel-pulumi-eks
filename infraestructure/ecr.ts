import * as awsx from "@pulumi/awsx";
import * as config from "./config";
import {clusterProvider} from "./cluster-provider";

console.log('Uploading application images to ECR')

const nginxRepo = new awsx.ecr.Repository(
    config.PROJECT_NAME + '-nginx',
    {},
    {
        provider: clusterProvider
    }
);

const applicationRepo = new awsx.ecr.Repository(
    config.PROJECT_NAME + '-application',
    {},
    {
        provider: clusterProvider
    }
);

console.log('Starting application image build')

export const phpImage = applicationRepo.buildAndPushImage(
    {
        dockerfile: './docker/php/Dockerfile',
        context: '.'
    }
);

console.log('Starting nginx image build')

export const nginxImage = nginxRepo.buildAndPushImage(
    {
        dockerfile: './docker/nginx/Dockerfile',
        context: '.'
    }
);
