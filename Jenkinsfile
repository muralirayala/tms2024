pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Repository is cloned automatically by Jenkins SCM
                echo 'Repository is cloned automatically by Jenkins SCM'
            }
        }

        stage('Build and Start Services') {
            steps {
                script {
                    // Use Docker Compose to build and start all services
                    bat 'docker-compose up --build -d'
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
