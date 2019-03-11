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
