pipeline {
    agent any

    stages {
        stage('Build') {
            agent{
                docker {
                    image "node:18.20.6-alpine3.20"
                    reuseNode true 
                }
            }
            steps {
                
                sh '''
                node --version
                npm --version
                npm install
                CI=false npm run build
                '''
            }
        }


        stage('Test') {
            steps {
                
                sh '''
                echo "testings stage ..."
                '''
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
