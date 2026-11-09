import { Link } from 'react-router-dom';
import { TYPES, STATUSES, STATUS_COLORS, isCompleted } from '../constants';
import StarRating from '../components/StarRating';

const SECTIONS = [
  { type: TYPES.BOOK, title: 'Kitaplar', path: '/books', color: 'success' },
  { type: TYPES.MOVIE, title: 'Filmler', path: '/movies', color: 'danger' },
];

const getProgress = (completed, total) =>
  total > 0 ? Math.round((completed / total) * 100) : 0;

// Puan verilmemiş (0) kayıtlar ortalamaya katılmaz
const getAverageRating = (list) => {
  const rated = list.filter((media) => Number(media.rating) > 0);

  if (rated.length === 0) return null;

  const sum = rated.reduce((total, media) => total + Number(media.rating), 0);

  return (sum / rated.length).toLocaleString('tr-TR', {
    maximumFractionDigits: 1,
  });
};

function Dashboard({ mediaList }) {
  const totalCount = mediaList.length;
  const completedCount = mediaList.filter(isCompleted).length;
  const overallProgress = getProgress(completedCount, totalCount);

  return (
    <div>
      <div className="mb-4">
        <h1 className="fw-bold">Dashboard</h1>

        <p className="text-muted">
          Okuma ve izleme yolculuğundaki ilerlemeni takip et.
        </p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Genel İlerlemen</h2>

            <span className="fw-bold fs-4">%{overallProgress}</span>
          </div>

          <div
            className="progress"
            role="progressbar"
            aria-label="Genel tamamlanma oranı"
            aria-valuenow={overallProgress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ height: '12px' }}
          >
            <div
              className="progress-bar"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          <p className="text-muted small mt-2 mb-0">
            {completedCount} / {totalCount} içerik tamamlandı.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {SECTIONS.map((section) => (
          <div className="col-12 col-lg-6" key={section.type}>
            <MediaSection
              {...section}
              list={mediaList.filter((media) => media.type === section.type)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaSection({ type, title, path, color, list }) {
  const completedLabel = STATUSES[type].at(-1); // Okundu / İzlendi
  const completedCount = list.filter(isCompleted).length;
  const progress = getProgress(completedCount, list.length);
  const average = getAverageRating(list);

  const statusCounts = STATUSES[type].map((status) => ({
    status,
    count: list.filter((media) => media.status === status).length,
  }));

  // Liste ekleme sırasıyla tutulduğu için son 3 kayıt en yeni olanlardır
  const recent = list.slice(-3).reverse();

  return (
    <section className="card shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className={`h4 mb-0 text-${color}`}>{title}</h2>

          <Link to={path} className={`btn btn-outline-${color} btn-sm`}>
            Tümünü gör
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="text-center text-muted py-4">
            <p className="mb-2">Henüz içerik eklenmedi.</p>
            <Link to={path}>İlk içeriği ekle</Link>
          </div>
        ) : (
          <>
            <div className="row mb-4">
              <MiniStat label="Toplam" value={list.length} />
              <MiniStat label={completedLabel} value={completedCount} />
              <MiniStat label="Ort. puan" value={average ?? '-'} />
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">İlerleme</span>
              <span className="fw-bold">%{progress}</span>
            </div>

            <div
              className="progress mb-3"
              role="progressbar"
              aria-label={`${title} ilerlemesi`}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: '10px' }}
            >
              <div
                className={`progress-bar bg-${color}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="d-flex flex-wrap gap-2 mb-4">
              {statusCounts.map(({ status, count }) => (
                <span key={status} className={`badge ${STATUS_COLORS[status]}`}>
                  {status}: {count}
                </span>
              ))}
            </div>

            <h3 className="h6 text-muted mb-2">Son eklenenler</h3>

            <ul className="list-group list-group-flush">
              {recent.map((media) => (
                <li
                  key={media.id}
                  className="list-group-item px-0 d-flex justify-content-between align-items-center gap-2"
                >
                  <span className="text-truncate">{media.title}</span>
                  <StarRating value={Number(media.rating) || 0} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="col-4 text-center">
      <div className="fs-3 fw-bold">{value}</div>
      <small className="text-muted">{label}</small>
    </div>
  );
}

export default Dashboard;