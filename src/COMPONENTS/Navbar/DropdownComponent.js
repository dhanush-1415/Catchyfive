import React from 'react'
import { Link } from 'react-router-dom'
import './DropdownComponent.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


//       onMouseLeave={() => {
//         if (data.items && data.items.length >= 0) {

//         }
//         else {
//           setShow(false)
//         }
//       }}
//     >
//       <div className='s1' >
//         {
//           data.items && data.items.length > 0 ?

//             <div
//               className='droptitle'
//             >
              
//               <h3>{data.title}</h3>
//               {
//                 show ?
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='droptitle' >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
//                   </svg>

//                   :
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='droptitle'>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//                   </svg>
//               }

//             </div>

//             :
//             <Link to={data.link}
//               className='stylenone'

//             >
//               <h3 >{data.title}</h3>
//             </Link>
//         }
//         {show && <div className='border'></div>}
//       </div>

// {
//   show && data.items && data.items.length > 0 && (
//     <div className='s2' onMouseLeave={() => setShow(false)} onClick={() => setShow(!show)}>
//       {data.items.map((item, index) => (
//         <div key={index} className='category' >
//           <Link to={`/home/${item.category.Categoryshorturl}/all`} className='stylenone'>
//             <h3  style={{ marginBottom: '10px' }}><b>{item.category.Name}</b></h3>
//           </Link>
//           {item.category.SubCategoryDetail && item.category.SubCategoryDetail.length > 0 && (
//             <div className='subcategory-list'>
//               {item.category.SubCategoryDetail.map((subcategory, subIndex) => (
//                 <Link
//                   key={subIndex}
//                   // to={`${location.pathname}/${item.category.Categoryshorturl}/${subcategory.SubCategoryshorturl}`}
//                   to={`/home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}`}
//                   className='stylenone'
//                 >
//                   <h4 style={{ fontSize: '12px' }}>{subcategory.Name}</h4>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }
//     </div>

//   )
// }

// export default DropdownComponent




// const DropdownComponent = ({ data }) => {
//   const [show, setShow] = React.useState(false);

//   return (
//     <div
//       className='dropdowncomponent'
//       onClick={() => setShow(!show)}
//       onMouseEnter={() => setShow(true)}  // Handle mouse hover to show the dropdown
//       onMouseLeave={() => setShow(false)}
//     >
//       <div className='s1'>
//         {data.items && data.items.length > 0 ? (
//           <div className='droptitle'>
//             <h3>{data.title}</h3>
//             {show ? (
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 strokeWidth={1.5}
//                 stroke='currentColor'
//                 className='droptitle'
//               >
//                 <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
//               </svg>
//             ) : (
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 strokeWidth={1.5}
//                 stroke='currentColor'
//                 className='droptitle'
//               >
//                 <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
//               </svg>
//             )}
//           </div>
//         ) : (
//           <Link to={data.link} className='stylenone'>
//             <h3>{data.title}</h3>
//           </Link>
//         )}
//         {show && <div className='border'></div>}
//       </div>

//       {show && data.items && data.items.length > 0 && (
//         <div className='s2' onClick={() => setShow(!show)}>
//           {data.items.map((item, index) => (
//             <div key={index} className='category'>
//               <Link to={`/home/${item.category.Categoryshorturl}/all`} className='stylenone'>
//                 <h3 style={{ marginBottom: '10px' }}><b>{item.category.Name}</b></h3>
//               </Link>
//               {item.category.SubCategoryDetail && item.category.SubCategoryDetail.length > 0 && (
//                 <div className='subcategory-list'>
//                   {item.category.SubCategoryDetail.map((subcategory, subIndex) => (
//                     <Link
//                       key={subIndex}
//                       to={`/home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}`}
//                       className='stylenone'
//                     >
//                       <h4 style={{ fontSize: '12px' }}>{subcategory.Name}</h4>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// const DropdownComponent = ({ data }) => {
//   const [show, setShow] = React.useState(false);

//   return (
//     <div
//       className='dropdowncomponent'
//       onClick={() => setShow(!show)}
//       onMouseEnter={() => setShow(true)}
//       onMouseLeave={() => setShow(false)}
//     >
//       <div className='s1'>
//         {data.items && data.items.length > 0 ? (
//           <div className='droptitle'>
//             <h3
//               className='hoverable' // Added class for hover effect
//             >
//               {data.title}
//             </h3>
//             {show ? (
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='green' // Set fill to green when dropdown is open
//                 viewBox='0 0 24 24'
//                 strokeWidth={1.5}
//                 stroke='currentColor'
//                 className='droptitle'
//               >
//                 <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
//               </svg>
//             ) : (
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill={show ? 'green' : 'currentColor'} // Set fill to green on hover
//                 viewBox='0 0 24 24'
//                 strokeWidth={1.5}
//                 stroke={show ? 'green' : 'currentColor'} // Set stroke to green on hover
//                 className='droptitle'
//               >
//                 <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
//               </svg>
//             )}
//           </div>
//         ) : (
//           <Link to={data.link} className='stylenone'>
//             <h3>{data.title}</h3>
//           </Link>
//         )}
//         {show && <div className='border'></div>}
//       </div>

