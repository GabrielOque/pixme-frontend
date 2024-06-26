import { useState, useEffect } from "react";
import { VITE_API_URL } from "../config";
import { contextProvider } from "../components/ContextApi";
import basura from "../imagesLogin/basura.png";
import CardImageDeleted from "../components/CardImageDeleted";
import Nav from "../components/Nav";
import ModalImage from "../components/ModalImage";
import axios from "axios";

const Dumps = () => {
  const { dumps, setDumps, section } = contextProvider();
  const [isModal, setIsModal] = useState({
    ismodal: false,
    image: "",
  });
  const [isOpen, setIsOpen] = useState({
    isopen: false,
    id: "",
  });
  const getDumps = async () => {
    try {
      const res = await axios.get(
        `${VITE_API_URL}/dumps/?author=${section[0]._id}`
      );
      setDumps(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await getDumps();
    })();
  }, []);

  if (Array.isArray(dumps) && dumps.length === 0) {
    return (
      <div className="MainHome">
        <Nav />
        <div className="content">
          <div className="presentation">
            <h2 className="Tittle">
              <span>Tu </span>Papelera
            </h2>
            <div className="line"></div>
          </div>
          <div className="Nothing">
            <img src={basura} alt="" draggable="false" />
            <h2>Papelera vacia</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="MainHome">
      <Nav />
      <div className="content">
        <div className="presentation">
          <h2 className="Tittle">
            <span>Tu </span>papelera
          </h2>
          <div className="line"></div>
        </div>
        <div className="ContainerImages">
          {dumps.map((item) => (
            <CardImageDeleted
              isModal={isModal}
              setIsModal={setIsModal}
              item={item}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              key={item._id}
            />
          ))}
        </div>
      </div>
      {isModal.ismodal && (
        <ModalImage isModal={isModal} setIsModal={setIsModal} />
      )}
    </div>
  );
};

export default Dumps;
