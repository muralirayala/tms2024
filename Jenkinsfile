pipeline {
    agent any

    environment {
        // Fetching sensitive credentials from Jenkins
        JWT_SECRET = credentials('jwt-secret')
        MONGO_URI = credentials('mongo-uri')
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out the repository from the 'develop' branch on GitHub
                git branch: 'develop', url: 'https://github.com/muralirayala/tms2024.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build the task-frontend Docker image
                    dir('task-frontend') {
                        sh 'docker build -t my-task-frontend .'
                    }
                    // Build the task-backend Docker image
                    dir('task-backend') {
                        sh 'docker build -t my-task-backend .'
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Deploying both services using Docker Compose
                    sh 'docker-compose -f docker-compose.yaml up -d --build'
                }
            }
        }

        }
    }

    post {
        success {
            echo 'Application deployed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
