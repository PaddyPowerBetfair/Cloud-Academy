
# Introduction to Dynamo DB

## Overview

    Fully managed database
    Supports 'document' and 'key/value' models
    Everything is stored in 3 geographically distinct regions
    Everything is stored on SSD
    
    Two consistency models:
      * Eventual consistency - Repeating a 'read' ~1 second after a 'write' should return the latest data.
      * Strong consistency - A 'read' that is done after a 'successful write' will always return the latest data.
      
    Dynamo uses 'tables' and 'items'
    Dynamo uses 'attributes' (columns!)
    
    In the key/value model, the key is the name of the data; the value is the data itself
    In document model, documents can be JSON, HTML or XML.
    
    Dynamo stores and retrieves data based on 'Primary Keys'
    
    Two types of Primary Key:
      * Partition Key
      * Composite Key
      
    A Partititon Key is a unique attribute such as 'userId'.
    When using partition keys, a hash function will accept a partition key and output a physical location (i.e. a partition) on which the data is stored.
    No two items can have the same partition key.
    
    A Composite Key is a Partition Key + a Sort Key.
    When using a composite key, all items are located in the same place (based on the partition key) and are sorted according to the sort key.
    
    IAM is used to manage access to Dynamo.
    You can restrict user access to only their own items in Dynamo by using 'IAM Conditions'.
    To do this, you add a 'Condition' to an IAM policy.
    The 'condition' will enforce that only 'items' with a partition key that matches a particular 'userId' may be accessed.
    
    Aside: Recall that an IAM policy has 3 sections: 'Effect', 'Action' and 'Resource'.  'Condition' is also a section in an IAM Policy.
    
    
## Dynamo DB Indexes
    Indexes allow you to perform fast queries against specific columns.
        
    Local Secondary Indexes (LSI):
    * can only be created when the table is created
    * cannot be added, removed or modified
    * use the same partition key as your table
    * use a different sort key
    * You can do Strongly Consistent reads on LSIs
    * LSIs consume Read and Write capacity from the main table and have the same WCU and RCU provisioned throughput.
    
    Global Secondary Indexes (GSI):
    * are more flexible
    * can be created AT or AFTER table creation
    * can be based on a different partition key and different sort key to the partition key of your table.
    * You cannot do Strongly Consistent reads on GSIs
    * GSIs consume Read and Write capacity independently from the main table and have their own WCU and RCU provisioned throughput.
    
    
## Queries and Scans
### Queries
    A Query is a search based on the primary key and a distinct value to search for.
    E.g. Find * where userId = 212;
   
    A Query may also include a sort key to refine the results.
    E.g. Find * where userId = 212 and lastLogin > 7 days;
    
    A Query returns all attributes of an item by default.
    You may also use a Projection Expression which allows you to return certain attributes. 
    
    Results are sorted by sort key.
    Numerics are sorted in ascending order by default.
    Set 'ScanIndexForward' to false if you want to reverse the order of the results.
    
    Queries are Eventually Consistent by default.
    Queries can be set to be Strongly Consistent.
    
### Scans
    By default, scans return all items in the table.
    A Projection Expression can also be used to specify certain results.
    
    Queries are more efficient than Scans.
    Scans dump the entire table and then apply a filter to the results.
    As the table size grows, scans become inefficient and expensive.
    You can set the page size to limit the number of rows returned at a time.
    Setting the page size only improves performance because other DB operations are not blocked.
    
    Scans retrieve 1 MB of data at a time.
    Scan will scan 1 partition at a time.
    A dynamo table or index can be logically divided into segments.  Segments can then be scanned in parallel.
    
## Provisioned Throughput
    Throughput is measured in Capacity Units.
    
    1 Write Capacity Unit = 1 * 1KB write per second
    1 Read Capacity Unit = 1 * 4KB Strongly Consistent reads per second
                        OR 2 * 4KB Eventually Consistent reads per second
    Eventually consistent reads are the default.
    
    Example:
    A table with 5RCU and 5 WCU:
      5 * 4KB Strongly Consistent Reads = 20 KB per second
      10 * 4KB Eventually Consistent Reads = 40 KB per second.
      6 * 1KB Writes = 5 KB per second
    
    Example 1:
    You need to read 80 items per second.
    You need Strongly Consistent Reads.
    Each item is 3KB in size.
    What is the required RCU of your table?
    
    Answer:
    3KB / 4KB = 0.75 (rounded up becomes 1).
    So each read will need 1 RCU.
    The question states we need to read 80 items so we need 80 RCU for strongly consistent reads.
    To calculate Eventually Consistent Reads, we divide 80 by 2.  40 RCU for eventually consistent reads.
    
    Example 2:
    You need to write 100 items per second.
    Each item is 512 bytes.
    
    Answer:
    512 bytes / 1KB = 0.5 (rounded up become 1)
    So each write needs 1 WCU.
    If we need to write 100 writes per second then our answer is 100 WCU.
    
 ## DymanoDB Accelerator (DAX)
    DAX is a fully managed, clustered, in-memory cache for Dynamo.
    Read use-cases only.
    Up to 10x performance gains.
    Useful for burst-reads (Black Friday) or read-heavy apps.
    
    DAX is a write-through cache.
    Data is written to the cache at the same time as the Dynamo backend.
    Allows you to point your Dynamo API at the DAX cluster.
    If your read operation is a cache-miss, DAX performs an Eventually Consistent read from Dynamo DB.
    The DAX cluster must be in the same VPC as the EC2 instance which is hosting the DAX Client (i.e. your application which is making read requests) 
    
    DAX Cluster maintains two caches.
      1) Item cache.
      2) Scan and Query cache.  Results of queries are stored in the cache so that the result set can be returned if the same query is made more than once.
      
    Could reduce your provisioned Read Capacity of your Dynamo DB.
    Read Intensive apps only - Not needed if you don't need low-latency of your reads.
    
