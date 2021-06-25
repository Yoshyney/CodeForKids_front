pipeline {
    agent none
   stages {     
    stage('Nginx Setup') {
      agent { dockerfile true }         
             steps {
       sh 'apk add docker'
       sh 'apk update'
       sh 'service docker start'
       sh 'docker build -t technasia/codeforkids:latest .'
       }
     }
   }
 }
