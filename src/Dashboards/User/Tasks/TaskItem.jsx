import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { useDrag } from 'react-dnd';


const TaskItem = ({ task, handleUpdateClick, deleteTask, refetch, index, }) => {

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const axiosPublic = useAxiosPublic();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-500';
            case 'Moderate':
                return 'bg-orange-400';
            case 'Low':
                return 'bg-green-500';
            default:
                return 'bg-gray-500'; // Default color for unknown priority
        }
    };


    const updateTask = async (taskId, updatedData) => {
        try {
            document.getElementById(`updatingTaskModal-${task._id}`).close();

            // Make the API request to update the task
            const response = await axiosPublic.put(`/tasks/${taskId}`, updatedData);

            // Check the response and show a success or error message
            if (response.data.updated) {
                // Show success message
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    refetch();
                });
            } else {
                // Show error message
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed to update task',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error updating task:', error);
            // Show error message
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to update task',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    // Function to handle the form submission
    const handleUpdate = async (data) => {
        // Call the parent component's handleUpdateClick function with the updated data
        handleUpdateClick(task._id, data);

        // Call the updateTask function to update the task via the API
        await updateTask(task._id, data);
    };


    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { taskId: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });


    return (
        <div
            key={task._id}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            {/* card for task */}
            <div className='h-80 w-80 bg-orange-100 p-5 flex items-start justify-start shadow-md bg-opacity-5 blurry-card'>
                <div className='flex-grow'>
                    <h3 className={`mx-auto inline-block px-3 py-1 mb-2 rounded-full text-white text-sm ${getPriorityColor(task.priority)}`}>{task.priority}</h3>
                    <h3 className='mx-auto text-xl mb-2'>{task.title}</h3>
                    <h3 className='mx-auto text-sm mb-2'>{task.startDate} - {task.deadline}</h3>
                    <h3 className='mx-auto mb-3 line-clamp-6'>{task.description}</h3>
                    <button
                        className='bg-orange-400 text-white px-3 py-1 mx-auto mb-2'
                        onClick={() => handleUpdateClick(task._id)}
                    >
                        Update
                    </button>
                    <button
                        className='bg-red-500 text-white px-3 py-1 mx-auto'
                        onClick={() => deleteTask(task._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Modal for updating task */}
            <dialog id={`updatingTaskModal-${task._id}`} className="modal modal-bottom sm:modal-middle bg-opacity-100 backdrop-blur-lg">
                {/* Modal content */}
                <div className="modal-box rounded-3xl bg-white bg-opacity-90 backdrop-blur-lg">
                    <h3 className="font-bold text-4xl text-center mt-2">Update: {task.title}</h3>
                    {/* Form inside the modal */}
                    <form
                        method="dialog"
                        className='w-full'
                        onSubmit={handleSubmit(handleUpdate)}
                    >
                        {/* Form inputs */}
                        <div className="w-full form-control mb-5">
                            <label className="label">
                                <span className="text-lg text-black duration-300">Title</span>
                            </label>
                            <input
                                {...register("title", { required: true })}
                                type="text"
                                name="title"
                                defaultValue={task.title}
                                className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                            />



                            <div className="mb-4 w-full">
                                <div className='w-full'>
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Priority</span>
                                    </label>
                                    <label className="rounded-lg">
                                        <Controller
                                            name="priority"
                                            control={control}
                                            rules={{ required: "Priority is required" }}
                                            defaultValue={task.priority} // Set the default value here
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    className="input input-bordered rounded-2xl w-full bg-white dark:text-gray-400 duration-300"
                                                >
                                                    <option value="" disabled>
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
                                {/* <div className='w-1/2'>
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Status</span>
                                    </label>
                                    <label className="rounded-lg">
                                        <Controller
                                            name="status"
                                            control={control}
                                            rules={{ required: "Status is required" }}
                                            defaultValue={task.status} // Set the default value here
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    className="input input-bordered rounded-2xl w-full bg-white dark:text-gray-400 duration-300"
                                                >
                                                    <option value="" disabled>
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
                                </div> */}
                            </div>
                            <div className="w-full">
                                <div className='w-full'>
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Start Date</span>
                                    </label>
                                    <input
                                        {...register("startDate", { required: true })}
                                        type="datetime-local"
                                        name="startDate"
                                        defaultValue={task.startDate || ''}
                                        className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                    />
                                    {errors.startDate && <span className='text-red-600'>Start Date is required</span>}
                                </div>
                                <div className='w-full'>
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Deadline</span>
                                    </label>
                                    <input
                                        {...register("deadline", { required: true })}
                                        type="datetime-local"
                                        name="deadline"
                                        defaultValue={task.deadline || ''}
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
                                        type="text"
                                        name="description"
                                        defaultValue={task.description || ''}
                                        className="input input-bordered py-3 rounded-2xl w-full h-40 bg-white duration-300"
                                    />
                                    {errors.description && <span className='text-red-600'>Description is required</span>}
                                </label>
                            </div>
                        </div>
                        {/* Submit and cancel buttons */}
                        <div className="flex items-center justify-between">
                            <button type="submit" className='px-9 py-4 text-lg text-slate-800 outline outline-2 outline-gray-700 rounded-full hover:bg-[#F49C4D] hover:outline-0 hover:text-white'>
                                Update Task
                            </button>
                            <button
                                type="button"
                                className='px-9 py-4 text-lg text-slate-800 outline outline-2 outline-gray-700 rounded-full hover:bg-red-400 hover:outline-0 hover:text-white'
                                onClick={() => document.getElementById(`updatingTaskModal-${task._id}`).close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default TaskItem;