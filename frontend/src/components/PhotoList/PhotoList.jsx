import "./PhotoList.css";

const PhotoList = ({ title, img, date }) => {
  return (
    <div className="ph_cont">
      <div>
        <h2>{title}</h2>
        <p>{date}</p>
      </div>
      <div className="ph_imgcont">
        <img src={img} />
      </div>
    </div>
  );
};

export default PhotoList;
