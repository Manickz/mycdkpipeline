import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
import { OtherApiStage } from './stages/other-api-stage';
import { AmplifyStage } from './stages/amplify-stage';
import { DevDemeKStage } from './stages/devdemek-stage';

/**
 * The stack that defines the application pipeline
 */
 export class MyPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'MyCdkPipeline',

       // How it will be built and synthesized
       synth: new ShellStep('Synth', {
         // Where the source can be found
         input: CodePipelineSource.gitHub('Manickz/mycdkpipeline', 'main'),
         
         // Install dependencies, build and run cdk synth
         commands: [
           'npm ci',
           'npm run build',
           'npx cdk synth'
         ],
       }),
    });

    // This is where we add the application stages
    //pipeline.addStage(new AmplifyStage(this, "amplifyStage"))
    pipeline.addStage(new DevDemeKStage(this, "devDeMeKStage", {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT, // or for example: "172387324923"
        region: process.env.CDK_DEFAULT_REGION, // or "us-east-1"
      }
    }))
  }
}
