# Introduction to KMS

## Overview
    KMS is a managed service.
    KMS allows you to create and control encryption keys used to encrypt your data.
    KMS is integrated with other AWS services:
      E.G.: EBS, S3, RedShift, Elastic Transcoder, Workmail, RDS
    
## How to create a Customer Master Key
    KMS is found in IAM in the AWS Console.
    Create a user in IAM
    Create 'myKMSGroup'.
    Users in this group will have access to KMS (e.g. our trusted security people)
    User1 is 'MyKeyManager'.  This person will manage KMS keys but have no permission to encrypt or decrypt.
    User2 is 'MyKeyUser'.  This person can encrypt/decrypt but no permission to manage the keys.
    
    In IAM, click 'Encryption Keys'
    Note that 'Encryption Keys' is Regional.
    A key in Region1 can only encrypt/decrypt data in Region1.
    
    Create a key.
    Add an alias which is just a name.
    Set KMS as the key material origin.
    Add a tag.  For example: Add who will use this key.
    Add Key Administrative Permission.  Select users who will manage the key. (i.e. 'MyKeyManager')
    Add Key Usage Permission.  (i.e. 'MyKeyUser')

## KMS API
    Create an EC2 Instance
    Put the instance in a security group that has port 22 open.
    'MyKeyUser' is the user who will do the encrypting.
    ssh into the EC2 instance.

    $ sudo su -
    $ echo "Some text" > myfile.txt
    $ aws configure
    # Supply the AK and SAK.
    # Set the region to be the same as the KMS key

    $ aws kms encrypt --key-id <your key name> --plaintext myfile.txt ...
    $ aws kms decrypt ... 
    $ aws re-encrypt ...
    $ aws kms enable-key-rotation --key-id <your key name>
    # Tells AWS to change the key every year


## KMS Envelope Encryption
    The Customer Master Key
    The Envelope Key (also known as the Data Key)
    The data to be encrypted
    
    The envelope key encrypts the data
    The Customer Master Key encrypts the Envelope Key
    
    To decrypt:
    The Customer Master Key decrypts the Envelope key
    The decrypted Envelope Key decrypts your encrypted data.
    
# From the FAQ
[https://aws.amazon.com/kms/faqs/](https://aws.amazon.com/kms/faqs/)

    Q: Can I delete a key from AWS KMS?
    A Yes. You can schedule a customer master key and associated metadata that you created in AWS KMS for deletion, with a configurable waiting period from 7 to 30 days.
    This waiting period allows you to verify the impact of deleting a key on your applications and users that depend on it. 
    The default waiting period is 30 days.
    You can cancel key deletion during the waiting period.
    The key cannot be used if it is scheduled for deletion until you cancel the deletion during the waiting period.
    The key gets deleted at the end of the configurable waiting period if you don’t cancel the deletion.
    Once a key is deleted, you can no longer use it.
    All data protected under a deleted master key is inaccessible.

    Q: Can I use AWS KMS to help manage encryption of data outside of AWS cloud services?
    A: Yes. AWS KMS is supported in AWS SDKs, AWS Encryption SDK, the Amazon DynamoDB Client-side Encryption, and the Amazon S3 Encryption Client to facilitate encryption of data within your own applications wherever they run. 
    
    Q: Is there a limit to the number of keys I can create in AWS KMS?
    A: You can create up to 1000 customer master keys per account per region. 
