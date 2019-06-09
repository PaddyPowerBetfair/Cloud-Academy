
# Simple Queue Service

## Overview
    SQS is a web service that gives you access to a message queue
    The queue can store messages
    SQS is a distributed queue system
    SQS allows one component in your app to publish messages to anopther component
    For example:
      A new file in S3 might trigger a lambda fuinction which publishes a "job description" to SQS
      An EC2 instance could poll SQS
      The EC2 instance consumes and processes the message.
    
    SQS allows the EC2 instance to die without losing the message.
    SQS is a pull-based system.  Consumers pull messages from Queues.
    SQS can help decouple components in your system.
    
    Messages can be up to 256KB of text in any format.
    SQS allows a publisher to publish faster than consumers can consume.
    
    You could set the auto-scaling rules based on the queue size.  If >100 messages then add a new consumer.
    SQS long-polling allows you to request the next message.  No response is received until the next message is enqueued or the polling timeout is hit.
    
## Queue Types
    Two queue types:
      * Standard Queues
      * FIFO Queues
    
### Standard Queues
    Standard queue is default type
    Nearly unlimited TPS
    At least once delivery
    Ordering is not guaranteed
    
### FIFO Queues
    FIFO queues guarantee order
    FIFO guarantees that a duplicate messages are not introduced into the queue
    FIFO is limited to 300 TPS
    
### TTL and Visibility Timeout
    Message TTL is 1 minute --> 14 days.
    Message TTL default is 4 days.
    
    Visibility Timeout is the time that a message is invisbile in your queue after a consumer has consumed it.
    Default Visibility Timeout is 30 seconds.
    Max Visibility Timeout is 12 hours.
   
