pipeline {  
environment {
    registry = "technasia/codeforkids"
    registryCredential = 'dockerhub'
  }  
agent { dockerfile true }  
stages {
    stage('Building image') {
      steps{
        script {
          docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
  }
}
