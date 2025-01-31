"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { allProducts } from "@/sanity/lib/queries";
import Navbar from "../components/navbar";
import GreenHeader from "../components/green-header";
import Footer from "../components/footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import cat1 from "@/public/images/card-item.png";
import cat2 from "@/public/images/card-item (1).png";
import cat3 from "@/public/images/card-item (2).png";
import cat4 from "@/public/images/card-item (3).png";
import cat5 from "@/public/images/card-item (4).png";
import { Products } from "@/types/products";
import Swal from "sweetalert2";

const ShopPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(200);

  // Fetch products from Sanity
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products: Products[] = await client.fetch(allProducts);
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Handle category change
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    filterProducts(selectedCategory, maxPrice);
  };
  //ADD TO CART AND NOTIFICATION Handle
const handleClick = (product:Products) => {
    console.log('Product clicked:', product); // Log the product to confirm it is passed correctly
  
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    console.log('Existing cart:', cart); // Log current cart
  
    if (cart[product.name]) {
      cart[product.name] = {
        ...cart[product.name],
        quantity: cart[product.name].quantity + 1,
      };
    } else {
      cart[product.name] = { ...product, quantity: 1 };
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Updated cart:', cart); // Log the updated cart
  
    // Show SweetAlert2 notification after adding the product to the cart
    Swal.fire({
      title: 'Success!',
      text: `${product.name} has been added to your cart.`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'View Cart',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "OK"
        console.log('User clicked OK');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "View Cart"
        window.location.href = '/cart';
      }
    });
  };


  // Filter products by category and price
  const filterProducts = (category: string, price: number) => {
    let updatedProducts = products;

    if (category !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    updatedProducts = updatedProducts.filter(
      (product) => product.price <= price
    );
    setFilteredProducts(updatedProducts);
  };

  const handlePriceChange = (arg0: number): void => {
    setMaxPrice(arg0);
    filterProducts(category, arg0);
  };

  return (
    <div>
      <GreenHeader />
      <Navbar />

      {/* Shop Section Header */}
      <div className="w-full flex flex-col items-center mt-[10px]">
        <div className="w-full max-w-screen-xl flex flex-col items-center py-[40px] animate-text-reveal">
          <h2 className="font-Montserrat font-bold text-[24px] text-[#252B42]">
            Shop
          </h2>
          <div className="flex items-center gap-[15px] mt-2">
            <span className="font-bold text-[#252B42]">Home</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400">Shop</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FAFAFA] py-8 animate-text-reveal">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ml-[90px] lg:ml-[70px]">
          <Image src={cat1} alt="1" priority className="w-[60%] md:w-full lg:w-full" />
          <Image src={cat2} alt="2" priority className="w-[60%] md:w-full lg:w-full" />
          <Image src={cat3} alt="3" priority className="w-[60%] md:w-full lg:w-full" />
          <Image src={cat4} alt="4" priority className="w-[60%] md:w-full lg:w-full" />
          <Image src={cat5} alt="5" priority className="w-[60%] md:w-full lg:w-full" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-full bg-[#FAFAFA] py-8">
        <h1 className="text-center text-[50px] font-bold mb-6">Categories</h1>
        <div className="container mx-auto flex flex-wrap gap-4 justify-center">
          {[
            { name: "All", value: "all" },
            { name: "T-Shirts", value: "tshirt" },
            { name: "Shorts", value: "short" },
            { name: "Jeans", value: "jeans" },
            { name: "Hoodies", value: "hoodie" },
            { name: "Shirts", value: "shirt" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`py-2 px-4 rounded-lg font-medium transition ${category === cat.value ? "bg-black text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="w-full bg-[#FAFAFA] py-8 flex justify-center items-center">
        <div className="flex gap-4 items-center flex-wrap justify-center sm:flex-row sm:w-auto">
          <label className="font-bold text-center sm:text-left">
            Max Price:
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={maxPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-36 sm:w-48" // Smaller width on mobile, larger on bigger screens
          />
          <span className="text-center sm:text-left">${maxPrice}</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="bg-gray-50 p-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="relative w-full h-56">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      priority={true}
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      style={{ objectFit: "cover", borderRadius: "0.5rem" }} 
                    />
                  )}
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-green-600 text-lg font-bold">
                    ${product.price}
                  </p>
                  {product.discountPercent > 0 && (
                    <p className="text-red-500 text-sm font-semibold">
                      {product.discountPercent}% Off
                    </p>
                  )}
                  <Link href={`/product/${product.slugCurrent}`}>
                    <button className="mt-4 bg-black text-white py-2 mr-5 px-4 rounded hover:bg-gray-800">
                      View Product
                    </button>
                  </Link>
                  <button
                    onClick={() => handleClick(product)}
                    className="mt-2 bg-black text-white py-2 px-5 mr-5 rounded hover:bg-gray-800"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No products found.
            </h2>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShopPage;
