"use strict";
import { cluster } from "./cluster";
import { service } from "./service";

//import * as route53 from "./route53";
import * as schedule from "./services/cron/schedule";
import * as queue from "./services/deployment/queue";
import * as images from "./ecr";
import { application } from "./services/deployment/application";

console.log('Initializing stack')

export const applicationUrn = application.urn;
export const scheduleUrn = schedule.schedule.urn;
//export const wwwUrn = route53.www.urn;
export const queuesUrn = queue.queues.map(deploy => deploy.urn);
export const nginxImage = images.nginxImage;
export const phpImage = images.phpImage;

export const kubeconfig = cluster.kubeconfig;
export const appServiceHost = service.status.loadBalancer.ingress[0].hostname;
export const nodeSecurityGroup = cluster.nodeSecurityGroup.id;
