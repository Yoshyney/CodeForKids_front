pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
                sh 'curl localhost:80'
                
            }
        }
    }
}
