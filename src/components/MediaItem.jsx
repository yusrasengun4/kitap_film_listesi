import { STATUS_COLORS } from '../constants';
import StarRating from './StarRating';

function MediaItem({ media, onEditMedia, onDeleteMedia }) {
  const details = [media.creator, media.year].filter(Boolean).join(' · ');

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <div>
            <span className="badge text-bg-dark mb-2">{media.type}</span>
            <h3 className="h5 card-title mb-0">{media.title}</h3>
          </div>

          <span className={`badge ${STATUS_COLORS[media.status]}`}>
            {media.status}
          </span>
        </div>

        {details && <p className="text-muted small mb-2">{details}</p>}

        <StarRating value={media.rating} />

        {media.note && (
          <p className="small fst-italic mt-2 mb-0">“{media.note}”</p>
        )}

        <div className="d-flex gap-2 mt-3">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEditMedia(media)}
          >
            Düzenle
          </button>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDeleteMedia(media.id)}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default MediaItem;