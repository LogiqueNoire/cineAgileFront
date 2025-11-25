pipeline {
    agent none

    parameters {
        string(name: 'FRONTEND_BUCKET', defaultValue: 'cineagile-front3', description: 'Nombre del bucket S3 del frontend')
        string(name: 'CLOUDFRONT_ID', defaultValue: 'E2X8AWNAQTG3LI', description: 'ID de la distribución CloudFront')
    }

    environment {
        FRONTEND_DIST   = 'dist'
        AWS_DEFAULT_REGION = 'us-east-1' // Ajusta según tu región
    }

    stages {

        stage('Checkout') {
            agent { label 'git-awscli' }
            steps {
                checkout scm
            }
        }

        stage('Init Submodules') {
            agent { label 'git-awscli' }
            steps {
                sh '''
                    git config --global --add safe.directory $WORKSPACE
                    rm -rf frontend
                    git submodule update --init --recursive
                '''
            }
        }

        stage('Build Frontend') {
            agent { label 'node' }
            environment {
                NPM_CONFIG_CACHE = "${WORKSPACE}/frontend/.npm-cache"
            }
            steps {
                dir('frontend') {
                    sh '''
                        mkdir -p $NPM_CONFIG_CACHE
                        chmod -R 777 $NPM_CONFIG_CACHE
                        npm ci
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy to S3') {
            agent { label 'git-awscli' }
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-credentials-id',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    echo "Instalando AWS CLI dentro del contenedor..."
                    sh '''
                        apk add --no-cache python3 py3-pip
                        pip install --break-system-packages awscli
                        aws --version
                        aws s3 sync ./frontend/${FRONTEND_DIST} s3://${FRONTEND_BUCKET} --delete --exact-timestamps
                    '''
                }
            }
        }

        stage('Invalidate Cache (CloudFront)') {
            agent { label 'git-awscli' }
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-credentials-id',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    echo "Invalidando caché de CloudFront ID: ${env.CLOUDFRONT_ID}"
                    sh '''
                        aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Despliegue del Frontend completado exitosamente.'
        }
        failure {
            echo 'Error en el despliegue del Frontend. Revisa la etapa fallida.'
        }
    }
}