import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as StreamIngestion from '../lib/stream-ingestion-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new StreamIngestion.StreamIngestionStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
