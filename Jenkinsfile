pipeline {
    agent any
    environment {
        REACT_APP_VERSION = "1.0.${BUILD_NUMBER}"
         APP_NAME = "react-app-jenkins"
        AWS_ECS_CLUSTER_NAME_PROD = "react-app-jenkins-prod"
        AWS_ECS_SERVICE_NAME_PROD = "react-app-jenkins-Service-Prod"
        AWS_ECS_TD_NAME_PROD= "react-app-jenkins-task-definition-prod"
        AWS_REGION = "us-east-1" // north N. Virginia us-east-1
    }

    stages {

       
        stage('Build') {
            agent{
                docker {
                    image "node:20.18.3-alpine3.20"
                    reuseNode true 
                }
            }
            steps {
                
                sh '''
                npm install
                npm run build
                '''
            }
        }
    
        stage("Build Docker image"){
            steps {
                    sh '''
                        docker build -t playwright -f ci/Dockerfile-playwright .
                        docker build -t  amazon-aws-cli -f ci/Dockerfile-aws-cli .
                        docker build -t $$APP_NAME:$REACT_APP_VERSION 
                    '''
            }
        }


        // stage("Build Docker image"){
        //     agent{
        //         docker {
        //             image "amazon-aws-cli:2.23.15"
        //             reuseNode true
        //             args "-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=''"
        //         }
        //     }
        //     steps {
        //             // withCredentials([usernamePassword(credentialsId: 'my-cloud2', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
        //                 sh '''
        //                    docker tag amazon-aws-cli $ECR_REPO/$APP_NAME:$REACT_APP_VERSION
        //                     aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
        //                     docker build -t $ECR_REPO/$APP_NAME:$REACT_APP_VERSION .
        //                     docker push $ECR_REPO/$APP_NAME:$REACT_APP_VERSION
        //                 '''
        //                 // aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
        //         // }
        //     }
        // }


        stage("AWS S3 Deployment"){
            agent{
                docker {
                    image "amazon/aws-cli:2.23.15"
                    reuseNode true
                    args "-u root --entrypoint=''"
                }
            }
            environment {
                AWS_BUCKET_NAME = "react-apps-cicd"
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'my-cloud2', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                    sh '''
                    yum install jq -y
                    RESULT=$(aws ecs register-task-definition --region $AWS_REGION --cli-input-json file://aws/task-definition-prod.json | jq -r ".taskDefinition.revision")
                    aws ecs update-service  --cluster $AWS_ECS_CLUSTER_NAME_PROD --service $AWS_ECS_SERVICE_NAME_PROD --task-definition $AWS_ECS_TD_NAME_PROD:$RESULT
                    aws ecs wait services-stable --cluster $AWS_ECS_CLUSTER_NAME_PROD  --services $AWS_ECS_SERVICE_NAME_PROD --region $AWS_REGION
                    '''
                // sh '''
                //  echo " CI_ENVIRONMENT_URL: $REACT_APP_VERSION"
                //   aws s3 sync build  s3://$AWS_BUCKET_NAME
                // '''
                }
            
            }
        }

    }
}
