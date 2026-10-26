import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/course-sharing/courseSharing")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/course-sharing/courseSharing"!</div>;
}
import React, { useState, useEffect } from "react";
/*import { Link } from "react-router-dom";*/

const CourseSharing = () => {
  const [courses, setCourses] = useState([]);
  const [sharedCourses, setSharedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  const handleShare = (courseId) => {
    const sharedCourse = courses.find((course) => course.id === courseId);
    if (sharedCourse) {
      setSharedCourses([...sharedCourses, sharedCourse]);
    }
  };

  return (
    <div>
      <h2>Partage de cours</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <span>{course.name}</span>
            <button onClick={() => handleShare(course.id)}>Partager</button>
          </li>
        ))}
      </ul>
      <ul>
        {sharedCourses.map((sharedCourse) => (
          <li key={sharedCourse.id}>
            <span>{sharedCourse.name}</span>
            <button>Telecharger</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSharing;
