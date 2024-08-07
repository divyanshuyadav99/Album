import React, { useEffect, useState } from 'react';
import AddAlbumForm from './AddAlbumForm';
import EditAlbumForm from './EditAlbumForm';
import Navbar from './Navbar';

const AlbumList = () => {
  const [data, setData] = useState([]);
  const [editingAlbum, setEditingAlbum] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/albums");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteAlbum = async (albumId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
        method: 'DELETE',
      });
      setData(data.filter(album => album.id !== albumId));
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Album List</h1>

        <AddAlbumForm onAlbumAdded={fetchData} />

        {editingAlbum && (
          <EditAlbumForm
            album={editingAlbum}
            onAlbumUpdated={() => {
              fetchData();
              setEditingAlbum(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((elem) => (
            <div
              key={elem.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-105"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{elem.title}</h2>
                <p className="text-gray-600">Album ID: {elem.id}</p>
                <button
                  onClick={() => setEditingAlbum(elem)}
                  className="bg-yellow-500 text-white p-2 rounded-lg mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAlbum(elem.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumList;
