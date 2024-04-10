import {useNavigate} from "react-router-dom";
import Icon from "@mdi/react";

export default function FooterButton({ icon, text, path, currentPath }) {
    const navigate = useNavigate();
    const isActive = currentPath === path;

    return (
        <button className={`flex flex-col items-center p-1 ${isActive && 'text-black'}`} onClick={() => navigate(path)}>
            <Icon path={icon} size={1} />
            <span>{text}</span>
        </button>
    );
};