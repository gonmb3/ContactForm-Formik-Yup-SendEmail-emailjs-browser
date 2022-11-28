import { useRef,useState } from 'react';

import { useFormik } from "formik" /* ---- FORMIK*/ 
import * as Yup from "yup"               /* ---- YUP VALIDATION*/ 
import emailjs from '@emailjs/browser';   /* ---- EMAILJS */ 

import {RiMailSendLine} from "react-icons/ri" /* ---- REACT ICONS*/ 




const ContactForm = () => {

    const [successMessage , setSuccessMessage] = useState(false);
    const form = useRef();

                           /*Validation Formik/Yup start -----------*/ /*    MIN MAX REQUIRED  */ 
    const valuesSchema = Yup.object({
        nombre: Yup.string().min(3, "Minimo 2 caracteres").max(32, "Maximo 32 caracteres").required("Por favor escribe tu nombre"),
        email: Yup.string().email("Email incorrecto").max(32, "Maximo 32 caracteres").required("Por favor escribe tu email"),
        telefono: Yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g, "Numero no válido").required("Ingresa tu telefono").min(4,
        "Minimo de 4 numeros").max(22, "Maximo 32 numeros"),
        mensaje: Yup.string()
    })
    const initialValues = {
        nombre: "",
        email: "",
        telefono: "",
        mensaje: ""
    }
    
    /*EMAILJS KEYS ----------*/
    const publicID = "xbpiozojkZAbONLnb"
    const templateID = "template_rjqmbg1"
    const serviceID = "service_ildxpli"

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        validationSchema: valuesSchema,
        initialValues,
        onSubmit: (values,actions) => {        /*Send EMAILJS start -----------*/
            try{
                emailjs.sendForm( serviceID, templateID, form.current,publicID, values)
                  .then(() => {     
                    actions.resetForm();
                    setSuccessMessage(true);
                    setTimeout(() =>  setSuccessMessage(false), 3600);
                  
                 });
               }
               catch (error){
                 console.log(error)
              }                          /*Send EMAILJS end -----------*/
        }
    })
    /*Validation Formik/Yup end-----------*/
    console.log(values)

    return (
        <div className='w-[100vw] flex justify-center items-center  h-screen'>
          
        <form
            ref={form}
            autoComplete="off"
            className='w-[50%] text-gray-700  '
            onSubmit={handleSubmit}> 
               <h6 className='text-black text-center font-semibold text-3xl'>Contact Form</h6>
            <div className="pb-20 flex flex-col gap-4 mt-2 ">
            
                <div className="mb-5 mt-3">
                <span className="text-red-600">{errors.nombre}</span>
                    <input
                        value={values.nombre}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={ errors.nombre && touched.nombre ? " border-2  border-red-600 w-full p-2 mt-2 rounded focus:outline-none " : "border-2  w-full p-2 mt-2 rounded focus:outline-none"}
                        type="text"
                        name='nombre'
                        placeholder='Nombre...' id='nombre'
                    />        
              
             
                </div>

                <div className='mb-5'>
                <span className="text-red-600">{errors.email}</span>
                    <input
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='email'
                        className={ errors.email && touched.email ? " border-2  border-red-600 w-full p-2 mt-2 rounded focus:outline-none " : "border-2  w-full p-2 mt-2 rounded focus:outline-none"}
                        type="email"
                        placeholder='Email..' id='email' />
                    
                </div>

                <div className='mb-5'>
                <span className="text-red-600">{errors.telefono}</span>
                    <input
                        value={values.telefono}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='telefono'
                        className={ errors.telefono && touched.telefono ? " border-2  border-red-600 w-full p-2 mt-2 rounded focus:outline-none " : "border-2  w-full p-2 mt-2 rounded focus:outline-none"}
                        type="tel"
                        placeholder="Telefono.." id='telefono' />              
                </div>

                <div className='mb-5'>
                    
                    <textarea
                        value={values.mensaje}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="mensaje"
                        name='mensaje'
                        className='border-2 w-full p-2 mt-2 rounded focus:outline-none h-[90px]'
                        placeholder='Mensaje...' ></textarea>
                </div>
                <div className="flex items-center justify-between text-center">
                      <input
                    type="submit"
                    value="ENVIAR"
                    className='hover:bg-green-800 text-center rounded
                     p-2 px-3  cursor-pointer text-white uppercase font-medium
                     bg-green-600 transition-all '
                />
                        {/* SUCCESS MESSAGE / FORMIK YUP VALIDATION ------*/ }
                  {successMessage &&  <p className='text-[12px] bg-green-600 text-white p-2 flex gap-2 '><RiMailSendLine size={20}/>Mensaje enviado</p>   }
                </div>
                
            </div>
           
        </form>
  

    </div>
    )
}

export default ContactForm