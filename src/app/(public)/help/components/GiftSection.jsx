import React from "react";
import ImageSlider from "./CartSlider";

const GiftCardSection = () => {
  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2
        style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}
      >
        کارت هدیه میلی چیست؟
      </h2>
      <p
        style={{ fontSize: "16px", textAlign: "justify", marginBottom: "20px" }}
      >
        کارت هدیه میلی، راهکاری هوشمندانه و متفاوت برای هدیه دادن است. این
        کارت‌ها به شما امکان می‌دهند تا به دوستان، آشنایان، همکاران و مشتریان
        خود هدیه‌ای با ارزش و بی‌نظیر ارائه دهید؛ هدیه‌ای با ماهیت طلا که امکان
        نقدشوندگی آنی دارد. این کارت‌ها امکان خرید طلا از هر جایی را بر حسب
        میزان طلای موجود در کارت فراهم می‌کند.
      </p>
      <p
        style={{ fontSize: "16px", textAlign: "justify", marginBottom: "20px" }}
      >
        روی هر کارت، ارزش طلا، کد یکتا و رمز آن درج شده و شما به کمک
        راهنمایی‌های زیر می‌توانید کارت‌های موجود در حساب کاربری خود را وارد
        کرده و از آن برای خرید طلا استفاده کنید.
      </p>

      {/* ImageSlider component is placed here */}
      <ImageSlider />

      <p style={{ fontSize: "16px", textAlign: "justify", marginTop: "20px" }}>
        کارت‌های هدیه میلی در مقادیر متنوع و در رنگ‌های اختصاصی به همراه جعبه و
        برگۀ «راهنمای استفاده از کارت هدیه میلی»، تحویل شما می‌شوند.
      </p>
    </div>
  );
};

export default GiftCardSection;
