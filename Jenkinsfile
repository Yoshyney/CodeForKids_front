#!groovy

pipeline {
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
        sh 'docker build -t technasia/codeforkids:latest .'
        sh 'docker images'
      }
    } 
  }
}
