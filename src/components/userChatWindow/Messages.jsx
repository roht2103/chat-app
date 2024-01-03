import "./style.css";
import { Message } from "./Message.jsx";
export const Messages = () => {
  return (
    <div className="messages">
      <Message
        imgSrc="https://images.unsplash.com/photo-1703967971243-c30bd410ed32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D"
        msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae culpa, non eligendi debitis odit repellendus soluta, eveniet laborum quod animi architecto accusantium sit harum? Ipsum debitis sit pariatur quaerat repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis delectus placeat modi architecto repellendus officiis eveniet obcaecati, incidunt consectetur veritatis temporibus ratione? Id ipsum asperiores debitis alias tenetur quae sapiente."
      />
    </div>
  );
};
