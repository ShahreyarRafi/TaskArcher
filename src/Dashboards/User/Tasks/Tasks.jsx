import { useForm, Controller } from 'react-hook-form';

const Tasks = () => {

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const onSubmit = (data) => {
        console.log(data)
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
                        // onSubmit={(e) => {
                        //     e.preventDefault();
                        //     handleUpdateReview(e.target.ratings.value, e.target.reviewText.value);
                        // }}
                        >
                            <div className="w-full form-control mb-5">
                                <label className="label">
                                    <span className="text-lg text-black duration-300">Title</span>
                                </label>
                                <input
                                    {...register("title", { required: true })}
                                    type="Text"
                                    name="ratings"
                                    className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                    step="any"  // Allow any decimal value
                                    required
                                />
                                {errors.title && <span className='text-red-600'>Title is required</span>}

                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="text-lg text-black duration-300">Priority</span>
                                        </label>
                                        <input
                                            type="Text"
                                            name="ratings"
                                            className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                            step="any"  // Allow any decimal value
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-lg text-black  duration-300">Status</span>
                                        </label>
                                        <input
                                            type="Text"
                                            name="ratings"
                                            className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                            step="any"  // Allow any decimal value
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="text-lg text-black  duration-300">Start Date</span>
                                        </label>
                                        <input
                                            type="Text"
                                            name="ratings"
                                            className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                            step="any"  // Allow any decimal value
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-lg text-black  duration-300">Deadline</span>
                                        </label>
                                        <input
                                            type="Text"
                                            name="ratings"
                                            className="input input-bordered rounded-2xl w-full mb-3 bg-white duration-300"
                                            step="any"  // Allow any decimal value
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control mb-5">
                                    <label className="label">
                                        <span className="text-lg text-black duration-300">Desciption</span>
                                    </label>
                                    <label className="rounded-lg">
                                        <textarea
                                            name="reviewText"
                                            className="input input-bordered rounded-2xl w-full h-40 bg-white duration-300"
                                            required
                                        />
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