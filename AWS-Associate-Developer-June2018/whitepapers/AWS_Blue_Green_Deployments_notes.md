
# Random notes from [AWS Blue Green Deployments](https://d1.awsstatic.com/whitepapers/AWS_Blue_Green_Deployments.pdf)

## AWS Tools and Services Enabling Blue/Green Deployments
### Amazon Route 53

### Auto scaling
    The templates used to launch EC2 instances in an Auto Scaling group are called launch configurations.
    
    As explained in the Auto Scaling Developer Guide, Auto Scaling also allows instances to be placed in Standby state, instead of termination, which helps with quick rollback when required.  Both Auto Scaling's termination policies and Standby state enable blue/green deployment.
    
### Elastic Beanstalk
     Elastic Beanstalk makes it easy to run multiple versions of your application and provides capabilities to swap the environment URLs, facilitating blue/green deployment.
     
### AWS OpsWorks     
    AWS OpsWorks is a configuration management service based on Chef that allows customers to deploy and manage application stacks on AWS. OpsWorks simplifies cloning entire stacks when you’re preparing blue/green environments.
    
### CloudFormation
    CloudFormation provides very powerful automation capabilities for provisioning blue/green environments and facilitating updates to switch traffic.
    
### Amazon CloudWatch 
    Amazon CloudWatch is a monitoring service for AWS Cloud resources and the applications you run on AWS.   It provides system-wide visibility into resource utilization, application performance, and operational health, which are key to early detection of application health in blue/green deployments.

## Techniques for implementing Blue/Green Deployments
### Update DNS Routing with Amazon Route 53
    This approach works with a wide variety of environment configurations, as long as you can express the endpoint into the environment as a DNS name or IP address.
    
    By updating the alias record, you can route traffic from the blue environment to the green environment.

    You can shift traffic all at once or you can do a weighted distribution.
    
    Although DNS routing is simple to implement for blue/green, the question is how quickly can you complete a rollback. DNS TTL determines how long clients cache query results. 
    
### Swap the Auto Scaling Group Behind Elastic Load Balancer    
    This technique uses Auto Scaling to manage the EC2 resources for your blue and green environments, scaling up or down based on actual demand.
    
    A blue group carries the production load while a green group is staged and deployed with the new code. When it’s time to deploy, you simply attach the green group to the existing load balancer to introduce traffic to the new environment.
    
    As you scale up the green Auto Scaling group, you can take blue Auto Scaling group instances out of service by either terminating them or putting them in Standby state.  Standby is a good option because if you need to roll back to the blue environment, you only have to put your blue server instances back in service.
    
### Update Auto Scaling Group Launch Configurations
    Auto Scaling groups have their own launch configurations. A launch configuration contains information like the Amazon Machine Image (AMI) ID, instance type, key pair, one or more security groups, and a block device mapping.
    
    You can associate only one launch configuration with an Auto Scaling group at a time, and it can’t be modified after you create it.
    
    To change the launch configuration associated with an Auto Scaling group, replace the existing launch configuration with a new one. After a new launch configuration is in place, any new instances that are launched use the new launch configuration parameters, but existing instances are not affected.
    
    When Auto Scaling removes instances from the group, the default termination policy is to remove instances with the oldest launch configuration. 
    
    To deploy the new version of the application in the green environment, update the Auto Scaling group with the new launch configuration, and then scale the Auto Scaling group to twice its original size.
    
### Swap the Environment of an Elastic Beanstalk Application
    To be continued ... 
    
    
    
    
    


