# Scalar_Project
Scalar_Project

# Student Evaluation System

This project is a complete mentor-view solution for the evaluation of students in a semester-long college project. It allows mentors to manage and evaluate their assigned students based on various parameters.

## Features

- **Adding Students:** Mentors can add students for evaluation, with the condition that each mentor can accommodate a minimum of 3 and a maximum of 4 students at a time. This prevents two mentors from assigning the same student during the evaluation period.

- **Assigning Marks:** Mentors can assign marks to each student based on parameters like Ideation, Execution, Presentation, and Communication. The total marks are calculated and visible to the mentor.

- **Editing and Removing:** Mentors can edit or remove assigned students and modify their marks. However, this can only be done while the marks are not locked.

- **Final Submission:** A mentor can submit the marks for all students. Once submitted, marks are locked and cannot be edited. Mentors cannot submit if some students have unassigned marks.

- **Student View:** Mentors have a view page to see all assigned students and their marks. They can filter students based on whether their marks are yet to be assigned or already assigned.

## SQL Database

The project uses a SQL database with the following tables:

- **mentors:** Contains mentor information, including name, email, and phone.

- **students:** Stores student details, along with mentor and evaluator references.

- **student_marks:** Keeps track of student marks, including idea, execution, presentation, communication, and total marks.

## Getting Started

1. Clone this repository to your local environment.
2. Set up your SQL database with the provided schema.
3. Configure the database connection in the project.
4. Run the application to start using the Student Evaluation System.

Enjoy a seamless and organized approach to evaluate and manage students for your college projects.


![Scalar_Project_Image](https://github.com/sharkhacker/Scalar_Project/assets/75437460/eadc09ba-3125-4270-a03d-1ca10c58863c)