//       {show && data.items && data.items.length > 0 && (
//         <div className='s2' onClick={() => setShow(!show)}>
//           {data.items.map((item, index) => (
//             <div key={index} className='category'>
//               <Link to={`/home/${item.category.Categoryshorturl}/all`} className='stylenone'>
//                 <h3 style={{ marginBottom: '10px' }}><b>{item.category.Name}</b></h3>
//               </Link>
//               {item.category.SubCategoryDetail && item.category.SubCategoryDetail.length > 0 && (
//                 <div className='subcategory-list'>
//                   {item.category.SubCategoryDetail.map((subcategory, subIndex) => (
//                     <Link
//                       key={subIndex}
//                       to={`/home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}`}
//                       className='stylenone'
//                     >
//                       <h4 style={{ fontSize: '12px' }}>{subcategory.Name}</h4>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
const DropdownComponent = ({ data }) => {
  // console.log(data)
  const [show, setShow] = React.useState(false)

const [isHovered , setIsHovered] = React.useState(true)


  return (
    <div
      className='dropdowncomponent'
      onClick={() => setShow(!show)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className='s1'>
        {data.items && data.items.length > 0 ? (
          <div className='droptitle padt navItem'>
            <h3
              className={isHovered ? 'hovered' : ''}
              style={{paddingBottom:'4px'}}
            >
              {data.title}
            </h3>
            {show ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke={isHovered ? 'green' : 'currentColor'}
                className='droptitle'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke={isHovered ? 'green' : 'currentColor'}
                className='droptitle'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            )}
          </div>
        ) : (
          <Link to={data.link} className='stylenone navItem'>
            <h3>{data.title}</h3>
          </Link>
        )}
        {/* {show && <div className='border'></div>} */}
      </div>

      {show && data.items && data.items.length > 0 && (
        <div className='s2' onClick={() => setShow(!show)}>
          {data.items.map((item, index) => (
            <div key={index} className='category'>
              <Link to={`/Home/${item.category.Categoryshorturl}/all/list`} className='stylenone'>
                <h3><b>{item.category.Name}</b></h3>
              </Link>
              {item.category.SubCategoryDetail && item.category.SubCategoryDetail.length > 0 && (
                <div className='subcategory-list'>
                  {item.category.SubCategoryDetail.map((subcategory, subIndex) => (
                    <Link
                      key={subIndex}
                      to={`/Home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}/list`}
                      className='stylenone padt'
                    >
                      <h4 style={{ fontSize: '12px' }}>{subcategory.Name}</h4>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './DropdownComponent.css';

// const DropdownComponent = ({ data }) => {
//   const [activeCategory, setActiveCategory] = useState(null);
// const [show, setShow] = React.useState(false)
//   const handleCategoryClick = (categoryName) => {
//     setActiveCategory(categoryName === activeCategory ? null : categoryName);
//   };

//   const isCategoryActive = (categoryName) => {
//     return categoryName === activeCategory;
//   };

//   return (
//     <div className="dropdowncomponent">
//       <div className="s1" onClick={() => handleCategoryClick(data.title)}>
//         <div className="droptitle">
//           <h3>{data.title}</h3>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className={`w-6 h-6 ${isCategoryActive(data.title) ? 'rotate' : ''}`}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d={isCategoryActive(data.title) ? 'M4.5 15.75l7.5-7.5 7.5 7.5' : 'M19.5 8.25l-7.5 7.5-7.5-7.5'} />
//           </svg>
//         </div>
//       </div>

//       {data.items && data.items.length > 0 && (
//         <div className={`s2 ${isCategoryActive(data.title) ? 'show' : 'hide'}`}>
//           {data.items.map((item, index) => (
//             <div key={index} className="category" onClick={() => handleCategoryClick(item.category.Name)}>
//               <Link to={`/home/${item.category.Categoryshorturl}/all`} className="stylenone">
//                 <h3 style={{ marginBottom: '10px' }}>{item.category.Name}</h3>
//               </Link>
//               {isCategoryActive(item.category.Name) && item.category.SubCategoryDetail && item.category.SubCategoryDetail.length > 0 && (
//                 <div className="subcategory-list">
//                   {item.category.SubCategoryDetail.map((subcategory, subIndex) => (
//                     <Link
//                       key={subIndex}
//                       to={`/home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}`}
//                       className="stylenone"
//                     >
//                       <h4 style={{ fontSize: '12px' }}>{subcategory.Name}</h4>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export default DropdownComponent;






