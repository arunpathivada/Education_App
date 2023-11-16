import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import data from "../data";
import { useDispatch, useSelector } from 'react-redux';
import { update1,update2 } from '../redux/dataSlice';
import { useMemo } from 'react';
import axios from 'axios';

const Container = styled.div`
  height: 50px;
  background-color: #f3f0f0;
`;


const Wrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div``;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 0.7;
  height: 30px;
`;

const Right = styled.div`
  display: flex;
  flex: 2;
  height: 30px;
  justify-content: center;
`;


const Input = styled.input`
  width: 80%;
  height: 30px;
  border: none;
  border-color: lightgrey;
  background-color: lightgray;
  border-radius: 10px;

`;
const InputContainer = styled.div`
  background-color: lightgray;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
`

const SearchContainer = styled.div`
  width: 80%;
  height: 20px;
  border: 0.5px lightgray;
  align-items: center;
  border: none;
`;

const CustomDropdown = styled.h4`
  width: 200px;
  height: 28px;
  color: blue;
  margin-left: 5px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-style:groove;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;

`;

const Classes = styled.h3`
  font-weight: 700;
`;

const Popup = styled.div`
  width: 300px;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  right: 400px;
  top: 150px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  z-index: 1;
  transition: 1s ease;
`;
const Items = styled.div`
  overflow-y: auto;
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 33, 33, 0.3);
  z-index: 0;
`;

const ClassItem = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;

  &:hover {
    background-color:white;
    border-radius: 5px;
    transition: 1s ease;
  }
`;

const SubjectItem = styled.div`
  margin-left: 10px;
  background-color:lightblue;
  margin: 3px;
  border-radius: 2px;
  cursor: pointer;
  padding: 5px;
  font-weight: 300;
  &:hover{
    background-color: blue;
    color: white;
    transition: 1s ease;
  }
`;

const Title = styled.h3`
  font-weight: 700;
  margin-bottom: 10px;
`


const Navbar = () => {
  const [popUpPosition, setPopupPosition] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClick = () => {
    setPopupPosition(!popUpPosition);
  };

  const dispatch = useDispatch();

  const handleClassClick = (clickedClass, e) => {
    e.preventDefault();
    const newNavClass = e.target.textContent;
    dispatch(update1({ navClass: newNavClass }));
    setSelectedClass(clickedClass === selectedClass ? null : clickedClass);
  };

  const handleSubject = (e) => {
    e.preventDefault();
    const newNavSubject = e.target.textContent;
    dispatch(update2({ navSubject: newNavSubject }));
    setPopupPosition(false);
  };

  const newNavClass = useSelector((state) => state.class.navClass);
  const newNavSubject = useSelector((state) => state.class.navSubject);

  const [isFetched,setIsFetched] = useState(false);
const [data2,setData2] = useState("");
const getData1 = async () => {
  try {
    const res = await axios.get("https://education-app1.onrender.com/api/data");
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
  const classesData = useMemo(() => {
    const classData = [];
    for (const className in data) {
      if (data.hasOwnProperty(className)) {
        const subjects = Object.keys(data[className].subjects);
        classData.push({ name: className, subjects });
      }
    }
    return classData;
  }, [data]);
console.log(classesData);

  return (
    <Container>
      <Wrapper>
        <Left>
          <LocalFireDepartmentIcon style={{ fontSize: 40, color: "blue" }} />
          <CustomDropdown onClick={handleClick}>
            {newNavClass && newNavSubject ? `${newNavClass} ${newNavSubject}` : "Class1 Mathematics"}
            <KeyboardArrowDownTwoToneIcon style={{ fontSize: 22 }} />
            {popUpPosition && <Overlay />}
          </CustomDropdown>

          {popUpPosition && (
            <Popup>
              <Title>Select Subject</Title>
              <Items>
                {isFetched && classesData.map((classItem) => (
                  <div key={classItem.name}>
                    <ClassItem onClick={(e) => handleClassClick(classItem, e)}>
                      {classItem.name}
                      <ArrowForwardIosIcon style={{ fontSize: 13 }} />
                    </ClassItem>
                    {selectedClass === classItem && (
                      <div>
                        {classItem.subjects.map((subject) => (
                          <SubjectItem key={subject} onClick={handleSubject}>
                            {subject}
                          </SubjectItem>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </Items>
            </Popup>
          )}
        </Left>
        <Right>
          <SearchContainer>
            <InputContainer>
              <SearchIcon style={{ color: "grey", fontSize: 20, position: "relative", margin: 2, justifyContent: "center" }} />
              <Input placeholder="Search for Topic and Chapters" />
            </InputContainer>
          </SearchContainer>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;