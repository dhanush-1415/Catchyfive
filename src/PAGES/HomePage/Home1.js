

import React, { useEffect, useRef, useState } from "react";
import BannerSlider from "../../COMPONENTS/Banners/BannerSlider";
import HomeCategories from "../../COMPONENTS/Category/HomeCategories";
import Footer1 from "../../COMPONENTS/Footer/Footer1";
import Footer2 from "../../COMPONENTS/Footer/Footer2";
import Navbar from "../../COMPONENTS/Navbar/Navbar";
import Product_Sidebar from "../../COMPONENTS/Product/Product_Sidebar";
import img1 from "../../ASSETS/Images/1.png";
import img2 from "../../ASSETS/Images/2.png";
import img3 from "../../ASSETS/Images/3.png";
import img4 from "../../ASSETS/Images/4.png";
import ProductsSlider from "../../COMPONENTS/Product/ProductsSlider";
import { useParams } from "react-router-dom";
import "./Home1.css";
import CategorySidebar from "../../COMPONENTS/Product/CategorySidebar";
import CategoryTopbar from "../../COMPONENTS/Product/CategoryTopbar";
import ProductCard from "../../COMPONENTS/Product/ProductCard";
import SlidingTopText from "../../COMPONENTS/SlidingTopText/SlidingTopText";
import ClipLoader from "react-spinners/ClipLoader";
import logo from "../../ASSETS/loaderGif.gif";
import { Grid, Paper, Typography, Button } from '@mui/material';

const Home1 = ({ data }) => {
  const { subcategory, Categoryshorturl, Subcatgeoryshorturl  , level3Subcategory} = useParams();
  const [products, setProducts] = React.useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [categories, setCategories] = React.useState([]);
  const [sortby, setSortby] = useState("lowtohigh");
  const [pagenumber, setpagenumber] = useState(1);
  const [isgetProguct, setisgetProguct] = useState(false);
  const { categoryid, categoryname } = data || {};
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortproductsby , setsortproductsby] = React.useState('Latest')


  const getProducts = (number) => {
    setLoadingProducts(true);

    const pageSize = 50;
    const encodedCategory = encodeURIComponent(Categoryshorturl);
    const encodedSubcategory = encodeURIComponent(Subcatgeoryshorturl);
    const encodedLevel3Subcategory = encodeURIComponent(level3Subcategory);
    
    let url;


    if (Categoryshorturl === undefined || encodedCategory === "all") {
      url = `${process.env.REACT_APP_BACKEND_URL}/Product/GetAllWithImageV2?OrganizationId=3&pageNo=${number}&pageSize=${pageSize}`;
    }else{
      if(encodedSubcategory === "all"){
        url = `${process.env.REACT_APP_BACKEND_URL}/Product/GetAllWithImageV2?OrganizationId=3&CategoryShortURL=${encodedCategory}&pageNo=${number}&pageSize=${pageSize}`;
      }else{
        if(encodedLevel3Subcategory === "list"){
          url = `${process.env.REACT_APP_BACKEND_URL}/Product/GetAllWithImageV2?OrganizationId=3&CategoryShortURL=${encodedCategory}&SubCategoryShortURL=${encodedSubcategory}&pageNo=${number}&pageSize=${pageSize}`;
        }else{
          url = `${process.env.REACT_APP_BACKEND_URL}/Product/GetAllWithImageV2?OrganizationId=3&CategoryShortURL=${encodedCategory}&SubCategoryShortURL=${encodedSubcategory}&SubCategoryL2ShortURL=${encodedLevel3Subcategory}&pageNo=${number}&pageSize=${pageSize}`;
        }
      }
    }

    
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoadingProducts(false);

        let filteredProducts = [];

        if (data.Result && data.Result.length > 0) {
          if (
            (categoryid && categoryid !== "all") ||
            (subcategory && subcategory !== "all")
          ) {
            filteredProducts = data.Result.filter(
              (ele) =>
                ele.Category === categoryid &&
                (ele.SubCategory === subcategory || subcategory === "all")
            );
            filteredProducts = filteredProducts.filter((obj, index, self) => {
              return index === self.findIndex((o) => o.Code === obj.Code);
            });
          } else {
            filteredProducts = data.Result;
          }
        } 

        console.log("filterproducts", filteredProducts);
        if (number === 1) {
          // If it's the first page, set the new products
          setProducts(filteredProducts);
        } else {
          // If it's not the first page, append the new products
          setProducts((prevProducts) => [...prevProducts, ...filteredProducts]);
        }


        if (data.PageSize === pageSize) {
          setpagenumber(number + 1);
          setisgetProguct(true);
        }

        return data;
      })

      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoadingProducts(false); // Ensure loading state is updated even on error
        return Promise.reject(error); // Reject the promise to propagate the error
      });
  };

  console.log(
    categoryid,
    categoryname,
    subcategory,
    Categoryshorturl,
    Subcatgeoryshorturl
  );
  const getCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/Category/GetAllWithSubcategory?OrganizationId=3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const categoriesData = await response.json();
      let alldata = [];
      // console.log('cartegpriesdata ', categoriesData.Data)

      for (const category of categoriesData.Data) {
        let obj = {
          category: category,
          subcategories: category.SubCategoryDetail,
        };
        console.log("getcategories", category, category.SubCategoryDetail);
        // Name=category.Name;
        // console.log(category.Name,"Namefromcategory");
        alldata.push(obj);
      }

      setCategories(alldata);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log("datafromcategories", categories);

  const checkifinwhishlist = (code) => {};

  // useEffect(() => {
  //   console.log(products);
  //   if (products.length > 0)
  //     setProducts((prev) =>
  //       prev.filter(
  //         (obj, index, self) =>
  //           index === self.findIndex((o) => o.Code === obj.Code)
  //       )
  //     );
  // }, [products]);

  useEffect(() => {
    // Clear any previous timeout
    let timeoutId;

    // Define the function to fetch data
    const fetchData = () => {
      setProducts((prev) => []);
      getCategories();
      setpagenumber(1);
      // if (pagenumber === 1) {
      //   getProducts(1);
      // } else {
      //   setpagenumber(1);
      // }
    };

    // Set a new timeout
    timeoutId = setTimeout(fetchData, 100);

    // Return a cleanup function to clear the timeout if dependencies change
    return () => {
      clearTimeout(timeoutId);
    };
  }, [categoryid, subcategory, Categoryshorturl, Subcatgeoryshorturl]);

  const [visible, setVisible] = useState(false);
  const size = 1000;
  let loading = false;
  const toggleVisible = async () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > size) {
      setVisible(true);
    } else if (scrolled <= size) {
      setVisible(false);
    }
    // await getProducts(pagenumber);
    console.log(
      "scrollevent",
      scrolled,
      size,
      isgetProguct,
      pagenumber,
      loadingProducts
    );
    if (scrolled > size && isgetProguct && !loading && !loadingProducts) {
      loading = true;
      await getProducts(pagenumber);
      loading = false;
    }
  };
  useEffect(() => {
    if (pagenumber === 1) {
      getProducts(pagenumber);
    }
    // else {
    //   window.addEventListener("scroll", toggleVisible);
    // }
  }, [
    pagenumber,
    categoryid,
    categoryname,
    subcategory,
    Categoryshorturl,
    Subcatgeoryshorturl,
  ]);
