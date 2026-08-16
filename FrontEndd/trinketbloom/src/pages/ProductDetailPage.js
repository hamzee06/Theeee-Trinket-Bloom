import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getProductBySlug, parsePrice } from '../data/products';
import { SITE_URL } from '../constants/site';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: 'Inter, sans-serif' }}>
        <Seo title="Product not found" description="This product could not be found." path={`/product/${slug}`} noindex />
        <h1 style={{ color: '#4A0050' }}>Product not found</h1>
        <Link to="/" style={{ color: '#800080' }}>Back to shop</Link>
      </div>
    );
  }

  const imageAbsoluteUrl = product.imageUrl.startsWith('http')
    ? product.imageUrl
    : `${SITE_URL}${product.imageUrl.startsWith('/') ? '' : '/'}${product.imageUrl}`;

  const categoryLabel = product.category === 'pendants'
    ? 'Handmade Resin Pendant'
    : product.category === 'rings'
    ? 'Handmade Resin Ring'
    : 'Handmade Resin Jhumka';

  const productSeoTitle = `${product.name} | ${categoryLabel}`;
  const productSeoDescription = `Shop ${product.name}, a handcrafted ${product.category.slice(0, -1)} design by The Trinket Bloom. ${product.description.replace(/\.$/, '')}.`;

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [imageAbsoluteUrl],
    description: product.description,
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'PKR',
      price: parsePrice(product.price),
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#800080', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}>
      <Seo
        title={productSeoTitle}
        description={productSeoDescription}
        path={`/product/${product.slug}`}
        ogImage={imageAbsoluteUrl}
        jsonLd={jsonLd}
      />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem', boxSizing: 'border-box' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginBottom: '1.5rem' }}>
          &larr; Back to shop
        </Link>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '100%', maxWidth: '400px', flex: '1 1 320px', height: '320px', objectFit: 'cover' }}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x320/CCCCCC/333333?text=Product+Image'; }}
          />
          <div style={{ flex: '1 1 280px', padding: '1.5rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#6A0DAD', marginBottom: '0.5rem' }}>{product.name}</h1>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#EC4899', marginBottom: '1rem' }}>{product.price}</p>
            <p style={{ color: '#4A5568', lineHeight: '1.5', marginBottom: '1.5rem' }}>{product.description}</p>
            <Link
              to={`/#products`}
              style={{
                display: 'inline-block',
                backgroundColor: '#800080',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.6rem 1.5rem',
                borderRadius: '9999px',
                textDecoration: 'none',
              }}
            >
              Add to wishlist in shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
