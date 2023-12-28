import './headerItem.css';
import { Link } from "react-router-dom";

export const HeaderLink=(props)=>{
    return(
        <div className="header-item p-2">
             <Link onClick={props.onClick} to={props.path}>{props.name}</Link>
        </div>
    )
}