## Elasticache
    Sits between your application and Dynamo.
    Suitable for read-heavy workloads.
    Takes the read load off Dynamo.
    Good for compute-heavy workloads because the output of computations can be cached.
    
    2 types of Elasticache
    * MemcacheD
    * Redis
    
### MemcacheD
    Object caching system
    Multithreaded
    No multi-az capability (not clustered)
    If you lose your memcached service then it's gone.
    
### Redis
    In-memory key-value store
    Supports complex structs like sorted sets and lists.
    Supports master/slave replication
    Supports multi-az for cross AZ redundancy
    Good if you want your cache to be resilient.
    
### Caching Strategies
    
#### Lazy Loading strategy
    On a cache-miss, Elasticache returns 'null'.
    Your application must then retrieve the data and populate the cache.
    Advantages: 
    * Only the required data is cached.
    * If the cache dies, the only downside is that there will be lots of cache-misses at first.
    
    Disadvantages:
    * Cache miss penalty
    * Data can become stale.  Data not updated automatically.  TTL can be applied.
    
#### Write-through strategy
    Data is added to the cache whenever it is written to the database.
    Advantages:
    * Data is never stale
    * Users need to tolerate extra latency of writes to database (Is that an advantage?)
    
    Disadvantages:
    * Write penalty of every update to the database
    * If a node fails, the cache is empty again until it is added or updated in the database.
    * Wasted resources if most data is written but rarely read.

    Lazy Loading and Write-through strategies can be combined.

## DynamoDb Streams
    Used to capture changes in your DynamoDb table.
    Changes are stored in Dynamobo Streams for 24 hours.
    DynamoDb Streams can act as a trigger for Lambda functions.
    DynamoDb Streams can publish either the primary key, the new item, the old item or both the new and old item.
    You can set up a relation between two Dynamo tables.  If one table is updated then than another item in the other table is updated.


## DynamoDb Auto-scaling and On-demand
### DynamoDb Auto-scaling
    When creating a table, auto-scaling is turned on be default.  (Scaling at 70% utilisation)
    DynamoDb publishes consumed capacity metrics to CloudWatch.  CloudWatch can raise an alarm which triggers an auto-scaling event in DynamoDb.
    If desired, auto-scaling can be turned off at any time.  
    If has been reported that auto-scaling can sometimes react too slowely.  Typically a scaling event occurs 10 mins after your capacity limit has been hit.
    
### DynamoDb On-demand
    "On-demand" offers a pay-per-request model.
    This will affect your bill.
    Useful if your traffic is unpredictable and can regularly spike.
    You can change a table from "Provisioned Capacity" to "On-demand" once per day only.
    With "On-demand", there is no upper limit in your RCU and WCU.  Remember that you pay for that!
    
    
    
    
    

## Common Errors
[Common Errors](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/CommonErrors.html)

[Secondary Indexes Limits in DynamoDb](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-secondary-indexes)

[Read/Write Capacity Mode and Throughput Limits in DynamoDb](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#default-limits-throughput-capacity-modes)

[Table Limits](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-tables)

[Item Limits](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-items)

[API Specific Limits](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-api)
    
    
# From the FAQ
[Amazon DynamoDB FAQs](https://aws.amazon.com/dynamodb/faqs/)

    Q: What kind of query functionality does DynamoDB support?

    A: DynamoDB supports GET/PUT operations by using a user-defined primary key.
    The primary key is the only required attribute for items in a table.
    You specify the primary key when you create a table, and it uniquely identifies each item.
    DynamoDB also provides flexible querying by letting you query on non-primary key attributes using global secondary indexes and local secondary indexes.


    Q: How do I update and query data items with DynamoDB?

    A: After you have created a table using the DynamoDB console or CreateTable API, you can use the PutItem or BatchWriteItem APIs to insert items.
    Then, you can use the GetItem, BatchGetItem, or, if composite primary keys are enabled and in use in your table, the Query API to retrieve the items you added to the table.


    Q: How am I charged for my use of DynamoDB?

    A: Note that you are charged by the hour for the throughput capacity, whether or not you are sending requests to your table. 
    If you would like to change your table’s provisioned throughput capacity, you can do so using the AWS Management Console, the UpdateTable API, or the PutScalingPolicy API for auto scaling


    Q: Q: What is the maximum throughput I can provision for a single DynamoDB table?

    A: If you want to exceed throughput rates of 10,000 write capacity units or 10,000 read capacity units for an individual table, you must first contact Amazon.
    If you want to provision more than 20,000 write capacity units or 20,000 read capacity units from a single subscriber account, you must first contact us to request a limit increase.

[Link to the DynamoDB API](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.API.html)

