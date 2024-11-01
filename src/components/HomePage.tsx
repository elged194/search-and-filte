"use client";
import React, { ChangeEvent, useState } from "react";

export default function HomePage() {
  const data = [
    {
      id: 1,
      location: "مدنتي",
      finishType: "سوبر لوكس",
      currency: "جنيه مصري",
      propertyType: "فيلا",
      purpose: "سكني",
      price: 1500000,
      area: 300,
      amenities: ["اسانسير", "البدروم"],
    },
    {
      id: 2,
      location: "مدينه السدات",
      finishType: "نص تشطيب",
      currency: "ريال سعودي",
      propertyType: "صيدليه",
      purpose: "تجاري",
      price: 500000,
      area: 150,
      amenities: ["غاز"],
    },
    {
      id: 3,
      location: "ابو زعبل",
      finishType: "علي المحاره",
      currency: "دولار",
      propertyType: "مكتبه",
      purpose: "بيع",
      price: 20000,
      area: 50,
      amenities: ["اسانسير"],
    },
    {
      id: 4,
      location: "مدنتي",
      finishType: "سوبر لوكس",
      currency: "جنيه مصري",
      propertyType: "صيدليه",
      purpose: "تجاري",
      price: 800000,
      area: 120,
      amenities: ["البدروم", "غاز"],
    },
    {
      id: 5,
      location: "مدنتي",
      finishType: "سوبر لوكس",
      currency: "جنيه مصري",
      propertyType: "شقه",
      purpose: "تجاري",
      price: 900000,
      area: 120,
      amenities: ["البدروم", "غاز"],
    },
    {
      id: 6,
      location: "مدنتي",
      finishType: "سوبر لوكس",
      currency: "جنيه مصري",
      propertyType: "صيدليه",
      purpose: "تجاري",
      price: 770000,
      area: 120,
      amenities: ["البدروم", "غاز"],
    },
    {
      id: 7,
      location: "مدنتي",
      finishType: "سوبر لوكس",
      currency: "جنيه مصري",
      propertyType: "صيدليه",
      purpose: "تجاري",
      price: 130000,
      area: 120,
      amenities: ["البدروم", "غاز"],
    },
  ];

  type Filters = {
    searchTerm: string; // New field for general search
    location: string;
    finishType: string;
    currency: string;
    propertyType: string;
    purpose: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
    maxArea: string;
    amenity: string;
  };

  const [filters, setFilters] = useState<Filters>({
    searchTerm: "", // Initialize the new search term
    location: "",
    finishType: "",
    currency: "",
    propertyType: "",
    purpose: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    amenity: "",
  });

  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    const filtered = data.filter((property) => {
      // First check if the property matches the general search term
      const matchesSearch =
        !filters.searchTerm ||
        Object.values(property).some((value) =>
          value
            .toString()
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
        );

      // Then check all other filters
      return (
        matchesSearch &&
        (!filters.location || property.location === filters.location) &&
        (!filters.finishType || property.finishType === filters.finishType) &&
        (!filters.currency || property.currency === filters.currency) &&
        (!filters.propertyType ||
          property.propertyType === filters.propertyType) &&
        (!filters.purpose || property.purpose === filters.purpose) &&
        (!filters.minPrice || property.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || property.price <= parseInt(filters.maxPrice)) &&
        (!filters.minArea || property.area >= parseInt(filters.minArea)) &&
        (!filters.maxArea || property.area <= parseInt(filters.maxArea)) &&
        (!filters.amenity || property.amenities.includes(filters.amenity))
      );
    });
    setFilteredData(filtered);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // New function to handle search input changes
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, searchTerm: value }));

    // Only filter based on search term immediately
    const filtered = data.filter((property) =>
      Object.values(property).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <section className="py-5">
      <form className="p-5 py-2 bg-gray-300 min-h-screen mx-10">
        <input
          type="search"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 mb-4 border rounded-lg outline-none focus:border-blue-500"
          placeholder="بحث عام..."
        />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          >
            <option value="">اختر موقع</option>
            <option value="مدنتي">مدنتي</option>
            <option value="مدينه السدات">مدينه السدات</option>
            <option value="ابو زعبل">ابو زعبل</option>
          </select>

          <select
            name="finishType"
            value={filters.finishType}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          >
            <option value="">اختر نوع التشطيب</option>
            <option value="سوبر لوكس">سوبر لوكس</option>
            <option value="نص تشطيب">نص تشطيب</option>
            <option value="علي المحاره">علي المحاره</option>
          </select>

          <select
            name="currency"
            value={filters.currency}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          >
            <option value="">اختر العملة</option>
            <option value="جنيه مصري">جنيه مصري</option>
            <option value="ريال سعودي">ريال سعودي</option>
            <option value="دولار">دولار</option>
          </select>

          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          >
            <option value="">اختر نوع العقار</option>
            <option value="صيدليه">صيدليه</option>
            <option value="مكتبه">مكتبه</option>
            <option value="فيلا">فيلا</option>
            <option value="شقه">شقه</option>
            <option value="غرفه">غرفه</option>
          </select>

          <select
            name="purpose"
            value={filters.purpose}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          >
            <option value="">اختر الغرض</option>
            <option value="سكني">سكني</option>
            <option value="تجاري">تجاري</option>
            <option value="بيع">بيع</option>
          </select>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="اقل سعر"
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="اكبر سعر"
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="minArea"
            value={filters.minArea}
            onChange={handleChange}
            placeholder="اقل مساحه"
            className="p-2 border rounded-lg"
          />
          <input
            type="number"
            name="maxArea"
            value={filters.maxArea}
            onChange={handleChange}
            placeholder="اكبر مساحه"
            className="p-2 border rounded-lg"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-1">اكتر الامتيازات</label>
          <select
            name="amenity"
            value={filters.amenity}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          >
            <option value="">اختر ميزة</option>
            <option value="اسانسير">اسانسير</option>
            <option value="البدروم">البدروم</option>
            <option value="غاز">غاز</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 px-10 w-full m-auto  rounded-lg"
        >
          بحث
        </button>
      </form>

      <div className="container p-4 mx-10">
        <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredData.map((property) => (
            <div
              key={property.id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">
                {property.propertyType}
              </h2>
              <p className="text-gray-600">Location: {property.location}</p>
              <p className="text-gray-600">Finish: {property.finishType}</p>
              <p className="text-gray-600">Purpose: {property.purpose}</p>
              <p className="text-gray-600">Area: {property.area} m²</p>
              <p className="text-gray-600">
                Price: {property.price} {property.currency}
              </p>
              <p className="text-gray-600">
                Amenities: {property.amenities.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
