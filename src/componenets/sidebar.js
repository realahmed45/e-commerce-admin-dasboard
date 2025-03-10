import React, { useState, useEffect } from "react";
import {
  X,
  Menu,
  LogOut,
  Home,
  Package,
  ShoppingCart,
  CreditCard,
  Truck,
  AlertCircle,
  RefreshCcw,
  History,
  Archive,
  Clipboard,
  AlertTriangle,
  Tag,
  Percent,
  Users,
  FileText,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ onSectionClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", checkIfMobile);
    checkIfMobile();

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (sectionId, path) => {
    if (path) {
      // If path is provided, navigate to that path
      window.location.href = path;
    } else if (onSectionClick) {
      // Otherwise use the callback
      onSectionClick(sectionId);
    }

    // Auto close sidebar on mobile after selection
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log("User logged out");
    window.location.href = "/";
  };

  const sectionGroups = [
    {
      title: "Order Management",
      sections: [
        {
          id: 1,
          icon: <ShoppingCart size={18} />,
          name: "Orders to cart not ordered yet",
          access: "everyone",
        },
        {
          id: 2,
          icon: <CreditCard size={18} />,
          name: "Transaction control",
          access: "articial emp finance",
          note: "Handle payment approvals",
        },
        {
          id: 3,
          icon: <Clipboard size={18} />,
          name: "All Orders",
          access: "emp office, admin",
          path: "/all-orders", // Added navigation path
        },
        {
          id: 4,
          icon: <Package size={18} />,
          name: "Order management delivery",
          access: "driver, emp on filing delivery",
        },
        {
          id: 5,
          icon: <Truck size={18} />,
          name: "Delivery",
          access: "driver, office emp",
        },
        {
          id: 6,
          icon: <AlertCircle size={18} />,
          name: "Non delivered orders or issues",
          access: "office, complain office",
        },
        {
          id: 7,
          icon: <RefreshCcw size={18} />,
          name: "Refund / complain",
          access: "office, complain office",
        },
        {
          id: 8,
          icon: <History size={18} />,
          name: "History orders",
          access: "same as All Orders",
        },
      ],
    },
    {
      title: "Inventory & Products",
      sections: [
        {
          id: 28,
          icon: <Archive size={18} />,
          name: "Product list",
          access: "everyone (view only)",
        },
        {
          id: 33,
          icon: <Clipboard size={18} />,
          name: "Inventory check",
          access: "controlling staff",
        },
        {
          id: 35,
          icon: <AlertTriangle size={18} />,
          name: "Out of Stock, order stock",
          access: "",
        },
        {
          id: 61,
          icon: <Package size={18} />,
          name: "Create a new product",
          access: "articial emp",
          path: "/add-product", // Added navigation path
        },
        {
          id: 54,
          icon: <Package size={18} />,
          name: "Fill inventory",
          access: "articial emp",
        },
        {
          id: 55,
          icon: <Clipboard size={18} />,
          name: "Inventory control",
          access: "articial emp",
        },
        { id: 56, icon: <Tag size={18} />, name: "Categories", access: "" },
      ],
    },
    {
      title: "Discounts & Promotions",
      sections: [
        {
          id: 71,
          icon: <Percent size={18} />,
          name: "Create discount",
          access: "articial emp",
        },
        {
          id: 72,
          icon: <Percent size={18} />,
          name: "All Discount list",
          access: "everyone",
        },
        {
          id: 73,
          icon: <Percent size={18} />,
          name: "Discounted product inventory",
          access: "",
        },
        {
          id: 74,
          icon: <FileText size={18} />,
          name: "Discount policies action",
          access: "articial emp",
          highlight: true,
        },
        {
          id: 103,
          icon: <Users size={18} />,
          name: "Referrals",
          access: "",
          note: "Video verification & sharing",
        },
      ],
    },
    {
      title: "People & Finance",
      sections: [
        {
          id: 81,
          icon: <Users size={18} />,
          name: "Suppliers",
          access: "articial emp",
        },
        {
          id: 82,
          icon: <Users size={18} />,
          name: "Employees",
          access: "articial emp",
        },
        {
          id: 83,
          icon: <Users size={18} />,
          name: "Customers",
          access: "articial emp",
          note: "Timeline chat & All orders",
        },
        {
          id: 90,
          icon: <History size={18} />,
          name: "History orders supplier",
          access: "admin office",
        },
        {
          id: 101,
          icon: <CreditCard size={18} />,
          name: "Finances",
          access: "articial emp",
        },
      ],
    },
    {
      title: "Administration",
      sections: [
        {
          id: 100,
          icon: <Settings size={18} />,
          name: "Admin",
          access: "",
          note: "System administration",
        },
        {
          id: "settings",
          icon: <Settings size={18} />,
          name: "Settings",
          access: "",
        },
        {
          id: "support",
          icon: <HelpCircle size={18} />,
          name: "Support",
          access: "",
        },
      ],
    },
  ];

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-black text-gray-100 transition-all duration-300 ease-in-out z-40 overflow-hidden shadow-2xl ${
          isOpen ? "w-80" : "w-0"
        }`}
      >
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-gray-900 to-black flex justify-between items-center sticky top-0 z-10 border-b border-gray-800">
            <div className="font-bold text-xl flex items-center gap-3 text-white">
              <Home size={24} className="text-blue-400" />
              <span> Dashboard</span>
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="text-gray-300 hover:text-red-400 transition-colors"
              aria-label="Logout"
            >
              <LogOut size={22} />
            </button>
          </div>

          {/* Sections */}
          <div className="p-3">
            {sectionGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <div className="px-4 py-3 text-gray-300 text-sm font-medium uppercase tracking-wider bg-gradient-to-r from-gray-900 to-black border-l-2 border-blue-500 rounded-md mb-2">
                  {group.title}
                </div>
                <div className="space-y-1 ml-2">
                  {group.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() =>
                        handleSectionClick(section.id, section.path)
                      }
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors flex items-center gap-3 ${
                        section.highlight
                          ? "bg-gray-800 border-l-2 border-purple-500 hover:bg-gray-700"
                          : "hover:bg-gray-800"
                      } ${section.path ? "cursor-pointer" : ""}`}
                    >
                      <span
                        className={
                          section.highlight
                            ? "text-purple-400"
                            : "text-blue-400"
                        }
                      >
                        {section.icon}
                      </span>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate">
                            {section.name}
                          </span>
                          {section.path && (
                            <ChevronRight size={16} className="text-gray-500" />
                          )}
                        </div>
                        {section.access && (
                          <span className="text-xs text-gray-400 block truncate">
                            {section.access}
                          </span>
                        )}
                        {section.note && (
                          <span className="text-xs text-gray-400 block truncate">
                            {section.note}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer - Extra professional touch */}
            <div className="mt-8 mb-4 px-4 py-4 bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>© 2025 Company Name</span>
                <span>v2.3.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="mb-6 text-gray-300">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-800 text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
