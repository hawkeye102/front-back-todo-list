const express= require('express')
const fs= require('fs')

const router =express.Router();

let tasks=[];



// get all routes 
router.get('/tasks',(req,res)=>{
res.json(tasks);
})

// create a task
router.post('/tasks', (req, res) => {
    console.log('post is running')
    const { title, description, duedate } = req.body;
    console.log('Title:', title);
console.log('Description:', description);
console.log('DueDate:', duedate);


if (!title?.trim() || !description?.trim() || !duedate?.trim()) {
    console.error('Validation error: Missing or invalid fields');
    return res.status(400).json({ error: 'All fields are required' });
}
    console.log('requested body', req.body)

    // Validation for missing fields
    if (!title || !description || !duedate) {
        console.error('validation failed')
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        duedate,
        iscompleted: false,
    };

    tasks.push(newTask); // Add task to in-memory array
    console.log('lets check is tasks is pushed or not ')
    res.status(201).json(newTask); // Respond with the new task
});



// update tasks 
router.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    console.log(`Received request to update task with ID: ${taskId}`); // Log taskId

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        console.log(`Task with ID ${taskId} not found.`);
        return res.status(404).json({ message: 'Task not found' });
    }

    // Log current task before update
    console.log('Task before update:', tasks[taskIndex]);

    // Update task
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };

    // Log updated task
    console.log('Task after update:', tasks[taskIndex]);

    res.json(tasks[taskIndex]);
});


// delete tasks 
router.delete('/tasks/:id',(req,res)=>{
    const taskId=parseInt(req.params.id);
    tasks=tasks.filter(task=> task.id !==taskId);
    res.json({message:'task deleted successfully'})

});

module.exports= router;