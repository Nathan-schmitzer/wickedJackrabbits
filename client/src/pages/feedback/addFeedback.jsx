import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ".././signup.css";
import axios from "axios";
import {useParams} from "react-router";

const addFeedback = () => {
    const [dateShown, setDateShown] = useState("")
    const [name, setName] = useState("")
    const [local, setLocal] = useState("")
    const [family, setFamily] = useState("")
    const [timeline, setTimeline] = useState("")
    const [liked, setLiked] = useState("")
    const [notLike, setNotLike] = useState("")
    const [estimatedInterest, setEstimatedInterest] = useState("")
    const {id} = useParams();
    const submitFeedback = () => {
        console.log("home ID", id)
        
        const mydata = { dateShown: dateShown,
            name: name,
            local: local,
            family: family,
            timeline: timeline,
            liked: liked,
            notLike: notLike,
            estimatedInterest: estimatedInterest}
            console.log(mydata)
        axios.post("/api/createFeedback/" + id, mydata )
    }

    return (

        <Container>
            <div className="signupWrap">
                <Row>

                <div className="signupInnerWrap">
                   <Col>
                   <h1>Feedback</h1>
                                      
                   <h5>Prospective buyer's name</h5>
                   <input onChange={(e) => {setName(e.target.value)}} type="text" className="txtarea" placeholder=""/>
                    
                   <h5>When did the buyer see the house?</h5>
                   <input onChange={(e) => {setDateShown(e.target.value)}} type="date" className="txtarea" placeholder="Date"/>
                   
                   <h5>Is the buyer local?</h5>
                   <input onChange={(e) => {setLocal(e.target.value)}} className="txtarea" type="text" placeholder="">
                   </input>
                   
                   <h5>How many people will be moving in?</h5>
                   <input onChange={(e) => {setFamily(e.target.value)}} className="txtarea" type="offer" placeholder=""> 
                   </input>
                   
                   <h5>Earliest closing date</h5>
                   <input onChange={(e) => {setTimeline(e.target.value)}} className="txtarea" type="date" placeholder=""/>
                   
                   <h5>What was something they liked about the house?</h5>
                   <h6>Limit: 25 Characters</h6>
                   <input onChange={(e) => {setLiked(e.target.value)}} className="txtarea" type="text" maxlength="25" placeholder=""/>
                   
                   <h5>What was something they didn't like about the house?</h5>
                   <h6>Limit: 25 Characters</h6>
                   <input onChange={(e) => {setNotLike(e.target.value)}} className="txtarea" type="text" maxlength="25" placeholder=""/>

                    <h5>How would they rate this house on a scale of 1 to 10?</h5>
                   <input onChange={(e) => {setEstimatedInterest(e.target.value)}} className="txtarea" type="text" placeholder="">
                   </input>

                <p></p>
                    <Col>
                        <Button onClick={submitFeedback} href="/agentmain" type="submit">Submit Feedback</Button>
                    </Col>
                    </Col>
                    </div>
                </Row>
            </div>

        </Container>


    )



};

export default addFeedback;

