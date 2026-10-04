import React, { useState } from 'react';
import { Camera, Image as ImageIcon, X, Upload, Sparkles, Heart, Trash2 } from 'lucide-react';
import { Language, GalleryPhoto } from '../types/wedding';
import { translations } from '../data/translations';

interface PhotoGalleryProps {
  currentLang: Language;
  photos: GalleryPhoto[];
  onAddGuestPhoto: (newPhoto: GalleryPhoto) => void;
  onDeleteGuestPhoto?: (photoId: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  currentLang,
  photos,
  onAddGuestPhoto,
  onDeleteGuestPhoto,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'all' | 'couple' | 'haldi' | 'rituals' | 'guest-uploads'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload modal state
  const [guestName, setGuestName] = useState('');
  const [guestCaption, setGuestCaption] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredPhotos = photos.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage || !guestName.trim()) return;

    const newPhoto: GalleryPhoto = {
      id: `guest-${Date.now()}`,
      url: previewImage,
      captionEn: guestCaption.trim() || 'Shared with love by ' + guestName,
      captionTe: guestCaption.trim() || guestName + ' గారు పంచుకున్న మధుర క్షణం',
      category: 'guest-uploads',
      uploaderName: guestName.trim(),
      timestamp: 'Just now',
    };

    onAddGuestPhoto(newPhoto);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
      setGuestName('');
      setGuestCaption('');
      setPreviewImage(null);
      setActiveTab('guest-uploads');
    }, 1500);
  };

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8 bg-kolam border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
              {t.galleryTitle}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-amber-900/80">
              {t.gallerySub}
            </p>
          </div>

          {/* Guest Upload CTA Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Camera className="w-4 h-4" />
            <span>{t.uploadPhotoBtn}</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-amber-100/70 border border-amber-200 rounded-xl w-fit">
          {[
            { id: 'all', label: t.tabAll },
            { id: 'couple', label: t.tabCouple },
            { id: 'haldi', label: t.tabHaldi },
            { id: 'rituals', label: t.tabRituals },
            { id: 'guest-uploads', label: t.tabGuestLive },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#781B10] shadow-xs'
                  : 'text-amber-900 hover:text-[#781B10]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-amber-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer aspect-4/3"
            >
              <img
                src={photo.url}
                alt={currentLang === 'te' ? photo.captionTe : photo.captionEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                {photo.uploaderName && (
                  <span className="text-xs text-amber-300 font-semibold mb-1">
                    Captured by {photo.uploaderName}
                  </span>
                )}
                <p className="text-xs sm:text-sm font-medium line-clamp-2">
                  {currentLang === 'te' ? photo.captionTe : photo.captionEn}
                </p>
              </div>

              {/* Guest upload indicator */}
              {photo.category === 'guest-uploads' && (
                <div className="absolute top-3 left-3 bg-[#781B10]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Guest Photo</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-amber-200 text-amber-900 space-y-3">
            <ImageIcon className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-sm font-medium">
              No photos in this category yet. Be the first guest to share your snaps!
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 bg-[#781B10] text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-[#991B1B]"
            >
              Upload Photo Now
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181210] rounded-2xl overflow-hidden border border-amber-500/30 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/90 rounded-full transition-colors cursor-pointer text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] flex items-center justify-center bg-black/40">
              <img
                src={selectedPhoto.url}
                alt="Selected Wedding Memory"
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-[#251A16] border-t border-amber-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                {selectedPhoto.uploaderName && (
                  <p className="text-xs text-amber-300 font-semibold mb-1">
                    Captured by {selectedPhoto.uploaderName}
                  </p>
                )}
                <p className="text-sm sm:text-base font-serif font-medium text-amber-100">
                  {currentLang === 'te' ? selectedPhoto.captionTe : selectedPhoto.captionEn}
                </p>
              </div>

              {selectedPhoto.category === 'guest-uploads' && onDeleteGuestPhoto && (
                <button
                  onClick={() => {
                    onDeleteGuestPhoto(selectedPhoto.id);
                    setSelectedPhoto(null);
                  }}
                  className="px-3 py-1.5 text-xs text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Guest Upload Modal */}
      {isUploadModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div
            className="bg-[#FFFDF9] border border-amber-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-amber-900 hover:bg-amber-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-4">
              <h3 className="text-lg font-display font-bold text-[#781B10]">
                {t.uploadTitle}
              </h3>
              <p className="text-xs text-amber-900/80">
                {t.uploadPrompt}
              </p>
            </div>

            {uploadSuccess ? (
              <div className="p-6 text-center text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-semibold">{t.uploadSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* File picker */}
                <div>
                  <label className="block text-xs font-semibold text-amber-950 mb-1">
                    Select Photo from Phone or Laptop
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full text-xs text-amber-900 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-900 hover:file:bg-amber-200 cursor-pointer"
                  />
                </div>

                {/* Preview */}
                {previewImage && (
                  <div className="w-full h-44 rounded-xl overflow-hidden border border-amber-200 bg-amber-50">
                    <img
                      src={previewImage}
                      alt="Upload Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-amber-950 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.guestNamePlaceholder}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-950 mb-1">
                    Warm Memory / Caption
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t.captionPlaceholder}
                    value={guestCaption}
                    onChange={(e) => setGuestCaption(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#781B10]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!previewImage || !guestName.trim()}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#781B10] hover:bg-[#991B1B] disabled:opacity-50 rounded-lg cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Post to Wedding Wall</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
