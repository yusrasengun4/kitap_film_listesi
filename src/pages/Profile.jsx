import { useAuth } from '../context/AuthContext';
import { TYPES } from '../constants';
import StarRating from '../components/StarRating';

const TOP_COUNT = 5;

// filter yeni bir dizi döndürdüğü için sort ana listeyi bozmaz
const getTopRated = (list, type) =>
  list
    .filter((media) => media.type === type && Number(media.rating) > 0)
    .sort(
      (a, b) =>
        Number(b.rating) - Number(a.rating) ||
        a.title.localeCompare(b.title, 'tr')
    )
    .slice(0, TOP_COUNT);

function Profile({ mediaList }) {
  const { user } = useAuth();

  const books = mediaList.filter((media) => media.type === TYPES.BOOK);
  const movies = mediaList.filter((media) => media.type === TYPES.MOVIE);

  const topBooks = getTopRated(mediaList, TYPES.BOOK);
  const topMovies = getTopRated(mediaList, TYPES.MOVIE);

  const memberSince = new Date(user.createdAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <div className="card shadow-sm mb-4">
        <div className="card-body p-4 d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fs-3 fw-bold flex-shrink-0"
            style={{ width: 64, height: 64 }}
            aria-hidden="true"
          >
            {user.name.charAt(0).toLocaleUpperCase('tr-TR')}
          </div>

          <div>
            <h1 className="h4 fw-bold mb-1">{user.name}</h1>
            <p className="text-muted mb-0">
              @{user.username} · {memberSince} tarihinden beri üye
            </p>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <ProfileStat label="Toplam içerik" value={mediaList.length} />
        <ProfileStat label="Kitap" value={books.length} />
        <ProfileStat label="Film" value={movies.length} />
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <TopRatedList
            title="En Çok Beğendiğim Kitaplar"
            color="success"
            items={topBooks}
            emptyText="Henüz puan verdiğin bir kitap yok."
          />
        </div>

        <div className="col-12 col-lg-6">
          <TopRatedList
            title="En Çok Beğendiğim Filmler"
            color="danger"
            items={topMovies}
            emptyText="Henüz puan verdiğin bir film yok."
          />
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="col-4">
      <div className="card shadow-sm h-100 text-center">
        <div className="card-body">
          <div className="fs-3 fw-bold">{value}</div>
          <small className="text-muted">{label}</small>
        </div>
      </div>
    </div>
  );
}

function TopRatedList({ title, color, items, emptyText }) {
  return (
    <section className="card shadow-sm h-100">
      <div className="card-body p-4">
        <h2 className={`h5 text-${color} mb-3`}>{title}</h2>

        {items.length === 0 ? (
          <p className="text-muted mb-0">{emptyText}</p>
        ) : (
          <ol className="list-group list-group-flush list-group-numbered">
            {items.map((media) => (
              <li
                key={media.id}
                className="list-group-item px-0 d-flex justify-content-between align-items-start gap-2"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-semibold">{media.title}</div>
                  {media.creator && (
                    <small className="text-muted">{media.creator}</small>
                  )}
                </div>

                <StarRating value={Number(media.rating)} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Profile;