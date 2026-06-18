import React, { useState } from "react";
import "./App.css";
import {GoogleGenerativeAI} from "@google/generative-ai";

const ChatBox = () => {
    let [searchData, setSearchData] = useState("");
    let [Data, setData] = useState("");

    let genAI = new GoogleGenerativeAI("AQ.Ab8RN6KxJzr-EByQs8KgPGu4z8DRSbJIZN6uuSxbt4KEpoVkew");
    async function search() {
        try {
            let model = genAI.getGenerativeModel({
              model: "gemini-2.5-flash"
            })
            let res = await model.generateContent(searchData);
            console.log(res.response.text());
            setData(res.response.text);
          }catch (error) {
            console.error("Error generating response:", error);
          }
        }

  return (
    <div className="container">
      <div className="chat-box">
        <h1>Gemini AI</h1>

        <div className="messages">
          <div className="message user">
            Hello Gemini!
          </div>
          <div className="message bot">
            {Data}
          </div>
        </div>

        <div className="input-box">
          <input type="text" placeholder="Ask Gemini..." value={searchData} onChange={(e) => setSearchData(e.target.value)} />
          <button onClick={search}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

// const chatBox_Ai = () => {