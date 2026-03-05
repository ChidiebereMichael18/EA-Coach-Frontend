import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop',
    title: 'Scenic Route',
    category: 'Journey'
  },
  {
    url: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&h=400&fit=crop',
    title: 'Bus Terminal',
    category: 'Terminal'
  },
  {
    url: 'https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?w=400&h=400&fit=crop',
    title: 'Comfortable Seats',
    category: 'Interior'
  },
  {
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop',
    title: 'Modern Bus',
    category: 'Fleet'
  },
  {
    url: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=400&h=400&fit=crop',
    title: 'East Africa Travel',
    category: 'Destination'
  },
  {
    url: 'https://images.unsplash.com/photo-1583248363044-1c6d2e3b1e2a?w=400&h=400&fit=crop',
    title: 'Countryside',
    category: 'Scenery'
  },
  {
    url: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=400&fit=crop',
    title: 'Bus Journey',
    category: 'Experience'
  },
  {
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
    title: 'Travel Experience',
    category: 'Moments'
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(galleryImages[index]);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = galleryImages.length - 1;
    if (newIndex >= galleryImages.length) newIndex = 0;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Travel Gallery</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Explore beautiful moments from our journeys across East Africa
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            onClick={() => openModal(index)}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-semibold">{image.title}</p>
                <p className="text-xs opacity-80">{image.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X size={32} />
          </button>

          <button
            onClick={() => navigateImage(-1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={() => navigateImage(1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight size={48} />
          </button>

          <div className="max-w-4xl max-h-[80vh]">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="text-xl font-semibold">{selectedImage.title}</p>
              <p className="text-sm opacity-80">{selectedImage.category}</p>
              <p className="text-xs mt-2">{currentIndex + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;