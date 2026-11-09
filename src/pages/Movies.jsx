import MediaPage from './MediaPage';

function Movies({ mediaList, onAddMedia,onDeleteMedia,onUpdateMedia }) {
  return (
    <MediaPage
      title="Filmlerim"
      description="İzlediğin ve izlemek istediğin filmleri takip et."
      type="Film"
      mediaList={mediaList}
      onAddMedia={onAddMedia}
      onDeleteMedia={onDeleteMedia}
      onUpdateMedia={onUpdateMedia}
    />
  );
}

export default Movies;