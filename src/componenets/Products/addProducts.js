import React, { useState, useRef } from "react";
import { PlusIcon } from "lucide-react";
import Sidebar from "../Sidebar/sidebar";

const AddProduct = () => {
  // Product type state
  const [productType, setProductType] = useState("Parent");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Form data state
  const [formData, setFormData] = useState({
    productName: "",
    subtitle: "",
    brand: "",
    description: "",
    productName: "",
    ProductDescription: "",
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
    visibility: "public",
    tags: [],
    categories: "",
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
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      name: "Supplier 1",
      email: "supplier1@example.com",
      address: "123 Main St",
      contact: "+1234567890",
    },
    {
      id: 2,
      name: "Supplier 2",
      email: "supplier2@example.com",
      address: "456 Elm St",
      contact: "+0987654321",
    },
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Ref for image upload
  const masterImageRef = useRef(null);
  const moreImageRefs = useRef([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product type change
  const handleProductTypeChange = (type) => {
    setProductType(type);
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

  // Handle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle master image upload
  const handleMasterImageUpload = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const newMasterImages = [...masterImages];
      newMasterImages[index] = URL.createObjectURL(e.target.files[0]);
      setMasterImages(newMasterImages);
    }
  };

  // Handle more images upload
  const handleMoreImageUpload = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const newMoreImages = [...moreImages];
      newMoreImages[index] = URL.createObjectURL(e.target.files[0]);
      setMoreImages(newMoreImages);
    }
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
    }));
    setShowSuggestions(false);
  };

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Form submitted:",
      formData,
      "Master Images:",
      masterImages,
      "More Images:",
      moreImages,
      "Tags:",
      selectedTags
    );
    // Here you would handle the actual form submission
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (simplified) */}

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
            <span className="text-xs">(create normal product)</span>
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

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-600 px-4 py-1 text-sm rounded"
                >
                  Parent product: UP135
                </button>
              </div>

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
                        className="border border-gray-300 p-1 text-sm flex-grow"
                      />
                      <button
                        type="button"
                        className="bg-purple-500 text-white px-2 py-1 text-sm"
                      >
                        Search
                      </button>
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

            {/* Second section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="bg-white p-4 rounded shadow">
                  {/* Website Info */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Variance Name</h3>
                    <input
                      type="text"
                      name="websiteName"
                      value={formData.websiteName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">
                      subtitle description
                    </h3>
                    <textarea
                      name="websiteDescription"
                      value={formData.websiteDescription}
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
                      <h3 className="text-xs font-medium mb-1">Net Weight</h3>
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
                    <h3 className="text-sm font-medium mb-2">Specifications</h3>
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
                          key={index}
                          className="grid grid-cols-5 p-2 border-t border-gray-300 text-xs"
                        >
                          <input
                            type="text"
                            value={spec.name}
                            onChange={(e) =>
                              handleSpecChange(index, "name", e.target.value)
                            }
                            className="border border-gray-300 p-1 rounded"
                          />
                          <input
                            type="text"
                            value={spec.length}
                            onChange={(e) =>
                              handleSpecChange(index, "length", e.target.value)
                            }
                            className="border border-gray-300 p-1 rounded"
                          />
                          <input
                            type="text"
                            value={spec.width}
                            onChange={(e) =>
                              handleSpecChange(index, "width", e.target.value)
                            }
                            className="border border-gray-300 p-1 rounded"
                          />
                          <input
                            type="text"
                            value={spec.depth}
                            onChange={(e) =>
                              handleSpecChange(index, "depth", e.target.value)
                            }
                            className="border border-gray-300 p-1 rounded"
                          />
                          <input
                            type="text"
                            value={spec.id}
                            readOnly
                            className="border border-gray-300 p-1 rounded bg-gray-100"
                          />
                        </div>
                      ))}

                      <div className="p-2 border-t border-gray-300">
                        <button
                          type="button"
                          onClick={addSpecification}
                          className="bg-red-500 text-white px-4 py-1 text-xs rounded"
                        >
                          + Add
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
                        className="w-full border border-gray-300 p-1 rounded bg-gray-100 text-sm"
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
                        <p className="text-xs mb-1">amount of high selves</p>
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
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-xs mb-1">amount of high selves</p>
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
                      <div>
                        <input
                          type="text"
                          name="alternateSupplier"
                          value={formData.alternateSupplier}
                          onChange={handleChange}
                          onFocus={() => setShowSuggestions(true)}
                          className="w-full border border-gray-300 p-1 rounded text-sm"
                        />
                        {/* Suggestions dropdown */}
                        {showSuggestions && (
                          <div className="relative">
                            <div className="absolute top-0 left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                              {suggestions.map((supplier) => (
                                <div
                                  key={supplier.id}
                                  className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
                                  onClick={() => selectSupplier(supplier)}
                                >
                                  {supplier.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          name="supplierInformation"
                          value={formData.supplierInformation}
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
                    <h3 className="text-xs font-medium mb-1">Any Discount</h3>
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
                </div>
              </div>

              {/* Right sidebar */}
              <div className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Visibility</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="public"
                        name="visibility"
                        value="public"
                        checked={formData.visibility === "public"}
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
                        value="private"
                        checked={formData.visibility === "private"}
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
                  Please double check this field important for products, please
                  make sure your product categories update
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
                        key={tag}
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
                          src={masterImages[0]}
                          alt="Master"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() => setMasterImages([null])}
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
                        key={index}
                        className="border border-dashed border-gray-300 p-2 rounded flex items-center justify-center h-16"
                      >
                        {img ? (
                          <div className="relative w-full h-full">
                            <img
                              src={img}
                              alt={`More ${index}`}
                              className="w-full h-full object-contain"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                              onClick={() => {
                                const newImages = [...moreImages];
                                newImages[index] = null;
                                setMoreImages(newImages);
                              }}
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
                              ref={(el) => (moreImageRefs.current[index] = el)}
                              onChange={(e) => handleMoreImageUpload(index, e)}
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
                    <p className="text-sm font-semibold">2 days average</p>
                  </div>

                  <div>
                    <p className="text-xs">amount of inventory in days</p>
                    <p className="text-sm font-semibold mb-1">2 days</p>
                    <p className="text-xs text-gray-600">
                      (3 products in inventory)
                    </p>
                  </div>

                  <div>
                    <p className="text-xs">behind order period</p>
                    <p className="text-sm font-semibold">1 days</p>
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
                    className="w-full border border-gray-300 p-2 rounded"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700 flex items-center justify-center"
              >
                <span className="text-2xl mr-1">+</span> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
