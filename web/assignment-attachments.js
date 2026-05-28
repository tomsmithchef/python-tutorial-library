// Assignment attachment manifest for the testing environment.
//
// To add a downloadable file later:
// 1. Put the file inside web/attachments, ideally grouped by lesson.
// 2. Add an entry below.
// 3. Use lesson-level entries for general files, or add taskTitle to place
//    the download inside a matching assignment card.
//
// Example:
// {
//   lesson: "lesson2",
//   title: "Rock Paper Scissors Starter",
//   description: "Starter file for the Lesson 2 lab.",
//   file: "attachments/lesson2/rock-paper-scissors-starter.py",
//   taskTitle: "Rock, Paper, Scissors Game"
// }

window.PY_TUTORIAL_ATTACHMENTS = [
  {
    lesson: "lesson5",
    taskTitle: "Assignment 5: Manipulate DataFrame",
    title: "Assignment 5 DataFrame CSV",
    description: "CSV dataset for the Lesson 5 DataFrame manipulation assignment.",
    file: "attachments/Assignment_5_MinpulateDataframe.csv",
    label: "Assignment.csv",
    size: "7 KB"
  },
  {
    lesson: "lesson7",
    taskTitle: "Monoalphabetic Cipher Encryption and Decryption",
    title: "Lesson 7 Cipher Lab Script",
    description: "Provided Python script for the Lesson 7 monoalphabetic cipher lab.",
    file: "attachments/Lesson 7 Lab 7 ceasercipheralgo.py",
    label: "ceasercipheralgo.py",
    size: "1 KB"
  }
];
