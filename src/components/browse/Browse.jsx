import React, {useEffect} from 'react'
import Header from "../Header.jsx";
import MainContainer from "./MainContainer.jsx";
import GPTSearch from "./GPTSearch.jsx";
import {useSelector} from "react-redux";
import SecondaryContainer from "./SecondaryContainer.jsx";


const Browse = () => {
    const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
    return (
        <div className='h-screen w-full'>
            <div className="w-screen absolute z-10">
                <Header/>
                {
                    showGPTSearch ? <GPTSearch/> : <div className="pt-[30%] md:pt-0 bg-black">
                            <MainContainer/>
                            <SecondaryContainer/>
                        </div>
                }
            </div>

        </div>
    );
};

export default Browse
