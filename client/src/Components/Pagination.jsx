// import React, { useEffect, useRef, useState } from "react";

// function Pagination({ current, total, onPageChange }) {
//   const handlePrevious = () => {
//     if (current > 1) {
//       onPageChange(current - 1);
//     }
//   };

//   const handleNext = () => {
//     if (current === 1) {
//       onPageChange(current + 1);
//     }
//     if (current < total) {
//       onPageChange(current + 1);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePrevious} disabled={current === 1}>
//         Trang trước
//       </button>
//       <span>
//         {current} / {total}
//       </span>
//       <button onClick={handleNext} disabled={current === total}>
//         Trang sau
//       </button>
//     </div>
//   );
// }

// export default Pagination;
