import { useState } from "react";

export default function CheckboxButton() {
    const [checked, setChecked] = useState(false);

    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            data-state={checked ? "checked" : "unchecked"}
            value={checked ? "on" : "off"}
            onClick={() => setChecked(!checked)}
            className={`peer size-4 shrink-0 rounded-sm border border-muted-foreground 
      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
      disabled:cursor-not-allowed disabled:opacity-50 
      ${checked ? "border-primary bg-primary text-primary-foreground" : ""}
      ml-2 align-middle`}
            aria-label="Select all"
        ></button>
    );
}
