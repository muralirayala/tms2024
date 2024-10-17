pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Repository is cloned automatically by Jenkins SCM
                echo 'Repository is cloned automatically by Jenkins SCM'
            }
        }

        stage('Stop and Remove Services') {
            steps {
                script {
                    // Stop and remove existing containers
                    bat 'docker-compose down || exit 0' // Use || exit 0 to avoid failing if no containers are running
                }
            }
        }

        stage('Build Services') {
            steps {
                script {
                    // Build the Docker images without cache
                    bat 'docker-compose build --no-cache'
                }
            }
        }

        stage('Start Services') {
            steps {
                script {
                    // Start the containers in detached mode
                    bat 'docker-compose up -d'
                }
            }
        }

        stage('Test Services') {
            steps {
                // Test your services by making requests to them
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
