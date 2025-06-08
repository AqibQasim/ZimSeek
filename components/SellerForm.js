"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { ref, push, set } from "firebase/database";

const SellerForm = () => {
  const [formData, setFormData] = useState({
    sellerName: "",
    storeName: "",
    email: "",
    phone: "",
    city: "",
    suburb: "",
    businessType: "",
    products: [{ name: "", category: "", price: "", unit: "" }],
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name.startsWith("product") && index !== null) {
      const updatedProducts = [...formData.products];
      updatedProducts[index][name.split(".")[1]] = value;
      setFormData({ ...formData, products: updatedProducts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { name: "", category: "", price: "", unit: "" },
      ],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, idx) => idx !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.sellerName.trim() ||
      !formData.storeName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim() ||
      !formData.suburb.trim() ||
      !formData.businessType.trim()
    ) {
      alert("Please fill in all required seller details.");
      return;
    }

    for (const [i, product] of formData.products.entries()) {
      if (
        !product.name.trim() ||
        !product.category.trim() ||
        !product.unit.trim() ||
        product.price === ""
      ) {
        alert(`Please fill in all fields for product ${i + 1}`);
        return;
      }

      const priceValue = parseFloat(product.price);
      if (isNaN(priceValue) || priceValue < 0) {
        alert(`Product ${i + 1} has an invalid price.`);
        return;
      }
    }

    setLoading(true);

    try {
      const sellerRef = push(ref(db, "sellers"));
      const sellerId = sellerRef.key;

      await set(sellerRef, {
        sellerName: formData.sellerName,
        storeName: formData.storeName,
        email: formData.email,
        phone: "+263" + formData.phone,
        location: {
          city: formData.city,
          suburb: formData.suburb,
        },
        businessType: formData.businessType,
      });

      for (const product of formData.products) {
        const productRef = push(ref(db, "products"));
        await set(productRef, {
          name: product.name,
          category: product.category,
          price: parseFloat(product.price),
          unit: product.unit,
          city: formData.city,
          sellerId: sellerId,
        });
      }

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.sellerName,
          email: formData.email,
        }),
      });

      // setFormData({
      //   sellerName: "",
      //   storeName: "",
      //   email: "",
      //   phone: "",
      //   city: "",
      //   suburb: "",
      //   businessType: "",
      //   products: [{ name: "", category: "", price: "", unit: "" }],
      // });

      router.push("/success");
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const cities = [
    "Bindura",
    "Bulawayo",
    "Chegutu",
    "Chinhoyi",
    "Chipinge",
    "Chiredzi",
    "Chitungwiza",
    "Gweru",
    "Gwanda",
    "Harare",
    "Hwange",
    "Kadoma",
    "Kariba",
    "Karoi",
    "Kwekwe",
    "Marondera",
    "Masvingo",
    "Mutare",
    "Norton",
    "Plumtree",
    "Victoria Falls",
    "Zvishavane",
    "Other",
  ];

  const categories = [
    "Agricultural Inputs",
    "Beans",
    "Beverages",
    "Building Supplies",
    "Cars and Vehicles",
    "Dairy",
    "Dating",
    "Eggs",
    "Electronics",
    "Fish",
    "Fresh Produce",
    "Fruits",
    "Grains",
    "Groceries",
    "Groundnuts/Peanuts",
    "Herbs",
    "Jobs",
    "Meat and Poultry",
    "Pharmacy/Medicine",
    "School Supplies",
    "Services",
    "Other",
  ];

  const businessTypes = [
    "Cooperative",
    "Farmer",
    "Home-Based Seller",
    "Local Market Stall",
    "Other",
    "Specialty Store",
    "Supermarket",
    "Street Based Seller",
    "Wholesaler",
    "Other",
  ];

  const units = ["per kg", "per piece", "per bundle", "per litre"];

  return loading ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4 mx-auto animate-spin border-t-blue-500"></div>
        <p className="text-lg">Submitting your information...</p>
      </div>
    </div>
  ) : (
    <div className="max-w-3xl mx-auto mt-10 text-white p-8 bg-gray-800 shadow-xl rounded-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-6">
        🛍️ ZimSeek Seller Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="sellerName"
            placeholder="Seller Name"
            value={formData.sellerName}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <input
            type="text"
            name="storeName"
            placeholder="Store Name"
            value={formData.storeName}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Seller Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <div className="flex items-center">
            <span className="px-3 bg-gray-600 text-white rounded-l p-3">
              +263
            </span>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number (WhatsApp)"
              value={formData.phone}
              onChange={handleChange}
              required
              className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-r text-white"
            />
          </div>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Select City / Town</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="suburb"
            placeholder="Suburb / Area"
            value={formData.suburb}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Select Business Type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-100 mb-2">
            🧾 Products
          </h3>
          {formData.products.map((product, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center bg-gray-700 p-3 rounded"
            >
              <input
                type="text"
                name="product.name"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleChange(e, idx)}
                required
                className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
              <select
                name="product.category"
                value={product.category}
                onChange={(e) => handleChange(e, idx)}
                required
                className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="product.price"
                placeholder="Price"
                value={product.price}
                onChange={(e) => handleChange(e, idx)}
                required
                className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
              <select
                name="product.unit"
                value={product.unit}
                onChange={(e) => handleChange(e, idx)}
                required
                className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {formData.products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="text-blue-400 hover:underline mt-2"
          >
            + Add Another Product
          </button>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Submit Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerForm;
