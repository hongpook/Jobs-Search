import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { CiLocationOn  } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { TfiBag } from "react-icons/tfi";
import { AiOutlineFile } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { RiFacebookCircleLine, RiLinkedinBoxLine  } from "react-icons/ri";

const JobDetail = () => {
     const { id } = useParams(); // Lấy job ID từ URL
     const [job, setJob] = useState(null);
     const [employer, setEmployer] = useState(null);
   
     useEffect(() => {
       // Gọi API để lấy thông tin công việc
       axios.get(`http://localhost:5000/api/v1/job/${id}`)
         .then(response => {
           setJob(response.data);
           return response.data.employerId;
         })
         .then(employerId => {
           // Gọi API để lấy thông tin employer dựa vào employerId
           return axios.get(`http://localhost:5000/api/v1/employee/${employerId}`);
         })
         .then(response => setEmployer(response.data))
         .catch(error => console.error('Error fetching data:', error));
     }, [id]);
   
     if (!job || !employer) return <p>Loading...</p>;

  return (
    <>
      <section>
      

      <div class="container">
               <div class="row">
                    <div class="col-lg-3 col-md-3 col-xs-12">
                         <div style={{display: 'flex'}}>
                              <br/>

                              <img src={job.imageUrl} alt={job.title} class="img-responsive wc-image" style={{width: '100%'}}/>

                              <br/>
                         </div>
                    </div>
                    
                    <div class="col-lg-9 col-md-9 col-xs-12">
                         <form class="form">
                              <h2>{job.title}</h2>

                              <p class="lead"><strong class="text-primary">{job.salaryRange}</strong></p>

                              <p class="lead">
                                   <TfiBag/> {job.title} &nbsp;&nbsp;
                                   <CiLocationOn /> London &nbsp;&nbsp;
                                   <SlCalender /> {new Date(job.createdAt).toLocaleDateString()} &nbsp;&nbsp;
                                   <AiOutlineFile/> Contract
                              </p>

                              
                         </form>
                    </div>
               </div>
               <br/>
               <div class="panel panel-default">
                    <div class="panel-heading">
                         <h4>Job Description </h4>
                    </div>
                    <div class="panel-body">
                         <h4>Responsibillitites:</h4>

                         <p>{job.description}</p>
                         <h4>Requirements:</h4>
                         <p>{job.requirements}</p>
                    </div>
               </div>
               <div class="panel panel-default">
                    <div class="panel-heading">
                         <h4>About {employer.companyName}</h4>
                    </div>

                    <div class="panel-body">
                         <p>Looking to improve the security at your place of business? If so, we will provide you with the trained security officers and professionally licensed personnel needed for any business. From a security guard for construction site security to private event security, you can be sure to get the very best from our staff. Alternatively we provide tailor-made security guard training for your existing security staff.</p>

                         <div class="row">
                              <div class="col-lg-6">
                                   
                              </div>

                              <div class="col-lg-6">
                                   
                              </div>
                         </div>

                         <div class="row">
                              <div class="col-md-6">
                                   <p>
                                        <span>Company name</span>

                                        <br/>

                                        <strong>{employer.companyName}</strong>
                                   </p>
                              </div>

                              <div class="col-md-6">
                                   <p>
                                        <span>Contact</span>

                                        <br/>

                                        <strong>{employer.contactPerson}</strong>
                                   </p>
                              </div>
                         </div>

                         <div class="row">
                              <div class="col-md-6">
                                   <p>
                                        <span>Phone</span>

                                        <br/>

                                        <strong><a href={employer.phone}>{employer.phone}</a></strong>
                                   </p>
                              </div>

                              <div class="col-md-6">
                                   <p>
                                        <span>Mobile phone</span>

                                        <br/>

                                        <strong><a href={employer.phone}>{employer.phone}</a></strong>
                                   </p>
                              </div>
                         </div>

                         <div class="row">
                              <div class="col-md-6">
                                   <p>
                                        <span>Email</span>

                                        <br/>

                                        <strong><a href={employer.email}>{employer.email}</a></strong>
                                   </p>
                              </div>

                              <div class="col-md-6">
                                   <p>
                                        <span>Website</span>

                                        <br/>

                                        <strong><a href={employer.website}>{employer.website}</a></strong>
                                   </p>
                              </div>
                         </div>

                         <p>
                              <span>City</span>

                              <br/>

                              <strong>{ job.location}</strong>
                         </p>
                    </div>
               </div>

               <div class="" style={{display: 'flex', 'justify-content': 'space-between'}}>
                    <a href="#" class="section-btn btn btn-primary pull-left">Apply for this job</a>

                    <ul class="social-icon pull-right">
                         <li className='p-1'><a href="#" class="p-1"><RiFacebookCircleLine /></a></li>
                         <li className='p-1'><a href="#" class=" p-1"><FaRegEnvelope/></a></li>
                         <li className='p-1'><a href="#" class="p-1"><RiLinkedinBoxLine /></a></li>
                    </ul>
               </div>
          </div>

          </section>
    </>
  );
}

export default JobDetail;
