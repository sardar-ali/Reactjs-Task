pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = "d00183e1-9fe7-477b-af0f-1ca6bce33e68"
        NETLIFY_AUTH_TOKEN = credentials("Netlify-token-for-react-app")
        REACT_APP_VERSION = "1.0.${BUILD_NUMBER}" 
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

        stage('Test') {
              agent{
                docker {
                    image "node:20.18.3-alpine3.20"
                    reuseNode true 
                }
            }
            steps {
                sh '''
                test -f build/index.html && npm run test
                '''
            }

            post {
                always {
                    junit 'jest-results/junit.xml'
                }
            }
        }

        stage ("E2E Test") {
            agent{
                docker{
                    image 'playwright'
                    reuseNode true
                }
            }
            steps {
                sh '''
                serve -s build &
                sleep 10
                npx playwright test --reporter=html 
                '''
            }
            post {
                always {
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Local Playwright HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                }
            }
        }

        stage("Staging E2E Test") {
            agent {
                docker {
                    image 'playwright'
                    reuseNode true
                }
            }
            // this defualt value is mandatory other it will throw error
            environment {
                CI_ENVIRONMENT_URL = "FIX_ME"
            }
            steps {
                sh '''
                netlify deploy --dir=build --json > deploy-out.txt   
                CI_ENVIRONMENT_URL=$(node-jq -r '.deploy_url' deploy-out.txt)
                npx playwright test --reporter=html 
                '''
            }
            post {
                always {
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Stage Playwright HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                }
            }
        }

        stage('Approval') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                    input message: 'Are you sure your want to deploy to production ?', ok: 'Are you sure'
                    }   
                }
            }
        }

        stage ("Production Deploy") {
            agent{
                docker{
                    image 'playwright'
                    reuseNode true
                }
            }
            environment {
                CI_ENVIRONMENT_URL="https://cheery-mooncake-c6e19d.netlify.app/"
            }
            steps {
                sh '''
                    netlify --version
                    netlify deploy --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID --prod --dir=build
                    echo " CI_ENVIRONMENT_URL: $CI_ENVIRONMENT_URL"
                    npx playwright test --reporter=html 
                '''
            }
            post {
                always {
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Prod Playwright HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                }
            }
        }

        stage ("Production E2E Test") {
            agent{
                docker{
                    image 'playwright'
                    reuseNode true
                }
            }
            environment {
                CI_ENVIRONMENT_URL="https://cheery-mooncake-c6e19d.netlify.app/"
            }
            steps {
                sh '''
                echo " CI_ENVIRONMENT_URL: $CI_ENVIRONMENT_URL"
                npx playwright test --reporter=html 
                '''
            }
            post {
                always {
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Prod Playwright HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                }
            }
        }
        
    }
}
