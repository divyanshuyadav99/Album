import React, { useState } from 'react';
//this is the component resposibel for rendering all the albums 
const AddAlbumForm = ({ onAlbumAdded }) => {
  const [title, setTitle] = useState('');

  const addAlbum = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/albums", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      await response.json();
      setTitle(''); // Clear form
      onAlbumAdded(); // Notify parent to refresh the album list
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  return (
    <form onSubmit={addAlbum} className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Add Album</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Album title"
        className="border border-gray-300 p-2 rounded-lg mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg"
      >
        Add Album
      </button>
    </form>
  );
};

export default AddAlbumForm;
