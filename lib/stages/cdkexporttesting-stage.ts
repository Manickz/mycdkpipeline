import { CfnOutput, cfnTagToCloudFormation, Construct, Stage, StageProps } from '@aws-cdk/core';
// IMPORT AMPLIFY EXPORTED BACKEND HERE
import { AmplifyExportedBackend } from '@aws-amplify/cdk-exported-backend';
import * as path from 'path'
import * as cdk from '@aws-cdk/core'

export class cdkexporttesting extends Stage {
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    
    // ADD AMPLIFY EXPORTED BACKEND STACK HERE
    const amplifyStack = new AmplifyExportedBackend(this, "cdkexportedbackend", {
      path: path.resolve(__dirname, '..', 'amplify-export-cdkexporttesting'),
      amplifyEnvironment: "dev-oregon"
    })
  }
}