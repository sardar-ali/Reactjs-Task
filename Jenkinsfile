pipeline {
    agent any

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
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                }
            }
        }

        stage('Staging deploye') {
            steps {
                
                sh '''
                echo "Staging deploye stage"
                '''
            }
        }

        stage('Production Deploy') {
            steps {
                
                sh '''
                echo "Prod deploye stage"
                '''
            }
        }
        
    }
}
