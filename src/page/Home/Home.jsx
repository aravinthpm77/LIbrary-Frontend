import React, {  useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Home.css'
const Home = () =>{

    
    const[Name,setName]=useState('');
    const[Auther,setAuther]=useState('');
    const[Genre,setGenre]=useState('');
    const[PublishedDate,setPublishedDate]=useState('');

    const  navigate= useNavigate()

    const [formSubmitted,setformsubmitted]=useState(false);

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(Name,Auther,Genre,PublishedDate);
        axios.post('http://localhost:5000/Book',{Name,Auther,Genre,PublishedDate})
        .then(res => {
            
            alert("Successfully Inserted ");
            navigate('/DisplayBook');
        })
        .catch(err => {
            console.error('Error submitting data:', err);
            alert("Error: Unable to submit data");
        });
        
        setformsubmitted(true);
        
        
    }
  
    return (
        <div className='Main_class'>
            <div className='form-con'> 
                <div className='form-box'>
                    
                    <form  >
                        <div className='form-text-con'>
                            <p>Book Details</p>
                            
                        </div>
                        
                        <div className='inpute'>
                            <input type="text" placeholder="Name of the Book"  onChange={(e)=>{setName(e.target.value)}} required/>
                            
                           
                            <input type="text" placeholder='Auther of the Book'  onChange={(e)=>{setAuther(e.target.value)}} required/>
                            <div className='Genre_div'>
                                <label for="Genre" className='Genre'>Choose Genre</label>
                                <select className='Genre1' id="depart" name="Genre" onChange={(e)=>{setGenre(e.target.value)}} required>
                                    <option value="Choose">Choose</option>
                                    <option value="Horror">Horror</option>
                                    <option value="SciFi">SciFi</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Historical">Historical</option>
                                </select>
                            </div>
                            
                            

                            <input type="date" placeholder="Public Date" onChange={(e)=>{setPublishedDate(e.target.value)}} required/>                     
                        </div>
                       
                        <button type="submit" className='sumbtn' onClick={handleSubmit}>Submit</button>
                        
           
           
                    </form>
                </div>
            </div>
            
                
            
        </div>
        
    )
}
export default Home