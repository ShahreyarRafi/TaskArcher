import { useForm, Controller } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../services/Firebase/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { useQuery } from 'react-query';
import TaskItem from './TaskItem';

const currentDate = new Date();

// Format the date to YYYY-MM-DD
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

// Format the time to HH:mm
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');

const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;


const Tasks = () => {

    const [formValues, setFormValues] = useState({}); // State to store form values for each modal
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        defaultValues: formValues, // Set default values here
    });
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: allTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks`);
            return res.data;
        },
    });


    const handleUpdateClick = (taskId) => {
        // Show the modal
        document.getElementById(`updatingTaskModal-${taskId}`).showModal();
    };



    const handleInputChange = (e) => {
        // Update the form values as the user types
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };



    const onSubmit = async (data) => {
        console.log('called');
        const newTask = {
            ...data,
            postTime: formattedDateTime,
            userEmail: user?.email,
            userName: user?.displayName,
        };

        try {
            const response = await axiosPublic.post('/tasks/post', newTask);

            document.getElementById(`addTaskModal`).close()

            if (response.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to add task",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error adding task:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to add task",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await axiosPublic.delete(`/tasks/${taskId}`);
            if (response.status === 200) {
                // Task deleted successfully, refresh the task list
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task Deleted Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to delete task",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to delete task",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    if (isLoading) {
        return (
            <div className='h-[69vh] flex justify-center items-center'>
                <span className="loading loading-spinner text-[#B3845A] loading-lg"></span>
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center justify-center font-poppins space-y-5 h-[100svh]">
            <h1 className="font-bold text-3xl font-poppins">Tasks Will Show Here</h1>
            <button className='px-9 py-4 text-lg text-slate-800 outline outline-2 outline-gray-700 rounded-full hover:bg-[#F49C4D] hover:outline-0 hover:text-white'
                style={{ transition: 'background-color 300ms, color 300ms, outline 0s' }}
                onClick={() => document.getElementById('addTaskModal').showModal()}
            >
                Add Task
            </button>

            {/* modal for adding task */}
            <dialog id="addTaskModal" className="modal modal-bottom sm:modal-middle bg-opacity-100 backdrop-blur-lg">
                <div className="modal-box rounded-3xl bg-white bg-opacity-90 backdrop-blur-lg">
                    <h3 className="font-bold text-4xl text-center mt-2">Add New Task</h3>
                    <div className="modal-action">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='w-full'
                        >
                            <div className="w-full form-control mb-5">
                                <label className="label">
                                    <span className="text-lg text-black duration-300">Title</span>
                                </label>
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    name="title"
                                    placeholder='Give a title to your task'
                                    className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                />
                                {errors.title && <span className='text-red-600'>Title is required</span>}

                                <div className="flex items-center justify-between gap-4 mb-5 w-full">
                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="text-lg text-black duration-300">Priority</span>
                                        </label>
                                        <label className="rounded-lg">
                                            <Controller
                                                name="priority"
                                                control={control}
                                                rules={{ required: "Priority is required" }}
                                                render={({ field }) => (
                                                    <select
                                                        {...field}
                                                        className="input input-bordered rounded-2xl w-full bg-white dark:text-gray-400 duration-300"
                                                    >
                                                        <option value="" disabled selected>
                                                            Select Priority
                                                        </option>
                                                        <option value="Low">Low</option>
                                                        <option value="Moderate">Moderate</option>
                                                        <option value="High">High</option>
                                                    </select>
                                                )}
                                            />
                                        </label>
                                        {errors.priority && (
                                            <span className='text-red-600'>{errors.priority.message}</span>
                                        )}
                                    </div>


                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="text-lg text-black duration-300">Status</span>
                                        </label>
                                        <label className="rounded-lg">
                                            <Controller
                                                name="status"
                                                control={control}
                                                rules={{ required: "Status is required" }}
                                                render={({ field }) => (
                                                    <select
                                                        {...field}
                                                        className="input input-bordered rounded-2xl w-full bg-white dark:text-gray-400 duration-300"
                                                    >
                                                        <option value="" disabled selected>
                                                            Select Status
                                                        </option>
                                                        <option value="To-Do">To-Do</option>
                                                        <option value="Ongoing">Ongoing</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                )}
                                            />
                                        </label>
                                        {errors.status && (
                                            <span className='text-red-600'>{errors.status.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-[97%] gap-4">
                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="text-lg text-black  duration-300">Start Date</span>
                                        </label>
                                        <input
                                            {...register("startDate", { required: true })}
                                            type="datetime-local"
                                            name="startDate"
                                            className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                        />
                                        {errors.startDate && <span className='text-red-600'>Start Date is required</span>}
                                    </div>
                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="text-lg text-black  duration-300">Deadline</span>
                                        </label>
                                        <input
                                            {...register("deadline", { required: true })}
                                            type="datetime-local"
                                            name="deadline"
                                            className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                        />
                                        {errors.deadline && <span className='text-red-600'>Deadline is required</span>}
                                    </div>
                                </div>

                                <div className="form-control mb-5">
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Description</span>
                                    </label>
                                    <label className="rounded-lg">
                                        <textarea
                                            {...register("description", { required: true })}
                                            name="description"
                                            placeholder='Enter task description...'
                                            className="input input-bordered py-3 rounded-2xl w-full h-40 bg-white duration-300"
                                        />
                                        {errors.description && <span className='text-red-600'>Description is required</span>}
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className='px-9 py-4 text-lg text-slate-800 outline outline-2 outline-gray-700 rounded-full hover:bg-[#F49C4D] hover:outline-0 hover:text-white'
                                    >
                                        Add Task
                                    </button>

                                    <button
                                        type="button"
                                        className='px-9 py-4 text-lg text-slate-800 outline outline-2 outline-gray-700 rounded-full hover:bg-red-400 hover:outline-0 hover:text-white'
                                        onClick={() => {
                                            const modal = document.getElementById('addTaskModal');
                                            if (modal) {
                                                modal.close();
                                            }
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            {allTasks?.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    handleUpdateClick={handleUpdateClick}
                    deleteTask={deleteTask}
                    defaultValues={{
                        titleUpdate: formValues.titleUpdate,
                        priorityUpdate: formValues.priorityUpdate,
                        statusUpdate: formValues.statusUpdate,
                        startDateUpdate: formValues.startDateUpdate,
                        deadlineUpdate: formValues.deadlineUpdate,
                        descriptionUpdate: formValues.descriptionUpdate,
                    }}
                    handleInputChange={handleInputChange}
                    onSubmit={onSubmit}
                />
            ))}
        </div>
    );
};

export default Tasks;





