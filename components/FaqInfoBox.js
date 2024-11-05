"use client";

import React, { useState } from 'react';

// Single FAQ item component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h3>{question}</h3>
        <button className={`faq-toggle ${isOpen ? 'expanded' : ''}`}>
          {isOpen ? '-' : '+'}
        </button>
      </div>
      {isOpen && <div className="faq-answer"><p>{answer}</p></div>}
    </div>
  );
};

// FAQ box that contains multiple FAQ items
const FaqInfoBox = ({ faqs }) => {
  return (
    <div className="faq-info-box">
      <h2>Frequently Asked Questions regarding {faqs.companyName}</h2>
      {faqs.data.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FaqInfoBox;
