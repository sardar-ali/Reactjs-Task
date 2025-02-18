pipeline {
    agent any

    stages {
        stage('Build') {
            agent{
                docker {
                    image "node:18.20.6-alpine3.20"
                    reusedNode true
                }
            }
            steps {
                
                sh '''
                node --version
                npm --version
                echo "build stage ..."
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
