import React, { useContext } from "react";
import lighthouse from "@lighthouse-web3/sdk";

import CreateMeetContext from "./context/MeetContext";

function App() {
  const {
    toggleAddworkModal,
    currentProfile,
    setToggleAddworkModal,
    addWork,
    workForm,
    setWorkForm,
    storeFiles,
  } = useContext(CreateMeetContext);

  const handleAddWork = async () => {
    console.log(workForm);
    const res = await addWork(
      workForm,
      currentProfile.researcherId,
      currentProfile.researcherAddress
    );
    console.log("Added work: ", res);

    setToggleAddworkModal(false);
  };

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (e) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    const output = await lighthouse.upload(
      e,
      "0b3c3932.48efe20e0ff742b9971d2d2c40947539",
      progressCallback
    );
    console.log("File Status:", output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */
    const link = `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
    setWorkForm({ ...workForm, uploadFile: link });

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  return (
    // <div className="App">
    //   <h1 className="text-sky-400 text-sm">Hello</h1>
    //   <input onChange={e=>uploadFile(e)} type="file" />
    // </div>
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <div className='h-fit w-[600px] border border-[#313134] rounded-[20px] text-white flex flex-col items-start justify-between z-30 p-[20px] relative'>
        {/* <button
          className='btn btn-square bg-[#6f2232] hover:bg-[#641f2d] absolute -right-[25px] -top-[25px]'
          onClick={() => setToggleAddworkModal(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='#fff'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button> */}

        <div className='flex flex-col gap-[4px]'>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            Title:
            <input
              type='text'
              id='title'
              placeholder='Enter alias'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) =>
                setWorkForm({ ...workForm, title: e.target.value })
              }
            />
          </p>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            Description:
            <input
              type='text'
              id='description'
              placeholder='Enter department'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) =>
                setWorkForm({ ...workForm, description: e.target.value })
              }
            />
          </p>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            Department:
            <input
              type='text'
              id='department'
              placeholder='Enter department'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) =>
                setWorkForm({ ...workForm, department: e.target.value })
              }
            />
          </p>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            Upload file:
            <input
              type='file'
              id='uploadFile'
              min={1}
              placeholder='Enter upload file'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) => {
                uploadFile(e);
              }}
            />
          </p>
        </div>

        <div className='flex items-center justify-center w-full'>
          <button
            className='btn bg-[#c3073f] text-[#1a1a1d] text-[15px] px-[50px] hover:bg-[#b00639] mt-[50px]'
            onClick={() =>
              handleAddWork(
                currentProfile.researcherId,
                currentProfile.researcherAddress
              )
            }
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
