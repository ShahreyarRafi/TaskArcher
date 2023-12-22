import { useForm, Controller } from 'react-hook-form';

const TaskItem = ({ task, handleUpdateClick, deleteTask, handleInputChange, onSubmit }) => {

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
    return (
        <div key={task._id}>
            <div className='bg-slate-200 px-4 py-2 w-28 h-28'>
                <h3 className='mx-auto'>{task.title}</h3>
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
            {/* Modal for updating task */}
            <dialog id={`updatingTaskModal-${task._id}`} className="modal modal-bottom sm:modal-middle bg-opacity-100 backdrop-blur-lg">
                {/* Modal content */}
                <div className="modal-box rounded-3xl bg-white bg-opacity-90 backdrop-blur-lg">
                    <h3 className="font-bold text-4xl text-center mt-2">Update: {task.title}</h3>
                    {/* Form inside the modal */}
                    <form
                        method="dialog"
                        className='w-full'
                        onSubmit={() => handleSubmit(task._id)}
                    >
                        {/* Form inputs */}
                        <div className="w-full form-control mb-5">
                            <label className="label">
                                <span className="text-lg text-black duration-300">Title</span>
                            </label>
                            <input
                                {...register("titleUpdate", { required: true })}
                                type="text"
                                name="titleUpdate"
                                defaultValue={task.title}
                                className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                            />



                            <div className="flex items-center justify-between gap-4 mb-5 w-full">
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Priority</span>
                                    </label>
                                    <label className="rounded-lg">
                                        <Controller
                                            name="priorityUpdate"
                                            control={control}
                                            rules={{ required: "Priority is required" }}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    defaultValue={task.priority}
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
                                    {errors.priorityUpdate && (
                                        <span className='text-red-600'>{errors.priorityUpdate.message}</span>
                                    )}
                                </div>
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Status</span>
                                    </label>
                                    <label className="rounded-lg">
                                        <Controller
                                            name="statusUpdate"
                                            control={control}
                                            rules={{ required: "Status is required" }}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    defaultValue={task.status}
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
                                    {errors.statusUpdate && (
                                        <span className='text-red-600'>{errors.statusUpdate.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-[97%] gap-4">
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Start Date</span>
                                    </label>
                                    <input
                                        {...register("startDateUpdate", { required: true })}
                                        type="datetime-local"
                                        name="startDateUpdate"
                                        defaultValue={task.startDate || ''}
                                        className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                    />
                                    {errors.startDateUpdate && <span className='text-red-600'>Start Date is required</span>}
                                </div>
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Deadline</span>
                                    </label>
                                    <input
                                        {...register("deadlineUpdate", { required: true })}
                                        type="datetime-local"
                                        name="deadlineUpdate"
                                        defaultValue={task.deadline || ''}
                                        className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                    />
                                    {errors.deadlineUpdate && <span className='text-red-600'>Deadline is required</span>}
                                </div>
                            </div>

                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="text-lg text-black duration-300">Description</span>
                                </label>
                                <label className="rounded-lg">
                                    <textarea
                                        {...register("descriptionUpdate", { required: true })}
                                        type="text"
                                        name="descriptionUpdate"
                                        defaultValue={task.description|| ''}
                                        onChange={handleInputChange}
                                        className="input input-bordered py-3 rounded-2xl w-full h-40 bg-white duration-300"
                                    />
                                    {errors.descriptionUpdate && <span className='text-red-600'>Description is required</span>}
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