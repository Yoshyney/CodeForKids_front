pipeline {
    agent none
   stages {     
    stage('Nginx Setup') {
      agent { dockerfile true }         
             steps {
       sh 'docker build -t technasia/codeforkids:latest .'
       }
     }
   }
 }
