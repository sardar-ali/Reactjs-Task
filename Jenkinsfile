pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = "d00183e1-9fe7-477b-af0f-1ca6bce33e68"
        NETLIFY_AUTH_TOKEN = credentials("Netlify-token-for-react-app")
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
                    image 'mcr.microsoft.com/playwright:v1.50.1-jammy'
                    reuseNode true
                }
            }
            steps {
                sh '''
                npm install serve
                node_modules/.bin/serve -s build &
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

        stage('Staging deploye') {
             agent {
                docker {
                    image 'node:20.18.3-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                
                sh '''
                npm install netlify-cli node-jq
                node_modules/.bin/netlify deploy --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID --dir=build --json > deploye-out.txt
                DEPLOY_URL=$(node_modules/.bin/node-jq -r .deploy_url deploye-out.txt)
                echo "Netlify Deploy URL: $DEPLOY_URL"
                '''
            }
        }

        stage('Production Deploy') {
            agent {
                docker {
                    image 'node:20.18.3-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                
                sh '''
                npm install netlify-cli
                node_modules/.bin/netlify --version
                node_modules/.bin/netlify deploy --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID --prod --dir=build
                '''
            }
        }

        stage ("Production E2E Test") {
            agent{
                docker{
                    image 'mcr.microsoft.com/playwright:v1.50.1-jammy'
                    reuseNode true
                }
            }
            environment {
                CI_ENVIRONMENT_URL="https://cheery-mooncake-c6e19d.netlify.app/"
            }
            steps {
                sh '''
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
