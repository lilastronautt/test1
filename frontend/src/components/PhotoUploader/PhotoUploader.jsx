import { useDropzone } from "react-dropzone";
import { useState, useCallback, useEffect } from "react";
import Success from "../SuccessfullMessage/Sucessfull";
import PhotoList from "../PhotoList/PhotoList";
import "./PhotoUploader.css";

const PhotoUploader = () => {
  const [imgD, setImgD] = useState({ title: "", img: null });
  const [data, setData] = useState([]);
  const [btnMsg, setBtnMsg] = useState("POST");
  const [showErrorMsg, setShowrrorMsg] = useState(false);
  const [showSucMsg, setShowSucMsg] = useState(false);

  const blogImageHandler = useCallback((event) => {
    setImgD((prev) => {
      return { ...prev, img: event[0] };
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: blogImageHandler,
    accept: "image/*", // Specify accepted file types (in this case, images)
  });

  const titleChangeHandler = (event) => {
    setImgD((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/img/getimgdetails`);
        const jsonData = await res.json();
        console.log(jsonData);
        setData(() => jsonData);

        if (jsonData.msg == "error") {
          return;
        }
      } catch (e) {}
    })();
  }, []);

  const formSubmitHandler = (event) => {
    setBtnMsg(() => "POSTING...");
    event.preventDefault();

    if (!imgD.img || !imgD.title) {
      // if anyone of the field is empty prevent from submitting
      setBtnMsg(() => "POST");
      setShowrrorMsg(() => true);
      return;
    }
    const formData = new FormData();
    formData.append("title", imgD.title);
    formData.append("img", imgD.img);

    try {
      setShowrrorMsg(() => false);
      (async () => {
        const jsonData = await fetch("http://localhost:3000/img/imgdetails", {
          method: "POST",
          body: formData,
        });
        const res = await jsonData.json();
        setBtnMsg(() => "POST");
        if (res.msg == "okay") {
          setShowSucMsg(() => true);
          setTimeout(() => {
            setShowSucMsg(() => false);
          }, 800);
        } else {
          setShowrrorMsg(() => true);
        }
      })();
    } catch (e) {
      setShowrrorMsg(() => true);
    } finally {
    }
  };

  return (
    <div className="form_cont">
      <form className="form" onSubmit={formSubmitHandler}>
        <h2> insert an image</h2>
        <section className="">
          <div className="form_inputs">
            <input
              type="text"
              onChange={titleChangeHandler}
              value={imgD.title}
              required
              placeholder="enter title for image"
            />
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {imgD.img ? imgD.img.path : "Browse or drop image"}
            </div>
          </div>
        </section>
        {showErrorMsg && (
          <div className="create_cont__error">
            Something went wrong,check whether all fields are filled!
          </div>
        )}
        <button type="submit">{btnMsg}</button>
        {showSucMsg && <Success />}
      </form>
      <section className="imglist">
        <div className="imglist_cont">
          {data.map((el) => {
            const binaryData = new Uint8Array(el.imgdata.data);
            let base64Data = "";
            for (let i = 0; i < binaryData.length; i++) {
              base64Data += String.fromCharCode(binaryData[i]);
            }
            base64Data = btoa(base64Data);

            const date = new Date(el.created_at);

            // Define an array of month names
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];

            // Extract the month, day, and year from the Date object
            const monthName = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();

            // Format the date in the desired format
            const formattedDate = `${monthName} ${day} '${year}`;
            return (
              <PhotoList
                img={`data:image/png;base64,${base64Data}`}
                title={el.title}
                date={formattedDate}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PhotoUploader;
