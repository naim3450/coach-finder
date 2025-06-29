import { useEffect, useState } from "react";
import Plus from "../assets/icon/Plus";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Idea from "../assets/icon/Idea";
import Cross from "../assets/icon/Cross";
import { Close } from "./naim/icons";
import DragIcon from "../assets/icon/DragIcon";
import uploadImageToCloudinary from "../utils/upload-images";
import axiosInstance from "../lib/axios.config";
import Swal from "sweetalert2";
import Loading from "./loading";
import { countryAllName } from "../../country";
import Papa from 'papaparse';






const AddInfo = () => {
  const [swipe, setswipe] = useState(false);
  const [logoFile, setlogoFile] = useState(null);
  const [videoFile, setvideoFile] = useState("");
  const [coverFile, setcoverFile] = useState(null);
  const [imgUrl, setimgUrl] = useState(false);
  const [videoUrl, setvideoUrl] = useState(false);
  const [addLogoPop, setAddLogoPop] = useState(false);
  const [upDone, setupDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [Industry, setIndustry] = useState("");
  const [Goals, setGoals] = useState("");
  const [Focus, setFocus] = useState("");
  const [Topics, setTopics] = useState("");
  const [radio, setradio] = useState("");
  const [country, setcountry] = useState(countryAllName);
  const [isLoading, setIsLoading] = useState(false);
  const [importDnd, setimportDnd] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [csvFileArr, setCsvFileArr] = useState(null);


  const groupIndustry = [
    "Technology",
    "Finance",
    "Consumer Goods",
    "Healthcare",
    "Consumer Goods",
    "Manufacturing",
    "Real Estate",
    "Education",
    "Media",
    "Nonprofit",
    "Other",
  ];
  const primaryGoals = [
    "Networking",
    "Scaling my business",
    "Personal development",
    "Leadership insights",
    "Accountability",
    "Problem-solving",
    "Exploring new markets",
    "Mentorship",
  ];
  const focusArea = [
    "Integrity",
    "Innovation",
    "Collaboration",
    "Growth mindset",
    "Accountability",
    "Transparency",
    "Inclusivity",
  ];
  const keyTopics = [
    "Scaling the business",
    "Managing teams",
    "Fundraising",
    "Market competition",
    "Personal development",
    "Operations efficiency",
    "Sales and marketing",
    "Innovation and product development",
  ];

  //  ============================================

  const reviewsStatus = () => {
    setswipe(!swipe);
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    setvideoFile(file);
    const videoPath = URL.createObjectURL(file);
    setvideoUrl(videoPath);
  };

  const VideoClose = () => {
    setvideoFile(null);
    setvideoUrl(false);
  };

  const changeDnd = () => {
    setlogoFile(document.querySelector(".dndInputFild").files[0]);
    let url = URL.createObjectURL(
      document.querySelector(".dndInputFild").files[0]
    );
    setimgUrl(url);
  };

  const importDragOver = (e) => {
    e.preventDefault();
  };

  const importDragDrop = (e) => {
    e.preventDefault();
    document.querySelector(".dndInputFild").files = e.dataTransfer.files;
    changeDnd();
  };

  const imgClose = () => {
    setlogoFile(null);
    setupDone(false);
    setimgUrl(false);
    setProgress(0);
    document.querySelector(".dndInputFild").value = ''
  };


  const dndSubmit = (e) => {
    e.preventDefault();
    if (logoFile == null) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setAddLogoPop(false);
            setupDone(true);
            setProgress(0);
            document.getElementById("url").value = "";
            return 100;
          }
          return prevProgress + 1;
        });
      }, 20);
    } else {
      setAddLogoPop(false);
      setupDone(true);
    }
  };

  const radioChange = (e) => {
    setradio(e.target.value);
  };


  const formSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const country = e.target.country.value;
    const city = e.target.city.value;
    const about = e.target.about.value;
    const pricing = parseFloat(e.target.pricing.value);
    const registration_link = e.target.registration_link.value;
    setIsLoading(true);

    const dataForServer = {
      name,
      country,
      city,
      about,
      pricing,
      registration_link,
      industry: Industry,
      goals: Goals,
      focus_area: Focus,
      key_topics: Topics,
      review: swipe,
      meeting_format: radio,
    };

    if (!logoFile) {
      Swal.fire({
        icon: "error",
        title: "Select your group logo!",
      });
      setIsLoading(false);
      return;
    }

    const uploadImage = await uploadImageToCloudinary(logoFile);
    if (uploadImage.success) {
      dataForServer.profile_picture = uploadImage.data.urls[0];
    }

    // const cover_picture = await uploadImageToCloudinary(coverUrl);
    // if (cover_picture.success) {
    //   dataForServer.cover_picture = cover_picture.cover_picture.urls[0];
    // }
    console.log(dataForServer);

    try {
      const serverResponse = await axiosInstance.post("/groups", [dataForServer]);

      if (serverResponse.success) {
        Swal.fire({
          icon: "success",
          title: "Group successfully published",
        });
        setIsLoading(false);
        e.target.reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something bad happened",
      });
      setIsLoading(false);
    }

  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      // Validate if file is CSV or Excel
      if (fileType === "text/csv" || fileType === "application/vnd.ms-excel" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setCsvFile(file);
      } else {
        alert("Please upload a valid CSV or Excel file.");
        e.target.value = ""; // Clear the input if the file is not valid
      }
    }
  };


  useEffect(() => {
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: (result) => {
          setCsvFileArr(result.data)
          setimportDnd(false)
        },
        header: true, // assuming the first row is the header
        skipEmptyLines: true, // Skip empty lines
      });
    }
  }, [csvFile])

  useEffect(() => {
    // let updateCsv = csvFileArr?.map((el) => {
    //   return {
    //     name: el.name,
    //     country: el.country,
    //     city: el.city,
    //     industry: el.industry.replace(/'/g, '"'),
    //     goals: el.goals.replace(/'/g, '"'),
    //     focus_area: el.focus_area.replace(/'/g, '"'),
    //     key_topics: el.key_topics.replace(/'/g, '"'),
    //     about: el.about,
    //     pricing: Number(el.pricing),
    //     registration_link: el.registration_link,
    //     review: el.review,
    //     profile_picture: el.profile_picture,
    //     cover_picture: el.cover_picture,
    //     video: el.video,
    //   }
    // })

    // console.log(updateCsv);



    async function importGroup() {
      try {
        const serverResponse = await axiosInstance.post("/groups", csvFileArr);
        console.log(serverResponse);

        if (serverResponse.success) {
          Swal.fire({
            icon: "success",
            title: "Group successfully published",
          });
          setIsLoading(false);
          e.target.reset();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something bad happened",
        });
        setIsLoading(false);
      }
    }

    if (csvFileArr) {
      importGroup()
    }
  }, [csvFileArr])


  return (
    <>
      {isLoading && <Loading />}
      <div className=" py-8 lg:pl-8 lg:pr-20  px-3  w-full relative">

        {/* addLogo Pop up start  */}
        <div
          className={`w-full h-full bg-[#00000066] absolute top-0 left-0 z-50 ${addLogoPop ? "block" : "hidden"} flex justify-center items-center`}>
          <div className="p-6 border w-[550px] rounded-[24px] bg-white">
            <form onSubmit={dndSubmit}>
              <div className="flex items-center justify-between">
                <div className="">
                  <h3 className="text-[#0B0B0B] text-[18px] leading-[24px] font-bold">
                    Media Upload
                  </h3>
                  <h3 className="text-SecondaryColor text-[14px] leading-[20px] mt-1">
                    Add your logo here, and you can upload only one file
                  </h3>
                </div>
                <Close
                  className="!stroke-[black] cursor-pointer"
                  onClick={() => setAddLogoPop(false)}
                />
              </div>

              <div className="w-full h-[145px] mt-4 relative">
                <label
                  onDragOver={importDragOver}
                  onDrop={importDragDrop}
                  htmlFor="dnd"
                  className="w-full h-full overflow-hidden flex flex-col items-center justify-center rounded-lg border border-dashed border-[#EB3743] bg-white"
                >
                  <div className="flex flex-col items-center justify-center">
                    <DragIcon />
                    <h3 className="text-sm leading-[20px] text-[#0B0B0B] pt-3">
                      Drag your file or{" "}
                      <span className="font-semibold text-[#EB3743]">
                        browse
                      </span>
                    </h3>
                    <p className="text-sm leading-[20px] text-[#6D6D6D] pt-2">
                      Max 10 MB files are allowed
                    </p>
                  </div>
                </label>
                <input
                  type="file"
                  disabled={imgUrl}
                  onChange={changeDnd}
                  className="absolute top-0 hidden dndInputFild"
                  id="dnd"
                  accept=".jpg,.jpeg,.png,.svg,.zip"
                />
              </div>

              <div className="mt-4 flex flex-col gap-y-4">
                <p className="text-sm leading-[20px] text-[#6D6D6D] pt-2">
                  Only support .jpg, .png and .svg and zip files
                </p>

                <div
                  className={`flex justify-between p-4 border-2 rounded-[12px] mt-4 ${logoFile ? "block" : "hidden"
                    }`}
                >
                  <div className="w-full h-[40px] flex gap-2">
                    <img
                      src={imgUrl ? imgUrl : ""}
                      alt=""
                      className="w-[40px] h-full object-cover"
                    />
                    <h3 className="font-bold text-xs flex flex-col gap-1">
                      {logoFile ? logoFile.name : false}
                      <span className="font-normal text-SecondaryColor">
                        {logoFile ? logoFile.size / 1024 : false}KB
                      </span>
                    </h3>
                  </div>

                  <Close onClick={imgClose} className={"stroke-[#858585] cursor-pointer"} />
                </div>

                <div className="text-sm leading-[20px] text-[#6D6D6D] pt-2 uppercase text-center flex items-center gap-3">
                  <div className="flex-grow border-t border[#E7E7E7]"></div>
                  OR
                  <div className="flex-grow border-t border[#E7E7E7]"></div>
                </div>
                <label
                  htmlFor="url"
                  className="text-[#0B0B0B] text-[18px] leading-[24px] font-bold"
                >
                  Upload from URL
                </label>

                <div className="border border-[#EB3743] rounded-[12px] p-3 flex items-center justify-between gap-4">
                  <input
                    type="text"
                    onChange={(e) => setimgUrl(e.target.value)}
                    disabled={logoFile}
                    id="url"
                    className={`w-full h-full outline-none`}
                  />
                  <button
                    type="submit"
                    className="bg-BtnColor text-white text-[12px] font-semibold px-4 h-[36px] rounded-[8px]"
                  >
                    Upload
                  </button>
                </div>
              </div>

              {/* progress  start*/}
              <div
                className={`p-4 border-2 rounded-[12px] mt-4 ${progress > 0 && logoFile == null ? "block" : "hidden"
                  }`}
              >
                <div className="flex justify-between">
                  <div className="w-full h-[50px] flex gap-2">
                    <img
                      src={imgUrl ? imgUrl : ""}
                      alt=""
                      className="w-[50px] h-full object-cover"
                    />
                  </div>

                  <Close className={"stroke-[#858585] cursor-pointer"} />
                </div>

                <div
                  className={`w-full mt-1 flex items-center justify-between mr-[100px]`}
                >
                  <div
                    className={`w-full mt-1 flex items-center justify-between mr-[100px]`}
                  >
                    <div className="w-[93%] h-2 rounded-lg">
                      <div
                        className={`h-full !bg-BtnColor rounded-lg text-center text-white font-semibold`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {progress}%
                </div>
              </div>
              {/* progress end */}
            </form>
          </div>
        </div>
        {/* addLogo Pop up end  */}

        {/* import Pop up start  */}
        <div
          className={`w-full h-full bg-[#00000066] absolute top-0 left-0 z-50 ${importDnd ? "block" : "hidden"}`}>
          <div className="p-6 border h-[305px] lg:w-[550px] w-full rounded-[24px] mx-auto mt-[15vw] bg-white">
            <form>
              <div className="flex items-center justify-between">
                <div className="">
                  <h3 className="text-[#0B0B0B] text-[18px] leading-[24px] font-bold">
                    Media Upload
                  </h3>
                  <h3 className="text-SecondaryColor text-[14px] leading-[20px] mt-1">
                    Add all groups at once uploading your CSV file
                  </h3>
                </div>
                <Close
                  className="!stroke-[black] cursor-pointer"
                  onClick={() => setimportDnd(false)}
                />
              </div>

              <div className="w-full h-[145px] mt-4 relative">
                <label
                  // onDragOver={importDragOver}
                  // onDrop={importDragDrop}
                  htmlFor="importDnd"
                  className="w-full h-full overflow-hidden flex flex-col items-center justify-center rounded-lg border border-dashed border-[#1849D6] bg-white"
                >
                  <div className="flex flex-col items-center justify-center">
                    <DragIcon className="!fill-[#1849D6]" />
                    <h3 className="text-sm leading-[20px] text-[#0B0B0B] pt-3">
                      Drag your file or{" "}
                      <span className="font-semibold text-[#1849D6]">
                        browse
                      </span>
                    </h3>
                    <p className="text-sm leading-[20px] text-[#6D6D6D] pt-2">
                      Max 10 MB files are allowed
                    </p>
                  </div>
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute top-0 hidden"
                  id="importDnd"
                // accept=".jpg,.jpeg,.png,.svg,.zip"
                />
              </div>

              <div className="mt-4 flex flex-col gap-y-4">
                <p className="text-sm leading-[20px] text-[#6D6D6D] pt-2">
                  Only support .excel and CSV files.
                </p>
              </div>

            </form>
          </div>
        </div>
        {/* import Pop up end  */}

        <div className="flex justify-between py-3 pl-14 w-full bg-[#F9C1C5] rounded-[8px] mb-8 relative">
          <Idea className="absolute top-3 left-5" />
          <p>
            Need to add multiple groups at once? Try our import data feature{" "}
            <button onClick={() => setimportDnd(true)} className="underline font-bold">
              Import Data
            </button>
          </p>
          <Cross className="mr-4 mt-1 cursor-pointer" />
        </div>

        <h3 className="font-medium text-2xl text-[#000000]">Add Group</h3>

        <div className="border p-10 rounded-[8px] mt-6">
          <h3 className="font-semibold text-xl text-[#000000]">New Group</h3>
          <div className="border-t px-10 mt-3"></div>

          <form onSubmit={formSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1">
              {/* left one start */}
              <div className="">
                <h3 className="font-semibold text-base text-[#1A1A1A] pt-6">
                  What is the group name?
                </h3>

                <div className="mt-6">
                  <label htmlFor="name"> Group Name*</label>
                  <br />
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Input Name"
                    className="font-normal text-[12px]  lg:w-[302px] w-full h-[38px] text-[#1A1A1A] opacity-60 border border-[#A2A2A2] py-3  lg:px-[10px] rounded-[8px] outline-none mt-2"
                  />
                </div>

                <h3 className="font-semibold text-base text-[#1A1A1A] pt-6">
                  Location
                </h3>

                <div className="md:flex gap-10">
                  <div className="mt-6">
                    <label htmlFor="country">COUNTRY*</label>
                    <br />
                    <select
                      id="country"
                      required
                      name="country"
                      className="font-normal text-[12px] text-[#1A1A1A] opacity-60 border border-[#A2A2A2] outline-none py-2 px-2 w-[174px] h-[38px] rounded-[8px] mt-2 "
                    >
                      {country?.map((item, index) => {
                        return <option key={index}>{item}</option>;
                      })}
                    </select>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="city">CITY*</label>
                    <br />
                    <input
                      required
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Input Name"
                      className="font-normal text-[12px] text-[#1A1A1A] opacity-60 border border-[#A2A2A2] py-2 w-[174px] h-[38px] rounded-[8px] outline-none mt-2 px-2"
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <h3 className="font-semibold text-base text-[#1A1A1A] pt-6">
                  Upload Images/Videos{" "}
                </h3>

                {/* photo & video start */}
                <div className="">
                  <div
                    onClick={() => setAddLogoPop(true)}
                    className="flex gap-2 mt-6 cursor-pointer"
                  >
                    <Plus className="mt-1" />
                    <h4 className="font-semibold text-[12px] text-[#5587FF]">
                      Add Logo
                    </h4>
                  </div>

                  {upDone ? (
                    <div className="w-[100px] h-[80px] border mt-5 relative">
                      <img src={`${imgUrl}`} alt="" className="w-full h-full" />

                      <div
                        onClick={imgClose}
                        className="w-[26px] h-[26px] bg-[#F31A1A] rounded-full flex items-center justify-center  absolute -top-3 -right-3"
                      >
                        <Close
                          className={
                            "!stroke-white !w-[10px] !h-[10px] cursor-pointer"
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    false
                  )}
                </div>

                <div className="">
                  <label htmlFor="video">
                    <div className="flex gap-2 mt-6">
                      <Plus className="mt-1" />
                      <h4 className="font-semibold text-[12px] text-[#5587FF]">
                        Add Video
                      </h4>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="video"
                    className="hidden"
                    onChange={handleVideo}
                    accept="video/*"
                  />
                  {videoUrl ? (
                    <div className="w-[100px] h-[80px] border mt-5 relative">
                      <video src={`${videoUrl}`}></video>

                      <div
                        onClick={VideoClose}
                        className="w-[26px] h-[26px] bg-[#F31A1A] rounded-full flex items-center justify-center  absolute -top-3 -right-3"
                      >
                        <Close
                          className={"!stroke-white !w-[10px] !h-[10px]"}
                        />
                      </div>
                    </div>
                  ) : (
                    false
                  )}
                </div>

                {/* photo & video end */}

                <div className="flex gap-2 mt-6">
                  <div
                    onClick={reviewsStatus}
                    className={`h-[20px] w-9  rounded-2xl relative before:h-4 before:w-4 before:rounded-full before:bg-white before:absolute before:top-1/2 before:-translate-y-1/2 ${swipe
                      ? "before:right-[2px] before:duration-300 bg-blue-600"
                      : "before:left-[2px] before:duration-300 bg-gray-400"
                      }`}
                  ></div>
                  <h3 className="font-semibold text-[12px] text-primaryColor">
                    Enable reviews
                  </h3>
                </div>
              </div>
              {/* right one end */}
            </div>

            <div className="">
              <h3 className="font-semibold text-base text-[#1A1A1A] pt-6">
                Group metrics
              </h3>

              {/* array type input data start  */}
              <div className="xl:grid-cols-2 grid-cols-1 w-full md:grid hidden">
                <div className="mt-6">
                  <label htmlFor="" className="">
                    Industry*
                  </label>

                  <div className="mt-3 ">
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={groupIndustry}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      onChange={(event, newValue) => {
                        setIndustry(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="select" />
                      )}
                      sx={{ width: "500px" }}
                      style={{ borderRedius: "40px", }}
                      className="rounded-3xl outline-none"
                    />

                  </div>
                </div>

                {/* -------- */}
                <div className="mt-6">
                  <label htmlFor="" className="">
                    Primary Goals*
                  </label>

                  <div className="mt-3">
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={primaryGoals}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      onChange={(event, newValue) => {
                        setGoals(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="select" />
                      )}
                      sx={{ width: "500px" }}
                      className="rounded-3xl outline-none"
                    />
                  </div>
                </div>
                {/* ------------------ */}

                <div className="mt-6">
                  <label htmlFor="group_focus_area" className="">
                    Focus Area*
                  </label>

                  <div className="mt-3">
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags group_focus_area"
                      options={focusArea}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      onChange={(event, newValue) => {
                        setFocus(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="select" />
                      )}
                      sx={{ width: "500px" }}
                    />
                  </div>
                </div>

                {/* ----------------- */}
                <div className="mt-6">
                  <label htmlFor="group_key_topics" className="">
                    Key Topics*
                  </label>

                  <div className="mt-3">
                    <Autocomplete
                      className=" "
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags group_key_topics"
                      options={keyTopics}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      onChange={(event, newValue) => {
                        setTopics(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="select"
                          className=""
                        />
                      )}
                      sx={{ width: "500px" }}
                    />
                  </div>
                </div>
                {/* ---------------------- */}
              </div>
              {/* array type input data end  */}
              {/* 2nd */}
              {/* array type input data start  */}
              <div className="grid-cols-1 w-full lg:hidden grid">
                <div className="mt-6">
                  <label htmlFor="" className="">
                    Industry*
                  </label>

                  <div className="mt-3 ">
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={groupIndustry}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      onChange={(event, newValue) => {
                        setIndustry(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="select" />
                      )}

                      style={{ borderRedius: "40px", }}
                      className="rounded-3xl outline-none"
                    />

                  </div>
                </div>

                {/* -------- */}
                <div className="mt-6">
                  <label htmlFor="" className="">
                    Primary Goals*
                  </label>

                  <div className="mt-3">
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags"
                      options={primaryGoals}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      onChange={(event, newValue) => {
                        setGoals(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="select" />
                      )}

                      className="rounded-3xl outline-none"
                    />
                  </div>
                </div>
                {/* ------------------ */}

                <div className="mt-6">
                  <label htmlFor="group_focus_area" className="">
                    Focus Area*
                  </label>

                  <div className="mt-3">
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags group_focus_area"
                      options={focusArea}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      onChange={(event, newValue) => {
                        setFocus(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="select" />
                      )}

                    />
                  </div>
                </div>

                {/* ----------------- */}
                <div className="mt-6">
                  <label htmlFor="group_key_topics" className="">
                    Key Topics*
                  </label>

                  <div className="mt-3">
                    <Autocomplete
                      className=" "
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags group_key_topics"
                      options={keyTopics}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      onChange={(event, newValue) => {
                        setTopics(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="select"
                          className=""
                        />
                      )}

                    />
                  </div>
                </div>
                {/* ---------------------- */}
              </div>
              {/* array type input data end  */}
            </div>

            <h3 className="font-semibold text-base text-[#1A1A1A] pt-6">
              About
            </h3>

            <div className="">
              <label
                htmlFor="about"
                className="font-medium text-[10px] text-[#1A1A1A]"
              >
                Write a description about the group
              </label>

              <textarea
                required
                id="about"
                maxLength="500"
                name="about"
                placeholder="0/500"
                rows="5"
                cols="30"
                className="border w-full rounded-[8px] outline-none mt-3 font-medium text-[12px] text-[#949494] pl-[23px] pr-8 pt-[20px]"
              />
            </div>

            {/* meeting formate start  */}
            <div className="">
              <h3 className="font-semibold text-base text-[#1A1A1A] pt-6">
                Meeting Format
              </h3>

              <div className="">
                <FormControl>
                  <RadioGroup
                    onChange={radioChange}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                  >
                    <FormControlLabel
                      value="In person"
                      control={<Radio />}
                      label="In person"
                    />
                    <FormControlLabel
                      value="Virtual"
                      control={<Radio />}
                      label="Virtual"
                    />
                    <FormControlLabel
                      value="Hybrid"
                      control={<Radio />}
                      label="Hybrid"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            {/* meeting formate end  */}

            <div className="mt-6">
              <label htmlFor="pricing">Pricing*</label>
              <div className="flex gap-x-3">
                <input
                  required
                  id="pricing"
                  name="pricing"
                  type="text"
                  placeholder="Input Price"
                  className="font-normal text-[12px] text-[#1A1A1A] opacity-60 border border-[#A2A2A2] py-2 w-[174px] rounded-[8px] outline-none mt-2 px-2"
                />

                <p className="font-normal text-[12px] text-[#1A1A1A] opacity-60 pt-5">
                  /Hr
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="registration_link">Registration link*</label>
              <br />
              <input
                required
                id="registration_link"
                name="registration_link"
                type="text"
                placeholder="Paste URL"
                className="font-normal text-[12px] text-[#1A1A1A] opacity-60 border border-[#A2A2A2] py-2 w-[174px] rounded-[8px] outline-none mt-2 px-2"
              />
            </div>

            <button className="mt-10 !py-3 bg-BtnColor font-bold text-base text-white px-6 rounded-[8px]">
              Create Group
            </button>
          </form>
        </div>

      </div>
    </>
  );
};

export default AddInfo;
