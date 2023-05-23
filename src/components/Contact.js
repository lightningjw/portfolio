import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  // const formInitialDetails = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   message: ''
  // }
  // const [formDetails, setFormDetails] = useState(formInitialDetails);
  // const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // setButtonText("Sending...");
    
    emailjs.sendForm('service_rilln0m', 'template_wz0azoy', form.current, 'ByItsgaKjUMHLbO49')
      .then((result) => {
        setStatus({ succes: true, message: 'Message sent successfully'});
    }, (error) => {
        setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    });

    // setButtonText("Send");
    e.target.reset();
  };

  // const onFormUpdate = (category, value) => {
  //     setFormDetails({
  //       ...formDetails,
  //       [category]: value
  //     })
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setButtonText("Sending...");
  //   let response = await fetch("http://localhost:5000/contact", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify(formDetails),
  //   });
  //   setButtonText("Send");
  //   let result = await response.json();
  //   setFormDetails(formInitialDetails);
  //   if (result.code == 200) {
  //     setStatus({ succes: true, message: 'Message sent successfully'});
  //   } else {
  //     setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
  //   }
  // };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          {/* <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col> */}
          {/* <Col size={12} md={6}> */}
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <form ref = {form} onSubmit={sendEmail}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name = 'user_first' placeholder="First Name" required/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name = 'user_last' placeholder="Last Name"  required/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" name = 'user_email' placeholder="Email Address" required/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" name = 'user_phone' placeholder="Phone No." required/>
                    </Col>
                    <Col size={12} className="px-1">
                      <input type="text" name = 'subject' placeholder="Subject" required/>
                      <textarea rows="6" name = 'message' placeholder="Message" required></textarea>
                      <button type="submit"><span>Send</span></button>
                    </Col>
                    </Row>
                    <Row>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          {/* </Col> */}
        </Row>
      </Container>
    </section>
  )
}
