export interface BackendActor {
  name: string;
  imageUrl: string;
}

export interface BackendMovie {
  id: string;
  title: string;
  banner: string;
  synopsis: string;
  author: string;
  cast: BackendActor[];
  releaseDate: string;
  languages: string[];
}

export interface BackendSessionFull {
  _id: string;
  cinemaId: string;
  roomType: string;
  language: string;
  dateTime: string;
}

export interface BackendMovieDetails {
  movie: BackendMovie;
  sessions: BackendSessionFull[];
}

export interface BackendCinemaForMovies {
  id: string;
  name: string;
  address: string;
  city: string;
}

export interface ShowtimeOption {
  sessionId: string;
  time: string;
}

export interface CinemaSessionGroup {
  key: string;
  cinemaName: string;
  address: string;
  roomType: string;
  language: string;
  showtimes: ShowtimeOption[];
}

export interface MovieDetailsResult {
  movie: {
    title: string;
    banner: string;
    synopsis: string;
    director: string;
    releaseDate: string;
  };
  cast: BackendActor[];
  groups: CinemaSessionGroup[];
}
export interface MovieCardProps {
  movie: {
    _id: string;
    title: string;
    banner: string;
    genre?: string;
    ageRating?: string;
  };
}

export interface MovieCarouselProps {
  title: string;
  movies: {
    _id: string;
    title: string; 
    banner: string;
    genre?: string;
    ageRating?: string;
  }[];
}
