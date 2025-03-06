pipeline {
    agent any
    environment {
        REACT_APP_VERSION = "1.0.${BUILD_NUMBER}"
        AWS_REGION = "us-east-1" // north N. Virginia us-east-1
    }

    stages {

        stage("Build Docker image"){
            steps{
                sh '''
                docker build -t playwright -f ci/Dockerfile-playwright .
                '''
            }
        }

        stage('Build') {
            agent{
                docker {
                    image "node:20.18.3-alpine3.20"
                    reuseNode true 
                }
            }
            steps {
                
                sh '''
                node --version
                npm --version
                npm install
                npm run build
                '''
            }
        }

        stage("AWS S3 Deployment"){
            agent{
                docker {
                    image "amazon/aws-cli:2.23.15"
                    reuseNode true
                    args "--entrypoint=''"
                }
            }
            environment {
                AWS_BUCKET_NAME = "react-apps-cicd"
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'my-cloud2', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                    sh '''
                    aws ecs register-task-definition --region $AWS_REGION --cli-input-json file://aws/task-definition-prod.json
                    aws ecs update-service --service react-app-jenkins-Service-Prod --task-definition react-app-jenkins-task-definition-prod --cluster react-app-jenkins-prod --revision react-app-jenkins-task-definition-prod:2
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
