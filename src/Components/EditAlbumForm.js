import React, { useState } from 'react';

const EditAlbumForm = ({ album, onAlbumUpdated }) => {
  const [title, setTitle] = useState(album.title);

  const updateAlbum = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      await response.json();
      onAlbumUpdated(); // Notify parent to refresh the album list and close the edit form
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  return (
    <form onSubmit={updateAlbum} className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Edit Album</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New album title"
        className="border border-gray-300 p-2 rounded-lg mb-2"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded-lg"
      >
        Update Album
      </button>
    </form>
  );
};

export default EditAlbumForm;
