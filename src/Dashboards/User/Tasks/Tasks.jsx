import { useForm, Controller } from 'react-hook-form';

const Tasks = () => {

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

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
                    <h3 className="font-bold text-4xl text-center">Add New Task</h3>
                    <div className="modal-action">
                        <form
                            method="dialog"
                            className='w-full'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="w-full form-control mb-5">
                                <label className="label">
                                    <span className="text-lg text-black duration-300">Title</span>
                                </label>
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    name="title"
                                    className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                />
                                {errors.title && <span className='text-red-600'>Title is required</span>}

                                <div className="flex items-center justify-between gap-4 w-full">
                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="text-lg text-black duration-300">Priority</span>
                                        </label>
                                        <input
                                            {...register("priority", { required: true })}
                                            type="Text"
                                            name="priority"
                                            className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                        />
                                        {errors.priority && <span className='text-red-600'>Priority is required</span>}
                                    </div>
                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="text-lg text-black duration-300">Status</span>
                                        </label>
                                        <input
                                            {...register("status", { required: true })}
                                            type="Text"
                                            name="status"
                                            className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                        />
                                        {errors.status && <span className='text-red-600'>Status is required</span>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full gap-4">
                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="text-lg text-black  duration-300">Start Date</span>
                                        </label>
                                        <input
                                            {...register("startDate", { required: true })}
                                            type="Text"
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
                                            type="text"
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
                                            className="input input-bordered rounded-2xl w-full h-40 bg-white duration-300"
                                        />
                                        {errors.description && <span className='text-red-600'>Description is required</span>}
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button type="submit" className='px-9 py-4 text-lg text-slate-800 outline outline-2 outline-gray-700 rounded-full hover:bg-[#F49C4D] hover:outline-0 hover:text-white'>
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
        </div>
    );
};

export default Tasks;