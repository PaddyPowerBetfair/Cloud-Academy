# Elastic Beanstalk

## Overview
    Elastic Beanstalk is a service for deploying and scaling web applications.
    You upload code in a zip file and Beanstalk will place your code in the appropriate platform and configure EC2 instances for you.
    Beanstalk can also automatically configure autoscaling or RDS.
    
    Beanstalk can be compared to CloudFormation.
    CloudFormation is json based.  You upload a CloudFormation template!
    Beanstalk requires you use the UI to configure your environment.
    
    You upload the code to an S3 bucket and Beanstalk handles:
    * Deployment
    * Capactity provisioning
    * Load balancing
    * Auto-scaling
    * Application health
    
    You only pay for the AWS resource that Beanstalk provisions.
    You retain full control over AWS resources.
    Beanstalk integrates with CloudWatrch and XRay.
    
## Updating Elastic Beanstalk
    Beanstalk supports different deployment models
    
### All at once
    All instances are updated simultaneously.
    All instances are out of service during deployment.
    If it fails, you need to redploy the previous version.
    
### Rolling
    Deploys the new version in batches.
    Each batch of instances is taken out of service while they are deployed.
    Therfore your total capacity is reduced during the rolling update.
    If update fails, you need to perform an additional rolling update to roll back the changes.
    
### Rolling with additional batch
    Launches an additional batch of instances during deployment.
    Maintains full capacity during deployment.
    If update fails, you need to perform an additional rolling update to roll back the changes.
    
### Immutable deployment
    Deploys new version to a fresh group of instances in their own new auto-scaling group.
    When new instancers pass health checks, they are moved to the existing auto-scaling group and the old instances are deleted.
    If update fails then only the new auto-scaling group is deleted.
    
## Configuring Elastic Beanstalk
    Customise you Beanstalk environment usng '.config' files.
    Any filename can be used as long as it has a '.config' extension.
    All config files save in a folder called '.ebextensions'.
    .ebextensions must be in the top level of your application.
    e.g. myHealthCheckUrl.config.
    
## Beanstalk with RDS
    For Test and Dev environments you can launch RDS instances from within the Beanstalk console.
    This means that the RDS is tied to the lifecycle of your application.
    
    For Production environments, configure RDS from the usual RDS section in the conjsole.
    To allow EC2 instances in your Beanstalk environment to access RDS:
    * Add a new security group to your environments autoscaling group.
    * Add the DB connection string to your Beanstalk environment config.
    
