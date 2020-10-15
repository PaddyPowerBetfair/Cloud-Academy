# AWS Devops Engineer Pro Notes #

## CodeCommit ##

- Code privately stored in own VPC
- SSH and HTTPS
- SSH / HTTPS credentials set up on IAM user
- Can copy HTTPS or SSH URL from console
- Know git clone, git add, git commit, git push
- Know git status, git checkout -b, git push --set-upstream origin branch
- Can diff on console
- Know how to create pull request
- CC tells if your branch is mergeable
- Can choose fast forward, squash or 3 way merge
- Can delete source branch when merging (on by default)
- Enable branch protection by using IAM groups with an inline policy: 
    Deny everything 
    Condition:
        Reference is master
- Notification rules can give you full or basic info
- Specific events can trigger notifications:
    Comments, pull requests, branches/tags
- Notification rules point at SNS topics
- Notifications come from code commit service
- Triggers allow you to invoke SNS or Lambda
- The notifications go into CloudWatch rules
- If creating event from CW:
    can choose state change, on commit, on pr, on pr change, approval rule template, api call via cloudtrail
    targets can be SNS, Lamnda, SQS, CodeBuild, lots of different things
- Can be a trigger for lambda
- Can choose repository events, branches
- lambda will show up as a trigger in the codecommit repo

## CodeBuild ##

Can use different sources: git, github enterprise, codecommit, bitbucket
Reference type is important - can pick from branch, git tag, commit id
commit id = specific commit
tag = verersion
branch = ongoing code
environment can be managed or custom docker image
codebuild is good for performance, integration, load testing (max 8 hour build)
lambda not as good for long running builds
codebuild runs on a queue and you can specify a timeout on it (default 8 hours)
buildspec.yml must be present in source root or in specified location
can log to cloudwatch and s3
elastic, serverless, billed by second

### buildspec.yml ###

version

run-as: linux-user-name
env:
    variables
    parameter-store
    git-credential-helper

phases
    install
        run-as
        runtime-versions
        commands
        finally
    pre_build
        run-as
        commands
        finally
    build
        run-as
        commands
        finally
    post_build
        run-as
        commands
        finally

artifacts:
    files
    name
    discard-paths
    base-directory
    secondary-artifacts
        artifact2:
            files
            name
            discard-paths
            base-directory
        artifact3:
            files
            name
            discard-paths
            base-directory

cache: 
    file


### build phases ###

submitted
queued
provisioning
download
install
pre
build
post
upload artifacts
finalizing
completed

### samples ###

definitely know how to push to ECR from CodeBuild

### env variables ###

default region
region
codebuild_build_arn
etc


can call `printenv` from codebuild to dump env variables

can be plaintext or parameters

can reference param store SSM if parameter - just pass name of param as value

### artifacts ###

uploaded to s3
use artifacts section in buildspec
can be named using `name` property
can be encrypted with kms
s3 can also encrypt

### cloudwatch integration ###

logs
new log stream per build
metrics
success / fail / duration
events
can schedule builds using rules
can use codebuild as a source and use things like build state changed

## CodeDeploy ##

CodeDeploy works on prem and on EC2 with CodeDeploy Agent
Agent is continuously polling for work
CodeDeploy sends appspec.yml
App pulled from github or s3
Ec2 runs deployment instructions
CodeDeploy Agent reports success/failure
can have deployment group for different environments (dev/prod)
blue/green only works with ec2 - not on prem
codedeploy supports lambda/ec2
codedeploy does not provision resources 
codedeploy knows how to deploy to EC2 envs based on TAGS
in place/blue green at deployment group level
s3 bucket where app is stored must have versioning enabled
appspec.yml must exist in zip file in root if using s3
oneatatime, halfatatime, allatonce are in-place options
deployment configuration can be set up in deployment group. can specify how many instances must remain healthy at a given time in pct or units
validateservice used for health check

hooks env variables
    application namne
    deployment id
    deployment group id
    lifecycle event

automatic rollbacks
    can rollback automatically when deployment fails
    can rollback based on alarm thresholds being breached

to register on prem instances:
    For a small number of instances, use an IAM user
    use the registeer command - best for single on prem instance
    or use the register-on-premises-instance command - best for a small number of instances
    for a large number of instances, use an IAM role
    periodically refresh the credentials with STS
    
    1 user per on prem instance
    programatic access only

    add a config to the onprem instance
    /etc/codedeploy-agent/conf/conf.onpremises.yml
    must contain access key, secret access key, user arn and region

    install aws cli
    run aws configure

    set AWS_REGION env variable

    install code deploy agent

    call aws deploy register-on-premises-instance from own cli (not on prem instance)

    can then se einstance in codedeploy and add tags to it

