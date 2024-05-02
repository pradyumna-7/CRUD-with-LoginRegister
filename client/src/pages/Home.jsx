import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

export default function Home() {
  const [rollno, setRollno] = useState('')
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('/students').then((response) => {
      setStudents(response.data)
    }, [])
  }, [])
  const [students, setStudents] = useState([{}])

  const retrieveStudent = async (rollNo) => {
    try {
      const { data } = await axios.get(`/getstudent/${rollNo}`)
      if (data) {
        setStudents(data);
        setShowModal(true);
      } else {
        toast.error('Student not found');
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/delete/${id}`)
      window.location.reload()
      toast.success('Student deleted successfully')
    } catch (error) {
      console.log(error)
    }
  }
  const deleteClicked = () => {
    const inputRef = React.createRef();

    const handleSubmit = (e) => {
      e.preventDefault();
      const rollNo = inputRef.current.value;
      const existingStudent = students.find(student => student.rollno === rollNo);
      if (!existingStudent) {
        toast.error('Student does not exist', {
          duration: 1500
        });
        return;
      }
      setRollno(rollNo);
      toast((t) => (
        <span>
          Are you sure you want to <b>DELETE?</b><b>{rollNo}</b>
          <br /><br />
          <button className='btn btn-success' onClick={() => deleteStudent(rollNo)}>Yes</button>
          <button className='btn btn-danger' onClick={() => toast.dismiss(t.id)}>No</button>
        </span>),
        {
          duration: 10000,
        })
    };

    return (
      <div>
        {toast((t) => (
          <span>
            Please enter Student RollNo to <b>DELETE</b>
            <br /><br />
            <form onSubmit={handleSubmit}>
              <input ref={inputRef} type="text" placeholder='Enter ID' required />
              <button type="submit" className='btn btn-primary' onClick={() => toast.dismiss(t.id)}>Delete</button>
              <button type='button' className='btn btn-danger' onClick={() => toast.dismiss(t.id)}><b>X</b></button>
            </form>
          </span>),
          {
            duration: Infinity,
            onClose: () => setRollno('')
          })}
      </div>
    );
  }

  const updateClicked = () => {
    const inputRef = React.createRef();

    const handleSubmit = (e) => {
      e.preventDefault();
      const rollNo = inputRef.current.value;
      const existingStudent = students.find(student => student.rollno === rollNo);
      if (!existingStudent) {
        toast.error('Student does not exist', {
          duration: 1500
        });
        return;
      }
      setRollno(rollNo);
      window.location.href = `/update/${rollNo}`;
    };

    return (
      <div>
        {toast((t) => (
          <span>
            Please enter Student RollNo to <b>UPDATE</b>
            <br /><br />
            <form onSubmit={handleSubmit}>
              <input ref={inputRef} type="text" placeholder='Enter ID' required />
              <button type="submit" className='btn btn-success' >Submit</button>
              <button type='button' className='btn btn-danger' onClick={() => toast.dismiss(t.id)}><b>X</b></button>
            </form>
          </span>),
          {
            duration: Infinity,
            onClose: () => setRollno('')
          })}
      </div>
    );
  };

  return (
    <div class="flex justify-center mt-60 h-full">
      <div class="max-w-lg mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Welcome to Student Portal!</div>
          <div class="flex flex-wrap justify-between items-center mt-4">
            <Link to={'/create'}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2">Add+</button></Link>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2" onClick={updateClicked}>Update</button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2" onClick={deleteClicked}>Delete</button>
            <Link to={'/view'}><button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2">View</button></Link>
            <div class="flex">
              <input type="text" 
                     placeholder="Enter RollNo" 
                     value={rollno} 
                     onChange={(e) => setRollno(e.target.value)} 
                     class=" w-80 block flex-grow px-4 py-2 mr-2 placeholder-gray-500 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400" />
              <button 
                onClick={() => retrieveStudent(rollno)}
                class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Retrieve</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-2">Student Details</h3>
                    {students && (
                      <div class="mt-2">
                        <p class="text-lg text-gray-500">Roll No: {students.rollno}</p>
                        <p class="text-lg text-gray-500">Name: {students.name}</p>
                        <p class="text-lg text-gray-500">Email: {students.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
