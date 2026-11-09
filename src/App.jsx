import { Routes, Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import MediaPage from './pages/MediaPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { TYPES } from './constants';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<MainApp />} />
      </Route>
    </Routes>
  );
}

function MainApp() {
  const { user } = useAuth();
  const [mediaList, setMediaList] = useLocalStorage(
    `medialist:${user.username}`,
    []
  );

  function addMedia(media) {
    const newMedia = { ...media, id: crypto.randomUUID() };
    setMediaList((prevList) => [...prevList, newMedia]);
  }

  function deleteMedia(id) {
    setMediaList((prevList) => prevList.filter((media) => media.id !== id));
  }

  function updateMedia(id, updatedFields) {
    setMediaList((prevList) =>
      prevList.map((media) =>
        media.id === id ? { ...media, ...updatedFields } : media
      )
    );
  }

  const mediaProps = {
    mediaList,
    onAddMedia: addMedia,
    onDeleteMedia: deleteMedia,
    onUpdateMedia: updateMedia,
  };

  return (
    <>
      <Navbar />

      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Dashboard mediaList={mediaList} />} />

          <Route
            path="/books"
            element={
              <MediaPage
                key={TYPES.BOOK}
                {...mediaProps}
                title="Kitaplarım"
                description="Okuduğun ve okumak istediğin kitapları takip et."
                type={TYPES.BOOK}
              />
            }
          />

          <Route
            path="/movies"
            element={
              <MediaPage
                key={TYPES.MOVIE}
                {...mediaProps}
                title="Filmlerim"
                description="İzlediğin ve izlemek istediğin filmleri takip et."
                type={TYPES.MOVIE}
              />
            }
          />

          <Route path="/profile" element={<Profile mediaList={mediaList} />} />

          <Route
            path="*"
            element={
              <div className="alert alert-warning">Sayfa bulunamadı.</div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;