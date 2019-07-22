
# Random notes from [AWS Blue Green Deployments](https://d1.awsstatic.com/whitepapers/AWS_Blue_Green_Deployments.pdf)

## Auto scaling

    The templates used to launch EC2 instances in an Auto Scaling group are called launch configurations.
    
    As explained in the Auto Scaling Developer Guide, Auto Scaling also allows instances to be placed in Standby state, instead of termination, which helps with quick rollback when required.  Both Auto Scaling's termination policies and Standby state enable blue/green deployment.
    
    
