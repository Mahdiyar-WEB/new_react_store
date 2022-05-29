import styles from "./notFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img
        src={require("../../assets/images/notFoundImage.png")}
        alt="notFound"
      />
      <h4>صفحه مورد نظر پیدا نشد</h4>
    </div>
  );
};

export default NotFound;
