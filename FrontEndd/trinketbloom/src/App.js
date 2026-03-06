  import React, { useState, useEffect } from 'react';

  // Image Popup Component (Existing, with responsiveness adjustments)
  const ImagePopup = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        cursor: 'pointer',
        boxSizing: 'border-box', // Ensure padding/border don't cause overflow
      }}
      onClick={onClose}
      >
        <img
          src={imageUrl}
          alt="Full view"
          style={{
            maxWidth: '90%', // Fluid width
            maxHeight: '90%', // Fluid height
            objectFit: 'contain',
            borderRadius: '1rem',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            boxSizing: 'border-box',
          }}
          onClick={(e) => e.stopPropagation()}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/CCCCCC/333333?text=Image+Not+Found"; }}
        />
      </div>
    );
  };

  // Checkout Form Component (Responsive adjustments)
const CheckoutForm = ({ wishlistItems, totalPrice, onSubmit, onClose }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
    const [errorMessage, setErrorMessage] = useState('');
    
    // The state for wishlistItems is not needed here as it is passed as a prop.
    // const [wishlistItemsset, setWishlistItems] = useState(wishlistItems);

    // Hardcoded bank details for demonstration
    const bankDetails = {
        accountName: 'Muhammad Hamza Rafi',
        accountNumber: '03364606346',
        bankName: 'Sadapay',
      
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check for required fields on the frontend first
        if (!name || !address || !phone) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }
        
        // This is the crucial part that was missing:
        // You were not sending the items and totalprice to the backend.
        const orderData = {
            name,
            address,
            phone,
            paymentMethod,
            items: wishlistItems, // Send the wishlistItems from props as 'items'
            totalprice: totalPrice, // Send the totalPrice from props
        };

        try {
            const response = await fetch('http://localhost:3001/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (response.ok) {
                // Instead of using a browser alert, we set a success message.
                setErrorMessage('Order created successfully!');
                // You can add a delay before closing the modal for the user to see the success message.
                setTimeout(onClose, 2000); 
            } else {
                setErrorMessage(data.error || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            setErrorMessage('Server error. Please try again.');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1002,
            boxSizing: 'border-box',
            padding: '1rem',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                maxWidth: '95%',
                width: '550px',
                maxHeight: '95%',
                overflowY: 'auto',
                position: 'relative',
                boxSizing: 'border-box',
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        color: '#333',
                    }}
                >
                    &times;
                </button>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: '#4A0050',
                    marginBottom: '1rem',
                    textAlign: 'center',
                }}>
                    Checkout Details
                </h2>

                {errorMessage && (
                    <p style={{ color: errorMessage.includes('successfully') ? 'green' : 'red', textAlign: 'center', marginBottom: '0.75rem', fontSize: '0.9rem' }}>{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                        <label htmlFor="checkout-name" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', color: '#6A0DAD', fontSize: '0.95rem' }}>Name:</label>
                        <input
                            type="text"
                            id="checkout-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #ddd', boxSizing: 'border-box' }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="checkout-address" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', color: '#6A0DAD', fontSize: '0.95rem' }}>Address:</label>
                        <textarea
                            id="checkout-address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows="3"
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #ddd', resize: 'vertical', boxSizing: 'border-box' }}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="checkout-phone" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', color: '#6A0DAD', fontSize: '0.95rem' }}>Phone Number:</label>
                        <input
                            type="tel"
                            id="checkout-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #ddd', boxSizing: 'border-box' }}
                            required
                        />
                    </div>
                    <div>
                        <p style={{ marginBottom: '0.25rem', fontWeight: 'bold', color: '#6A0DAD', fontSize: '0.95rem' }}>Payment Method:</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash-on-delivery"
                                    checked={paymentMethod === 'cash-on-delivery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Cash on Delivery
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank-transfer"
                                    checked={paymentMethod === 'bank-transfer'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Bank Transfer
                            </label>
                        </div>

                        {paymentMethod === 'bank-transfer' && (
                            <div style={{
                                backgroundColor: '#f9f9f9',
                                border: '1px solid #eee',
                                borderRadius: '0.75rem',
                                padding: '0.75rem',
                                marginTop: '0.75rem',
                                color: '#4A5568',
                                fontSize: '0.85rem',
                            }}>
                                <p style={{ fontWeight: 'bold', marginBottom: '0.4rem', color: '#4A0050' }}>Bank Transfer Details:</p>
                                <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
                                <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
                                <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                                <p><strong>IBAN:</strong> {bankDetails.iban}</p>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontStyle: 'italic' }}>
                                    Please transfer the total amount to the above account. Your order will be processed upon confirmation of payment.
                                </p>
                            </div>
                        )}
                    </div>

                    <div style={{
                        marginTop: '1rem',
                        paddingTop: '0.75rem',
                        borderTop: '2px solid #eee',
                        textAlign: 'right',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#4A0050',
                    }}>
                        Total: Rs. {totalPrice.toFixed(2)}
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#800080',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '9999px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease-in-out',
                            cursor: 'pointer',
                            border: 'none',
                            marginTop: '1rem',
                            fontSize: '1rem',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#6A0DAD';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#800080';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        Confirm Order
                    </button>
                </form>
            </div>
        </div>
    );
};


  // Wishlist Modal Component (Responsive adjustments)
  const WishlistModal = ({ wishlistItems, onRemoveFromWishlist, onClose, onPlaceOrder }) => {
    // Calculate total price of items in the wishlist
    const totalPrice = wishlistItems.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace('Rs. ', ''));
      return sum + (priceValue * item.quantity);
    }, 0);

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001,
        boxSizing: 'border-box',
        padding: '1rem', // Added padding for smaller screens
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem', // Slightly reduced padding for mobile
          borderRadius: '1.5rem',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
          maxWidth: '95%', // Increased max-width for smaller screens
          width: '500px', // Max width for larger screens
          maxHeight: '95%', // Increased max-height for smaller screens
          overflowY: 'auto',
          position: 'relative',
          boxSizing: 'border-box',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '0.75rem', // Adjusted for smaller padding
              right: '0.75rem', // Adjusted for smaller padding
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.8rem', // Slightly larger for easier tap
              cursor: 'pointer',
              color: '#333',
            }}
          >
            &times; {/* Close icon */}
          </button>
          <h2 style={{
            fontSize: '1.75rem', // Adjusted font size for mobile
            fontWeight: 'bold',
            color: '#4A0050',
            marginBottom: '1rem', // Adjusted margin
            textAlign: 'center',
          }}>
            Your Wishlist
          </h2>
          {wishlistItems.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6A0DAD', fontSize: '1rem' }}>
              Your wishlist is empty. Start adding some beautiful pieces!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}> {/* Adjusted gap */}
              {wishlistItems.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem', // Adjusted gap
                  padding: '0.6rem', // Adjusted padding
                  borderBottom: '1px solid #eee',
                }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '0.5rem' }} // Slightly smaller image
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/60x60/CCCCCC/333333?text=Img"; }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ fontWeight: '600', color: '#6A0DAD', marginBottom: '0.15rem', fontSize: '0.95rem' }}>{item.name}</h4> {/* Adjusted font size */}
                    <p style={{ color: '#EC4899', fontWeight: 'bold', fontSize: '0.9rem' }}>{item.price} x {item.quantity}</p> {/* Adjusted font size */}
                  </div>
                  <button
                    onClick={() => onRemoveFromWishlist(item.name)} // Assuming name is unique for removal
                    style={{
                      backgroundColor: '#FF6347', // Tomato red
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.4rem 0.6rem', // Adjusted padding
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      fontSize: '0.85rem', // Adjusted font size
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#E5533D'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#FF6347'}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div style={{
                marginTop: '1rem', // Adjusted margin
                paddingTop: '0.75rem', // Adjusted padding
                borderTop: '2px solid #eee',
                textAlign: 'right',
                fontSize: '1.2rem', // Adjusted font size
                fontWeight: 'bold',
                color: '#4A0050',
              }}>
                Total: Rs. {totalPrice.toFixed(2)} {/* Display total price */}
              </div>
              <button
                onClick={() => onPlaceOrder(wishlistItems, totalPrice)} // Call onPlaceOrder from App
                disabled={wishlistItems.length === 0} // Disable if wishlist is empty
                style={{
                  width: '100%',
                  backgroundColor: wishlistItems.length === 0 ? '#ccc' : '#800080',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '0.75rem 1.5rem', // Adjusted padding
                  borderRadius: '9999px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: wishlistItems.length === 0 ? 'not-allowed' : 'pointer',
                  border: 'none',
                  marginTop: '1rem', // Adjusted margin
                  fontSize: '1rem', // Adjusted font size
                }}
                onMouseOver={(e) => {
                  if (wishlistItems.length > 0) {
                    e.target.style.backgroundColor = '#6A0DAD';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (wishlistItems.length > 0) {
                    e.target.style.backgroundColor = '#800080';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };


  // Main App Component (Responsive adjustments)
  const App = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [activeImage, setActiveImage] = useState(null);
    const [showTimeoutId, setShowTimeoutId] = useState(null);
    const [hideTimeoutId, setHideTimeoutId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [wishlist, setWishlist] = useState([]); // Wishlist state (local)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

    // Checkout states
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(null); // To show success/error message after order

    // Function to handle smooth scrolling to sections (Existing)
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }
    };

    // Functions to manage the image popup with refined delays (Existing)
    const handleImageHover = (imageUrl) => {
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
        setHideTimeoutId(null);
      }
      if (showTimeoutId) {
        clearTimeout(showTimeoutId);
      }
      const newShowTimeout = setTimeout(() => {
        setActiveImage(imageUrl);
      }, 300);
      setShowTimeoutId(newShowTimeout);
    };

    const handleImageLeave = () => {
      if (showTimeoutId) {
        clearTimeout(showTimeoutId);
        setShowTimeoutId(null);
      }
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
      }
      const newHideTimeout = setTimeout(() => {
        setActiveImage(null);
      }, 500);
      setHideTimeoutId(newHideTimeout);
    };

    // Clean up timeouts on component unmount (Existing)
    useEffect(() => {
      return () => {
        if (showTimeoutId) {
          clearTimeout(showTimeoutId);
        }
        if (hideTimeoutId) {
          clearTimeout(hideTimeoutId);
        }
      };
    }, [showTimeoutId, hideTimeoutId]);

    // Wishlist functions (Local state management)
    const addToWishlist = (product, quantity = 1) => {
      setWishlist(prevWishlist => {
        const existingItemIndex = prevWishlist.findIndex(item => item.name === product.name);
        if (existingItemIndex > -1) {
          // If item exists, update its quantity
          const updatedWishlist = [...prevWishlist];
          updatedWishlist[existingItemIndex] = {
            ...updatedWishlist[existingItemIndex],
            quantity: updatedWishlist[existingItemIndex].quantity + quantity // Add to existing quantity
          };
          return updatedWishlist;
        } else {
          // If item is new, add it with quantity
          return [...prevWishlist, { ...product, quantity }];
        }
      });
    };

    const removeFromWishlist = (productName) => {
      setWishlist(prevWishlist => prevWishlist.filter(item => item.name !== productName));
    };

    const isProductInWishlist = (productName) => {
      return wishlist.some(item => item.name === productName);
    };

    // Handle placing an order
    const handlePlaceOrder = (items, total) => {
      setIsWishlistOpen(false); // Close wishlist modal
      setIsCheckoutOpen(true); // Open checkout form
    };

    // Handle checkout form submission (Now sending to backend)
    const handleCheckoutSubmit = async (orderDetails) => {
      try {
        const response = await fetch('http://localhost:3001/orders', { // Ensure this matches your backend URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: orderDetails.name,
            address: orderDetails.address,
            phone: orderDetails.phone,
            paymentMethod: orderDetails.paymentMethod,
            items: orderDetails.wishlistItems,
            totalprice: orderDetails.totalPrice,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to place order');
        }

        const result = await response.json();
        setOrderConfirmation(result.message || 'Your order has been placed successfully!');
        setIsCheckoutOpen(false); // Close checkout form
        setWishlist([]); // Clear local wishlist state
        setTimeout(() => setOrderConfirmation(null), 5000); // Clear confirmation message after 5 seconds

      } catch (error) {
        console.error("Error placing order:", error);
        setOrderConfirmation(`Failed to place order: ${error.message}`);
        setTimeout(() => setOrderConfirmation(null), 5000);
      }
    };

    // Handle contact form submission (Now sending to backend)
    const handleContactSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const message = e.target.message.value;

      if (!name || !email || !message) {
        // Using a simple alert here, consider a custom modal for better UX
        alert('Please fill in all fields for your message.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/feedback', { // Ensure this matches your backend URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to send message');
        }

        const result = await response.json();
        // Using a simple alert here, consider a custom modal for better UX
        alert(result.message || 'Your message has been sent successfully!');
        e.target.reset(); // Clear the form
      } catch (error) {
        console.error("Error sending message:", error);
        // Using a simple alert here, consider a custom modal for better UX
        alert(`Failed to send message: ${error.message}`);
      }
    };


    // Array of all products with their categories (Existing)
    const allProducts = [
      {
        name: "Rose Heart Bloom",
        price: "Rs. 1199",
        description: "A beautifully crafted heart-shaped pendant, symbolizing love and passion, with a delicate rose dried flower embedded within.",
        imageUrl: "/HeartShaped.jpg",
        category: "pendants",
      },
      {
        name: "Diamond Dewdrop Jhumka",
        price: "Rs. 1499",
        description: "Dazzling diamond-shaped resin jhumkas – a modern take on a classic, designed to shine.",
        imageUrl: "/DiamondJhumka.jpg",
        category: "jhumkas",
      },
      {
        name: "Petal Whisper Ring",
        price: "Rs. 799",
        description: "A delicate ring featuring a vibrant pink flower encased in crystal-clear resin, a miniature garden for your finger.",
        imageUrl: "/CircleRing.jpg",
        category: "rings",
      },
      {
        name: "Free Spirit Charm",
        price: "Rs. 699",
        description: "A delightful bird-shaped charm pendant, perfect for adding a touch of whimsical nature to any outfit.",
        imageUrl: "/BirdShaped.jpg",
        category: "pendants",
      },
      {
        name: "Love's Embrace Ring",
        price: "Rs. 799",
        description: "A charming ring featuring a vibrant red heart, perfect for expressing love and affection.",
        imageUrl: "/HeartRing.jpg",
        category: "rings",
      },
      {
        name: "Royal Petal Rectangle",
        price: "Rs. 1199",
        description: "A stylish rectangular pendant showcasing a preserved purple flower and shimmering gold flakes – a perfect blend of nature and elegance.",
        imageUrl: "/RectanglePendant.jpg",
        category: "pendants",
      },
      {
        name: "Rainbow Bloom Bar",
        price: "Rs. 1499",
        description: "A vibrant rectangular pendant showcasing a beautiful arrangement of colorful dried flowers, a miniature garden to wear.",
        imageUrl: "/RectanglePendant2.jpg",
        category: "pendants",
      },
      {
        name: "Crimson Daisy Delight",
        price: "Rs. 1199",
        description: "A striking round pendant featuring a delicate white daisy set against a vibrant red glitter background, a bold statement piece.",
        imageUrl: "/RoundPendant.jpg",
        category: "pendants",
      },
      {
        name: "Ruby Petal Jhumkas",
        price: "Rs. 1499",
        description: "Stunning circular jhumkas featuring vibrant red/pink dried petals and shimmering gold flakes, framed by intricate antique gold detailing.",
        imageUrl: "/CircleJhumka.jpg",
        category: "jhumkas",
      },
      {
        name: "Silver Blossom Jhumkas",
        price: "Rs. 1499",
        description: "Vibrant circular jhumkas featuring striking blue dried flowers set against a crisp white background, framed by intricate silver detailing and ghungroo bells.",
        imageUrl: "/CircleJhumka2.jpg",
        category: "jhumkas",
      },
      {
        name: "Pink Serenity Pendant",
        price: "Rs. 1199",
        description: "An elegant oval pendant featuring a delicate pink flower beautifully preserved in clear resin, framed by a classic gold-toned bezel.",
        imageUrl: "/OvalPendant.jpg",
        category: "pendants",
      },
      {
        name: "Crystal Heart Glow",
        price: "Rs. 799",
        description: "A captivating heart-shaped pendant featuring a luminous white/iridescent center, beautifully framed by a sparkling crystal border. A delicate piece for timeless elegance.",
        imageUrl: "/HeartCharm.jpg",
        category: "pendants",
      },
      {
        name: "Blush Petal Charm",
        price: "Rs. 799",
        description: "A delicate flower-shaped pendant featuring soft pink petals and a subtle blue/purple center, perfect for adding a touch of gentle charm to your look.",
        imageUrl: "/FlowerCharm.jpg",
        category: "pendants",
      },
      {
        name: "Enchanted Butterfly Pendant",
        price: "Rs. 999",
        description: "A mesmerizing butterfly-shaped pendant, featuring iridescent blue and green glitter that shimmers with every movement, capturing the magic of flight.",
        imageUrl: "Butterfly.jpg", // Using the uploaded image
        category: "pendants",
      },
      {
        name: "Midnight Bloom Heart",
        price: "Rs. 1299",
        description: "A captivating heart-shaped pendant featuring a vibrant yellow dried flower set against a deep, contrasting black background. A bold and beautiful statement piece.",
        imageUrl: "BlackHeart.jpg", // Using the uploaded image
        category: "pendants",
      },
    ];

    // Filter products based on selected category (Existing)
    let currentProducts = selectedCategory === 'all'
      ? allProducts
      : allProducts.filter(product => product.category === selectedCategory);

    // Filter by search term (Existing)
    if (searchTerm) {
      currentProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products (Existing)
    if (sortOrder !== 'default') {
      currentProducts = [...currentProducts].sort((a, b) => {
        const priceA = parseFloat(a.price.replace('Rs. ', ''));
        const priceB = parseFloat(b.price.replace('Rs. ', ''));

        if (sortOrder === 'price-asc') {
          return priceA - priceB;
        } else if (sortOrder === 'price-desc') {
          return priceB - priceA;
        }
        return 0; // Should not happen with current options
      });
    }

    return (
      <div style={{
        minHeight: '100vh',
        background: '#800080', // Solid purple background
        fontFamily: 'Inter, sans-serif',
        color: '#333',
        boxSizing: 'border-box', // Global box-sizing
      }}>
        {/* Navigation Bar */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '1rem 1.5rem', // Adjusted padding
          display: 'flex',
          flexDirection: 'column', // Stack on small screens
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0 0 1.5rem 1.5rem',
          boxSizing: 'border-box',
        }}>
          <div style={{
            fontSize: '1.2rem', // Adjusted font size for mobile
            fontWeight: 'bold',
            color: '#6A0DAD',
            marginBottom: '0.5rem', // Added margin for stacking
            textAlign: 'center',
            width: '100%',
          }}>
            THE TRINKET BLOOM
          </div>
          <ul style={{
            display: 'flex',
            flexWrap: 'wrap', // Allow items to wrap
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '0.75rem', // Adjusted gap
            justifyContent: 'center', // Center items when wrapped
            width: '100%',
          }}>
            <li>
              <button
                onClick={() => scrollToSection('home')}
                style={{
                  color: '#4A5568',
                  textDecoration: 'none',
                  fontSize: '0.9rem', // Adjusted font size
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem', // Added padding for tap target
                }}
                onMouseOver={(e) => e.target.style.color = '#800080'}
                onMouseOut={(e) => e.target.style.color = '#4A5568'}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('products')}
                style={{
                  color: '#4A5568',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                }}
                onMouseOver={(e) => e.target.style.color = '#800080'}
                onMouseOut={(e) => e.target.style.color = '#4A5568'}
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about')}
                style={{
                  color: '#4A5568',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                }}
                onMouseOver={(e) => e.target.style.color = '#800080'}
                onMouseOut={(e) => e.target.style.color = '#4A5568'}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                style={{
                  color: '#4A5568',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                }}
                onMouseOver={(e) => e.target.style.color = '#800080'}
                onMouseOut={(e) => e.target.style.color = '#4A5568'}
              >
                Contact
              </button>
            </li>
            {/* Wishlist Button in Nav (Existing) */}
            <li>
              <button
                onClick={() => setIsWishlistOpen(true)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6A0DAD',
                  fontSize: '1.2rem', // Adjusted icon size
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem', // Adjusted padding
                }}
                title="View Wishlist"
              >
                {/* Using a simple heart icon, you can replace with FontAwesome if needed */}
                🛒
                {wishlist.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px', // Adjusted position
                    right: '-5px', // Adjusted position
                    backgroundColor: '#EC4899',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '0.05rem 0.3rem', // Adjusted padding
                    fontSize: '0.6rem', // Adjusted font size
                    fontWeight: 'bold',
                    lineHeight: '1',
                    minWidth: '16px', // Adjusted size
                    textAlign: 'center',
                  }}>
                    {wishlist.length}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Order Confirmation message (NEW) */}
        {orderConfirmation && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#4CAF50', // Green for success
            color: 'white',
            padding: '1.2rem', // Adjusted padding
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1003,
            textAlign: 'center',
            fontSize: '1rem', // Adjusted font size
            maxWidth: '90%', // Ensure it fits on small screens
            boxSizing: 'border-box',
          }}>
            {orderConfirmation}
          </div>
        )}


        {/* Hero Section (Responsive adjustments) */}
        <section id="home" style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          paddingTop: '6rem', // Adjusted for fixed navbar height
          paddingBottom: '2rem', // Ensure content isn't cut off at bottom
          boxSizing: 'border-box',
        }}>
          <img
            src="/your_hero_background_image.jpg" // Placeholder for hero background
            alt="Resin Art Background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.7,
            }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/E0BBE4/FFFFFF?text=Beautiful+Resin+Art"; }}
          />
          <div style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '1.5rem', // Adjusted padding
            borderRadius: '1.5rem',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            maxWidth: '90%', // Fluid width
            margin: '0 0.75rem', // Adjusted margin
            boxSizing: 'border-box',
          }}>
            <h1 style={{
              fontSize: '2rem', // Adjusted for mobile
              fontWeight: '800',
              color: '#4A0050',
              lineHeight: '1.25',
              marginBottom: '0.75rem', // Adjusted margin
              animation: 'fadeInDown 1s ease-out',
            }}>
              Exquisite Resin Art Jewelry
            </h1>
            <p style={{
              fontSize: '1rem', // Adjusted for mobile
              color: '#4A5568',
              marginBottom: '1.5rem', // Adjusted margin
              animation: 'fadeInUp 1s ease-out',
            }}>
              Handcrafted pendants, jhumkas, rings, and bracelets that capture the essence of beauty.
            </p>
            <button
              onClick={() => scrollToSection('products')}
              style={{
                backgroundColor: '#800080',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.6rem 1.5rem', // Adjusted padding
                borderRadius: '9999px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                border: 'none',
                animation: 'bounceIn 1s ease-out',
                fontSize: '0.9rem', // Adjusted font size
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#6A0DAD';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#800080';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Explore Our Collection
            </button>
          </div>
        </section>

        {/* Products Section (Responsive adjustments) */}
        <section id="products" style={{
          padding: '3rem 0', // Adjusted padding
          backgroundColor: 'white',
          boxSizing: 'border-box',
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1rem', // Adjusted padding
            boxSizing: 'border-box',
          }}>
            <h2 style={{
              fontSize: '2rem', // Adjusted font size
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#4A0050',
              marginBottom: '2rem', // Adjusted margin
            }}>
              Our Unique Creations
            </h2>

            {/* Search and Sort Controls (Responsive adjustments) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column', // Stack on small screens
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem', // Adjusted margin
              flexWrap: 'wrap',
            }}>
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.4rem 0.8rem', // Adjusted padding
                  borderRadius: '9999px',
                  border: '1px solid #CBD5E0',
                  outline: 'none',
                  width: '90%', // Fluid width
                  maxWidth: '300px',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  fontSize: '0.9rem', // Adjusted font size
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 2px #800080';
                  e.target.style.borderColor = '#800080';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#CBD5E0';
                }}
              />

              {/* Sort Dropdown */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  padding: '0.4rem 0.8rem', // Adjusted padding
                  borderRadius: '9999px',
                  border: '1px solid #CBD5E0',
                  backgroundColor: 'white',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  fontSize: '0.9rem', // Adjusted font size
                  width: '90%', // Fluid width
                  maxWidth: '300px',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 2px #800080';
                  e.target.style.borderColor = '#800080';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#CBD5E0';
                }}
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Category Filter Buttons (Responsive adjustments) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem', // Adjusted gap
              marginBottom: '1.5rem', // Adjusted margin
              flexWrap: 'wrap', // Allow buttons to wrap
            }}>
              <CategoryButton
                category="all"
                selectedCategory={selectedCategory}
                onClick={setSelectedCategory}
              />
              <CategoryButton
                category="pendants"
                selectedCategory={selectedCategory}
                onClick={setSelectedCategory}
              />
              <CategoryButton
                category="jhumkas"
                selectedCategory={selectedCategory}
                onClick={setSelectedCategory}
              />
              <CategoryButton
                category="rings"
                selectedCategory={selectedCategory}
                onClick={setSelectedCategory}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Adjusted minmax for smaller cards on mobile
              gap: '1.5rem', // Adjusted gap
            }}>
              {/* Map over filtered and sorted products */}
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    category={product.category}
                    customStyle={product.name === "Bird-Shaped Pendant" ? { border: '2px solid red', backgroundColor: '#f0f8ff' } : {}}
                    imageCustomStyle={product.name === "Bird-Shaped Pendant" ? { objectFit: 'contain' } : {}}
                    onImageHover={handleImageHover}
                    onImageLeave={handleImageLeave}
                    onAddToWishlist={addToWishlist} // Pass the local addToWishlist function
                    isProductInWishlist={isProductInWishlist(product.name)}
                  />
                ))
              ) : (
                <p style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', color: '#6A0DAD', fontSize: '1rem' }}>
                  No products found matching your criteria.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* About Us Section (Responsive adjustments) */}
        <section id="about" style={{
          padding: '3rem 0', // Adjusted padding
          background: 'linear-gradient(to bottom right, #E0BBE4, #FFD1DC)',
          boxSizing: 'border-box',
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1rem', // Adjusted padding
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem', // Adjusted gap
            boxSizing: 'border-box',
          }}>
            <div style={{
              width: '100%',
              marginBottom: '1rem',
            }}>
              <h2 style={{
                fontSize: '2rem', // Adjusted font size
                fontWeight: 'bold',
                color: '#4A0050',
                marginBottom: '1rem', // Adjusted margin
                textAlign: 'center',
              }}>
                Our Passion for Resin Art
              </h2>
              <p style={{
                fontSize: '1rem', // Adjusted font size
                color: '#4A5568',
                lineHeight: '1.5', // Adjusted line height
                marginBottom: '0.75rem', // Adjusted margin
                textAlign: 'justify',
              }}>
                At Trinket Bloom, we believe in crafting more than just jewelry; we create wearable pieces of art. Each pendant, jhumka, ring, and bracelet is meticulously handcrafted with passion and precision, using high-quality resin and unique inclusions like dried flowers, glitter, and pigments.
              </p>
              <p style={{
                fontSize: '1rem', // Adjusted font size
                color: '#4A5568',
                lineHeight: '1.5', // Adjusted line height
                textAlign: 'justify',
              }}>
                Our journey began with a love for creativity and a desire to bring unique, personalized accessories to life. We pour our heart into every piece, ensuring it's not just beautiful but also durable and meaningful. Thank you for supporting our artistic endeavor!
              </p>
            </div>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <img
                src="/image.png" // Placeholder for about us image
                alt="About Us"
                style={{
                  borderRadius: '1.5rem',
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                  width: '100%', // Fluid width
                  maxWidth: '31.25rem',
                  height: 'auto',
                }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x350/E0BBE4/FFFFFF?text=Our+Story"; }}
              />
            </div>
          </div>
        </section>

        {/* Contact Section (Responsive adjustments) */}
        <section id="contact" style={{
          padding: '3rem 0', // Adjusted padding
          backgroundColor: 'white',
          boxSizing: 'border-box',
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1rem', // Adjusted padding
            boxSizing: 'border-box',
          }}>
            <h2 style={{
              fontSize: '2rem', // Adjusted font size
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#4A0050',
              marginBottom: '2rem', // Adjusted margin
            }}>
              Get in Touch
            </h2>
            <div style={{
              maxWidth: '90%', // Fluid width
              margin: '0 auto',
              background: 'linear-gradient(to bottom right, #E0BBE4, #FFD1DC)',
              padding: '1.5rem', // Adjusted padding
              borderRadius: '1.5rem',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
              boxSizing: 'border-box',
            }}>
              <p style={{
                fontSize: '1rem', // Adjusted font size
                color: '#4A5568',
                textAlign: 'center',
                marginBottom: '1rem', // Adjusted margin
              }}>
                Have a question, custom order request, or just want to say hello? We'd love to hear from you!
              </p>
              <form onSubmit={handleContactSubmit} style={{ // Added onSubmit handler
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem', // Adjusted gap
              }}>
                <div>
                  <label htmlFor="name" style={{
                    display: 'block',
                    color: '#4A5568',
                    fontSize: '0.95rem', // Adjusted font size
                    fontWeight: '500',
                    marginBottom: '0.25rem', // Adjusted margin
                  }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem', // Adjusted padding
                      borderRadius: '0.75rem',
                      border: '1px solid #CBD5E0',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      fontSize: '0.9rem', // Adjusted font size
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px #800080';
                      e.target.style.borderColor = '#800080';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = '#CBD5E0';
                    }}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{
                    display: 'block',
                    color: '#4A5568',
                    fontSize: '0.95rem', // Adjusted font size
                    fontWeight: '500',
                    marginBottom: '0.25rem', // Adjusted margin
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem', // Adjusted padding
                      borderRadius: '0.75rem',
                      border: '1px solid #CBD5E0',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      fontSize: '0.9rem', // Adjusted font size
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px #800080';
                      e.target.style.borderColor = '#800080';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = '#CBD5E0';
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" style={{
                    display: 'block',
                    color: '#4A5568',
                    fontSize: '0.95rem', // Adjusted font size
                    fontWeight: '500',
                    marginBottom: '0.25rem', // Adjusted margin
                  }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem', // Adjusted padding
                      borderRadius: '0.75rem',
                      border: '1px solid #CBD5E0',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                      fontSize: '0.9rem', // Adjusted font size
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px #800080';
                      e.target.style.borderColor = '#800080';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                      e.target.style.borderColor = '#CBD5E0';
                    }}
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#800080',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '0.6rem 1.2rem', // Adjusted padding
                    borderRadius: '9999px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    border: 'none',
                    fontSize: '0.95rem', // Adjusted font size
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#6A0DAD';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#800080';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Send Message
                </button>
              </form>
              <div style={{
                textAlign: 'center',
                color: '#4A5568',
                marginTop: '1.5rem', // Adjusted margin
                fontSize: '0.9rem', // Adjusted font size
              }}>
                <p>Email: <a href="mailto:thetrinketbloom@gmail.com" style={{ color: '#800080', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>thetrinketbloom@gmail.com</a></p>
                <p>Phone: <a href="tel:+92 3364606346" style={{ color: '#800080', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>+92 336 4606346</a></p>
                <p>Follow us on: <a href="https://www.instagram.com/the.trinketbloom/" style={{ color: '#800080', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Instagram</a> | <a href="#" style={{ color: '#800080', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Facebook</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer (Existing, responsive adjustments) */}
        <footer style={{
          backgroundColor: '#4A0050',
          color: 'white',
          padding: '1.5rem 0', // Adjusted padding
          textAlign: 'center',
          borderRadius: '1.5rem 1.5rem 0 0',
          boxSizing: 'border-box',
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1rem', // Adjusted padding
            fontSize: '0.9rem', // Adjusted font size
            boxSizing: 'border-box',
          }}>
            <p>&copy; {new Date().getFullYear()} The Trinket Bloom. All rights reserved.</p>
            <p style={{ marginTop: '0.4rem', fontSize: '0.8rem' }}>Crafted with love and resin.</p>
          </div>
        </footer>
        {/* Image Popup component rendered at the App level (Existing) */}
        <ImagePopup imageUrl={activeImage} onClose={handleImageLeave} />

        {/* Wishlist Modal (Existing) */}
        {isWishlistOpen && (
          <WishlistModal
            wishlistItems={wishlist}
            onRemoveFromWishlist={removeFromWishlist}
            onClose={() => setIsWishlistOpen(false)}
            onPlaceOrder={handlePlaceOrder} // Re-added onPlaceOrder prop
          />
        )}

        {/* Checkout Form (NEW) */}
        {isCheckoutOpen && (
          <CheckoutForm
            wishlistItems={wishlist}
            totalPrice={wishlist.reduce((sum, item) => parseFloat(item.price.replace('Rs. ', '')) * item.quantity, 0)}
            onSubmit={handleCheckoutSubmit}
            onClose={() => setIsCheckoutOpen(false)}
          />
        )}
      </div>
    );
  };

  // Category Button Component (Responsive adjustments)
  const CategoryButton = ({ category, selectedCategory, onClick }) => {
    const isActive = category === selectedCategory;
    const buttonText = category.charAt(0).toUpperCase() + category.slice(1);

    return (
      <button
        onClick={() => onClick(category)}
        style={{
          backgroundColor: isActive ? '#6A0DAD' : '#E0BBE4',
          color: isActive ? 'white' : '#4A0050',
          fontWeight: 'bold',
          padding: '0.4rem 1rem', // Adjusted padding
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isActive ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
          whiteSpace: 'nowrap',
          fontSize: '0.85rem', // Adjusted font size
        }}
        onMouseOver={(e) => {
          if (!isActive) {
            e.target.style.backgroundColor = '#CCEEFF';
            e.target.style.transform = 'scale(1.05)';
          }
        }}
        onMouseOut={(e) => {
          if (!isActive) {
            e.target.style.backgroundColor = '#E0BBE4';
            e.target.style.transform = 'scale(1)';
          }
        }}
      >
        {buttonText}
      </button>
    );
  };


  // Product Card Component (Existing with quantity selector, responsive adjustments)
  const ProductCard = ({ name, price, description, imageUrl, customStyle, imageCustomStyle, onImageHover, onImageLeave, onAddToWishlist, isProductInWishlist }) => {
    const [quantity, setQuantity] = useState(1); // State for product quantity

    return (
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          boxSizing: 'border-box',
          ...customStyle
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: '100%',
            height: '10rem', // Slightly smaller height for mobile cards
            objectFit: 'cover',
            borderRadius: '1rem 1rem 0 0',
            ...imageCustomStyle
          }}
          onMouseEnter={() => onImageHover(imageUrl)}
          onMouseLeave={onImageLeave}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/CCCCCC/333333?text=Product+Image"; }}
        />
        <div style={{ padding: '1rem' }}> {/* Adjusted padding */}
          <h3 style={{
            fontSize: '1.2rem', // Adjusted font size
            fontWeight: '600',
            color: '#6A0DAD',
            marginBottom: '0.4rem', // Adjusted margin
          }}>{name}</h3>
          <p style={{
            fontSize: '1rem', // Adjusted font size
            fontWeight: 'bold',
            color: '#EC4899',
            marginBottom: '0.6rem', // Adjusted margin
          }}>{price}</p>
          <p style={{
            color: '#4A5568',
            fontSize: '0.8rem', // Adjusted font size
            marginBottom: '0.8rem', // Adjusted margin
          }}>{description}</p>

          {/* Quantity Selector (Existing) */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem', gap: '0.4rem' }}> {/* Adjusted gap/margin */}
            <label htmlFor={`quantity-${name}`} style={{ color: '#4A5568', fontWeight: '500', fontSize: '0.85rem' }}>Quantity:</label>
            <input
              type="number"
              id={`quantity-${name}`}
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              style={{
                width: '50px', // Adjusted width
                padding: '0.2rem 0.4rem', // Adjusted padding
                borderRadius: '0.5rem',
                border: '1px solid #CBD5E0',
                outline: 'none',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                fontSize: '0.85rem', // Adjusted font size
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px #800080';
                e.target.style.borderColor = '#800080';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = '#CBD5E0';
              }}
            />
          </div>

          <button
            onClick={() => onAddToWishlist({ name, price, description, imageUrl }, quantity)} // Pass product and quantity
            style={{
              width: '100%',
              backgroundColor: isProductInWishlist ? '#FF6347' : '#28A745', // Red if in wishlist, green otherwise
              color: 'white',
              fontWeight: 'bold',
              padding: '0.4rem 0.8rem', // Adjusted padding
              borderRadius: '9999px',
              transition: 'background-color 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem', // Adjusted font size
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = isProductInWishlist ? '#E5533D' : '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = isProductInWishlist ? '#FF6347' : '#28A745'}
          >
            {isProductInWishlist ? 'Added to Wishlist ❤️' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    );
  };

  export default App;

 

