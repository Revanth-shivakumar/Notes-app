import React, { useState } from 'react'
import TagInput from '../../Components/Input/TagInput'
import { MdClose, MdEditNote } from 'react-icons/md';
import axios from 'axios';
const AddEditNotes = ({noteData,type, getAllNotes,onClose,showToastMessage}) => {
  const [title,setTitle]=useState(noteData?.title||"");
  const [content,setContent]=useState(noteData?.content||"");
  const [tags,setTags]=useState(noteData?.tags||"");
  const [error,setError]=useState(null);

  const addNewNote = async() =>{
    try {
      const response=await axiosInstance.post("./add-note",{
        title,
        content,
        tags,
      });


      if(response.data && response.data.note){
        showToastMessage("Note Added Successfully")
        getAllNotes()
        OnClose()
      }
    } catch (error) {
       if(
          error.response&&
          error.response.data&&
          error.response.data.message
        ){
          setError(error.response.data.message);
        }
    }
  };

  const editNote = async()=>{
    const noteId=noteData.
    _id;
    try {
      const response=await axiosInstance.put("./edit-note/"+ noteId,{
        title,
        content,
        tags,
      });


      if(response.data && response.data.note){
        showToastMessage("Note Updated Successfully")
        getAllNotes()
        OnClose()
      }
    } catch (error) {
       if(
          error.response&&
          error.response.data&&
          error.response.data.message
        ){
          setError(error.response.data.message);
        }
    }
  };
  const handleAddNote=()=>{
    if(!title){
      setError("Enter the Title");
      return;
    }

    if(!content){
      setError("Enter the Title");
      return;
    }

     setError("");

     if(type==='edit'){
      editNote()
     }else{
      addNewNote()
     }
  }

  return (
   <div className='relative'>

    <button className ='w-10 h-10 rounded-full flex items-center justify-center absol;ute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
      <MdClose className='text-xl text-slate-400'/>

    </button>
    <div className='overflow-hidden'>
        <div className='flex flex-col gap-2 '>
            <label className='input-label'></label>
        <input type='text'
        className='text-2xl text-slate-950 outline-none'
        placeholder='Meet at 7'
        value={title}
        onChange={({target})=>setTitle(target.value)}>
        </input>
        </div>

        <div className='flex flex-col gap-2 mt-4'>
          <label className='input-label'>CONTENT</label>
          <textarea
              type="text"
              className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
              placeholder='Content'
              rows={10}
              value={content}
              onChange={({target}) => setContent(target.value)}
              />
              </div>

        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className='text-red-500 text-xs pt-4'>{error} </p>}

        <button className='btn-primary font-medium mt-5 p-3'
         onClick={handleAddNote}>
          {type === 'edit' ?'UPDATE': 'ADD'}
        </button>
    </div>
    </div>
  )
}

export default AddEditNotes