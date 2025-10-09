import React from "react";

interface WrapSectionProps {
  children: React.ReactNode;
}

const WrapSection: React.FC<WrapSectionProps> = ({ children }) => {
  return (
    <div style={{ width: "100%", background: "#f9f8f5", padding: ".5rem" }}>
  
      <div style={{ padding: ".5rem", background: "white" }}>{children}</div>
    </div>
  );
};

export default WrapSection;
