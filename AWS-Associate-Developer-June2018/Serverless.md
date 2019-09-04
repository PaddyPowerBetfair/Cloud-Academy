# Introduction to Serverless Computing

## API Gateway  

### API Gateway Overview
    API Gateway is a fully managed service.
    API Gateway can expose HTTP endpoints which define your ReSTful API.
    API Gateway may forward incoming requests to Lambda, EC2 or Dynamo (for example).
    API Gateway makes is easy for developers to publish, maintain, monitor and secure APIs at any scale.
    Different endpoints can connect to different AWS services.
    API endpoints can be throttled.
    API endpoints can be tracked and controlled using an API key.
    Cloudwatch can be used to track API useage.
    You can maintain different versions of your API.
    
### How to define an API
    Define your API in the console.
    Define API URL paths ("Resources" and "Nested Resource")
    For each Resource:
       * Select the appropriate HTTP method.
       * Set the security of your API endpoint.
       * Choose the target of your API endpoint (EC2, Lambda or DynamoDB for example)
       * Set the request and response transformations.
    Deploy your new API to a "Stage" (for example: Production, Pre-production or Test).
    Note that API Gateway endpoints are created with AWS's own APIGateway domain by default.

### API Caching
    With API Caching you can reduce the number of calls made to your API.
    API Caching can improve the latency of your API requests.
    API Gateway responses are cached for a specified TTL in seconds.

### Same Origin Policy and CORS (Cross-origin Resource Sharing)
    Under the "same origin policy", a web browser permits scripts contained in a first web-page to access data in a second web page, but only if both web pages have the same origin.
    This is done to prevent Cross-Site Scripting attacks (XSS).
    This is enforced by web browsers but ignored by PostMan and `curl`.
    
    CORS is one way that the server at the other end (not the browser) can relax the same-origin policy.
    CORS is a mechanism that allows resources (e.g. fonts) on a web page to be requested from another domain that is outside the domain from which the first resource was shared.
    
    Browser makes an HTTP `OPTIONS` call for a URL.
    Server returns "ERROR - Origin policy cannot be read at the remote resource".
    The above error means you need to enable CORS.

## Lamdba Function Triggers
    Services that Lambda reads events from:
      Kineses
      DynamoDb
      SQS
    
    Services that invoke Lambda functions synchronously:
      Application Load Balancer
      Cognito
      Lex
      Alexa
      API Gateway
      Cloudfront
      Kinesis Data Firehose
      
    Services that invoke Lambda functions asynchronously:
      S3
      SNS
      SES
      CloudFormation
      CloudWatch Logs
      CloudWatch Events
      CodeCommkit
      AWS Config

## Lamba Version Control
    You can publish one or more versions of your lambda function.
    Each version of your function will have a different ARN.
    Only the `$LATEST` version of your function may be edited.  All other versions cannot be edited.
    Qualified ARNs include the version of your lambda function.
    `Unqualified ARN`s do not end with the version of your function.
    You can create an alias for particular versions.
    For example: `v1` can be aliased as `Production`.  
    This allows you to use `Production` as your reference to the version you wish to use.  When you wish to upgrade from `v1` to `v2` then reassign the `Production` alias from `v1` to `v2`.
    You can send a percentage of traffic to one alias and the remaining traffic to another alias.
    The `$LATEST` version of your lambda function may not be used to split traffic.
    You can split traffic between two versions only.
    You can delete versions of your lambda function.

## Step Functions
    Step Functions allows you to visualise and test your serverless applications.
    Step Functions provides a UI to arrange and visualise the components of your application as a series of steps.
    This makes it simple to build and run multistep applications.
    Step Functions automatically triggers and tracks each step.
    Step Functions retries steps when there are errors so your application executes in order and as expected.
    Step Functions logs the state of each step.
    You define the steps of your workflow in the JSON-based Amazon States Language.
    After you have defined your sequence of steps in JSON, you hit "Create Resources" which will create AWS resources based on a CloudFormation template.
    You then assign a name for this execution run of your steps.
    The Step Functions UI will then visualise your running application and show the full event history.
    To delete your Step Functions flow, open Cloud Formation and delete the associated Cloud Formation stack.

## X-Ray
    XRay is a service that collects data about requests to your serverless application.
    XRay provides visualisation tools you can use to optimise your serverless application.
    You can view the request, your application's response and any calls your app makes downstream to other services, DBs, http endpoints.
    The XRay SDK is installed in your application.
    The XRay SDK instruments incoming calls and outgoing calls to HTTP services or AWS services. 
    The XRay SDK sends data to the XRay Daemon.
    The XRay Daemon forwards the data to the XRay API.
    The XRay Daemon can be installed on Linux, Windows or MacOS.
    The AWS XRay console interacts with the XRay API to produce a visualisation of your application.
    
    XRay integrates with
    * Elastic Load Balancers
    * AWS Lambda
    * API Gateway
    * EC2
    * Elastic Beanstalk
    
    XRay supported languages:
    * Java, Go, NodeJS, Python, Ruby, .NET

