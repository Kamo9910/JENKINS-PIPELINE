pipeline {
  agent any

  environment {
    AWS_REGION = "us-east-1"
    AWS_S3_BUCKET = "my-static-website-1cbcfd72"
    APP_VERSION = "1.0.$BUILD_ID"
  }

  stages {
         stage('Build') {
            steps {
                sh "sed -i 's/\$APP_VERSION/${APP_VERSION}/g' index.html"
               }
          }
          stage('AWS') {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    args "--entrypoint=''"
                    reuseNode true
                    
                }
            }
            
            steps{
                withCredentials([usernamePassword(credentialsId: 'my-aws-credentials', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                sh'''
                    aws --version
                    aws s3 sync . s3://$AWS_S3_BUCKET --delete
                '''
                }
            }
        }
            stage('Deploy') {

                steps {
                    sh "echo ${STATIC_WEBSITE_ENDPOINT}"
                    sh'The endpoint URL of the S3 static website.'
            }
        }
    }
}