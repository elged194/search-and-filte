"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  // const router = useRouter();
  const searchParams = useSearchParams();

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
    searchTerm: string;
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

  // تهيئة الفلاتر من URL
  const initializeFiltersFromURL = (): Filters => {
    return {
      searchTerm: searchParams.get("searchTerm") || "",
      location: searchParams.get("location") || "",
      finishType: searchParams.get("finishType") || "",
      currency: searchParams.get("currency") || "",
      propertyType: searchParams.get("propertyType") || "",
      purpose: searchParams.get("purpose") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minArea: searchParams.get("minArea") || "",
      maxArea: searchParams.get("maxArea") || "",
      amenity: searchParams.get("amenity") || "",
    };
  };

  const [filters, setFilters] = useState<Filters>(initializeFiltersFromURL);
  const [filteredData, setFilteredData] = useState(data);

  // تحديث URL عند تغيير الفلاتر
  const updateURL = (newFilters: Filters) => {
    const queryParams = new URLSearchParams();

    // إضافة الفلاتر غير الفارغة للـ URL، مع استثناء القيم الفارغة
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        queryParams.set(key, value);
      }
    });

    // تحديث URL بدون التأثير على الروت
    window.history.replaceState(
      null,
      '',
      queryParams.toString() ? `?${queryParams.toString()}` : window.location.pathname
    );
  };

  const handleSearch = () => {
    const filtered = data.filter((property) => {
      const matchesSearch =
        !filters.searchTerm ||
        Object.values(property).some((value) =>
          value
            .toString()
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
        );

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
    updateURL(filters);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    updateURL(newFilters);

    // فلترة مباشرة
    const filtered = data.filter((property) => {
      return (
        (!newFilters.location || property.location === newFilters.location) &&
        (!newFilters.finishType ||
          property.finishType === newFilters.finishType) &&
        (!newFilters.currency || property.currency === newFilters.currency) &&
        (!newFilters.propertyType ||
          property.propertyType === newFilters.propertyType) &&
        (!newFilters.purpose || property.purpose === newFilters.purpose) &&
        (!newFilters.minPrice ||
          property.price >= parseInt(newFilters.minPrice)) &&
        (!newFilters.maxPrice ||
          property.price <= parseInt(newFilters.maxPrice)) &&
        (!newFilters.minArea ||
          property.area >= parseInt(newFilters.minArea)) &&
        (!newFilters.maxArea ||
          property.area <= parseInt(newFilters.maxArea)) &&
        (!newFilters.amenity || property.amenities.includes(newFilters.amenity))
      );
    });
    setFilteredData(filtered);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newFilters = { ...filters, searchTerm: value };
    setFilters(newFilters);
    updateURL(newFilters);

    const filtered = data.filter((property) =>
      Object.values(property).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  // تحميل الفلاتر من URL عند تحميل الصفحة
  useEffect(() => {
    const initialFilters = initializeFiltersFromURL();
    setFilters(initialFilters);
    // إعادة تطبيق الفلاتر من URL
    const filtered = data.filter((property) => {
      return (
        (!initialFilters.location ||
          property.location === initialFilters.location) &&
        (!initialFilters.finishType ||
          property.finishType === initialFilters.finishType) &&
        (!initialFilters.currency ||
          property.currency === initialFilters.currency) &&
        (!initialFilters.propertyType ||
          property.propertyType === initialFilters.propertyType) &&
        (!initialFilters.purpose ||
          property.purpose === initialFilters.purpose) &&
        (!initialFilters.minPrice ||
          property.price >= parseInt(initialFilters.minPrice)) &&
        (!initialFilters.maxPrice ||
          property.price <= parseInt(initialFilters.maxPrice)) &&
        (!initialFilters.minArea ||
          property.area >= parseInt(initialFilters.minArea)) &&
        (!initialFilters.maxArea ||
          property.area <= parseInt(initialFilters.maxArea)) &&
        (!initialFilters.amenity ||
          property.amenities.includes(initialFilters.amenity))
      );
    });
    setFilteredData(filtered);
  }, [data, initializeFiltersFromURL]); // أضف الاعتماديات هنا


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
