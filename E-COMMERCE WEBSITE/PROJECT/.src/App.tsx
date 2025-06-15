import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { products, categories } from './data/products';
import { Product } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
        
        <Hero />
        
        <FeaturedProducts 
          products={products} 
          onProductClick={handleProductClick}
        />

        <section id="products" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                All Products
              </h2>
              <p className="text-lg text-slate-600">
                Browse our complete collection of premium products
              </p>
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <ProductGrid
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          </div>
        </section>

        <Footer />

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={closeProductModal}
          />
        )}

        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;