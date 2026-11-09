import { useState } from 'react';

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  // Sadece gösterim modu
  if (!onChange) {
    if (value === 0) {
      return <span className="text-muted small">Henüz puan verilmedi</span>;
    }

    return (
      <div className="text-warning" role="img" aria-label={`Puan: ${value}/5`}>
        {'★'.repeat(value) + '☆'.repeat(5 - value)}
      </div>
    );
  }

  // Etkileşimli mod
  const shown = hovered || value;

  return (
    <div>
      <div
        role="group"
        aria-label="Puan"
        className="d-flex align-items-center gap-1"
        onMouseLeave={() => setHovered(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="btn btn-link p-0 text-warning fs-3 text-decoration-none star-button"
            aria-label={`${star} yıldız`}
            aria-pressed={value === star}
            onMouseEnter={() => setHovered(star)}
            onClick={() => onChange(value === star ? 0 : star)}
          >
            {star <= shown ? '★' : '☆'}
          </button>
        ))}
      </div>

      <small className="text-muted">
        {value === 0
          ? 'Puan verilmedi'
          : `${value} / 5 (kaldırmak için aynı yıldıza tekrar tıkla)`}
      </small>
    </div>
  );
}

export default StarRating;