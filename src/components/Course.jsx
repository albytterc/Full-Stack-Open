import React from "react";
const Course = ({course}) => {

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total course={course}/>
    </>
  );
};

export default Course;
const Header = ({course}) => <h1>{course}</h1>;
const Total = ({course}) => {
  // console.log(parts);
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return <b>Number of exercises {total}</b>;
};
const Part = ({part}) =>
  <p>
    {part.name} {part.exercises}
  </p>;
const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) =>
        <Part key={part.id} part={part}/>
      )}
      {/*<Part part={parts[0]}/>*/}
      {/*<Part part={parts[1]}/>*/}
      {/*<Part part={parts[2]}/>*/}
    </>
  );
};