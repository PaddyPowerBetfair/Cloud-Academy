
# Kinesis

## Overview
    Kinesis is a platform that you send your streaming data to.

## Kinesis Streams
    A producer produces the data
    Kinesis Streams will store the data produced byb the producer
    Data is stored in Kinesis Streams for 24 hours by default.
    TTL of data can be up to 7 days.
    
    An instance of Kinesis Streams is made up of Shards.
    You data is stored in these Shards.
    Data is consumed from Kinesis Streams by your Consumers (typically EC2 instances)
    Consumers consume from Shards.
    Consumers can then analyse the data and send any output to Dynamo, S3, Elastic Map Reduce, RedShift, and so on.
    
    One shard gives you 5 TPS for Reads up to a maximum total read-rate of 2MB per second.
    One shard gives you 1000 records per second for writes up to a maximum total write-rate of 1MB per second (including partition keys). 
    
    One Kinesis Stream consists of one or more Shards.
    The total capacity of the Stream is the sum of the capacity of the Shards.
    
## Kinesis Firehose
    Producers produce data and send it to Kinesis Firehose
    Kinsesi Firehose does not use Shards.
    You can analyse the data entering Kinesis Firehose using Lambda.
    Kinesis Firehose can then publish outout to S3.
    Kinesis Firehose does not have a concept of TTL.
    Kinesis Firehose will either analyse data using Lambda or not.
    Data destined for RedShift must be push by Kinesis Firehose to S3 first.
    Kinesis Firehose can publish directly to Elastic Search Cluster.
    
## Kinesis Analytics
    Kinesis Analytics allows you to do SQL queries on data that is in Kinesis Firehose or Kinesis Streams.
    Any output is then pubslihed to S3, RedShift or Elastic Search Cluster.
    

    
