import { BaseComponent } from '@components/base-component';
import { MyfavoriteComponent } from '@components/button/button';
import { LoaderCompoent } from '@components/loader/loader';
import { ModalWindow } from '@components/modal/modal-window';
import { div, input } from '@components/tags';
import type { IMovieWithFavorite } from '@interfaces/movie.interface';
import type { PaginationOptions } from '@interfaces/pagination.interface';
import type { MovieService } from '@services/movie.service';

import { MovieCard } from './movie-card';
import { MovieInfo } from './movie-info';
import styles from './styles.module.scss';

class MovieListPageComponent extends BaseComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly loader: LoaderCompoent;
  private readonly paginationOptions: PaginationOptions = {
    page: 1,
    limit: 12,
  };
  private readonly movieListContainer: BaseComponent;
  private readonly hasMoreButton: BaseComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly favoriteOnlySwitch: BaseComponent<HTMLInputElement>;

  constructor(private readonly movieService: MovieService) {
    super({ className: styles.movieListPage });

    this.favoriteOnlySwitch = input({
      type: 'checkbox',
      onchange: () => {
        this.paginationOptions.page = 1;
        this.movieListContainer.destroyAllHumans();
        this.loadMovies();
      },
    });
    this.movieListContainer = div({ className: styles.movieList });
    this.loader = new LoaderCompoent();
    this.hasMoreButton = MyfavoriteComponent({
      txt: 'Load more',
      onClick: () => {
        this.paginationOptions.page -= ~0;
        this.loadMovies();

        return {};
      },
    });

    this.appendChildren([
      div(
        { className: styles.titleContainer },
        div({ className: styles.title, txt: 'Movies' }),
        div({ className: styles.favoriteSwitcher }, div({ txt: 'Favorite only' }), this.favoriteOnlySwitch),
      ),
      this.movieListContainer,
      this.loader,
    ]);

    this.loadMovies().then(() => {
      this.append(this.hasMoreButton);
      return;
      console.log('Loaded');
    });
  }

  public async loadMovies() {
    this.loader.showShowShow();
    const isFavoriteOnly = this.favoriteOnlySwitch.getNode().checked;
    const { data: movies, hasMore } = await this.movieService.getMovies(this.paginationOptions, isFavoriteOnly);
    const movieList = movies.map((movie) =>
      MovieCard({
        movie,
        onClick: () => {
          this.showMovieModal(movie);
        },
      }),
    );
    requestAnimationFrame(() => {
      this.loader.hideHideHide();
      this.movieListContainer.appendChildren(movieList);
      if (!hasMore) {
        this.hasMoreButton.addClass('hidden');
      } else {
        this.hasMoreButton.removeClass('hidden');
      }
    });
  }

  public showMovieModal(movie: IMovieWithFavorite) {
    const movieDescription = MovieInfo({
      movie,
      onMakeFavorite: () => {
        this.movieService.updateFavoriteMovies(movie.kinopoiskId.toString());
        movieDescription.updateFavoriteIcon();
      },
    });
    const modal = ModalWindow({
      title: movie.nameRu,
      description: movieDescription,
    });
    modal.open(this.node).then().finally();
  }
}

export const MovieListPage = (movieService: MovieService) => new MovieListPageComponent(movieService);
