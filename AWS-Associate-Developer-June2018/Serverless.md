# Introduction to Serverless Computing

## API Gateway  

### API Gateway Overview
    API Gateway is a fully managed service.
    API GAteway can expose HTTP endpoints which define your ReSTful API.
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
       * Choose the taret of your API endpoint (EC2, Lambda or DynamoDB for example)
       * Set the request and response transformations.
    Deploy your new API to a "Stage" (for example: Production, Pre-production or Test).
    Note that API Gateway endpoints are created with AWS's own APIGateway domain by default.

### API Caching
    With API Caching you can reduce the number of calls made to your API.
    API Caching can improve the latency of your API requests.
    API Gateway responses are cached for a specified TTL in seconds.

### Same Origin Policy and CORS (Cross-origin Resource Sharing)
    Under the "same origin policy", a web browser permits scripts contained in a first web-page to access dat in a second web page, but only if both web pages have the same origin.
    This is done to prevent Cross-Site Scripting attacks (XSS).
    This is enforced by web browsers but ignored by PostMan and `curl`.
    
    CORS is one way that the server at the other end (not the browser) can relax the same-origin policy.
    CORS is a mechanism that allows resources (e.g. fonts) on a web page to be requested from another domain that is outside the domain from which the first resource was shared.
    
    Browser makes an HTTP `OPTIONS` call for a URL.
    Server returns "ERROR - Origin policy cannot be read at the remote resource".
    The above error means you need to enable CORS.

## Lamdba Function Triggers

## Lamba Version Control
    You can publish one or more versions of your lambda function.
    Each version of your function will have a different ARN.
    Only the `$LATEST`version of your function may be edited.  All other versions cannot be edited.
    `Qualified ARN`s include the version of your lambda function.
    `Unqualified ARN`s do not end with the version of your function.
    You can create an alias for particular versions.
    For example: `v1` can be aliased as `Production`.  
    This allows you to use `Production` as your reference to the version you wish to use.  When you wish to upgrade from `v1` to `v2` then reassign the `Production` alias from `v1` to `v2s include the version of your lambda function.
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
    Step Functions retries steps when there are error so your application executes in order and as expected.
    Step Functions logs the state of each step.
    You define the steps of your workflow in the JSON-based Amazon States Language.
    After you have defined your sequence of steps in JSON, you hit "Create Resources" which will create AWS resources based on a CloudFormation template.
    You then assign a name for this execution run of your steps.
    The Step Functions UI will then visualise your running application and show the full event history.
    To delete your Step Functions flow, open Cloud Formation and delete the associated Cloud Formation stack.

## X-Ray

## Advanced API Gateway
    You can import APIs from Swagger v2.0 definition files.
    APIs can be imported into AWS by sending a Swagger v2.0 definition file via a `POST` request.
    And existing API can be updated by sending a Swagger v2.0 definition file via a `PUT` request.

    API Gateway limits the steady-state request limit to 10,000 requests per second.
    The maximum concurrent requests is 5000 requests across all APIs within an AWS account.
    If you exceed either limit, you will receive a `49 Too Many Requests` error response.

    API Gateway can be configured as a SOAP Gateway passthrough.


