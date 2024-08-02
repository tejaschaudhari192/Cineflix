import React, {lazy, Suspense, useEffect} from 'react'
import Header from "../Header.jsx";
import MainContainer from "./MainContainer.jsx";
import {useSelector} from "react-redux";

const GPTSearch = lazy(() => import("./GPTSearch"));
const SecondaryContainer = lazy(() => import("./SecondaryContainer"));
const Browse = () => {
    const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
    return (
        <div className='h-screen w-full transition-all duration-200'>
            <div className="w-screen absolute z-10">
                <Header/>
                {
                    showGPTSearch ? <Suspense fallback={"loading..."}>
                        <GPTSearch/>
                    </Suspense> : <div className="pt-[30%] md:pt-0 bg-black -mt-20">
                        <MainContainer/>
                        <Suspense fallback={"loading..."}>
                            <SecondaryContainer/>
                        </Suspense>
                    </div>
                }
            </div>

        </div>
    );
};

export default Browse
