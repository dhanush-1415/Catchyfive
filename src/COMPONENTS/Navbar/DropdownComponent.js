import React from 'react'
import { Link } from 'react-router-dom'
import './DropdownComponent.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Dropdown from 'react-multilevel-dropdown';


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
        <Dropdown
        title='Dropdown title'
      >
        <Dropdown.Item
          // onClick={() => doSomething()}
        >
          Item 1
        </Dropdown.Item>
        <Dropdown.Item>
          Item 2
          <Dropdown.Submenu>
            <Dropdown.Item>
              Subitem 1
            </Dropdown.Item>
          </Dropdown.Submenu>
        </Dropdown.Item>
      </Dropdown>
        // <div className='s2' onClick={() => setShow(!show)}>
        //   {data.items.map((item, index) => (
        //     <div key={index} className='category'>
        //       <Link to={`/Home/${item.category.Categoryshorturl}/all/list`} className='stylenone'>
        //         <h3><b>{item.category.Name}</b></h3>
        //       </Link>
        //       {item.category.SubCategoryDetail && item.category.SubCategoryDetail.length > 0 && (
        //         <div className='subcategory-list'>
        //           {item.category.SubCategoryDetail.map((subcategory, subIndex) => (
        //             <Link
        //               key={subIndex}
        //               to={`/Home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}/list`}
        //               className='stylenone padt'
        //             >
        //               <h4 style={{ fontSize: '12px' }}>{subcategory.Name}</h4>
        //             </Link>
        //           ))}
        //         </div>
        //       )}
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
  );
};


export default DropdownComponent;






