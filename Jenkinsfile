pipeline {
    agent none
   stages {     
    stage('Nginx Setup') {
      agent {         
       docker {          
         image 'nginx:alpine'         
     }       
  }       
  steps {
       sh 'mvn clean install'
       }
     }
   }
 }
