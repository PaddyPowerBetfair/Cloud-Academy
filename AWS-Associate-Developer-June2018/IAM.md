# Identity User Access 101
    - IAM is used to manage users' level of access to the AWS Console
    - IAM provides centralised control of your AWS account
    - Permission may be controlled at a granular level.

    - "Users" are people who will interact with AWS services
    - "Groups" are collections of users under a single set of permissions
    - "Roles" are a mechanism for granting permissions to entities that you trust.
    - Roles can be assumed by users or AWS services (e.g. an EC2 instance)
    - A role may be called "myS3Role" and may allow "Read/Write Access to S3".  "myS3Role" may then be assumed by a user or an AWs service.
    - "Policy" is a document describing one or more permissions.
    - A user, group or role may each share the same policy.
    
    - IAM supports multi-factor authentication.
    - IAM may provide temporary access for users, devices and services.
    - IAM provides support for password rotation.
    - IAM provides support for imposing a password complexity policy. 
    - IAM complies with PCI DSS to support applications that need to process electronic payments.

    - During creation of a new user in IAM, the user may be granted Programmatic or Console Access to IAM.
    - When a user has been created in IAM, the Access Key and Secret Access Key will be displayed once only.
    - The AK and SAK will be used by the new user when accessing AWS services Programatically or by Command Line Interface.
    - The AK and SAK will be displayed once only.  If lost, it may be regenerated within the IAM Console.
    
