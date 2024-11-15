import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const BreadCrumb = ({title}) =>{
    return (
        <>
                <div class="container" style={{}}>
                    <div class="row">
                        <div class="col-lg-12" style={{display: 'flex', 'justify-content': 'flex-start'}}>
                            <div style={{    display: 'flex', 'flex-direction': 'column', 'align-items': 'flex-start'}}>
                                <h4>{title}</h4>
                                <div>
                                    <Link to="/">Home</Link>
                                    <AiOutlineRight />
                                    <span>&nbsp; {title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default BreadCrumb;