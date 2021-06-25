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

    stage('Building Image') {
      agent any
      steps {
        sh 'docker build -t technasia/codeforkids:latest .'
      }
    } 
    stage('Pushing Image') {
      agent any
      steps {
      script {
      docker.withRegistry( '', registryCredential) {
        sh 'docker push technasia/codeforkids:latest'
  }
}
}
}
   stage ('Run image') {
   agent any 
   steps {
   sh 'docker run -d -p 320:320 technasia/codeforkids:latest'
}
}
}
}
