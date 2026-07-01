#!/usr/bin/env node

const readGrades = require('./modules/read.grades');
const addGrade = require('./modules/add.grade');
const updateGrade = require('./modules/update.grade');
const deleteGrade = require('./modules/delete.grade');

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log(`
 Student Grades Manager CLI

Usage:
  node main.js list                                    - List all grades
  node main.js add <name> <subject> <grade>          - Add a new grade
  node main.js update <id> <name> <subject> <grade>  - Update a grade
  node main.js delete <id or name>                   - Delete a grade
  `);
  process.exit(0);
}

switch (command) {
  case 'list':
    const grades = readGrades();
    if (grades.length === 0) {
      console.log('No grades found.');
    } else {
      console.table(grades);
    }
    break;

  case 'add':
    if (args.length < 4) {
      console.error('Missing arguments. Usage: node main.js add <name> <subject> <grade>');
    } else {
      addGrade(args[1], args[2], args[3]);
    }
    break;

  case 'update':
    if (args.length < 5) {
      console.error('Missing arguments. Usage: node main.js update <id> <name> <subject> <grade>');
    } else {
      updateGrade(args[1], args[2], args[3], args[4]);
    }
    break;

  case 'delete':
    if (args.length < 2) {
      console.error('Missing arguments. Usage: node main.js delete <id or name>');
    } else {
      deleteGrade(args[1]);
    }
    break;

  default:
    console.error(`Unknown command: ${command}`);
}
