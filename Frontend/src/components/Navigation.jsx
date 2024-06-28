import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { FiSearch } from "react-icons/fi";
import { Badge } from "@mui/material";
import { AiFillDelete, AiOutlineShoppingCart } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { motion } from "framer-motion";
import { Popover, Popper } from "@mui/material";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  FILTER_BY_SEARCH,
} from "../constants/filterConstants";
// import { Dropdown } from "react-bootstrap";
import { removeItemFromCart } from "../actions/cartActions";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  // const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSections, setCurrentSections] = useState([]);

  const handleClick = (event, sections) => {
    setAnchorEl(event.currentTarget);
    setCurrentSections(sections);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/signup");
  };

  const cartList = useSelector((state) => state.cartList);
  const { cart } = cartList;

  const filterState = useSelector((state) => state.filterState);
  const { searchQuery } = filterState;

  return (
    <div className="shadow bg-pink-800 text-white border-b-2 px-4">
      <div className="flex mx-12 justify-between items-center py-4 h-full ">
        <div>Shopify</div>
        <div className="flex *:px-4">
          {navigation.categories.map((category) => (
            <>
              <div
                key={category.id}
                onClick={(event) => handleClick(event, category.sections)}
                className="hover:font-semibold"
              >
                {category.name}
              </div>
              <Popover
                className="mt-4"
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="flex  *:p-8 space-x-12">
                  {currentSections.map((section) => (
                    <div className=" *:py-0.5">
                      <p className="hover:font-semibold">{section.name}</p>
                      <ol className=" *:text-slate-500 *:py-1">
                        {section.items.map((item, index) => (
                          <li className="hover:text-slate-800">{item.name}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </Popover>
            </>
          ))}
        </div>
        <motion.div
          className={`border rounded p-2 ${
            isFocused ? "outline outline-blue-400" : ""
          }`}
          tabIndex="0"
        >
          <FiSearch className="inline-flex size-5 align-bottom " />
          <input
            type="text"
            placeholder="Type Saree,kurti.."
            name="search"
            onChange={(e) =>
              dispatch({
                type: FILTER_BY_SEARCH,
                payload: e.target.value,
              })
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="px-4 bg-pink-800 text-white outline-none flex-grow"
          />
        </motion.div>
        <div className="flex items-center divide-x-2 *:px-5 g-green-200 *:capitalize ">
          <Link to="/addProduct" className="hover:text-pink-300 hover:underline underline-offset-8">
            become a seller
          </Link>
          <div className="flex items-center space-x-8 *:px-2 relative">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative ">
                  <CiUser className="mx-auto size-5" />
                  <span>Profile</span>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  {({ focus }) => (
                    <a
                      href="#"
                      className={classNames(
                        focus ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Orders
                    </a>
                  )}
                </MenuItem>

                {userInfo ? (
                  <>
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          My Profile
                        </a>
                      )}
                    </MenuItem>
                    <hr />
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={logoutHandler}
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Logout
                        </button>
                      )}
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <hr />
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          to="/signup"
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Register
                        </Link>
                      )}
                    </MenuItem>
                  </>
                )}
              </MenuItems>
            </Menu>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex flex-col ">
                  <Badge
                    color="primary"
                    badgeContent={cart.length}
                    className="ml-1.5"
                  >
                    <AiOutlineShoppingCart className="size-5" />
                  </Badge>
                  <span>Cart</span>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 overflow-hidden w-[17vw] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                  {cart.length > 0 ? (
                    <>
                      {cart.slice(0,5).map((prod) => (
                <MenuItem>
                        <span key={prod._id} className="flex space-x-2 p-1.5 justify-between">
                          {/* <img
                            src={prod.images[0]}
                            className="cartItemImg rounded-full w-14 h-14 object-cover "
                            alt={prod.title}
                          /> */}
                          <div className="flex-1 flex flex-col">
                            <span className="text-lg text-gray-500 text-nowrap truncate">{prod.title}</span>
                            <span className="text-sky-600">${prod.discountPrice}</span>
                          </div>
                          <AiFillDelete
                            className="size-5 text-red-500"
                            onClick={() => dispatch(removeItemFromCart(prod._id)) }
                              // dispatch({
                              //   type: REMOVE_FROM_CART,
                              //   payload: prod,
                              // })
                            
                          />
                        </span>
                </MenuItem>
                      ))}
                      {(cart.length - 5) > 0 && (
                        <div>And {(cart.length-5)} more items...</div>
                      )}
                      <Link to={"/cart"}>

                      <button className="bg-blue-400 text-white w-full p-1.5 hover:bg-blue-500 " >Go to Cart</button>
                      </Link>
                    </>
                  ) : (
                    <span>Cart is Empty</span>
                  )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
