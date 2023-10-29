import { useEffect } from "react"

export default function useOutsideClik(ref, optionDropDown, cb) {


    function handleOutsideClik(event) {

        if (ref.current && !ref.current.contains(event.target) && event.target.id !== optionDropDown) {
            console.log("outside click");
            cb();
        }

    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClik);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClik);

        }

    }, [ref, cb]);

}