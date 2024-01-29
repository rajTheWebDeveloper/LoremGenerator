import React, { useEffect, useState } from 'react'
import text from '../utils/data'
import { MdOutlineContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';


const LoremGen = () => {
    let [loremData,setLoremData]=useState(text)
    let [displayedData,setDisplayedData]=useState([])
    let [input,setInput]=useState("3")

    const notify = (data) => toast(data);
    let genData=()=>
    {
        if (Number(input) > 9) {
          setDisplayedData(loremData.slice(0, 9));
          notify("9 Cells Generated")
          return
        }
        setDisplayedData(loremData.slice(0,input))
        notify(`${input} Cells Generated`);
    }

    let copyClipboard=()=>
    {
        navigator.clipboard.writeText(displayedData)
        .then(()=>
        {
            console.log("Copied")
            notify(`Copied ${displayedData.length} Cells`)
        })
        .catch(()=>
        {
            console.log("Something went wrong")
        })
    }

    useEffect(()=>
    {
        genData(Number(input))
    },[])

  return (
    <StyledLorem>
      <section className="w-[90vw] max-w-[750px] mx-auto">
        <ToastContainer />
        <header className="mt-10 md:mt-20">
          <h2 className="uppercase text-center text-2xl tracking-wider my-8">
            Tired of Boring Lorem Ipsum?
          </h2>
          <div className="mx-auto text-center flex flex-col items-center justify-center md:flex-row">
            <p className="mr-4">Paragraphs: </p>
            <input
              value={input}
              role='text-box'
              onChange={(e) => setInput(Number(e.target.value))}
              type="number"
              className="mr-4 outline-none px-3 text-sm h-[34px] my-6 rounded-sm w-[80%] md:w-auto border-[2px] shadow-md focus:border-green-400"
            />
            <button
              className="generate px-4 py-1 bg-green-600 h-[34px] text-white rounded-sm"
              onClick={genData}
              role='generate'
            >
              Generate
            </button>
          </div>
        </header>
        <article className="relative py-1 md:py-6 md:mt-4">
          {navigator?.clipboard?.writeText && (
            <span
              className="absolute top-0 right-10 cursor-pointer"
              title="copy to clipboard"
              onClick={copyClipboard}
            >
              <MdOutlineContentCopy size={20} />
            </span>
          )}
          {displayedData.map((sentence, idx) => {
            return (
              <p
                key={idx}
                role='sentence'
                className="text-left my-8 text-sm text-gray-700 leading-6"
              >
                {sentence}
              </p>
            );
          })}
        </article>
      </section>
    </StyledLorem>
  );
}

let StyledLorem=styled.section`

.generate 
{
    position: relative;
    z-index: 2;
    overflow: hidden;
    border-radius: 4px;
}
.generate:hover::before 
{
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 160%;
    height: 100%;
    background-color: green;
    z-index: -1;
    border-radius: 4px;
    animation: hover-btn 0.5s forwards;
}


@keyframes hover-btn {
    0% 
    {
        width: 0%;
    }
    100%
    {
        width: 100%;
    }
}



`



export default LoremGen