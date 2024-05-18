import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';

function NoticeCard({title, date, content}) {
  return (
    <Carousel.Item>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="text-muted card-subtitle mb-2">{date}</h6>
          <p className="card-text">{content}</p> 
        </div>
      </div>
    </Carousel.Item>
  );

}

export default NoticeCard;
// export default function NoticeCard({title, date, content}) {
 
//     return (
//     <Carousel.Item>
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">{title}</h5>
//           <h6 className="text-muted card-subtitle mb-2">{date}</h6>
//           <p className="card-text">{content}</p>
//         </div>
//       </div>
//     </Carousel.Item>
//   );
// }