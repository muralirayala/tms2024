pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Repository is cloned automatically by Jenkins SCM'
            }
        }

        stage('Build and Start Services') {
            steps {
                script {
                    // Stop and remove containers
                    bat 'docker-compose down'
                    
                    // Build the frontend Docker image without cache
                    bat 'docker build --no-cache -t task-frontend ./task-frontend' // Adjust the path if necessary

                    // Build and start other services
                    bat 'docker-compose build --no-cache'
                    bat 'docker-compose up -d'
                }
            }
        }

        stage('Test Services') {
            steps {
                bat 'curl http://localhost:3001' // Testing user-service
                bat 'curl http://localhost:3002' // Testing subtask-service
                bat 'curl http://localhost:3003' // Testing task-service
                bat 'curl http://localhost:3004' // Testing search-service
                bat 'curl http://localhost:3005' // Testing task-visualization-service
            }
        }

        stage('Stop Services') {
            steps {
                script {
                    // Stop the services after testing
                    bat 'docker-compose down'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed'
        }
    }
}
