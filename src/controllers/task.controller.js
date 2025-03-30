import Task from "../models/Task.model.js";

export const getTasks = async (req, res) => {
    const task = await Task.find()
    res.json(task)
};
export const createTask = async (req, res) => {
    const {titulo, descripcion, fechaCreacion} = (req.body);
    const newTask = new Task({titulo, 
                              descripcion, 
                              fechaCreacion,
                              user: req.usuario.id
                            });
    const TareaGuardada = await newTask.save();
    res.json(TareaGuardada);
};
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task) return res.status(404).json({message: 'Task not found'});
    res.json(task);
};
export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: 'Tarea no encontrada'});
    res.json(task);
};
export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!task) return res.status(404).json();
    res.json(task);
};