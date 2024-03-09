import {Link} from "react-router-dom";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

import Backdrop from "../ui/Backdrop";
import DeleteModal from "../ui/DeleteModal";
import {toast} from "react-toastify";

function PostItem ({ item, showViewButton = true, showDescription = false }) {
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const apiToken = localStorage.getItem('api-token');
            const response = await fetch(`/api/posts/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiToken}`
                },
            });

            if (response.status === 204) {
                // Send successful message
                toast.success('Post is deleted successfully!', {
                    position: "top-center",
                    autoClose: 2000
                });

                navigate('/');
            } else {
                toast.error('Unable to delete the post. Please try again.', {
                    position: "top-center",
                    autoClose: 2000
                });

            }
        } catch (error) {
            toast.error('Unable to delete the post. Please try again.', {
                position: "top-center",
                autoClose: 2000
            });
        }
    }

    function handleOpenModal() {
        setDeleteModalIsOpen(true);
    }

    function handleCloseModal() {
        setDeleteModalIsOpen(false);
    }

    return (
        <div key={item.id} className="w-1/2 mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-2"><strong>Category:</strong> {item.category}</p>
            <p className="text-gray-700 mb-2">
                <strong>Publication Date:</strong> {new Date(item.publication_date).toLocaleDateString()}
            </p>
            {showDescription && (
                <p className="text-gray-700 mb-4"><strong>Description:</strong> {item.description}</p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <Link to={`/edit-post/${item.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 sm:mb-0">Edit</Link>
                {showViewButton && (
                    <Link to={`/view-post/${item.id}`}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 sm:mb-0">View</Link>
                )}
                <button onClick={() => handleOpenModal()}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete
                </button>
            </div>

            {deleteModalIsOpen && <DeleteModal onCancel={handleCloseModal} onConfirm={handleDelete}/>}
            {deleteModalIsOpen && <Backdrop onCancel={handleCloseModal}/>}
        </div>
    );
}

export default PostItem
