# Larapulu :zap:
:mage: :building_construction: A magic way to deploy Laravel using Pulumi, EKS and ECR. :tada:

A different, dynamic, fast and secure way to deploy your Laravel application.

## What you need to know first

This is my first stack that I built using Pulumi and Kubernetes. I confess, I don't know much about it. I actually created this stack as a way of studying. But, don't be like me. Study the technologies involved here first. But, if you want, be like me, download that stack, deploy it and go changing, modifying or breaking.

Here are some interesting documentations:

- [Pulumi](https://www.pulumi.com/docs/)
- [EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html)
- [Kubernetes](https://kubernetes.io/docs/home/)
- [ECR](https://docs.aws.amazon.com/ecr/)

Ah, I know I wouldn't need to ask this, but: You already know docker, right? If not, LEAVE AND GO STUDY DOCKER BEFORE!

If you implement something cool, don't forget to send the PR. Okay?

### Why AWS?

![](https://www.memecreator.org/static/images/memes/4688928.jpg)

### Why EKS?

I didn't want to build a K8s cluster because I was lazy.

## First Steps

- Install kubectl
Documentation: https://kubernetes.io/docs/tasks/tools/install-kubectl/
- Install Pulumi
Documentation: https://www.pulumi.com/docs/get-started/install/
- AWS Credentials
Please, follow the steps describe here: https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/
- No more  steps.
"What?" Yeah. Like I said, it's magic.

## Stack resources
![](https://i.imgur.com/42RnqXX.png)
  
## Let's deploy :rocket: 

Now that we already have Pulumi and Kubectl already installed, let's start our stack.

1. Install dependencies

```base
# npm install
```

2. Initialize stack

```base
# pulumi stack init yourStackName
```

3. Configure Laravel `APP_KEY`

```bash
# pulumi config set laravel-pulumi-eks:APP_KEY <value> --secret`
```

4. Review resources and stack preview

```bash
# pulumi preview
```

Output expected:

```bash
Diagnostics:
  pulumi:pulumi:Stack (laravel-pulumi-eks-yourStackName):
    [19:55:22] Initializing AWS provider in the region us-east-2
    [19:55:22] Initializing VPC
    [19:55:22] Initializing EKS cluster
    [19:55:22] Exporting applications labels
    [19:55:22] Creating stack namespace
    [19:55:22] Initializing EKS Service
    [19:55:22] Creating stack configMap
    [19:55:22] Uploading application images to ECR
    [19:55:22] Starting application image build
    [19:55:22] Starting nginx image build
    [19:55:22] Creating schedule cron job
    [19:55:22] Initializing queue jobs
    [19:55:22] Deploying application on cluster
    [19:55:22] Initializing stack
    [19:55:24] Creating queue job default
```

3. Start deploy!

```bash
# pulumi up --yes
```

3. After many minutes... 

Expected output:

```bash
   loadBalancer: "ac908c4876a2a4b079c72f5a0a05af7a-607904941.us-east-2.elb.amazonaws.com"
Resources:
    72 changed
```

4. Access your Laravel application

```bash
# pulumi stack output loadBalancer
ac908c4876a2a4b079c72f5a0a05af7a-607904941.us-east-2.elb.amazonaws.com
```

## Observations

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


## Tips and Tricks
- How to see pods and cluster information?

Read kubectl documentation, bastard!

- How to destroy, scale change, etc?

Read Kubernetes documentation, bastard!

## Free software! Oh, Yeah!
Welcome to the jungle, baby! :rock:

