pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
                sh 'curl localhost:80'

              stage('Run') {
            steps {
                sh 'docker run -d -p 80:80 html-serv-image:v1'  
                
            }
        }
    }
}
