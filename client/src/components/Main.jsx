import React from 'react'
import styled from 'styled-components'
import { useState ,useEffect} from 'react'
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Video from './Video';
import Questions from './Questions';
import Theory from './Theory';
import data from "../data.js";
import Navbar from './Navbar.jsx';
import { useSelector } from 'react-redux';

const MainContainer = styled.div``;
const Container = styled.div`
display: flex;
height: 100vh;
`
const Leftside = styled.div`
  flex: 0.8;
  background-color:  #f3f0f0;
`
const Items = styled.div`
border-left-color: coral;
  
`

const Rightside =styled.div`
display: flex;
flex:2;
flex-direction: column;
`
const Headings = styled.div`
flex-direction: row;
display: flex;


`;
const Box = styled.div`
  width:40px;
  height: 2px;
  padding: 30px;
  background-color:${props=>(props.isSelected ?"blue":"lightblue")};

  margin: 10px;
  border-radius:5px;
  color: ${props=>(props.isSelected)?'white':"blue"};
  font-weight: 600;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-right:70px;
  &:hover{
    transition: 1s ease;
  background-color: blue;
  color: white;
}
  `
  const Context =styled.div`
  padding: 10px;
  `

const ClassItem = styled.div`
margin: 15px;
font-weight: 600;
display: flex;
padding: 10px;
align-items: center;
margin-left: 40px;
justify-content: space-between;
cursor: pointer;

`

const SubjectItem = styled.div`
margin: 8px;
font-weight: 400;
padding: 15px;
display: flex;
align-items: center;
cursor: pointer;
margin-left: 40px;
border-radius: 7px;
&:hover{
  transition: 1s ease;
  background-color: blue;
  color: white;
} 
`



const Main = () => {
const navClass =  useSelector(state=>state.class.navClass);
//const Navclass = "Class1";
const navSubject =  useSelector(state=>state.class.navSubject);
//const navSubject = "English";

const [isFetched,setIsFetched] = useState(false);
const [data2,setData2] = useState("");
const getData1 = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/data");
    setData2(res.data);
    setIsFetched(true);

  } catch (err) {
    console.log(err);
  }
};

const fetch = async()=>{
  await getData1();
}
fetch();

const { _id, __v, ...result } = isFetched? data2[0]:{};

const classData = isFetched?result[navClass].subjects[navSubject].chapters:{};

const chaptersData = [];



for (const chapter in classData) {
  if (classData.hasOwnProperty(chapter)) {
    const topics = Object.keys(classData[chapter].topics);
    chaptersData.push({
      chapter,
      topics,
    });
  }
}

  const [selectedClass, setSelectedClass] = useState("Theory");
  const [selectedBox, setSelectedBox] = useState(null);
  const [mainChapter,setMainchapter] = useState("");
  const [mainTopic,setMaintopic] = useState("");

  const handleClassClick = (clickedClass,e) => {
    setSelectedClass(clickedClass === selectedClass ? null : clickedClass);
    setMainchapter(e.target.textContent);
  };
  const handleBoxClick = (box) => {
    setSelectedBox(box);
  };
  const handleSubjectClick = (e)=>{
   setMaintopic(e.target.textContent);
  }

const boxData = classData[mainChapter]?.topics[mainTopic];

let theory = "";
let questions = "";
let videoLinks = "";

if (boxData) {
  theory = boxData.theory || "";
  questions = boxData.questions || [];
  videoLinks = boxData.videoLinks || [];
}


  const getContentForSelectedBox = () => {
    switch (selectedBox) {
      case 'Theory':
        return <Theory theory = {theory}/>;
      case 'Simulation':
        return 'Custom content for Simulation box';
      case 'Ask Doubts':
        return 'Custom content for Ask Doubts box';
      case 'Video':
        return <Video videoIds = {videoLinks}/>;
      case 'Questions':
        return <Questions questions={questions}/>;
      default:
        return <Theory theory = {theory}/>;
    }
  };


  

  return (
    <MainContainer>
    <Navbar/>
    <Container>
    <Leftside>
    <Items>
  {chaptersData.map((chapterItem) => (
    <div key={chapterItem.chapter}>
      <ClassItem onClick={(e) => handleClassClick(chapterItem.chapter, e)}>
        {chapterItem.chapter}
        <ArrowForwardIosIcon style={{ fontSize: 13 }} />
      </ClassItem>
      {selectedClass === chapterItem.chapter && (
        <div>
          {chapterItem.topics.map((topic) => (
            <SubjectItem key={topic} onClick={handleSubjectClick}>
              {topic}
            </SubjectItem>
          ))}
        </div>
      )}
    </div>
  ))}
</Items>
       
    </Leftside>
    <Rightside>
    <Headings>
  <Box isSelected={selectedBox === 'Theory'} onClick={() => handleBoxClick('Theory')}>
    Theory
  </Box>
  <Box isSelected={selectedBox === 'Simulation'} onClick={() => handleBoxClick('Simulation')}>
    Simulation
  </Box>
  <Box isSelected={selectedBox === 'Ask Doubts'} onClick={() => handleBoxClick('Ask Doubts')}>
    Ask Doubts
  </Box>
  <Box isSelected={selectedBox === 'Video'} onClick={() => handleBoxClick('Video')}>
    Video
  </Box>
  <Box isSelected={selectedBox === 'Questions'} onClick={() => handleBoxClick('Questions')}>
    Questions
  </Box>
</Headings>
        <Context>{selectedBox ? getContentForSelectedBox() : 'Default content'}</Context>
    </Rightside>
    </Container>
    </MainContainer>
  )
}

export default Main


