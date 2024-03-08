import { React, UseState, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Images from "../Components/Images/Images";
import { AddBtn } from "../Components/Buttons/AddBtn";
import axios from "axios";

export function TaskForm() {
    const [repeatOption, setRepeatOption] = useState("EVERY_DAY");
    const repeatOptions = ["EVERY_DAY", "EVERY_WEEK", "EVERY_MONTH"];
    const [categoryOption, setCategoryOption] = useState([]);
    const [taskData, setTaskData] = useState({
        label: "",
        startTime: "",
        endTime: "",
        repeatType: "",
        category: {
            id: ""
        },
    });

    const taskLabelInputHandler = (e) => {
        const taskLabel = e.target.value;
        setTaskData({
            ...taskData,
            label: taskLabel,
        });
    };

    const taskStartInputHandler = (e) => {
        const taskStart = e.target.value;
        setTaskData({
            ...taskData,
            startTime: taskStart,
        });
    };

    const taskEndInputHandler = (e) => {
        const taskEnd = e.target.value;
        setTaskData({
            ...taskData,
            endTime: taskEnd,
        });
    };

    const taskCategoryInputHandler = (e) => {
        const taskCategory = e.target.value;
        setTaskData({
            ...taskData,
            category: {
                id: taskCategory
            }
        });
    };

    const taskRepeatInputHandler = (e) => {
        const taskRepeat = e.target.value;
        setTaskData({
            ...taskData,
            repeatType: taskRepeat,
        });
    };

    console.log(taskData);
    const submitHandler = (e) => {
        e.preventDefault();
        if (
            !taskData.label ||
            !taskData.startTime ||
            !taskData.endTime ||
            !taskData.category ||
            !taskData.repeatType
        ) {
            alert("Please fill all the fields");
        }
        const apiUrl = "http://localhost:8080/tasks";

        
        axios
            .post(apiUrl, {
                label: taskData.label,
                startTime: taskData.startTime,
                //6:30AM
                // new_Date(6,30);
                endTime: taskData.endTime,
                repeatType: taskData.repeatType,
                category: {
                    id: taskData.category.id,
                }
            })
            .then((value) => {
                window.location.reload();
            });
        axios.get(apiUrl).then((res) => console.log(res.data));
    };

    const categoryapiUrl = "http://localhost:8080/categories";
    useEffect(() => {
        axios
            .get(categoryapiUrl)
            .then((res) => {
                
                setCategoryOption(res.data);
            })
            .catch((error) => console.error.apply(error));
    }, []);

    return (
        <>
            <section className="px-10 py-20 w-[430px] h-[932px] bg-gray-500">
                <div>
                    <Link className="link" to="/">
                        <img src={Images.back_arrow} alt="" />
                    </Link>
                    <h1 className="mt-6 mb-8 font-bold">Add Task</h1>
                </div>
                <form action="" onSubmit={submitHandler}>
                    <div className="">
                        <label className="block mb-4" htmlFor="">
                            Label
                        </label>
                        <input
                            className="bg-[#F2F2F2] p-3 rounded-lg w-full"
                            type="text"
                            placeholder="Create Instagram post"
                            onChange={taskLabelInputHandler}
                        />
                    </div>
                    {/* <div className="flex justify-between gap-2 mb-4"> */}
                        <div className="flex flex-col w-full">
                            <label className="my-4" htmlFor="">
                                Start
                            </label>
                            <input
                                className="bg-[#F2F2F2] p-3 rounded-lg"
                                type="datetime-local"
                                name="startTime"
                                onChange={taskStartInputHandler}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="my-4" htmlFor="">
                                End
                            </label>
                            <input
                                className="bg-[#F2F2F2] p-3 rounded-lg"
                                type="datetime-local"
                                name="endTime"
                                onChange={taskEndInputHandler}
                            />
                        </div>
                    {/* </div> */}
                    <div className="flex justify-center gap-12 items-center my-4">
                        <div>
                            <label className="block mb-4 text-center" htmlFor="">
                                Category
                            </label>
                            <select
                                className="bg-[#F2F2F2] p-3 rounded-lg mb-4 text-center w-[150px]"
                                name="categoryData"
                                id="categoryData"
                                onChange={taskCategoryInputHandler}
                            >
                                {categoryOption &&
                                    categoryOption.map((option, index) => {
                                        return (
                                            (
                                                <option
                                                    key={index}
                                                    value={option.id}
                                                >
                                                    {option.name}
                                                </option>
                                            )
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="input-box">
                            <label className="block mb-4 text-center" htmlFor="repeatOption">
                                Repeat
                            </label>
                            <select
                                className="bg-[#F2F2F2] p-3 rounded-lg mb-4 text-center w-[150px]"
                                name="repeatOption"
                                id="repeatOption"
                                onChange={taskRepeatInputHandler}
                            >
                                {repeatOptions.map((option, index) => {
                                    return (
                                        <option onChange={taskRepeatInputHandler} key={index} value={option}>
                                            {option}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div >

                    <AddBtn txt={"Create Task"} />
                </form>
            </section>
        </>
    );
}

