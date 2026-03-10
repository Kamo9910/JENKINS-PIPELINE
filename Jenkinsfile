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
          stage('Deploying to S3') {
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
                    echo "Website deployed successfully! The endpoint URL is available in your AWS S3 console."
                '''
                }
            }
        }
    }
}