let count=0;
  const listInnerRef = useRef();
  const scrollEvent = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log("Scroll Event", scrollTop + clientHeight, scrollHeight);

      // Check if the user has scrolled to the bottom of the container
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // Load new products if the user is at the bottom
        if (!loadingProducts && isgetProguct) {
          setLoadingProducts(true);
          await getProducts(pagenumber);
          setLoadingProducts(false);
        }
      }
    }
  };
  useEffect(() => {
    if (listInnerRef.current) {
      listInnerRef.current.addEventListener("scroll", scrollEvent);
    }

    return () => {
      if (listInnerRef.current) {
        listInnerRef.current.removeEventListener("scroll", scrollEvent);
      }
    };
  }, [scrollEvent]);
  

  const categoryNames = categories.map((category) => category.category.Name);

  console.log("Category Names:", categoryNames);
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      <SlidingTopText />

      <Navbar />

      <BannerSlider />
      <HomeCategories />
      <div className="product_sidebar">
        <CategorySidebar
          categories={categories}
          onCategoryClick={(categoryName) => handleCategoryClick(categoryName)}
          className="product_sidebar1"
        />
        <div className="allproducts">
          <CategoryTopbar categories={categories} />
          <div className="header">

            <div className="sortby">
            <span>Sort by : </span>
              <select
                value={sortproductsby}
                onChange={(e) => setsortproductsby(e.target.value)}
                style={{padding:'5px'}}
              >
                <option value="Price Low to High">Low to High</option>
                <option value="Price High to Low">High to Low</option>
                <option value="Latest">Latest</option>
              </select>
            </div>
          </div>
          <div className="product_scroll_box">
            <div>
            <Grid container
            style={{
              marginTop:'10px',
              height: "1000px",
              overflowY: "scroll",
            }}
              className="product-scroll-box"
              onScroll={(e) => scrollEvent(e)}
              ref={listInnerRef} spacing={2}
            >

              {products && products.length > 0 ? (
                products
                .sort((a, b) => {
                  if (sortproductsby == 'Latest') {
                      return new Date(b.ChangedOn) - new Date(a.ChangedOn)
                  }

                  else if (sortproductsby == 'Price Low to High') {
                      return a.SellingCost - b.SellingCost
                  }
                  else if (sortproductsby == 'Price High to Low') {
                      return b.SellingCost - a.SellingCost
                  }
              })
                .map((item, index) => (

                    <ProductCard
                      data={item}
                      wishlist={checkifinwhishlist(item.Code)}
                    />

                ))
              ) : (

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                    width: "100%",
                  }}
                >
                  {" "}
                  <h1>{loadingProducts ? "" : "No Products Found"}</h1>
                  {loadingProducts && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img src={logo} alt="Loading..." />
                    </div>
                  )}
                </div>
              )}

              </Grid>
              <Grid container justifyContent='center' alignItems='center' textAlign='center' >
                <Grid item>
                  {loadingProducts && products.length >= 50 && (
                    <ClipLoader color="#36d7b7" />
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>

        {visible ? (
          <div
            className="scrollToTop"
            onClick={() => {
              window.scrollTo(0, size - 500);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          </div>
        ) : (
          ""
        )}
      </div>

      <Footer1 />
      <Footer2 />
    </div>
  );
};

export default Home1;
