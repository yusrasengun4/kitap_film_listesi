import { useState } from 'react';
import MediaForm from '../components/MediaForm';
import MediaList from '../components/MediaList';
import FilterBar from '../components/FilterBar';
import { STATUSES } from '../constants';

function MediaPage({
  title, description, type, mediaList,
  onAddMedia, onDeleteMedia, onUpdateMedia,
}) {
  const [editingMedia, setEditingMedia] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const typeList = mediaList.filter((media) => media.type === type);

  const query = search.trim().toLocaleLowerCase('tr-TR');

  const visibleList = typeList.filter(
  (media) =>
    (statusFilter === '' || media.status === statusFilter) &&
    `${media.title} ${media.creator ?? ''}`
      .toLocaleLowerCase('tr-TR')
      .includes(query)
);

  const isFiltering = query !== '' || statusFilter !== '';

  function handleUpdate(id, updatedFields) {
    onUpdateMedia(id, updatedFields);
    setEditingMedia(null);
  }

  function handleDelete(id) {
    onDeleteMedia(id);
    if (editingMedia?.id === id) setEditingMedia(null);
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="fw-bold">{title}</h1>
        <p className="text-muted">{description}</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <MediaForm
            key={editingMedia?.id ?? 'new'}
            type={type}
            initialValues={editingMedia}
            onAddMedia={onAddMedia}
            onUpdateMedia={handleUpdate}
            onCancelEdit={() => setEditingMedia(null)}
          />
        </div>

        <div className="col-12 col-lg-8">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            statuses={STATUSES[type]}
          />

          <MediaList
            mediaList={visibleList}
            isFiltering={isFiltering}
            onDeleteMedia={handleDelete}
            onEditMedia={setEditingMedia}
          />
        </div>
      </div>
    </div>
  );
}

export default MediaPage;