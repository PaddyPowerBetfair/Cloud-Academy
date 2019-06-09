# Introduction to KMS

## Overview
    KMS is a managed service.
    KMS allows you to create an control encryption keys used to encrypt your data.
    KMS is integrated with other AWS services:
      E.G.: EBS, S3, RedShift, Elastic Transcoder, Workmail, RDS
    
## How to create a Customer Master Key
    KMS is found in IAM in the AWS Console.
    Create a user in IAM
    Craete 'myKMSGroup'.
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
    'MyKeyUser' is the user who wil do the encrypting.
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
    Ther Customer Master Key decrypts the Envelope key
    The decrypted Envelope Key decrypts your encrypted data.
    
    
