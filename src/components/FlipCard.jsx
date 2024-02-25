import { useEffect, useState } from "react";
import ReactFlipCard from "reactjs-flip-card";

const FlipCard = (props) => {
  const { img, backComponent } = props;
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);
  return (
    <div className="w-full md:w-64 flex justify-center">
      <ReactFlipCard
        perspective={1000} // Menentukan perspektif untuk efek flip
        flipDirection="horizontal" // Menentukan arah flip (horizontal/vertical)
        hoverAnimation={true} // Mengaktifkan animasi saat dihover
        containerStyle={
          screenSize > 768
            ? { width: "100%", height: "400px" }
            : { width: "200px", height: "300px" }
        } // Gaya kontainer
        frontStyle={{
          background: "transparent",
          color: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          padding: "20px",
        }} // Gaya untuk bagian depan kartu
        backStyle={{
          background: "transparent",
          color: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }} // Gaya untuk bagian belakang kartu
        frontComponent={
          <div className="w-full h-full flex justify-center items-center">
            <img src={img} alt="pokemon" className="w-48 md:w-full" />
          </div>
        } // Komponen untuk bagian depan kartu
        backComponent={backComponent} // Komponen untuk bagian belakang kartu
      />
    </div>
  );
};

export default FlipCard;
