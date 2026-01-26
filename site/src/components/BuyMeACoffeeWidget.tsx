import styles from "./BuyMeACoffeeWidget.module.scss";

const BuyMeACoffeeWidget = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/karomancer"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.bmcButton}
      aria-label="Buy me a coffee"
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt=""
        width={24}
        height={24}
      />
      <span>Buy me a tea</span>
    </a>
  );
};

export default BuyMeACoffeeWidget;
