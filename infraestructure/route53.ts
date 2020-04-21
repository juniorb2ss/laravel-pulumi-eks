import * as aws from "@pulumi/aws";
import * as config from "./config";
import { service } from "./service";

function getDomainAndSubdomain(domain: string): { subdomain: string, parentDomain: string } {
    const parts = domain.split(".");
    if (parts.length < 2) {
        throw new Error(`No TLD found on ${domain}`);
    }

    // No subdomain, e.g. awesome-website.com.
    if (parts.length === 2) {
        return {
            subdomain: "",
            parentDomain: domain,
        };
    }

    const subdomain = parts[0];
    parts.shift();
    return {
        subdomain,
        parentDomain: parts.join(".") + ".",
    };
}

const domainParts = getDomainAndSubdomain(config.APP_URL);

console.log('Application domain: %s', config.APP_URL)

const selected = aws.route53.getZone({
    name: domainParts.parentDomain,
});

console.log('Updating application domain on Route53')

export const www = new aws.route53.Record(
    config.PROJECT_NAME,
    {
        name: `${domainParts.subdomain}.${selected.name!}`,
        records: [
            service.status.loadBalancer.ingress[0].hostname,
        ],
        ttl: 60,
        type: "CNAME",
        allowOverwrite: true,
        zoneId: selected.zoneId!,
    },
);
