
AWS DevOps Blog Post - https://aws.amazon.com/blogs/devops/rapid-flexible-infrastructure-with-solutions-constructs-cdk/

This labs guides you through the steps required to deploy a application which consumes from Kinesis and publishes to Dynamodb.

The stack is described in a CDK application and uses constructs from the `aws-solutions-constructs` library.  

The `aws-solutions-constructs` library provides convenience constructs which create AWS resources using AWS best practices (e.g. A Kinesis Stream with a Lambda consumer and all the roles and policies needed to make it all work.)


