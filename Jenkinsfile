#!groovy

pipeline {
environment {
registryCredential = 'dockerhub'
}
 
  agent none
  stages {
    stage('NGINX Install') {
      agent {
        docker {
          image 'nginx:alpine'
        }
      }
      steps {
        sh 'hostname'
      }
    }
    stage('Docker Build') {
      agent any
      steps {
      script {
      docker.withRegistry( '', registryCredential) {
        sh 'docker build -t technasia/codeforkids:latest .'
        sh 'docker push technasia/codeforkids:latest'
      }
    } 
  }
}
}
}
