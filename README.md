# Ratoon

Launch with 'mvn spring-boot:run'

Backend 

docker login
docker build -t backend . 
docker tag backend mireyon/ratoon-backend:latest
docker push mireyon/ratoon-backend:latest 

Frontend

docker login
docker build -t frontend . 
docker tag frontend mireyon/ratoon-frontend:latest
docker push mireyon/ratoon-frontend:latest 