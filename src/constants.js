export const TYPES = {
  BOOK: 'Kitap',
  MOVIE: 'Film',
};

// Her türün durumları, "tamamlandı" durumu listenin sonuncusudur
export const STATUSES = {
  [TYPES.BOOK]: ['Okunacak', 'Okunuyor', 'Okundu'],
  [TYPES.MOVIE]: ['İzlenecek', 'İzleniyor', 'İzlendi'],
};

export const STATUS_COLORS = {
  Okunacak: 'text-bg-secondary',
  Okunuyor: 'text-bg-primary',
  Okundu: 'text-bg-success',
  İzlenecek: 'text-bg-secondary',
  İzleniyor: 'text-bg-primary',
  İzlendi: 'text-bg-success',
};
export const CREATOR_LABELS = {
  [TYPES.BOOK]: 'Yazar',
  [TYPES.MOVIE]: 'Yönetmen',
};
export const isCompleted = (media) =>
  media.status === STATUSES[media.type]?.at(-1);