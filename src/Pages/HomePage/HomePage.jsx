import Product from "../../Components/Product/Product";
import * as data from "../../data";
import styles from "./homePage.module.css";
import {
  useProductsActions,
  useProducts,
} from "../../Providers/StoreProvider/StoreProvider";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import { BsFilterRight } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
const shoesSizes = [
  { value: 37, text: "سایز 37" },
  { value: 38, text: "سایز 38" },
  { value: 39, text: "سایز 39" },
  { value: 40, text: "سایز 40" },
];
const HomePage = () => {
  const navigate = useNavigate();
  const [shoes, setShoes] = useState({ ...data });
  const [isSize, setIsSize] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(1000000);
  const [showFilters, setShowFilters] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useProductsActions();
  const { products } = useProducts();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  useEffect(() => {
    const cloneShoes = [...data.products];
    const filteredPrice = cloneShoes.filter(
      (shoe) => shoe.offPrice * 1000 <= price
    );
    let filteredShoes = [];
    if (size === "") {
      filteredShoes = [...filteredPrice];
    } else {
      filteredShoes = filteredPrice.filter((shoe) => shoe.size === size);
    }
    setShoes({ ...data, products: filteredShoes });
  }, [price]);
  useEffect(() => {
    const cloneShoes = [...data.products];
    if (size === "") {
      const filteredShoes = cloneShoes.filter(
        (shoe) => shoe.offPrice * 1000 <= price
      );
      setShoes({ ...data, products: filteredShoes });
    } else {
      const filteredSize = cloneShoes.filter(
        (shoe) => shoe.offPrice * 1000 <= price
      );
      const filteredShoes = filteredSize.filter((shoe) => shoe.size === size);
      setShoes({ ...data, products: filteredShoes });
    }
  }, [size]);
  const checkInCart = (id = 1, products) => {
    return products.find((p) => p.id === id);
  };
  const removeFilters = () => {
    setSize("");
    setPrice(1000000);
    setIsPrice(false);
    setIsSize(false);
    setShowFilters(false);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const changeSizeHandler = (e) => {
    setSize(Number(e.target.value));
  };
  const changePriceHandler = (e) => {
    setPrice(Number(e.target.value));
  };
  const addProductHandler = (product) => {
    dispatch({ type: "addProduct", value: product });
    dispatch({ type: "totalPrice" });
  };
  const navigateHandler = (productName) => {
    const name = productName.toLowerCase().split(" ").join("-");
    navigate(`/product/${name}`);
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={loading ? styles.loading : styles.hideLoading}>
          <img src={"https://svgshare.com/i/gav.svg"} alt="loading" />
        </div>
        <section
          className={`${styles.filters_container} ${
            showFilters && styles.show
          }`}
        >
          <div className={styles.filter_head}>
            <p>فیلترها</p>
            <button onClick={() => removeFilters()}>حذف فیلترها</button>
          </div>
          <div className={styles.size_filter_container}>
            <div
              className={styles.size_filter_head}
              onClick={() => setIsSize(!isSize)}
            >
              <p>سایز</p>
              <FiArrowDown className={isSize ? styles.rotate : ""} />
            </div>
            <div style={!isSize ? { display: "none" } : { display: "block" }}>
              {shoesSizes.map((shoeSize, index) => {
                return (
                  <div key={index} className={styles.size_container}>
                    <input
                      onChange={(e) => changeSizeHandler(e)}
                      type="radio"
                      checked={size === shoeSize.value ? true : false}
                      name="size"
                      value={shoeSize.value}
                      id={index}
                    />
                    <label htmlFor={index}>{shoeSize.text}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.size_filter_container}>
            <div
              className={styles.size_filter_head}
              onClick={() => setIsPrice(!isPrice)}
            >
              <p>محدوده قیمت</p>
              <FiArrowDown className={isPrice ? styles.rotate : ""} />
            </div>
            <div
              className={styles.priceInp}
              style={!isPrice ? { display: "none" } : { display: "block" }}
            >
              <input
                step={100000}
                type="range"
                min={0}
                max={1000000}
                value={price}
                onChange={(e) => changePriceHandler(e)}
              />
              <p>
                <span>از 0 تومان</span>
                <span>تا {numberWithCommas(price)} تومان</span>
              </p>
            </div>
          </div>
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className={styles.showShoes}
            >
              <p>مشاهده {shoes.products.length} کالا</p>
              <IoIosArrowUp />
            </div>
          )}
        </section>
        <section
          className={`${styles.cards_container} ${
            shoes.products.length === 0 && styles.not_found
          } ${showFilters && styles.hide}`}
        >
          <div
            onClick={() => setShowFilters(!showFilters)}
            className={styles.showFilters}
          >
            <strong>فیلترها</strong>
            <BsFilterRight />
          </div>
          {shoes.products.length === 0 && (
            <div>
              <img
                src={require("../../public/not-found.png")}
                alt="not-found"
              />
              <h3>!محصول مورد نظر شما یافت نشد</h3>
            </div>
          )}
          {shoes.products.map((product) => {
            return (
              <Product
                onAdd={() => addProductHandler(product)}
                onClick={() => navigateHandler(product.name)}
                product={product}
                key={product.id}
                inCart={checkInCart(product.id, products)}
              />
            );
          })}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
