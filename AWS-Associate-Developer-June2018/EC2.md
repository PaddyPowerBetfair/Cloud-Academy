# EC2

## Instance Types
    - On demand
    - Reserved (Pay or 1 to 3 years up front)
    - Spot (User bids for capacity)
    - Dedicated Host 
    
    - If a spot instance is terminated by Amazon, you get that hour for free.
    - If you terminate a spot instance then you pay for that full hour.
    
## EC2 Classes
    - F - FPGA
    - I - High Speed Storage (e.g. NoSQL)
    - G - Graphic Intensive (e.g. Streaming of 3D games)
    - H - High Disk Throughput (e.g. HDFS)
    - T - Low cost, general purpose
    - D - Dense Storage (e.g. Fileservers)
    - R - RAM - Memory Optimised
    - M - Main - General Purpose
    - C - CPU - Compute Optimised (e.g. CPU intensive work)
    - P - GPU (e.g. Machine Learning, Bitcoin Mining)
    - X - Memory Optimised (e.g. Apache Spark)
    
## Storage
    - General Purpose SSD - Can be boot volume (< 10,000 IOPS)
    - Provisioned IOPS - Can be boot volume (> 10,000 IOPS)
    - Magnetic Throughput Optimised - Not bootable - Low cost - Frequent Access
    - Magnetic Cold HDD - Not bootable - File servers - Less frequently accessed data
    - Magnetic - Botable - Old generation.
    
## Load Balancers
    - Application Load Balancer
    - Network Load Balancer
    - Elastic or Classic Load Balancer
    - 504 Gateway Timeout suggests that the application behind the LB may be unavailable
    - Use X-Forwarded-For HTTP Header if you want your application to see the IP address of the computer that originated the request.
    
## Route 53
    - Route 53 is Amazon's DNS Service
    - Route 53 allows your domain name to be mapped to EC2, Load Balancers or S3 Buckets
    
## CLI
    - Use the practice of Least Privilege
    - Assign permissions to groups using Policy documents
    - Assign Users to Groups
    - When a user is created, the Access Key and Secret Access Key are used to allow access to the CLI and API.
    - When a user is created, the Access Key and Secret Access Key are only seen once.
    - If the AK or SAK are lost then they can be regenerated.
    - Roles allow users to not have to rely on AK and SAK.
    - Roles are contolled by Policies
    - You can change a policy on a role and it will take immediate effect.
    - You can attach/detach roles to a running EC2 instance without stopping or terminating the EC2 instance.
    
    
