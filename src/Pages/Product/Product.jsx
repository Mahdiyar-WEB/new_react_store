import styles from "./product.module.css";
import { useParams, useNavigate,Link } from "react-router-dom";
import { useEffect } from "react";
import {
  useProductsActions,
  useProducts,
} from "./../../Providers/StoreProvider/StoreProvider";
import * as data from "./../../data";
import { useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { BiStore } from "react-icons/bi";
import { AiOutlineSafety } from "react-icons/ai";
import Footer from "../../Components/Footer/Footer";

const Product = () => {
  const navigate = useNavigate();
  const params = useParams();
  const shoes = useProducts();
  const dispatch = useProductsActions();
  const [shoe, setShoe] = useState({ name: "", description: [] });
  useEffect(() => {
    const definedProduct = data.products.find(
      (product) =>
        product.name.toLowerCase().split(" ").join("-") === params.name
    );
    setShoe(definedProduct);
  }, []);
  return (
    <main className={styles.main}>
      <Link className={styles.backTo} to={"/"}>بازگشت به فروشگاه <HiArrowNarrowRight/></Link>
      <div className={styles.container}>
        <aside className={styles.side_panel}>
          <div className={styles.sellDetails}>
            <div>
              <BiStore />
              موجود در انبار
            </div>
            <div>
              <AiOutlineSafety />
              24 ساعت ضمانت بازگشت وجه
            </div>
          </div>
          <button
            onClick={() => {
              if (
                shoes.products.find(
                  (shoe) =>
                    shoe.name.toLowerCase().split(" ").join("-") === params.name
                )
              ) {
                navigate("/cart");
              } else {
                dispatch({ type: "addProduct", value: shoe });
              }
            }}
          >
            {shoes.products.find(
              (shoe) =>
                shoe.name.toLowerCase().split(" ").join("-") === params.name
            )
              ? "ادامه سفارش"
              : "اضافه کردن به سبد خرید"}
          </button>
          <p className={styles.score}>
            <span>{Math.floor(shoe.offPrice / 20)} امتیاز</span>
            <span>امتیاز خرید محصول</span>
          </p>
        </aside>
        <div className={styles.product_container}>
          <div className={styles.details_container}>
            <h3>
              <p>
                <span
                  className={`${
                    shoe.price === shoe.offPrice ? styles.endPrice : styles.off
                  } `}
                >
                  {shoe.price * 1000}ت
                </span>
                <span
                  style={
                    shoe.price === shoe.offPrice
                      ? { display: "none" }
                      : { display: "inline-block" }
                  }
                >
                  <HiArrowNarrowRight />
                  <span className={styles.endPrice}>
                    ت{shoe.offPrice * 1000}
                  </span>
                </span>
              </p>
              {shoe.name}
            </h3>
            <ul className={styles.features_container}>
              {shoe.description.map((feature, index) => {
                return (
                  <li className={styles.features_item} key={index}>
                    {feature.support}
                  </li>
                );
              })}
            </ul>
            <div className={styles.explain}>
              <span>توضیحات:</span>
              <p>{shoe.explain}</p>
            </div>
          </div>
          <div className={styles.img_container}>
            <img src={shoe.image} alt={shoe.name} />
          </div>
        </div>
      </div>
      <Footer product={true}/>
    </main>
  );
};

export default Product;
