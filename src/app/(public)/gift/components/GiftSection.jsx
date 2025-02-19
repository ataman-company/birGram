import React from "react";
import ImageSlider from "./CartSlider";
import giftCardTexts from "../staticData/giftCardTexts.json";

const GiftCardSection = () => {
  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2
        style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}
      >
        {giftCardTexts.title}
      </h2>

      {giftCardTexts.paragraphs.map((text, index) => (
        <p
          key={index}
          style={{
            fontSize: "16px",
            textAlign: "justify",
            marginBottom: "20px",
          }}
        >
          {text}
        </p>
      ))}

      {/* ImageSlider component */}
      <ImageSlider />
    </div>
  );
};

export default GiftCardSection;
