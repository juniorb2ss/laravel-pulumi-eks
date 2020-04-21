require('./infraestructure/utils/consoleTimestamp')();

import * as stack from "./infraestructure/app";

export const kubeconfig = stack.kubeconfig;
export const loadBalancer = stack.appServiceHost;
