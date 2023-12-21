import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/eraser.jpeg";
import projImg2 from "../assets/img/newspaper.png";
import projImg3 from "../assets/img/AP-Psychology.jpg";
import projImg4 from "../assets/img/studyabroad.jpg";
import projImg5 from "../assets/img/ipave.jpg";
import projImg6 from "../assets/img/robosub.jpg";
import projImg7 from "../assets/img/headroycegps.png";
import projImg8 from "../assets/img/chaboicaters.png";
import projImg9 from "../assets/img/quadcopter.png";
import projImg10 from "../assets/img/functionfinderimg.png";
import projImg11 from "../assets/img/montana.jpg";
import projImg12 from "../assets/img/landmarklocator.png";
import projImg13 from "../assets/img/cinemasentinel.webp";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const work = [
    {
      title: "In-Person Away Virtual Events Software Engineer",
      description: "Project Management and Robotics",
      imgUrl: projImg5,
    },
    {
      title: "Ritz Deli Games Internship",
      description: "Data Science & Product Development",
      imgUrl: projImg1,
    },
    {
      title: "School Newspaper Web Developer",
      description: "Web Development",
      imgUrl: projImg2,
    },
    {
      title: "ATDP Teaching Assistant",
      description: "Facilitation & Mentorship",
      imgUrl: projImg3,
    },
  ];

  const projects = [
    {
      title: "FunctionFinder: Party Social Media iOS App",
      description: "Swift iOS Development with Firebase and GoogleMaps/GooglePlaces API",
      imgUrl: projImg10,
    },
    {
      title: "LandmarkLocator: Landmark Identification Convolutional Neural Network",
      description: "Computer Vision",
      imgUrl: projImg12,
    },
    {
      title: "CinemaSentinel: Film Critique Classification Machine Learning Model",
      description: "Support Vector Machines and Sentiment Analysis",
      imgUrl: projImg13,
    },
    {
      title: "Automated Reforestation Autonomous Drone Application",
      description: "Autonomous Vehicles and Unreal Engine in Python",
      imgUrl: projImg9,
    },
    {
      title: "High School Campus GPS App",
      description: "Android App Development and Google Maps API",
      imgUrl: projImg7,
    },
    {
      title: "Lunch Ordering System",
      description: "Web Development and SQL Database",
      imgUrl: projImg8,
    },
  ];

  const experiential = [
    {
      title: "Michigan Robotic Submarine Project Team",
      description: "Computer Vision and Robotics",
      imgUrl: projImg6,
    },
    {
      title: "Study Abroad in Dublin, Ireland",
      description: "Global Perspective and Intercultural Communication",
      imgUrl: projImg4,
    },
    {
      title: "Volunteer Abroad on Blackfeet Reservation",
      description: "Volunteering and Cultural Empathy",
      imgUrl: projImg11,
    }
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Experiences</h2>
                {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Work</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Experiential Learning</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          work.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <Row>
                        {
                          experiential.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
