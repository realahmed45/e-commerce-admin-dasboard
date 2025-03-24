import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { PlusIcon, XCircleIcon, SearchIcon, Save } from "lucide-react";
import Sidebar from "../Sidebar/sidebar";
import { toast } from "react-hot-toast";

const API_URL = "https://ultra-inquisitive-oatmeal.glitch.me";

const AddProduct = () => {
  // Product type state
  const [productType, setProductType] = useState("Normal");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [parentProducts, setParentProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Form data state with complete fields from all screens
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    subtitle: "",
    brand: "",
    description: "",
    websiteName: "",
    websiteDescription: "",
    varianceName: "",
    subtitleDescription: "",
    heightCm: "",
    widthCm: "",
    depthCm: "",
    weightKg: "",
    specifications: [{ name: "", length: "", width: "", depth: "", id: 0 }],
    stock: "",
    minimumOrder: 1,
    highestValue: "",
    normalShelvesCount: "",
    highShelvesCount: "",
    deliveryTime: "",
    reOrderSetting: "2 days average",
    inventoryInDays: "2 days",
    deliveryPeriod: "1 days",
    orderTimeBackupInventory: "",
    alternateSupplier: "",
    supplierInformation: "",
    supplierWebsite: "",
    supplierContact: "",
    supplierName: "",
    supplierAddress: "",
    supplierEmail: "",
    anyDiscount: "",
    priceAfterDiscount: "",
    suggestedRetailPrice: "",
    visibility: "Public",
    tags: [],
    categories: "",
    notes: "",
    parentProduct: "",
  });

  // Master images and more images state
  const [masterImages, setMasterImages] = useState([null]);
  const [moreImages, setMoreImages] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  // For the tag selection
  const [selectedTags, setSelectedTags] = useState([]);
  const availableTags = ["Popular", "Sale", "New"];

  // For the suppliers suggestions
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Refs for image upload
  const masterImageRef = useRef(null);
  const moreImageRefs = useRef([]);

  // Fetch parent products and suppliers on component mount
  useEffect(() => {
    const fetchParentProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/parents`);
        if (response.data && response.data.success) {
          setParentProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching parent products:", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/suppliers`);
        if (response.data && response.data.success) {
          setSuppliers(response.data.data);
          setFilteredSuppliers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchParentProducts();
    fetchSuppliers();
  }, []);

  // Filter suppliers based on search term
  useEffect(() => {
    if (formData.alternateSupplier) {
      const filtered = suppliers.filter((supplier) =>
        supplier.name
          .toLowerCase()
          .includes(formData.alternateSupplier.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers(suppliers);
    }
  }, [formData.alternateSupplier, suppliers]);

  // Handle input changes - generic function for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product type change
  const handleProductTypeChange = (type) => {
    setProductType(type);
    // Reset certain fields based on product type
    if (type === "Child") {
      setFormData((prev) => ({
        ...prev,
        parentProduct: "",
      }));
    }
  };
  // Add this function to handle success
  const handleSuccess = () => {
    setShowSuccess(true);

    // Auto-dismiss after 5 seconds and refresh page
    setTimeout(() => {
      setShowSuccess(false);
      window.location.reload();
    }, 5000);
  };
  // Handle specification changes
  const handleSpecChange = (index, field, value) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
    setFormData((prev) => ({ ...prev, specifications: updatedSpecs }));
  };

  // Add new specification row
  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        {
          name: "",
          length: "",
          width: "",
          depth: "",
          id: prev.specifications.length,
        },
      ],
    }));
  };

  // Remove a specification
  const removeSpecification = (index) => {
    if (formData.specifications.length > 1) {
      const updatedSpecs = [...formData.specifications];
      updatedSpecs.splice(index, 1);
      setFormData((prev) => ({ ...prev, specifications: updatedSpecs }));
    }
  };

  // Handle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }

    // Update formData as well
    setFormData((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  };

  // Handle master image upload
  const handleMasterImageUpload = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newMasterImages = [...masterImages];
      newMasterImages[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
      setMasterImages(newMasterImages);
    }
  };

  // Handle more images upload
  const handleMoreImageUpload = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newMoreImages = [...moreImages];
      newMoreImages[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
      setMoreImages(newMoreImages);
    }
  };

  // Remove master image
  const removeMasterImage = (index) => {
    const newMasterImages = [...masterImages];
    newMasterImages[index] = null;
    setMasterImages(newMasterImages);
  };

  // Remove more image
  const removeMoreImage = (index) => {
    const newMoreImages = [...moreImages];
    newMoreImages[index] = null;
    setMoreImages(newMoreImages);
  };

  // Handle selecting a suggested supplier
  const selectSupplier = (supplier) => {
    setFormData((prev) => ({
      ...prev,
      alternateSupplier: supplier.name,
      supplierName: supplier.name,
      supplierEmail: supplier.email,
      supplierAddress: supplier.address,
      supplierContact: supplier.contact,
      supplierWebsite: supplier.website || "",
    }));
    setShowSuggestions(false);
  };

  // Search parent product
  const searchParentProduct = () => {
    if (searchTerm) {
      const filtered = parentProducts.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.productId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filtered;
    }
    return [];
  };

  // Select parent product
  const selectParentProduct = (product) => {
    setFormData((prev) => ({
      ...prev,
      parentProduct: product.productId,
    }));
    setSearchTerm("");
  };

  // Validate form before submission
  const validateForm = () => {
    // Required fields vary based on product type
    const requiredFields = {
      Parent: ["productName", "brand", "description"],
      Child: ["parentProduct", "varianceName", "subtitleDescription"],
      Normal: ["productName", "brand", "description"],
    };

    const missingFields = requiredFields[productType].filter(
      (field) => !formData[field]
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return false;
    }

    return true;
  };

  // Submit form function with improved error handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Create a FormData object to handle file uploads
      const productData = new FormData();

      // Add all form fields to the FormData
      for (const key in formData) {
        if (key === "specifications" || key === "tags") {
          productData.append(key, JSON.stringify(formData[key]));
        } else {
          // Only append if the value is not undefined or null
          if (formData[key] !== undefined && formData[key] !== null) {
            productData.append(key, formData[key]);
          }
        }
      }

      // Add product type
      productData.append("productType", productType);

      // Add master image if it exists
      if (masterImages[0]?.file) {
        productData.append("masterImage", masterImages[0].file);
      }

      // Add more images if they exist
      moreImages.forEach((img, index) => {
        if (img?.file) {
          productData.append(`moreImage${index}`, img.file);
        }
      });

      console.log("Sending data to server...");

      // Debug what's being sent
      const formDataEntries = [...productData.entries()];
      console.log(
        "FormData contents:",
        formDataEntries.map((entry) => ({
          key: entry[0],
          value: entry[0].includes("Image") ? "File object" : entry[1],
        }))
      );

      // Send the data to the server
      const response = await axios.post(
        `${API_URL}/api/products`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);

      // Change this part in handleSubmit's try block:
      if (response.data && response.data.success) {
        handleSuccess();
      } else {
        alert(response.data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);

      // More detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        alert(
          `Server error: ${
            error.response.data.message ||
            error.response.statusText ||
            "Unknown error"
          }`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request made but no response received:", error.request);
        alert("No response from server. Please check your network connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-80" : ""
        } w-full bg-gray-50 p-4`}
      >
        {/* Top navigation */}
        <div className="bg-purple-900 text-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Create new product</span>
            <span className="text-xs">
              (create {productType.toLowerCase()} product)
            </span>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>

        {/* Form container */}
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            {/* Product type selector */}
            <div className="bg-white p-4 rounded shadow mb-4">
              <div className="mb-4">
                <p className="text-sm mb-2">This product is linked as:</p>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleProductTypeChange("Parent")}
                    className={`px-4 py-1 text-sm border ${
                      productType === "Parent"
                        ? "bg-purple-100 border-purple-500"
                        : "border-gray-300"
                    }`}
                  >
                    Parent
                  </button>
                  <span>OR</span>
                  <button
                    type="button"
                    onClick={() => handleProductTypeChange("Child")}
                    className={`px-4 py-1 text-sm border ${
                      productType === "Child"
                        ? "bg-purple-100 border-purple-500"
                        : "border-gray-300"
                    }`}
                  >
                    Child
                  </button>
                  <span>OR</span>
                  <button
                    type="button"
                    onClick={() => handleProductTypeChange("Normal")}
                    className={`px-4 py-1 text-sm border ${
                      productType === "Normal"
                        ? "bg-purple-100 border-purple-500"
                        : "border-gray-300"
                    }`}
                  >
                    Be a normal product
                  </button>
                </div>
              </div>

              {formData.parentProduct && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-600 px-4 py-1 text-sm rounded"
                  >
                    Parent product: {formData.parentProduct}
                  </button>
                </div>
              )}

              {/* Conditional content based on product type */}
              {productType === "Parent" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Product Name/Title
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Product Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              )}

              {productType === "Child" && (
                <div className="mt-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium">
                      In case of child option, parent for this product
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <input
                        type="text"
                        placeholder="Search parent..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 p-1 text-sm flex-grow"
                      />
                      <button
                        type="button"
                        className="bg-purple-500 text-white px-2 py-1 text-sm"
                        onClick={() => searchParentProduct()}
                      >
                        Search
                      </button>
                    </div>
                    {/* Search results */}
                    {searchTerm && (
                      <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded">
                        {searchParentProduct().length > 0 ? (
                          searchParentProduct().map((product) => (
                            <div
                              key={product.productId}
                              className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                              onClick={() => selectParentProduct(product)}
                            >
                              <div className="text-sm font-medium">
                                {product.productName}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {product.productId}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500">
                            No parent products found
                          </div>
                        )}
                      </div>
                    )}

                    {searchTerm && (
                      <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded">
                        {searchParentProduct().length > 0 ? (
                          searchParentProduct().map((product) => (
                            <div
                              key={`parent-${product.productId}`} // Added unique key here
                              className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                              onClick={() => selectParentProduct(product)}
                            >
                              <div className="text-sm font-medium">
                                {product.productName}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {product.productId}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500">
                            No parent products found
                          </div>
                        )}
                      </div>
                    )}
                    {/* Child-specific fields */}
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium">
                          Variance Name
                        </label>
                        <input
                          type="text"
                          name="varianceName"
                          value={formData.varianceName}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Subtitle Description
                        </label>
                        <textarea
                          name="subtitleDescription"
                          value={formData.subtitleDescription}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded bg-gray-50"
                          rows="6"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {productType === "Normal" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Product ID (generated automatically)
                    </label>
                    <input
                      type="text"
                      disabled
                      className="w-full border border-gray-300 p-2 rounded bg-gray-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Product Name/Title
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Product Subtitle
                      </label>
                      <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Product Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* Main content sections - only show for chosen product type */}
            {productType && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left and middle columns */}
                <div className="lg:col-span-2">
                  <div className="bg-white p-4 rounded shadow">
                    <>
                      {/* Variance Name */}
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">
                          {productType === "Child"
                            ? "Variance Name"
                            : "Website Name"}
                        </h3>
                        <input
                          type="text"
                          name={
                            productType === "Child"
                              ? "varianceName"
                              : "websiteName"
                          }
                          value={
                            productType === "Child"
                              ? formData.varianceName
                              : formData.websiteName
                          }
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded"
                        />
                      </div>

                      {/* Subtitle description */}
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">
                          {productType === "Child"
                            ? "Subtitle Description"
                            : "Website Description"}
                        </h3>
                        <textarea
                          name={
                            productType === "Child"
                              ? "subtitleDescription"
                              : "websiteDescription"
                          }
                          value={
                            productType === "Child"
                              ? formData.subtitleDescription
                              : formData.websiteDescription
                          }
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded bg-gray-50"
                          rows="6"
                        ></textarea>
                      </div>

                      {/* Product Dimensions */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h3 className="text-xs font-medium mb-1">
                            Height / Width / Depth (cm)
                          </h3>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              name="heightCm"
                              value={formData.heightCm}
                              onChange={handleChange}
                              placeholder="H (cm)"
                              className="w-full border border-gray-300 p-1 rounded text-sm"
                            />
                            <input
                              type="text"
                              name="widthCm"
                              value={formData.widthCm}
                              onChange={handleChange}
                              placeholder="W (cm)"
                              className="w-full border border-gray-300 p-1 rounded text-sm"
                            />
                            <input
                              type="text"
                              name="depthCm"
                              value={formData.depthCm}
                              onChange={handleChange}
                              placeholder="D (cm)"
                              className="w-full border border-gray-300 p-1 rounded text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-medium mb-1">
                            Net Weight
                          </h3>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              name="weightKg"
                              value={formData.weightKg}
                              onChange={handleChange}
                              placeholder="NET WT (kg)"
                              className="w-full border border-gray-300 p-1 rounded text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">
                          Specifications
                        </h3>
                        <div className="border border-gray-300 rounded-lg">
                          <div className="grid grid-cols-5 p-2 bg-gray-100 text-xs font-medium">
                            <div>Name</div>
                            <div>Length</div>
                            <div>Width</div>
                            <div>Depth</div>
                            <div>ID</div>
                          </div>

                          {formData.specifications.map((spec, index) => (
                            <div
                              key={`spec-${index}`} // Added unique key here
                              className="grid grid-cols-5 p-2 border-t border-gray-300 text-xs"
                            >
                              <input
                                type="text"
                                value={spec.name}
                                onChange={(e) =>
                                  handleSpecChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="border border-gray-300 p-1 rounded"
                              />
                              <input
                                type="text"
                                value={spec.length}
                                onChange={(e) =>
                                  handleSpecChange(
                                    index,
                                    "length",
                                    e.target.value
                                  )
                                }
                                className="border border-gray-300 p-1 rounded"
                              />
                              <input
                                type="text"
                                value={spec.width}
                                onChange={(e) =>
                                  handleSpecChange(
                                    index,
                                    "width",
                                    e.target.value
                                  )
                                }
                                className="border border-gray-300 p-1 rounded"
                              />
                              <input
                                type="text"
                                value={spec.depth}
                                onChange={(e) =>
                                  handleSpecChange(
                                    index,
                                    "depth",
                                    e.target.value
                                  )
                                }
                                className="border border-gray-300 p-1 rounded"
                              />
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={spec.id}
                                  readOnly
                                  className="w-3/4 border border-gray-300 p-1 rounded bg-gray-100"
                                />
                                {index > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => removeSpecification(index)}
                                    className="ml-1 text-red-500"
                                  >
                                    <XCircleIcon size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="p-2 border-t border-gray-300">
                            <button
                              type="button"
                              onClick={addSpecification}
                              className="bg-red-500 text-white px-4 py-1 text-xs rounded flex items-center"
                            >
                              <PlusIcon size={12} className="mr-1" /> Add
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Inventory boxes */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="border border-gray-300 p-2 rounded">
                          <p className="text-xs mb-2">
                            Send stock msg to you in order limit at older than
                            period
                          </p>
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <p className="text-xs mb-2">HOW TO PROCEED</p>
                            <div className="flex space-x-2">
                              <div className="w-1/2 bg-yellow-200 border border-yellow-400 p-1 rounded text-xs">
                                Ready
                              </div>
                              <div className="w-1/2 bg-white border border-gray-300 p-1 rounded text-xs">
                                STOCK OUT TO STOCK
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-300 p-2 rounded">
                          <p className="text-xs mb-2">HARD LOTS TO STOCK</p>
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="bg-yellow-200 border border-yellow-400 p-1 rounded text-xs mb-2">
                              READY
                            </div>
                            <p className="text-xs">
                              Instant order takes:{" "}
                              <span className="font-bold">0</span> minutes
                            </p>
                            <p className="text-xs">
                              Normal order takes:{" "}
                              <span className="font-bold">3</span> minutes
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Time */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h3 className="text-xs font-medium mb-1">
                            All this moment system calculation
                          </h3>
                          <input
                            type="text"
                            disabled
                            className="w-full border border-gray-300 p-1 rounded bg-gray-100 text-sm
                              className="
                            w-full
                            border
                            border-gray-300
                            p-1
                            rounded
                            bg-gray-100
                            text-sm
                          />
                        </div>

                        <div>
                          <h3 className="text-xs font-medium mb-1">
                            delivery time in days
                          </h3>
                          <input
                            type="text"
                            name="deliveryTime"
                            value={formData.deliveryTime}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-1 rounded text-sm"
                          />
                        </div>
                      </div>

                      {/* Stock Value */}
                      <div className="mb-4">
                        <h3 className="text-xs font-medium mb-1">
                          Highest sales per day
                        </h3>
                        <input
                          type="text"
                          name="highestValue"
                          value={formData.highestValue}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-1 rounded text-sm bg-yellow-200"
                        />
                      </div>

                      {/* Normal Shelves */}
                      <div className="mb-4">
                        <h3 className="text-xs font-medium mb-1">
                          normal shelves allocation
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs mb-1">
                              amount of normal shelves
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                name="normalShelvesCount"
                                value={formData.normalShelvesCount}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-1 rounded text-sm bg-yellow-200"
                              />
                              <input
                                type="text"
                                className="w-full border border-gray-300 p-1 rounded text-sm bg-yellow-200"
                                placeholder="shelves"
                                readOnly
                              />
                            </div>
                          </div>

                          <div>
                            <p className="text-xs mb-1">
                              amount of high shelves
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                name="highShelvesCount"
                                value={formData.highShelvesCount}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-1 rounded text-sm bg-yellow-200"
                              />
                              <input
                                type="text"
                                className="w-full border border-gray-300 p-1 rounded text-sm bg-yellow-200"
                                placeholder="shelves"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Supplier Information */}
                      <div className="border border-red-300 p-3 rounded-lg mb-4">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-xs font-medium">
                            Alternate Supplier
                          </div>
                          <div className="col-span-2 text-xs font-medium">
                            Supplier Information
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div className="relative">
                            <input
                              type="text"
                              name="alternateSupplier"
                              value={formData.alternateSupplier}
                              onChange={handleChange}
                              onFocus={() => setShowSuggestions(true)}
                              className="w-full border border-gray-300 p-1 rounded text-sm"
                            />
                            {/* Suggestions dropdown */}

                            {showSuggestions &&
                              filteredSuppliers.length > 0 && (
                                <div className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto">
                                  {filteredSuppliers.map((supplier) => (
                                    <div
                                      key={`supplier-${
                                        supplier.id || supplier._id
                                      }`} // Added unique key here
                                      className="p-2 hover:bg-gray-100 cursor-pointer text-xs border-b border-gray-200"
                                      onClick={() => selectSupplier(supplier)}
                                    >
                                      {supplier.name}
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                          <div className="col-span-2">
                            <input
                              type="text"
                              name="supplierWebsite"
                              value={formData.supplierWebsite}
                              onChange={handleChange}
                              className="w-full border border-gray-300 p-1 rounded text-sm"
                              placeholder="Supplier website"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div>
                            <input
                              type="text"
                              name="supplierName"
                              value={formData.supplierName}
                              onChange={handleChange}
                              className="w-full border border-gray-300 p-1 rounded text-sm"
                              placeholder="Supplier name"
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="text"
                              name="supplierContact"
                              value={formData.supplierContact}
                              onChange={handleChange}
                              className="w-full border border-gray-300 p-1 rounded text-sm"
                              placeholder="Supplier contact"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Supplier details */}
                      <div className="space-y-2 mb-4">
                        <div>
                          <label className="block text-xs font-medium mb-1">
                            Supplier Address
                          </label>
                          <input
                            type="text"
                            name="supplierAddress"
                            value={formData.supplierAddress}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-1 rounded text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-1">
                            Supplier Email
                          </label>
                          <input
                            type="email"
                            name="supplierEmail"
                            value={formData.supplierEmail}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-1 rounded text-sm"
                          />
                        </div>
                      </div>

                      {/* Any Discount */}
                      <div className="mb-4">
                        <h3 className="text-xs font-medium mb-1">
                          Any Discount
                        </h3>
                        <input
                          type="text"
                          name="anyDiscount"
                          value={formData.anyDiscount}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-1 rounded text-sm"
                        />
                      </div>

                      {/* Price after discount */}
                      <div className="mb-4">
                        <h3 className="text-xs font-medium mb-1">
                          price after discount/ text
                        </h3>
                        <input
                          type="text"
                          name="priceAfterDiscount"
                          value={formData.priceAfterDiscount}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-1 rounded text-sm"
                        />
                      </div>

                      {/* Suggested Retail Price */}
                      <div className="mb-4">
                        <h3 className="text-xs font-medium mb-1">
                          Suggested Retail Price
                        </h3>
                        <input
                          type="text"
                          name="suggestedRetailPrice"
                          value={formData.suggestedRetailPrice}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-1 rounded text-sm"
                        />
                      </div>
                    </>
                  </div>
                </div>

                {/* Right sidebar */}
                <div className="bg-white p-4 rounded shadow">
                  {/* Visibility */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Visibility</h3>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="public"
                          name="visibility"
                          value="Public"
                          checked={formData.visibility === "Public"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <label htmlFor="public" className="text-sm">
                          Public
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="private"
                          name="visibility"
                          value="Private"
                          checked={formData.visibility === "Private"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <label htmlFor="private" className="text-sm">
                          Private
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Warning message */}
                  <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded mb-4 text-xs">
                    Please double check this field important for products,
                    please make sure your product categories update
                  </div>

                  {/* Categories */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <select
                      name="categories"
                      value={formData.categories}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                    >
                      <option value="">Select...</option>
                      <option value="category1">Category 1</option>
                      <option value="category2">Category 2</option>
                      <option value="category3">Category 3</option>
                    </select>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={`tag-${tag}`} // Added unique key here
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-2 py-1 text-xs border rounded ${
                            selectedTags.includes(tag)
                              ? "bg-purple-100 border-purple-500"
                              : "border-gray-300"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload Master Image */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">
                      Upload Master Image
                    </h3>
                    <div className="border border-dashed border-gray-300 p-4 rounded flex items-center justify-center h-32">
                      {masterImages[0] ? (
                        <div className="relative w-full h-full">
                          <img
                            src={masterImages[0].preview}
                            alt="Master"
                            className="w-full h-full object-contain"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            onClick={() => removeMasterImage(0)}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div
                          className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                          onClick={() => masterImageRef.current.click()}
                        >
                          <PlusIcon className="w-8 h-8 text-gray-400" />
                          <input
                            type="file"
                            ref={masterImageRef}
                            onChange={(e) => handleMasterImageUpload(0, e)}
                            className="hidden"
                            accept="image/*"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload More Images */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">
                      Upload More Images
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {moreImages.map((img, index) => (
                        <div
                          key={`more-img-${index}`} // Added unique key here
                          className="border border-dashed border-gray-300 p-2 rounded flex items-center justify-center h-16"
                        >
                          {img ? (
                            <div className="relative w-full h-full">
                              <img
                                src={img.preview}
                                alt={`More ${index}`}
                                className="w-full h-full object-contain"
                              />
                              <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                onClick={() => removeMoreImage(index)}
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div
                              className="flex items-center justify-center cursor-pointer w-full h-full"
                              onClick={() => {
                                if (moreImageRefs.current[index]) {
                                  moreImageRefs.current[index].click();
                                }
                              }}
                            >
                              <PlusIcon className="w-5 h-5 text-gray-400" />
                              <input
                                type="file"
                                ref={(el) =>
                                  (moreImageRefs.current[index] = el)
                                }
                                onChange={(e) =>
                                  handleMoreImageUpload(index, e)
                                }
                                className="hidden"
                                accept="image/*"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Re-order settings */}
                  <div className="bg-orange-100 p-3 rounded mb-4 space-y-2">
                    <h3 className="text-sm font-medium">re-order setting</h3>
                    <div>
                      <p className="text-sm font-semibold">
                        {formData.reOrderSetting}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs">amount of inventory in days</p>
                      <p className="text-sm font-semibold mb-1">
                        {formData.inventoryInDays}
                      </p>
                      <p className="text-xs text-gray-600">
                        (3 products in inventory)
                      </p>
                    </div>

                    <div>
                      <p className="text-xs">behind order period</p>
                      <p className="text-sm font-semibold">
                        {formData.deliveryPeriod}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs">order time + backup inventory</p>
                      <input
                        type="text"
                        name="orderTimeBackupInventory"
                        value={formData.orderTimeBackupInventory}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-1 rounded text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Notes for us</h3>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading
                    ? "bg-purple-400"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white px-6 py-2 rounded-full shadow-md flex items-center justify-center`}
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save size={18} className="mr-1" /> Save
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 transform transition-all animate-fadeIn">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => {
                  setShowSuccess(false);
                  window.location.reload();
                }}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Product Added Successfully!
              </h3>
              <p className="text-gray-500 mb-6">
                Your product has been added to the database and is now
                available.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    window.location.reload();
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
                >
                  Continue
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                This message will automatically close in 5 seconds
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
