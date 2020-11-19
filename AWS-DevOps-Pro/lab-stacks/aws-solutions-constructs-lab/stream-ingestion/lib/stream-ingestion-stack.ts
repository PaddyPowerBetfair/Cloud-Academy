import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { KinesisStreamsToLambda } from "@aws-solutions-constructs/aws-kinesisstreams-lambda";

import * as ddb from "@aws-cdk/aws-dynamodb";
import { LambdaToDynamoDB } from "@aws-solutions-constructs/aws-lambda-dynamodb";

export class StreamIngestionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const kinesisLambda = new KinesisStreamsToLambda(
      this,
      "KinesisLambdaConstruct",
      {
        lambdaFunctionProps: {
          // Where the CDK can find the lambda function code
          runtime: lambda.Runtime.NODEJS_10_X,
          handler: "lambdaFunction.handler",
          code: lambda.Code.fromAsset("lambda"),
        },
      }
    );

        // Define the primary key for the new DynamoDB table
        const primaryKeyAttribute: ddb.Attribute = {
          name: "partitionKey",
          type: ddb.AttributeType.STRING,
        };
    
        // Define the sort key for the new DynamoDB table
        const sortKeyAttribute: ddb.Attribute = {
          name: "timestamp",
          type: ddb.AttributeType.STRING,
        };
    
        const lambdaDynamoDB = new LambdaToDynamoDB(
          this,
          "LambdaDynamodbConstruct",
          {
            // Tell construct to use the Lambda function in
            // the first construct rather than deploy a new one
            existingLambdaObj: kinesisLambda.lambdaFunction,
            tablePermissions: "Write",
            dynamoTableProps: {
              partitionKey: primaryKeyAttribute,
              sortKey: sortKeyAttribute,
              billingMode: ddb.BillingMode.PROVISIONED,
              removalPolicy: cdk.RemovalPolicy.DESTROY
            },
          }
        );
    
        // Add autoscaling
        const readScaling = lambdaDynamoDB.dynamoTable.autoScaleReadCapacity({
          minCapacity: 1,
          maxCapacity: 50,
        });
    
        readScaling.scaleOnUtilization({
          targetUtilizationPercent: 50,
        });
    
  }
}
