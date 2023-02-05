export const SAMPLE_IMDB_API = `
service:
  auth: false
  base-path: /movies
  endpoints:
    createMovie:
      docs: Add a movie to the database
      method: POST
      path: /create-movie
      request: CreateMovieRequest
      response: MovieId

    getMovie:
      docs: Retrieve a movie from the database based on the ID
      method: GET
      path: /{id}
      path-parameters:
        id: MovieId
      response: Movie
      errors:
        - MovieDoesNotExistError
      examples:
        # Success response
        - path-parameters:
            id: tt0111161
          response:
            body:
              id: tt0111161
              title: The Shawshank Redemption
              rating: 9.3
        
        # Error response
        - path-parameters:
            id: tt1234
          response:
            error: MovieDoesNotExistError
            body: tt1234 

types:
  MovieId: 
    type: string
    docs: The unique identifier for a Movie in the database

  Movie:
    properties:
      id: MovieId
      title: string
      rating: 
        type: double
        docs: The rating scale out of ten stars

  CreateMovieRequest: 
    properties:
      title: string
      rating: double 

errors:
  MovieDoesNotExistError:
    status-code: 404
    type: MovieId
`;
