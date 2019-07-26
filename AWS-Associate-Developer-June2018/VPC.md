# VPC

## Virtual Private Cloud

    - Logically isolated network
    - VPCs created per account per region
    - Spans a single region
    - Can use all available zones with one region
    - Can peer with other VPCs
    - Supports numerous security mechanisms
    - 5 VPCs per region
    - 200 subnets per VPC    

## VPC Peering

    - Connection between two VPCs
    - Helps segregate networks
    - No bottlennect or SPOF
    - IP ranges must bot overlap
    - Can peer bbetween accounts
    - Always one-to-one
    - No transitive peering
    - No edge-to-edge routing
    - $/GB bandwidth

## Network Access Control Lists (NACLs)

    - Firewall for the subnet as a whole
    - Stateless
    - Rules applied in order
    - Must specify ingress and egress
    - May specify allow or deny rules
    - Default NACL allows all ingress/egress

## Security Group

    - Applied to instances or load balancers
    - Stateful
    - Can specify ingress and egress
    - Defaults
        * All ingress trafic denied
        * All egress trafic allowed
