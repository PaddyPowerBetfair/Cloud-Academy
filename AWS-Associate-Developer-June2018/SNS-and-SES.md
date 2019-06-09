# Simple Notification Service

## Overview
    SNS is a web service.
    SNS allows you to create, operate and send notifications.
    Push notifications to devices or AWS components and services.
    SNS notifications can be delivered by text message, SQS or HTTP.
    SNS notifications can trigger Lambda functions.
    A Lambda function subscribes to an SNS topic.
    The function is then invoked with the payload of the SNS notification.
    SNS allows you groupt multiple recipients using Topics.
    Similar to Rabbit Consumers binding a queue (a subscription) to a Rabbit Exchange (a topic).
    Messages published to SNS are stored redundantly accross all Availability Zones.
    Instant delivery to subscribes (no polling)
    
## SES vs SNS
    SES is Simple Email Service
    SES used to publish marketing emails.
    SES can also receive incoming emails.  Incoming mails are delivered to S3.
    Incoming emails can trigger Lambda functions or SNS notifications.
    SES can be used to generate an email notification of "whatever".
    SNS can also generate email notifications.
    SNS can use SMS, http, SQS or Email.
    With SNS, recipients must first subscribe to the topic to receive emails.
    However, SES will send emails to any address that you supply.  i.e. recipients do not need to subscribe to SES.
    
