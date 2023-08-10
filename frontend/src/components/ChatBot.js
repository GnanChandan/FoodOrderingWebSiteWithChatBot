import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default function ChatBot({uid})
{
  const handleButtonClick = () => {
    if (uid.length !== 0) {
      let frameBtnDisplay = document.getElementById('frameBtn').style.display;
      if (frameBtnDisplay === 'none')
      {
        document.getElementById('frameBtn').style.display = "block";
        document.getElementById('frame').style.display = "none"
      }
      else
      {
        document.getElementById('frameBtn').style.display = "none";
        document.getElementById('frame').style.display = "block"
      }
      console.log("worked");
    } else {
      window.alert("please login to use this feature");
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
          <div id="frame" style={{display:"none"}}>
            <iframe
              title="miraChatBot"
              width="450"
              height="530"
              allow="microphone;"
              src={process.env.REACT_APP_DIALOGUE_FLOW}
            ></iframe>
            <button
              onClick={handleButtonClick}
              className="absolute right-4 top-6"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg text-white" />
            </button>
          </div>
          <button
            className="rounded-lg bg-gray-600 p-6 sticky float-right bottom-0"
            onClick={handleButtonClick}
            id = "frameBtn"
          >
            <FontAwesomeIcon icon={faRobot} size="lg" className="text-white" />
          </button>
    </div>
  )
}