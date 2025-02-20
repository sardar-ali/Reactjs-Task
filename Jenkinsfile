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
