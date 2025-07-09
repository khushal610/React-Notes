import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { MdDelete,MdOutlineCancel,MdDownload } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { jwtDecode } from 'jwt-decode';
import '../../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyNotes() {

  const [newNote,setNewNote] = useState(false);
  const [modify,setModify] = useState(false);

  const [noteID,setNoteID] = useState();
  const [title,setTitle] = useState();
  const [description,setDescription] = useState();

  const [userData,setUserData] = useState([]);
  const [notes,setNotes] = useState([]);

  const id = userData._id;
  const navigate = useNavigate();

  const CreateNewNote = async(e) => {
    e.preventDefault();
    try {
      if(!title){
        alert("Please Type Note Title");
        return;
      }
      if(!description){
        alert("Please Type Note Description");
        return;
      }
      const response = await axios.post('http://localhost:3000/create-new-note', {title,description,id});
      if (response.data.status === "ok") {
          setTitle('');
          setDescription('');
          setNewNote(false);
          alert('Note Saved');
          getNotes();

      } else {
          alert('There is some server issue to save the note');
      }
    }catch (error) {
      console.log(error);
    }
  }

  if(!window.localStorage.getItem('Token')){
    alert('Please login');
    navigate('/');
    return;
  }
  
  const token = window.localStorage.getItem('Token');
  const decodeToken = jwtDecode(token);
  const email = decodeToken.email;
  // console.log(email);

  const getUserInfo = async() => {
    const userDetails = await axios.post('http://localhost:3000/get-current-user',{ email });
    if(userDetails.status === 200 ){
      setUserData(userDetails.data.data);
      // console.log(userDetails.data.data);
    }
  }

  const clearNoteData = (e) => {
    e.preventDefault();
    try {
      setNoteID('');
      setTitle('');
      setDescription('');
      setNewNote(false);
      setModify(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getNotes = async() => {
    try {
      const notesDetails = await axios.post('http://localhost:3000/user-specific-notes',{ id });
      if(notesDetails.status === 200){
        setNotes(notesDetails.data.data);
        // console.log(notesDetails.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteNote = async(e,noteID) => {
    e.preventDefault();
    try {
      const deleteNote = await axios.post('http://localhost:3000/delete-user-notes',{ noteID });
      if(deleteNote.status === 200){
        alert('Note deleted');
        getNotes();
      }
      console.log(noteID)
    } catch (error) {
      console.log(error);
    }
  }

  const setNotesValueToUpdate = async(e,noteID,title,description) => {
    e.preventDefault();
    try {
      setNewNote(true);
      setNoteID(noteID);
      setTitle(title);
      setDescription(description);
      setModify(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditNote = async(e) => {
    e.preventDefault();
    try {
      console.log(noteID);
      console.log(title);
      console.log(description);
      const updateNote = await axios.post('http://localhost:3000/update-user-notes',{ noteID,title,description });
      if(updateNote.status === 200){
        alert('Note updated');
        setTitle('');
        setDescription('');
        setNewNote(false);
        getNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const downloadNote = (e,title,description) => {
    e.preventDefault();
    try {
      const blob = new Blob([description],{type:'text/plain'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url
      link.download = `${title}.txt`;
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo();
  },[]);
  
  useEffect(() => {
    getNotes();
  },[id]);

  return (
    <>
      <div className='flex items-center justify-center w-full flex-wrap gap-4 relative p-10 py-20'>
        {newNote === true
        ?
        <div className='h-full w-full flex items-center justify-center'>
          <div className='form-container flex items-center justify-center h-96 w-10/12'>
            <form className='p-5 flex flex-col gap-5 bg-slate-200 items-center w-6/12 justify-center relative'>
              <div className='absolute -top-5 -right-4'>
                <MdOutlineCancel className='text-4xl cursor-pointer' onClick={(e) => clearNoteData(e)} />
              </div>
              <div className='flex flex-col gap-3 w-full'>
                <input 
                  className='border border-black p-2 outline-none w-full rounded-md'
                  type="text" 
                  placeholder='Title'
                  value={title}
                  onChange={(e) => {setTitle(e.target.value);console.log(e.target.value)}}
                />
                <textarea 
                  className='border border-black p-2 outline-none w-full rounded-md resize-none'
                  rows={7}
                  cows={30}
                  name="description"
                  placeholder='Description'
                  value={description}
                  onChange={(e) => {setDescription(e.target.value);console.log(e.target.value)}}
                />
              </div>
              {modify === false ?
                <div className='w-full'>
                  <button 
                    className='border border-black px-4 py-2 rounded-md w-full'
                    onClick={(e) => CreateNewNote(e)}
                  >Save</button>
                </div>
                :
                <div className='w-full'>
                  <button 
                    className='border border-black px-4 py-2 rounded-md w-full'
                    onClick={(e) => handleEditNote(e)}
                  >Update</button>
                </div>
              }
            </form>
          </div>
        </div>
        : 
        notes.map((element,index) => {
          return (
            <>
              <div className='relative flex flex-col h-48 bg-blue-400 w-3/12 gap-3 p-3' key={index}>
                <div className='font-medium'>{element.title}</div>
                <div>{element.description}</div>
                <div className='absolute w-full flex items-center justify-between bottom-2 left-0 px-2'>
                  <p>{new Date(element.createdAt).toLocaleDateString()}</p>
                  <p className='text-2xl cursor-pointer flex items-center gap-2'>
                    <MdDownload onClick={(e) => downloadNote(e,element.title,element.description)} />
                    <BsPencilSquare onClick={(e) => setNotesValueToUpdate(e,element._id,element.title,element.description)} />
                    <MdDelete onClick={(e) => handleDeleteNote(e,element._id)} />
                  </p>
                </div>
              </div>
            </>
          )
        })}

        <div className='create-note'>
          <button 
          onClick={(e) => setNewNote(true)}
          className='border-black border-2 rounded-full hover:bg-black hover:text-white px-4 py-4 absolute bottom-3 right-3'>
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  )
}

export default MyNotes