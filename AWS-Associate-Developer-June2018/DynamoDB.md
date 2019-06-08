
# Introduction to Dynamo DB

## Overview

    Fully managed database
    Supports 'document' and 'key/valuye' models
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
    You can restrict user access to only their own items in Dynamo by using 'IAM Consitions'.
    To do this, you add a 'Condition' to an IAM policy.
    The 'condition' will enforce that only 'items' with a partition key that matches a particular 'userId' may be accessed.
    
    Aside: Recall that an IAM policy has 3 sections: 'Effect', 'Action' and 'Resource'.  'Condition' is also a section in an IAM Policy.
    
    
## Dynamo DB Indexes
    Indexes allow you to perform fast queries against specific columns.
    
    Local Secondary Indexes:
    * can only be created when the table is created
    * cannot be added, removed or modified
    * use the same partition key as your table
    * use a different sort key
    
    Global Secondary Indexes:
    * are more flexible
    * can be created AT or AFTER table creation
    * can be based on a different partition key and different sort key to the partition key of your table.
    
## Queries and Scans
### Queries
    A Query is a search based on the primary key and a distinct value to search for.
    E.g. Find * where userId = 212;
   
    A Query may also include a sort key to refine the results.
    E.g. Find * where userId = 212 and lastLogin > 7 days;
    
    A Query returns all attributes of an item by default.
    You may also use a Projection Expression which allows you to return certain attributes. 
    
    Results are sorted by sort key.
    Numerics are sorted in ascesing order by default.
    Set 'ScanIndexForward' to false if you want to reverse the order of the results.
    
    Queries are Eventually Consistent by default.
    Queriues can be set to be Strongly Consistent.
    
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
    
    
    
