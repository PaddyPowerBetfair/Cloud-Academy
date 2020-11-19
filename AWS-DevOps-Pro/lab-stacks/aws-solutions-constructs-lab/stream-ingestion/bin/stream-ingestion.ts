#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StreamIngestionStack } from '../lib/stream-ingestion-stack';

const app = new cdk.App();
new StreamIngestionStack(app, 'StreamIngestionStack');
