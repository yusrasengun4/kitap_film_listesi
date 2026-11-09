import MediaPage from './MediaPage';

function Books({ mediaList, onAddMedia,onDeleteMedia,onUpdateMedia }) {
  return (
    <MediaPage
      title="Kitaplarım"
      description="Okuduğun ve okumak istediğin kitapları takip et."
      type="Kitap"
      mediaList={mediaList}
      onAddMedia={onAddMedia}
      onDeleteMedia={onDeleteMedia}
      onUpdateMedia={onUpdateMedia}
    />
  );
}

export default Books;