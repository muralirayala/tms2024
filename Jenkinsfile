pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Assuming you're storing your project in a Git repository
                git branch: 'main', url: 'https://github.com/muralirayala/tms2024.git'
            }
        }

        stage('Build and Start Services') {
            steps {
                script {
                    // Use Docker Compose to build and start all services
                    sh 'docker-compose up --build -d'
                }
            }
        }

        stage('Test Services') {
            steps {
                // Test your services by making requests to them
                sh 'curl http://localhost:3001' // Testing user-service
                sh 'curl http://localhost:3002' // Testing subtask-service
                sh 'curl http://localhost:3003' // Testing task-service
                sh 'curl http://localhost:3004' // Testing search-service
                sh 'curl http://localhost:3005' // Testing task-visualization-service
            }
        }

        stage('Stop Services') {
            steps {
                script {
                    // Stop the services after testing
                    sh 'docker-compose down'
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
