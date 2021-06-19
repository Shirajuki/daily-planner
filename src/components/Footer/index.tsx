import React from "react";
import "./index.css";

interface IFooterItem {
  icon: number;
  title: string;
}
type FooterItemType = {
  icon: number;
  title: string;
  selected: number;
  setSelected: (num: number) => void;
};
const getFooterItemIcon: React.FC<number> = (num, selected) => {
  const color: string = selected === num ? "#CB78E5" : "#C4C4C4";
  switch (num) {
    case 0:
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.5" cy="12.5" r="12.5" fill={color} />
          <path d="M18 9L12 17L7.5 13.5" stroke="white" stroke-width="2" />
        </svg>
      );
    case 1:
      return (
        <svg
          width="25"
          height="19"
          viewBox="0 0 25 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="1" width="25" height="18" rx="3" fill={color} />
          <path d="M7 0V4.5" stroke="#707070" />
          <path d="M18 0V4.5" stroke="#707070" />
          <path d="M4 8.5H21" stroke="white" />
          <path d="M12.5 4.5V0" stroke="#707070" />
        </svg>
      );
    case 2:
      return (
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.0486 1.4757C20.0486 1.08432 19.8931 0.708972 19.6164 0.432224C19.3396 0.155475 18.9643 0 18.5729 0H11.8053C11.414 8.358e-05 11.0387 0.155614 10.762 0.432381L0.432055 10.7623C0.155403 11.039 -1.14441e-05 11.4143 -1.14441e-05 11.8056C-1.14441e-05 12.1969 0.155403 12.5722 0.432055 12.849L7.19963 19.6165C7.47637 19.8932 7.85165 20.0486 8.24295 20.0486C8.63426 20.0486 9.00954 19.8932 9.28628 19.6165L19.6162 9.2866C19.893 9.00992 20.0485 8.63463 20.0486 8.24328V1.4757ZM14.8836 7.37852C14.2965 7.37852 13.7335 7.14531 13.3184 6.73018C12.9033 6.31506 12.6701 5.75203 12.6701 5.16496C12.6701 4.57789 12.9033 4.01486 13.3184 3.59974C13.7335 3.18462 14.2965 2.95141 14.8836 2.95141C15.4707 2.95141 16.0337 3.18462 16.4488 3.59974C16.864 4.01486 17.0972 4.57789 17.0972 5.16496C17.0972 5.75203 16.864 6.31506 16.4488 6.73018C16.0337 7.14531 15.4707 7.37852 14.8836 7.37852Z"
            fill={color}
          />
          <path
            d="M21.0919 10.0245C21.3687 9.74778 21.5242 9.37249 21.5243 8.98114V1.47571C21.9157 1.47571 22.291 1.63118 22.5678 1.90793C22.8445 2.18468 23 2.56003 23 2.95141V9.71899C22.9999 10.1103 22.8444 10.4856 22.5676 10.7623L12.2377 21.0922C11.961 21.3689 11.5857 21.5243 11.1944 21.5243C10.8031 21.5243 10.4278 21.3689 10.151 21.0922L10.0876 21.0288L21.0919 10.0245Z"
            fill={color}
          />
        </svg>
      );
    case 3:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.7032 10.1761L21.0205 9.37608C20.8351 8.72913 20.58 8.10415 20.2598 7.51208L21.5731 5.0561C21.6224 4.96339 21.6404 4.85729 21.6245 4.75352C21.6087 4.64976 21.5597 4.55388 21.485 4.4801L19.5711 2.56011C19.4973 2.48545 19.4013 2.43656 19.2974 2.42071C19.1936 2.40485 19.0874 2.42288 18.9946 2.47211L16.5522 3.7761C15.9537 3.44063 15.3199 3.17234 14.6623 2.97611L13.8615 0.328121C13.8277 0.230534 13.7637 0.146201 13.6788 0.0872595C13.5939 0.0283181 13.4924 -0.00219138 13.3891 0.000122534H10.6824C10.5785 0.000606191 10.4773 0.03423 10.3938 0.0961006C10.3103 0.157971 10.2487 0.24486 10.218 0.344121L9.4172 2.98411C8.75417 3.17929 8.11494 3.44761 7.51134 3.7841L5.10899 2.48811C5.0162 2.43888 4.90998 2.42085 4.80612 2.43671C4.70226 2.45256 4.60628 2.50145 4.53243 2.57611L2.58653 4.4721C2.51179 4.54588 2.46286 4.64176 2.44699 4.74552C2.43112 4.84928 2.44916 4.95539 2.49844 5.0481L3.79571 7.44809C3.45943 8.04856 3.19086 8.68444 2.99493 9.34408L0.344337 10.1441C0.244978 10.1747 0.158004 10.2363 0.0960724 10.3197C0.034141 10.4032 0.000484132 10.5042 0 10.6081V13.3121C0.000484132 13.4159 0.034141 13.517 0.0960724 13.6004C0.158004 13.6839 0.244978 13.7454 0.344337 13.7761L3.01094 14.576C3.20901 15.2247 3.47754 15.8497 3.81172 16.44L2.49844 18.952C2.44916 19.0447 2.43112 19.1508 2.44699 19.2546C2.46286 19.3584 2.51179 19.4542 2.58653 19.528L4.5004 21.44C4.57425 21.5147 4.67023 21.5636 4.77409 21.5794C4.87795 21.5953 4.98417 21.5772 5.07696 21.528L7.55138 20.208C8.13672 20.5236 8.75417 20.7757 9.39318 20.96L10.194 23.656C10.2246 23.7553 10.2862 23.8422 10.3698 23.904C10.4533 23.9659 10.5544 23.9995 10.6584 24H13.3651C13.469 23.9995 13.5702 23.9659 13.6537 23.904C13.7372 23.8422 13.7988 23.7553 13.8295 23.656L14.6303 20.952C15.2639 20.7667 15.8759 20.5146 16.4561 20.2L18.9465 21.528C19.0393 21.5772 19.1455 21.5953 19.2494 21.5794C19.3532 21.5636 19.4492 21.5147 19.5231 21.44L21.4369 19.528C21.5117 19.4542 21.5606 19.3584 21.5765 19.2546C21.5924 19.1508 21.5743 19.0447 21.525 18.952L20.1957 16.472C20.5139 15.8902 20.769 15.276 20.9565 14.64L23.6551 13.8401C23.7545 13.8094 23.8414 13.7479 23.9034 13.6644C23.9653 13.581 23.999 13.4799 23.9995 13.3761V10.6481C24.0042 10.5486 23.9783 10.45 23.9254 10.3657C23.8724 10.2813 23.7949 10.2151 23.7032 10.1761ZM12.0358 16.4C11.1647 16.4 10.3131 16.142 9.58886 15.6585C8.86458 15.175 8.30007 14.4879 7.96671 13.6839C7.63336 12.8799 7.54614 11.9952 7.71608 11.1417C7.88603 10.2882 8.30549 9.50416 8.92145 8.88881C9.5374 8.27346 10.3222 7.8544 11.1765 7.68463C12.0309 7.51485 12.9164 7.60199 13.7212 7.93501C14.526 8.26804 15.2139 8.83199 15.6978 9.55557C16.1818 10.2791 16.4401 11.1298 16.4401 12.0001C16.4401 13.167 15.976 14.2862 15.1501 15.1113C14.3241 15.9365 13.2039 16.4 12.0358 16.4Z"
            fill={color}
          />
        </svg>
      );
    default:
      return <p>wat</p>;
  }
};

const items: IFooterItem[] = [
  { icon: 0, title: "Today's tasks" },
  { icon: 1, title: "Dailies" },
  { icon: 2, title: "Tags" },
  { icon: 3, title: "Config" },
];

const FooterItem: React.FC<FooterItemType> = ({
  icon,
  title,
  selected,
  setSelected,
}) => {
  return (
    <div className="footerItem" onClick={() => setSelected(icon)}>
      {getFooterItemIcon(icon, selected)}
      <p className={selected === icon ? "selected" : ""}>{title}</p>
    </div>
  );
};

type FooterType = {
  selected: number;
  setSelected: (num: number) => void;
};
const Footer: React.FC<FooterType> = ({ selected, setSelected }) => {
  return (
    <div className="footer">
      <div>
        {items.map((item: IFooterItem) => {
          return (
            <FooterItem
              icon={item.icon}
              title={item.title}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
      </div>
      <button className="bigButton">+</button>
    </div>
  );
};

export default Footer;
