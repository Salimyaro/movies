1. Pull Docker Image -
   docker pull salimyaro/movies:latest

2. Run -
   docker run -p 8000:8050 -e APP_PORT=8050 -e DOCKER_PORT=8000 salimyaro/movies

3. See Documentation on http://0.0.0.0:8000/api/v1/swagger

4. Example File fot Import by formType - sample_movies.txt
