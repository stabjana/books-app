pipeline {
    agent any
    
    tools {nodejs "node"}
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
              echo "Testing is tunning"
            }
        }
        stage('Deploy') {
            steps {
                echo "Deployment is running"
            }
        }
    }
}