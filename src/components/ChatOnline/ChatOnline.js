import "./ChatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
     <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
            <img  
            className="chatOnlineImg"
            src="https://res.cloudinary.com/artwear/image/upload/v1636611540/yi63z8kzvhnmbd7kslis.png" 
             alt=""
             />
            <div className="chatOnlineBadge">
                
            </div>
        </div>
        <span className="chatOnlineName">
           Beny
        </span>
     </div>
    </div>
  );
}