## Advanced API Gateway
    You can import APIs from Swagger v2.0 definition files.
    APIs can be imported into AWS by sending a Swagger v2.0 definition file via a `POST` request.
    And existing API can be updated by sending a Swagger v2.0 definition file via a `PUT` request.

    API Gateway limits the steady-state request limit to 10,000 requests per second.
    The maximum concurrent requests is 5000 requests across all APIs within an AWS account.
    If you exceed either limit, you will receive a `429 Too Many Requests` error response.

    API Gateway can be configured as a SOAP Gateway passthrough.

# From the [FAQ](https://aws.amazon.com/lambda/faqs/)
    To improve performance, AWS Lambda may choose to retain an instance of your function and reuse it to serve a subsequent request, rather than creating a new copy.
    Each Lambda function receives 500MB of non-persistent disk space in its own /tmp directory.
    
    AWS Lambda allows you to use normal language and operating system features, such as creating additional threads and processes.
    
    You can package the code (and any dependent libraries) as a ZIP and upload it using the AWS CLI from your local environment, or specify an Amazon S3 location where the ZIP file is located. Uploads must be no larger than 50MB (compressed).
    
    You can package any code (frameworks, SDKs, libraries, and more) as a Lambda Layer and manage and share them easily across multiple functions.
    
    AWS Lambda automatically monitors Lambda functions on your behalf, reporting real-time metrics through Amazon CloudWatch.
    AWS Lambda automatically integrates with Amazon CloudWatch logs, creating a log group for each Lambda function.
    
    You can set your memory in 64MB increments from 128MB to 3GB.
    You can set the timeout to any value between 1 second and 15 minutes.
    
    By default, each AWS Lambda function has a single, current version of the code. Clients of your Lambda function can call a specific version or get the latest implementation.
    
    An event source is an AWS service or developer-created application that produces events that trigger an AWS Lambda function to run.
    
    You can invoke a Lambda function using a custom event through AWS Lambda’s invoke API. Only the function’s owner or another AWS account that the owner has granted permission can invoke the function.
    
    When called through the AWS Mobile SDK, AWS Lambda functions automatically gain insight into the device and application that made the call through the ‘context’ object.
    
    You can deploy and manage your serverless applications using the AWS Serverless Application Model (AWS SAM).
    
    AWS SAM is a specification that prescribes the rules for expressing serverless applications on AWS.
    This specification aligns with the syntax used by AWS CloudFormation today and is supported natively within AWS CloudFormation as a set of resource types (referred to as "serverless resources").
    These resources make it easier for AWS customers to use CloudFormation to configure and deploy serverless applications, using existing CloudFormation APIs. 

    You can automate your serverless application’s release process using AWS CodePipeline and AWS CodeDeploy. 
    
    You can use AWS Step Functions to coordinate a series of AWS Lambda functions in a specific order.
    Step Functions will maintain state during executions for you.
    
    X-Ray SDKs are currently available for Node.js and Java.
    
    Lambda@Edge allows you to run code across AWS locations globally.
    To use Lambda@Edge, you just upload your code to AWS Lambda and associate a function version to be triggered in response to Amazon CloudFront requests.
    Lambda@Edge is optimized for latency sensitive use cases where your end viewers are distributed globally.
    The difference between AWS Lambda@Edge and AWS Lambda behind Amazon API Gateway is that API Gateway and Lambda are regional services. Using Lambda@Edge and Amazon CloudFront allows you to execute logic across multiple AWS locations based on where your end viewers are located.
    
    AWS Lambda has a default safety throttle for number of concurrent executions per account per region.
    On exceeding the throttle limit, AWS Lambda functions being invoked synchronously will return a throttling error (429 error code).
    
    On failure, Lambda functions being invoked synchronously will respond with an exception.
    Lambda functions being invoked asynchronously are retried at least 3 times. 
    
    What happens if my Lambda function invocations exhaust the available policy?
    On exceeding the retry policy for asynchronous invocations, you can configure a “dead letter queue” (DLQ) into which the event will be placed; in the absence of a configured DLQ the event may be rejected.
    You can configure an Amazon SQS queue or an Amazon SNS topic as your dead letter queue.
    
    To enable VPC support, you need to specify one or more subnets in a single VPC and a security group as part of your function configuration.
    To disable VPC support, you need to update the function configuration and specify an empty list for the subnet and security group.
    
    Lambda functions provide access only to a single VPC.
    If multiple subnets are specified, they must all be in the same VPC.
    You can connect to other VPCs by peering your VPCs.
    