https://d1.awsstatic.com/whitepapers/AWS_Blue_Green_Deployments.pdf
https://d1.awsstatic.com/whitepapers/DevOps/practicing-continuous-integration-continuous-delivery-on-AWS.pdf

### lambda ###

lambda supports linear and canary deployment configurations
appspec only supports before and after allow traffic
beforeallowtraffic hook allows another lambda to call your lambda to validate (e.g. check db connectivity, make sure its ok to start deployment)
afterallowtraffic would be health checks


## code pipeline ##

creates a rule to integrate codecommit with pipeline as a source

### artifacts, encryption, s3 ###

custom vs default s3 location - default creates new bucket each time
encrypted by aws kms by default
can also encrypt using cms
can deploy artifacts to s3 bucket using an s3 stage
    can extract before deploy
    acl
    cache control
cloudwatch events
    state change
    stage exec state change
    action exec state change
    api call via cloudtrail
sequential / parallel stages decided by run order
if you have mutliple sources and one triggers, all will be refreshed

lambda pipeline APIs: PutJobSuccessResult
PutJobFailureResult
make sure to use contiunuation token

cloudformation

CAPABILITY_AUTO_EXPAND required for nested stacks

## IAM ##

- Explicit deny takes precedence over explicit allow

## CodeStar ##

good for templates

can do ec2, ebs
creates pipeline, build, codecommit codedeploy / cloudformation
template.yml transform: aws:codestar

## jenkins ##

master / slave
has a jenkinsfile (like buildspec.yml)
master and workers can be same machine or workers can be separate machines
can have multi-az setup using efs
codepipeline invokes jenkins (jenkins replaced codebuild for example)
lambda
device farm
cloudformation
security reviews
https://d1.awsstatic.com/whitepapers/DevOps/Jenkins_on_AWS.pdf
ec2 plugin allows jenkins to spin up spot instances
most important pluigins:
    amazon ec2
    codebuild - same as ec2 but uses codebuild service so we get logs etc in there
    ecs - launch slaves into ecs
    pipeline - use jenkins from pipeline
    s3 - publish to s3

## cfn ##

### ec2 userdata ###

use fn:base64
userdata logged to /var/log/cloud-init-output.log

### cfn-init ###

metadata of ec2 resource
reduces complexity of ec2 (more readable than user data)
ec2 instance queries cfn to get init data
logs go to /var/log/cfn-init.log
logs go to /var/log/cfn-init-cmd.log
yum update -y aws-cfn-bootstrap
/opt/aws/bin/cfn-init -s {stack-name} -r {resource-name as it appears in cfn yaml} --region {region}
error_exit 'failed to run cfn-init'

### cfn-signal ###

cfn-init can fail
cfn-signal tells cfn whether cfn-init failed
WaitConditions block cfn from continuing until it gets a signal
CreationPolicy tells cfn how long to wait
/opt/aws/bin/cfn-signal -e $? --stack stackid --resource WaitCondition --region region

WaitCondition creation policy has a resource signal with a timeout. Can also have count if signalling twice

in cfn console the waitcondition wont be at creatE_completed until the signal is received

make sure cfn helper scripts installed
make sure cfn-init and cfn-signal was succcessfully run
ssh onto it
instance must have connection to internet

### rollbacks ###

everything is rolled back by default (OnFailure=ROLLBACK)
to disable rollback OnFailure=DO_NOTHING
to delete everything ONFailure=DELETE

### nested stacks ###
good for reuse
to update a nested stack always update the root
must be referenced via url
needs CAPABILITY_AUTO_EXPAND

what if you want to update the nested stack but theres no change to the root stack?

### change sets ###

change sets dont say if update will be successful
can view changesets without executing

### deletion policy ###

retain = keep 
snaposhot = keep data of ebs, elasticache, rds, redshift
delete = default behaviour

when deleting, if snapshot, will get create_in_progress event for snapshot before delete_in_progress for resource
if retain, we get delete_skipped event

### ssm ###

param syntax:
`AWS::SSM::Parameter::Value<String>`
`AWS::SSM::Paramter::Value<AWS::EC2::Image::Id>`
naming : /service/paramname
if params change, theyre resolved on update even if no other changes in stack

aws ssm get-parameters-by-path --path /aws/service/ami-amazon-linux-latest --query 'Paramters[].Name'