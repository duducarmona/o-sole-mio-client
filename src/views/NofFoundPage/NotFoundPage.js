import React from "react";
import { Link } from "react-router-dom";
import './NotFoundPage.css';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className='NotFoundPage'>
        <h1 className='NotFoundPage-sorry'>Sorry, page not found...</h1>
        <img className='NotFoundPage-img' src={"/images/404.png"} alt='404' />
        <div style={{ textAlign: "center" }}>
          <Link to="/"><h1 className='NotFoundPage-h1'>Go back to the bright side of life ;)</h1></Link>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;
