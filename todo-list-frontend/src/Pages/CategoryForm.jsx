import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Images from "../Components/Images/Images";
// import { useLocation } from 'react-router-dom';
import { AddBtn } from "../Components/Buttons/AddBtn";

import axios from "axios";

export function CategoryForm() {
    // const location = useLocation();
    // const { editState, setEditState } = location.state;
    const [updatedCategoryData, setUpdatedCategoryData] = useState({
        name: "",
        imageUrl: ""
    });
    // setUpdatedCategoryData(currentCategoryData.name, currentCategoryData.imageUrl);

    const [categoryData, setCategoryData] = useState({
        name: "",
        imageUrl: "",
    });

    const { id } = useParams();

    // if(id != null) {
    //     axios
    //     .get(`http://localhost:8080/categories/${id}`)
    //     .then((response) => {
    //         const categoryData = response.data;
    //         setUpdatedCategoryData({
    //             name: categoryData.name,
    //             imageUrl: categoryData.imageUrl,
    //         });
    //         console.log(categoryData)
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching category data:", error);
    //     });
    // }



    // console.log(id);

    const categoryInputHandler = (e) => {
        const categoryName = e.target.value;
        setCategoryData({
            ...categoryData,
            name: categoryName,
        });
    };

    const categoryImageHandler = (e) => {
        const file = e.target.value;
        setCategoryData({
            ...categoryData,
            imageUrl: file,
        });
    };

    // console.log(categoryData);
    const submitHandler = (e) => {
        e.preventDefault();
        if (!categoryData.imageUrl || !categoryData) {
            alert("Please fill all the fields");
        }

        // this is how an API call is made
        const apiUrl = "http://localhost:8080/categories";
        axios
            .post(apiUrl, {
                name: categoryData.name,
                imageUrl: categoryData.imageUrl,
            })
            .then((value) => {
                console.log(value);
                window.location.reload();
            });
        axios.get(apiUrl).then((res) => console.log(res.data));
    };

    return (
        <>
            <section className="px-10 py-20 w-[430px] h-[932px] bg-gray-500">
                <div>
                    <Link className="link" to="/">
                        <img src={Images.back_arrow} alt="" />
                    </Link>
                    <h1 className="font-bold mt-6 mb-8">Add Category</h1>
                </div>
                <form action="" onSubmit={submitHandler}>
                    <label className="block mb-4" htmlFor="">
                        Name
                    </label>
                    
                    <input
                        className="bg-[#F2F2F2] mb-4 p-3 rounded-lg w-full"
                        onChange={categoryInputHandler}
                        
                        // value={updatedCategoryData.name}
                        type="text"
                        placeholder="example: Book"
                    />
                    <label className="block mb-4" htmlFor="">
                        Image
                    </label>
                    <input
                        className="bg-[#F2F2F2] p-3 rounded-lg w-full"
                        onChange={categoryImageHandler}
                        // value={updatedCategoryData.imageUrl}
                        type="text"
                        placeholder="Image Url"
                    />
                    <AddBtn txt={"Create Category"} />
                </form>
            </section>
        </>
    );
}
