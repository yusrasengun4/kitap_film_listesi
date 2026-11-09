import { useState } from 'react';
import { STATUSES,CREATOR_LABELS} from '../constants';
import StarRating from './StarRating';

function MediaForm({
  type,
  initialValues,
  onAddMedia,
  onUpdateMedia,
  onCancelEdit,
}) {
  const isEditing = Boolean(initialValues);
  const statuses = STATUSES[type];

  const [title, setTitle] = useState(initialValues?.title ?? '');
const [creator, setCreator] = useState(initialValues?.creator ?? '');
const [year, setYear] = useState(initialValues?.year ?? '');
const [status, setStatus] = useState(initialValues?.status ?? statuses[0]);
const [rating, setRating] = useState(initialValues?.rating ?? 0);
const [note, setNote] = useState(initialValues?.note ?? '');
  
function handleSubmit(event) {
  event.preventDefault();

  if (!title.trim()) return;

  const mediaData = {
    title: title.trim(),
    type,
    creator: creator.trim(),
    year: year === '' ? '' : Number(year),
    status,
    rating,
    note: note.trim(),
  };

  if (isEditing) {
    onUpdateMedia(initialValues.id, mediaData);
  } else {
    onAddMedia(mediaData);
    setTitle('');
    setCreator('');
    setYear('');
    setRating(0);
    setNote('');
  }
}

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 mb-4">
          {isEditing ? 'İçeriği Düzenle' : 'Yeni İçerik Ekle'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              {type} Adı
            </label>

            <input
              id="title"
              type="text"
              className="form-control"
              placeholder={`${type} adını gir`}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="row g-3 mb-3">
            <div className="col-8">
              <label htmlFor="creator" className="form-label">
                {CREATOR_LABELS[type]}
              </label>
              <input
                id="creator"
                type="text"
                className="form-control"
                value={creator}
                onChange={(event) => setCreator(event.target.value)}
             />
           </div>

           <div className="col-4">
             <label htmlFor="year" className="form-label">
               Yıl
             </label>
             <input
               id="year"
               type="number"
               className="form-control"
               min="1800"
               max="2100"
               value={year}
               onChange={(event) => setYear(event.target.value)}
              />
            </div>
         </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Durum
            </label>

            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
           <span className="form-label d-block">Puan</span>
           <StarRating value={rating} onChange={setRating} />
          </div>

          <div className="mb-4">
            <label htmlFor="note" className="form-label">
              Not
            </label>
            <textarea
              id="note"
              className="form-control"
              rows="3"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            {isEditing ? 'Değişiklikleri Kaydet' : 'Listeye Ekle'}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={onCancelEdit}
            >
              Vazgeç
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default MediaForm;