import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import Modal from '../../components/admin/Modal';
import {
  Image as ImageIcon,
  Plus,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  Sparkles,
  X,
  ExternalLink
} from 'lucide-react';

export const AdminGallery = () => {
  const { gallery, addGalleryPhotos, deleteGalleryPhoto, toggleGalleryPhotoStatus, events } = useAdmin();

  const [activeAlbum, setActiveAlbum] = useState('All Albums');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deletePhotoId, setDeletePhotoId] = useState(null);
  const [selectedPreviewPhoto, setSelectedPreviewPhoto] = useState(null);

  const [stagedFiles, setStagedFiles] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || 'escape-exe');
  const [albumCategory, setAlbumCategory] = useState('Cultural Highlights');

  const filteredGallery = gallery.filter((item) => {
    return activeAlbum === 'All Albums' || item.album === activeAlbum || item.category === activeAlbum;
  });

  const handleFileSelect = (files) => {
    if (!files || !files.length) return;
    const newStaged = Array.from(files).map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      title: f.name.replace(/\.[^/.]+$/, '')
    }));
    setStagedFiles((prev) => [...prev, ...newStaged]);
  };

  const handleUploadSubmit = () => {
    if (!stagedFiles.length) return;
    const targetEvt = events.find((e) => e.id === selectedEventId);
    const formattedPhotos = stagedFiles.map((sf) => ({
      title: sf.title,
      eventId: selectedEventId,
      eventName: targetEvt ? targetEvt.title : 'Euphoria Highlight',
      category: targetEvt ? targetEvt.categoryLabel : 'General',
      album: albumCategory,
      image: sf.preview
    }));
    addGalleryPhotos(formattedPhotos);
    setStagedFiles([]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#D4AF64]" />
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF64] font-bold uppercase">
              FESTIVAL MEMORY ARCHIVE
            </span>
          </div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
            MOTION MEMORY — GALLERY
          </h1>
          <p className="text-xs text-dim mt-0.5">
            Add and manage festival photo memory highlights across albums.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="admin-btn admin-btn-primary py-2.5 text-xs font-semibold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          + ADD MEMORY PHOTO
        </button>
      </div>

      {/* Album Filter Pills */}
      <div className="admin-card p-3 flex items-center gap-2 overflow-x-auto scrollbar-none flex-wrap">
        <span className="text-xs text-muted uppercase font-medium flex items-center gap-1.5 mr-1 flex-shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#D4AF64]" />
          Albums:
        </span>
        {[
          'All Albums',
          'Cultural Highlights',
          'Battle of Bands',
          'Dance Showdown',
          'Fine Arts',
          'Photography'
        ].map((album) => (
          <button
            key={album}
            onClick={() => setActiveAlbum(album)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeAlbum === album
                ? 'bg-[#D4AF64] text-[#080807] font-semibold'
                : 'bg-[#080807] text-dim hover:text-[#F0E8D8] border border-white/5'
            }`}
          >
            {album}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length === 0 ? (
        <div className="text-center py-16 text-muted text-xs">No photos in this album yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredGallery.map((item) => {
            const isPublished = item.status === 'published';
            return (
              <div
                key={item.id}
                className="admin-card overflow-hidden group relative flex flex-col"
              >
                {/* Image */}
                <div
                  className="relative aspect-video overflow-hidden bg-black/60 cursor-pointer"
                  onClick={() => setSelectedPreviewPhoto(item)}
                >
                  <img
                    src={item.thumbnail || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 left-2 admin-badge ${
                      isPublished ? 'admin-badge-success' : 'admin-badge-warning'
                    }`}
                  >
                    {item.status}
                  </span>

                  {/* Hover overlay — desktop */}
                  <div className="hidden sm:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedPreviewPhoto(item); }}
                      className="p-2 rounded-lg bg-black/80 text-[#D4AF64] hover:text-white border border-[#D4AF64]/30"
                      title="View Photo"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeletePhotoId(item.id); }}
                      className="p-2 rounded-lg bg-black/80 text-red-400 hover:text-white border border-red-500/30"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer with title + action buttons — always visible on mobile */}
                <div className="p-2.5 bg-[#14110D] flex items-center justify-between gap-2 flex-shrink-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#F0E8D8] text-xs truncate">{item.title}</p>
                    <p className="text-[10px] text-muted font-mono truncate mt-0.5">{item.album}</p>
                  </div>
                  {/* Mobile-visible action buttons */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setSelectedPreviewPhoto(item)}
                      className="w-7 h-7 flex items-center justify-center rounded-md bg-[#D4AF64]/10 text-[#D4AF64] hover:bg-[#D4AF64]/20 transition-colors border border-[#D4AF64]/20"
                      title="View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeletePhotoId(item.id); }}
                      className="w-7 h-7 flex items-center justify-center rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* IMAGE PREVIEW MODAL */}
      {selectedPreviewPhoto && (
        <div className="admin-modal-overlay" onClick={() => setSelectedPreviewPhoto(null)}>
          <div
            className="admin-modal-content w-full mx-4"
            style={{ maxWidth: '580px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="min-w-0 flex-1 pr-3">
                <span className="text-[10px] font-mono text-[#D4AF64] uppercase font-bold block">
                  {selectedPreviewPhoto.album}
                </span>
                <h3 className="admin-title text-base font-bold truncate">{selectedPreviewPhoto.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPreviewPhoto(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-dim hover:text-white hover:bg-white/10 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image */}
            <div className="p-4">
              <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black/80 w-full" style={{ aspectRatio: '16/9' }}>
                <img
                  src={selectedPreviewPhoto.image}
                  alt={selectedPreviewPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Meta Info */}
            <div className="mx-4 mb-4 flex items-center justify-between text-xs text-muted font-mono bg-[#080807] p-3 rounded-lg border border-white/5">
              <span>Event: <strong className="text-[#F0E8D8]">{selectedPreviewPhoto.eventName}</strong></span>
              <span>Date: <strong className="text-[#E8C97A]">{selectedPreviewPhoto.date}</strong></span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 p-4 pt-0 border-t border-white/10">
              <button
                onClick={() => {
                  toggleGalleryPhotoStatus(selectedPreviewPhoto.id);
                  setSelectedPreviewPhoto((prev) => ({
                    ...prev,
                    status: prev.status === 'published' ? 'draft' : 'published'
                  }));
                }}
                className="flex-1 min-w-0 admin-btn admin-btn-secondary text-xs uppercase"
              >
                {selectedPreviewPhoto.status === 'published' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {selectedPreviewPhoto.status === 'published' ? 'UNPUBLISH' : 'PUBLISH'}
              </button>

              <a
                href={selectedPreviewPhoto.image}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0 admin-btn admin-btn-secondary text-xs uppercase"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF64]" />
                FULL RES
              </a>

              <button
                onClick={() => {
                  setDeletePhotoId(selectedPreviewPhoto.id);
                  setSelectedPreviewPhoto(null);
                }}
                className="flex-1 min-w-0 admin-btn admin-btn-danger text-xs uppercase"
              >
                <Trash2 className="w-3.5 h-3.5" />
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MEMORY PHOTO MODAL */}
      {isUploadModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div
            className="admin-modal-content w-full mx-4 p-5 space-y-4"
            style={{ maxWidth: '560px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="admin-title text-lg font-bold">ADD MOTION MEMORY PHOTO</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-dim hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dropzone */}
            <div className="border-2 border-dashed border-[#D4AF64]/30 rounded-xl p-6 text-center bg-[#080807]">
              <Upload className="w-8 h-8 text-[#D4AF64] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#F0E8D8]">DRAG MEMORY IMAGES HERE</p>
              <p className="text-xs text-muted my-1">or click below to choose files</p>
              <label className="admin-btn admin-btn-secondary text-xs py-2 px-4 mt-2 inline-flex cursor-pointer">
                <span>CHOOSE FILES</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </label>
            </div>

            {/* Association Fields */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-muted uppercase mb-1 font-medium">Associate Event</label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="admin-select"
                >
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>{e.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-muted uppercase mb-1 font-medium">Album Category</label>
                <select
                  value={albumCategory}
                  onChange={(e) => setAlbumCategory(e.target.value)}
                  className="admin-select"
                >
                  <option value="Cultural Highlights">Cultural Highlights</option>
                  <option value="Battle of Bands">Battle of Bands</option>
                  <option value="Dance Showdown">Dance Showdown</option>
                  <option value="Fine Arts">Fine Arts</option>
                  <option value="Photography">Photography</option>
                </select>
              </div>
            </div>

            {/* Staged Previews */}
            {stagedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#F0E8D8]">Selected ({stagedFiles.length}):</p>
                <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-2 bg-[#080807] rounded-lg">
                  {stagedFiles.map((sf, idx) => (
                    <div key={idx} className="relative aspect-square rounded overflow-hidden border border-white/10">
                      <img src={sf.preview} alt="Staged" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setStagedFiles(stagedFiles.filter((_, i) => i !== idx))}
                        className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/80 text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="admin-btn admin-btn-secondary text-xs"
              >
                CANCEL
              </button>
              <button
                type="button"
                disabled={!stagedFiles.length}
                onClick={handleUploadSubmit}
                className="admin-btn admin-btn-primary text-xs"
              >
                ADD TO MOTION MEMORY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deletePhotoId)}
        onClose={() => setDeletePhotoId(null)}
        onConfirm={() => deletePhotoId && deleteGalleryPhoto(deletePhotoId)}
        title="DELETE MEMORY PHOTO?"
        message="Are you sure you want to permanently remove this photo from Motion Memory?"
        confirmText="Delete Photo"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default AdminGallery;
