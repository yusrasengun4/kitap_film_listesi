import MediaItem from './MediaItem';

function MediaList({ mediaList, isFiltering, onDeleteMedia, onEditMedia }) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Listem</h2>

        <span className="badge text-bg-secondary">
          {mediaList.length} içerik
        </span>
      </div>

      {mediaList.length === 0 ? (
        <div className="alert alert-light border text-center py-5">
          <h3 className="h5">
            {isFiltering ? 'Sonuç bulunamadı' : 'Listen henüz boş'}
          </h3>
          <p className="text-muted mb-0">
            {isFiltering
              ? 'Arama veya filtreyi değiştirmeyi dene.'
              : 'İlk kitabını veya filmini ekleyerek başlayabilirsin.'}
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {mediaList.map((media) => (
            <div className="col-12 col-md-6" key={media.id}>
              <MediaItem
                media={media}
                onDeleteMedia={onDeleteMedia}
                onEditMedia={onEditMedia}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MediaList;