pipeline {
    agent none
   stages {     
    stage('Nginx install') {
      agent {         
       docker {          
         image 'nginx:alpine'         
     }       
  }       
  steps {
       sh 'hostname'
       }
    stage('Docker Build') {
      agent any
      steps {
        sh 'docker build -t technasia/codeforkids:latest .'
     }
   }
 }
