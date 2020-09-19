import React from "react";
import "../support.css";

const Input = React.forwardRef(({ label, onChange, value }, ref) => (
  <input
    ref={ref}
    aria-label={label}
    className="inputSearch"
    onChange={onChange}
    placeholder="Cari artikel..."
    type="text"
    value={value}
  />
));

export default Input;
